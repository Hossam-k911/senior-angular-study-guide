const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('marked');

marked.setOptions({ gfm: true, breaks: false });

const root = __dirname;
let markdown = fs.readFileSync(path.join(root, 'guide.md'), 'utf8');
// The local CV path is useful in the private draft, but cannot work on a public website.
markdown = markdown.replace(/\*\*مصدر التفاصيل:\*\*.*?\n/g, '');

function plain(value) {
  return value.replace(/`/g, '').replace(/<[^>]*>/g, '').trim();
}

function html(value) {
  return marked.parse(value.trim());
}

const sections = [];
const blocks = markdown.split(/(?=^## )/m).filter((item) => item.startsWith('## '));

for (const block of blocks) {
  const firstLine = block.indexOf('\n');
  const heading = block.slice(3, firstLine).trim();
  if (heading === 'خريطة المذاكرة') continue;

  const body = block.slice(firstLine + 1).replace(/^---\s*$/gm, '').trim();
  const numbered = heading.match(/^(\d+)\.\s*(.*)$/);
  const id = numbered ? `topic-${numbered[1]}` : heading.startsWith('قائمة') ? 'checklist' : 'references';
  const section = {
    id,
    title: heading,
    shortTitle: numbered ? numbered[2] : heading,
    questions: [],
    introHtml: '',
  };

  const questionParts = body.split(/(?=^### س\d+(?:-أ)?\.)/m);
  if (questionParts.length === 1) {
    section.introHtml = html(body);
  } else {
    const hasIntro = !questionParts[0].startsWith('### س');
    section.introHtml = hasIntro && questionParts[0].trim() ? html(questionParts[0]) : '';
    for (const part of questionParts.slice(hasIntro ? 1 : 0)) {
      const lineEnd = part.indexOf('\n');
      const headingLine = part.slice(4, lineEnd).trim();
      const number = headingLine.match(/^س(\d+(?:-أ)?)\./)?.[1];
      if (!number) throw new Error(`Cannot parse question: ${headingLine}`);
      const arTitle = headingLine.replace(/^س\d+(?:-أ)?\.\s*/, '');
      const content = part.slice(lineEnd + 1);
      const enQuestionMatch = content.match(/\*\*Interview question \(EN\):\*\*\s*(.+?)\s*\n/);
      const enAnswerMatch = content.match(/\*\*Answer \(EN\):\*\*\s*([\s\S]*)$/);
      if (!enQuestionMatch || !enAnswerMatch) throw new Error(`Missing bilingual answer: ${number}`);
      const arContent = content.slice(0, enQuestionMatch.index).trim();
      section.questions.push({
        id: `q-${number.replace('-أ', '-a')}`,
        number: `س${number}`,
        arTitle: plain(arTitle),
        enTitle: plain(enQuestionMatch[1]),
        arHtml: html(arContent),
        enHtml: html(enAnswerMatch[1]),
        searchText: plain(`${arTitle} ${enQuestionMatch[1]} ${arContent} ${enAnswerMatch[1]}`).toLocaleLowerCase(),
      });
    }
  }
  sections.push(section);
}

const questionCount = sections.reduce((sum, section) => sum + section.questions.length, 0);
if (sections.length !== 15 || questionCount !== 69) {
  throw new Error(`Content is incomplete: found ${sections.length} sections and ${questionCount} questions; expected 15 and 69. ${sections.map(s => `${s.id}:${s.questions.length}`).join(', ')}`);
}

const data = { title: 'Senior Angular Study Guide', sections };
fs.writeFileSync(path.join(root, 'data.js'), `window.STUDY_DATA = ${JSON.stringify(data)};\n`, 'utf8');
console.log(`Built ${sections.length} sections and ${questionCount} bilingual questions.`);
