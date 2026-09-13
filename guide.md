# Senior Frontend Angular — دليل المراجعة للمقابلة

> **المستوى:** حوالي ٤ سنوات خبرة · **الهدف:** إجابات دقيقة بأمثلة وقرارات تقنية، لا حفظ تعريفات.  
> **طريقة الاستخدام:** اقرأ السؤال بالعربي والإنجليزي، جاوب بصوت عالٍ بالإنجليزي في ٦٠–٩٠ ثانية، ثم قارن إجابتك بالنموذج العربي والإنجليزي. جرّب أسئلة الكود قبل قراءة الحل. التفاصيل التي تعتمد على نسخة Angular أو NgRx في مشروعك راجعها مع نسخة المشروع.

## خريطة المذاكرة

1. HTML وCSS وSass وAccessibility؛ ثم مراجعة HTML5 العملية في الفصل 13
2. JavaScript ثم TypeScript
3. OOP وSOLID وData Structures
4. Angular الأساسية وDI وRouting وForms
5. RxJS وSignals وNgRx
6. Performance وSSR وSecurity وTesting
7. سيناريوهات Senior وتقديم النفس بالإنجليزي

---

## 1. HTML وCSS وSass

### س1. إيه الفرق بين semantic HTML و`div` لكل حاجة؟

**الإجابة بالعربي:** العنصر الدلالي يصف معنى المحتوى وسلوكه: `button` للفعل، `a` للتنقل، `nav` للروابط الرئيسية، و`main` للمحتوى الأساسي. ده يحسّن استخدام لوحة المفاتيح وقارئات الشاشة، ويساعد محركات البحث تفهم بنية الصفحة. أبدأ بالعنصر الصحيح قبل إضافة ARIA؛ لأن ARIA لا يضيف وحده كل سلوك العنصر الأصلي. اختبر التنقل بـTab وEnter/Space، والـlabels والـfocus. [Angular accessibility](https://angular.dev/best-practices/a11y)

**Interview question (EN):** Why does semantic HTML matter instead of using divs everywhere?

**Answer (EN):** Semantic elements communicate meaning and built-in behavior. I use a button for an action, an anchor for navigation, and landmarks such as main and nav to structure the page. This improves keyboard and screen-reader support and helps search engines understand the content. I prefer the correct native element before adding ARIA.

### س2. تعمل responsive وRTL بشكل قابل للصيانة إزاي؟

**الإجابة بالعربي:** أبدأ بتخطيط مرن بـFlexbox/Grid ووحدات نسبية، ثم breakpoints حسب انكسار المحتوى. لا أفترض أن اتجاه اللغة مجرد `text-align`. استخدم CSS logical properties مثل `margin-inline-start` و`padding-inline-end` و`inset-inline-start` بدل `left/right` حين يكون المعنى «بداية/نهاية السطر». اختبر العربية والإنجليزية، النص الطويل، والتكبير. 

```css
.card__icon { margin-inline-end: .75rem; }
.badge { inset-inline-start: .5rem; }
```

**سؤال متابعة CSS مهم:** لو style لا يُطبّق، افحص cascade وspecificity وinheritance وترتيب القواعد قبل استخدام `!important`. ولو عنصر فوق آخر بشكل غير متوقع، افحص stacking contexts التي قد تنشأ من `position` مع `z-index` أو `transform`؛ رقم `z-index` كبير داخل context أدنى لن يتغلب على context خارجي أعلى.

**CSS follow-up (EN):** If a style does not apply, I check the cascade, specificity, inheritance, and source order before reaching for `!important`. If an element appears behind another one, I inspect stacking contexts; a large `z-index` inside a lower context cannot escape that context.

**Interview question (EN):** How would you build a responsive UI that also supports RTL?

**Answer (EN):** I start with flexible layouts using Grid or Flexbox and add breakpoints where the content actually needs them. For RTL, I use logical properties such as margin-inline-start instead of hard-coded left and right values. Then I test both language directions, long text, zoom, and keyboard navigation.

### س3. إيه BEM وSass، وإمتى يفيدوا؟

**الإجابة بالعربي:** BEM طريقة تسمية CSS: `block__element--modifier` مثل `card__badge--featured`، فتوضح تبعية العنصر وحالته وتقلل تضارب الـselectors. Sass تضيف variables وmixins وnesting، لكن nesting العميق يصعّب فهم الـspecificity. Sass وسيلة تنظيم، وليست بديلًا عن CSS الصحيح أو naming واضح.

**Interview question (EN):** What are BEM and Sass, and when would you use them?

**Answer (EN):** BEM is a naming convention that makes the relationship between a block, its elements, and modifiers explicit, for example card__badge--featured. Sass helps organize styles with variables, mixins, and nesting. I keep nesting shallow because deep selectors make specificity and maintenance harder.

### س4. هتحسن الصور والـicons إزاي؟

**الإجابة بالعربي:** الصور: حجم مناسب، صيغة مناسبة، أبعاد ثابتة لمنع layout shift، lazy loading لما هو خارج الشاشة، وأولوية للصورة الرئيسية. الأيقونات: اختر SVG للأيقونات القابلة للتخصيص أو subset من icon font عند الحاجة؛ تحميل مكتبة أيقونات كاملة عشان رمزين يزيد الـpayload. قِس حجم الـbundle والشبكة قبل وبعد. Angular يضم أدوات لتحسين الصور، وقياس LCP/CLS يوضح أثر التغيير. [Angular performance](https://angular.dev/best-practices/performance) · [Core Web Vitals](https://web.dev/articles/vitals)

**Interview question (EN):** How would you optimize images and icons?

**Answer (EN):** I serve appropriately sized images, reserve their dimensions to avoid layout shifts, lazy-load off-screen content, and prioritize the main image. For icons, I choose an appropriate SVG or a small subset rather than shipping an entire icon library for a few glyphs. I verify the result with bundle and network measurements.

### س5. SEO في تطبيق Angular يعتمد على إيه؟

**الإجابة بالعربي:** عناوين ووصف واضحان، semantic HTML، روابط قابلة للزحف، محتوى يظهر لمحركات البحث، وأداء جيد. SSR قد يساعد في إتاحة HTML أولي وتحسين الظهور الأول، لكنه لا يصلح محتوى ضعيفًا أو metadata ناقصة. اختبر الـHTML المرسل فعليًا، لا الشكل بعد تشغيل JavaScript فقط. [Angular performance](https://angular.dev/best-practices/performance)

**Interview question (EN):** What affects SEO in an Angular application?

**Answer (EN):** I focus on meaningful content, semantic HTML, titles and metadata, crawlable links, and loading performance. Server-side rendering can make initial HTML available earlier, but it does not compensate for missing content or metadata. I inspect the actual HTML response as well as the client-rendered page.

---

### س71. اشرح box model و`box-sizing`، وإيه سبب عنصر عرضه أكبر من المتوقع؟

**الإجابة بالعربي:** في `content-box`، `width` يحدد المحتوى فقط، والـpadding والـborder يزودوا العرض النهائي. في `border-box` يدخلوا داخل العرض المحدد؛ الـmargin يظل خارجه. أفحص كمان `min-width` الافتراضي لعناصر Flex/Grid، والصور أو النصوص الطويلة التي تمنع الانكماش. `box-sizing: border-box` قاعدة مفيدة للمشروع، لكن لا تحل overflow سببه content غير قابل للكسر.

**Interview question (EN):** Why can an element be wider than its declared width?

**Answer (EN):** With `content-box`, padding and borders add to the declared width; `border-box` includes them in it, while margins remain outside. I also inspect min-size constraints in flex or grid items and unbreakable content. A border-box reset helps predict sizing, but I still diagnose the actual overflow source.

### س72. عند تعارض قواعد CSS، تحدد القاعدة الفائزة إزاي؟

**الإجابة بالعربي:** أفحص origin وimportance، ثم cascade layers، ثم specificity، ثم scoping proximity إن وُجد، وأخيرًا source order؛ inheritance لا تكسب declaration مباشرة على نفس العنصر. `!important` لا تستخدمها كحل أول. في DevTools أراجع computed style والقواعد المشطوبة. لو selector معقد، أقلل specificity وأستخدم طبقات/أسماء واضحة بدل التصعيد المستمر.

**Interview question (EN):** How do you debug a CSS rule that does not apply?

**Answer (EN):** I inspect the computed style and cascade: origin and importance, layers, specificity, scope proximity where relevant, and source order. Inheritance only matters when the element has no winning direct declaration for that property. I avoid fighting specificity with repeated `!important` and simplify the stylesheet structure.

### س73. Flexbox أم Grid؟ وإيه معنى `minmax(0, 1fr)`؟

**الإجابة بالعربي:** Flexbox أنسب لترتيب عناصر في محور واحد مع توزيع مرن، وGrid لتخطيط صفوف وأعمدة معًا. `1fr` قد يحتفظ بحد أدنى تلقائي مبني على المحتوى في بعض الحالات؛ `minmax(0, 1fr)` يسمح للعمود بالانكماش، ثم أعالج overflow في المحتوى نفسه. أختار بناءً على علاقة العناصر، لا على أن أحدهما أحدث. للـresponsive أستخدم `repeat(auto-fit, minmax(...))` حين يناسب المحتوى بدل breakpoints عشوائية.

**Interview question (EN):** When do you choose Flexbox or Grid, and why use `minmax(0, 1fr)`?

**Answer (EN):** Flexbox is natural for one-dimensional alignment; Grid is strong when rows and columns must coordinate. `minmax(0, 1fr)` removes an automatic minimum that can make a track overflow. I still handle long content explicitly and choose layout based on the relationship between elements.

### س74. Sass في مشروع كبير: `@use` vs `@import`، وmixin vs placeholder؟

**الإجابة بالعربي:** `@use` يحمل module بnamespace واضح ويمنع تلوث الأسماء؛ Sass `@import` القديم deprecated. Mixin يولّد declarations حيث تستدعيه ويمكنه أخذ arguments، بينما `%placeholder` مع `@extend` يدمج selectors وقد ينتج selectors غير متوقعة إذا توسع الاستخدام. أفضّل CSS custom properties للقيم التي تتغير وقت التشغيل أو حسب theme، وSass variables للقيم المحسوبة أثناء build.

**Interview question (EN):** How would you structure Sass in a large application?

**Answer (EN):** I use modules through `@use` with clear namespaces rather than deprecated Sass `@import`. Mixins are good for reusable declaration patterns with parameters; placeholders and `@extend` can combine selectors, so I use them carefully. I choose CSS custom properties for runtime theming and Sass variables for build-time values.

---

## 2. JavaScript — الأساسيات وأسئلة الـoutput

### س6. اشرح scope وhoisting وTemporal Dead Zone.

**الإجابة بالعربي:** JavaScript تنشئ الـbindings قبل تنفيذ الكود. `var` له function scope وتكون قيمته `undefined` قبل الـassignment. `let` و`const` لهما block scope، والوصول لهما قبل سطر التهيئة يرمي `ReferenceError` بسبب الـTDZ. Function declaration يمكن استدعاؤها قبل موضعها في نفس النطاق؛ function expression تتبع نوع المتغير الحامل لها.

```js
console.log(a);
var a = 2;
console.log(a);
// undefined, ثم 2
```

```js
console.log(b);
let b = 2;
// ReferenceError في أول سطر؛ السطر الثاني لا يُنفّذ
```

**Interview question (EN):** Explain scope, hoisting, and the temporal dead zone. What do the examples print?

**Answer (EN):** JavaScript creates bindings before executing a scope. A var binding is function-scoped and reads as undefined before its assignment, so the first snippet prints undefined and then 2. Let and const are block-scoped and cannot be accessed before initialization; the second snippet throws a ReferenceError on the first line.

### س7. `this` بتتحدد إزاي؟

**الإجابة بالعربي:** في الـordinary function تعتمد على **طريقة الاستدعاء**: `obj.method()` تربطها بـ`obj`؛ `call/apply/bind` يحدّدونها صراحة. الـarrow function لا تنشئ `this` خاصة بها بل تستخدم `this` من السياق المحيط وقت تعريفها. لذلك نقل method إلى متغير قد يغيّر `this`، بينما arrow داخل method تحتفظ بسياق الـmethod.

```js
function createUser(name) {
  return {
    name,
    say() {
      const arrow = () => console.log(this.name);
      arrow();
    },
  };
}
createUser('Mona').say(); // Mona
```

**Interview question (EN):** How is this determined in JavaScript?

**Answer (EN):** For a regular function, this mainly depends on how the function is called: a method call uses its receiver, while call, apply, or bind can set it explicitly. An arrow function captures this from the surrounding lexical scope. In the example, the arrow is created inside say, so it prints Mona.

### س8. إيه prototype chain؟

**الإجابة بالعربي:** عند قراءة خاصية غير موجودة على object، يبحث المحرك في prototype ثم prototype الخاص به حتى نهاية السلسلة. الـclass syntax تبسيط لنموذج الوراثة القائم على prototypes، وليست نسخة من inheritance في اللغات الأخرى. فرّق بين own property وinherited property، وبين `Object.create` ونسخ البيانات.

```js
const base = { role: 'viewer' };
const user = Object.create(base);
user.name = 'Ali';
console.log(user.role, Object.hasOwn(user, 'role'));
// viewer false
```

**Interview question (EN):** What is the prototype chain, and what does the example print?

**Answer (EN):** When a property is not found directly on an object, JavaScript looks up its prototype chain. `Object.create(base)` makes `base` the prototype of `user`, so `user.role` evaluates to `viewer`. `Object.hasOwn(user, 'role')` is false because `role` is inherited rather than owned by `user`.

### س9. إيه closure؟ وهل هي memory leak؟

**الإجابة بالعربي:** closure هي function تحتفظ بإمكانية الوصول للـlexical environment الذي أُنشئت فيه، حتى بعد انتهاء استدعاء الـouter function. مفيدة لعمل private state وcallbacks. ليست leak في حد ذاتها؛ تصبح مشكلة إذا احتفظ callback طويل العمر بمرجع كبير لم نعد نحتاجه. [MDN closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) · [MDN memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)

**توقع الـoutput:**

```js
function counter() {
  let n = 0;
  return () => ++n;
}
const a = counter();
const b = counter();
console.log(a(), a(), b(), a());
```

**الحل بالعربي:** `1 2 1 3`. كل استدعاء `counter()` أنشأ بيئة مستقلة؛ `a` و`b` لا يشتركان في `n`.

**Interview question (EN):** What is a closure? Is every closure a memory leak? What is the output?

**Answer (EN):** A closure is a function that retains access to the lexical environment in which it was created. Each call to counter creates a separate n, so the output is 1, 2, 1, 3. A closure is not inherently a leak; it becomes a problem if a long-lived callback keeps large or obsolete objects reachable unnecessarily.

### س10. ليه نتيجة حلقة `var` مع timers بتفاجئ ناس؟

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
console.log('end');
```

**الحل بالعربي:** `end` ثم `3 3 3`. الـcallbacks تقرأ نفس binding الخاص بـ`var` بعد انتهاء الحلقة. غيّرها إلى `let` لتحصل على `end` ثم `0 1 2`، لأن كل iteration لها binding مستقل.

**Interview question (EN):** What does the var loop print, and why?

**Answer (EN):** It prints end first, followed by 3, 3, 3. The timer callbacks run after the loop, and all three callbacks read the same function-scoped var binding. Replacing var with let creates a distinct binding for each iteration, giving end, 0, 1, 2.

### س11. اشرح event loop وترتيب microtasks/macrotasks.

**الإجابة بالعربي:** الكود المتزامن ينتهي أولًا. بعدها تُنفّذ microtasks الجاهزة مثل `Promise.then` و`queueMicrotask` قبل الانتقال إلى timer task التالية. الـ`setTimeout(..., 0)` لا يعني التنفيذ فورًا. المهم تتبع متى **تُجدول** كل callback، لا ترتيب كتابتها فقط.

```js
console.log('A');
setTimeout(() => console.log('T'), 0);
Promise.resolve().then(() => {
  console.log('P1');
  Promise.resolve().then(() => console.log('P2'));
});
queueMicrotask(() => console.log('M'));
console.log('B');
```

**الحل بالعربي:** `A B P1 M P2 T`. `P2` تُضاف للـmicrotask queue أثناء تنفيذ `P1`، خلف `M` الموجودة بالفعل.

**Interview question (EN):** Explain the event loop and predict the exact console order.

**Answer (EN):** The output is A, B, P1, M, P2, T. Synchronous code runs first. Promise callbacks and queueMicrotask callbacks run as microtasks before the timer task. P2 is scheduled while P1 runs, so it is placed behind M, which was already queued.

### س12. `await` بتعمل إيه في ترتيب التنفيذ؟

```js
async function task() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}
console.log('3');
task();
Promise.resolve().then(() => console.log('4'));
console.log('5');
```

**الحل بالعربي:** `3 1 5 2 4`. استدعاء `task()` يبدأ synchronously حتى `await`، ثم تكمل الدالة في microtask. استكمالها جُدول قبل callback الذي يطبع `4`.

**Interview question (EN):** What does await change in execution order?

**Answer (EN):** The output is 3, 1, 5, 2, 4. Calling an async function runs its body synchronously until the first await. The continuation after await is scheduled as a microtask before the later Promise callback that prints 4.

### س13. Promise vs Observable؟

**الإجابة بالعربي:** Promise تمثل نتيجة مستقبلية واحدة وتبدأ العملية عند إنشائها؛ Observable قد تصدر صفرًا أو أكثر من القيم، واشتراكها يبدأ التنفيذ في الحالات الباردة. Promise لها `then/catch/finally`؛ Observable تستخدم operators وsubscription يمكن إنهاؤه. `async/await` واجهة للتعامل مع Promises، وليست بديلًا شاملًا عن streams أو cancellation.

**Interview question (EN):** What is the difference between a Promise and an Observable?

**Answer (EN):** A Promise represents one eventual result, and its executor starts when the Promise is created. An Observable can represent a stream of zero or more values; a cold Observable normally starts its work for each subscriber. Observables support composition and subscription cleanup, while async/await is syntax for working with Promises.

---

### س75. ما ناتج الكود؟ فسر `this` والـarrow function.

```js
const user = {
  name: 'Mona',
  regular() { return this.name; },
  arrow: () => this.name,
};
console.log(user.regular());
console.log(user.arrow());
```

**الإجابة بالعربي:** أول سطر `Mona`. الثاني **ليس `Mona`**: الـarrow لا تنشئ `this` جديدة، بل تلتقط `this` من lexical scope الخارجي. ناتج السطر الثاني يعتمد على بيئة التشغيل والـtop-level `this`، فقد يكون `undefined` أو يحدث خطأ لو كانت `this` نفسها `undefined` في ذلك السياق. ما ينفعش أقول ناتج ثابت دون تحديد البيئة. استخدم method عادية حين تحتاج receiver هو `user`.

**Interview question (EN):** What does this code print, and is the second value environment-independent?

**Answer (EN):** The regular method returns `Mona` because the call receiver is `user`. The arrow captures the surrounding lexical `this`, not the object, so its result is environment-dependent and may even throw if that surrounding `this` is undefined. I would not claim one universal second output without specifying the execution context.

### س76. اطلع ترتيب الـconsole، ووضح أين تدخل microtasks.

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
queueMicrotask(() => console.log('D'));
console.log('E');
```

**الإجابة بالعربي:** الترتيب `A E C D B`. الـsynchronous code يخلص أولًا؛ `then` و`queueMicrotask` يدخلان microtask queue بترتيب إضافتهما، ويُنفذان قبل timer task التالي. `setTimeout(..., 0)` يعني أقرب فرصة لاحقة وليس تنفيذًا فوريًا. لو microtask أنشأت microtask أخرى، تُفرغ الطابور قبل الانتقال إلى task التالية، ولذلك يمكن إساءة استخدامها وتأخير الرسم.

**Interview question (EN):** What is the console order, and why?

**Answer (EN):** The output is `A E C D B`. Synchronous statements run first. The promise callback and `queueMicrotask` then run in enqueue order before the timer task. A zero-delay timer schedules a later task; it does not interrupt the current call stack.

### س77. ما ناتج الكود؟ وما الفرق بين shallow copy وdeep copy؟

```js
const a = { profile: { city: 'Cairo' } };
const b = { ...a };
b.profile.city = 'Alex';
console.log(a.profile.city, a === b, a.profile === b.profile);
```

**الإجابة بالعربي:** `Alex false true`. الـspread نسخ المستوى الأول فقط: `a` و`b` كائنين مختلفين لكن `profile` نفس المرجع. عند تحديث state في Angular/NgRx لا أعدل nested object بالخطأ؛ أنسخ المسار المطلوب أو أستخدم طريقة immutable واضحة. `structuredClone` قد يكون حلًا لبعض البيانات، لكن ليس بديلًا عامًا: لا ينسخ كل الأنواع/السلوكيات بنفس معنى التطبيق.

**Interview question (EN):** What prints, and what does object spread actually copy?

**Answer (EN):** It prints `Alex false true`. Spread creates a new outer object but keeps the nested `profile` reference. For immutable state changes, I copy the modified path rather than mutating a shared nested object. I do not treat generic deep cloning as a default state-update strategy.

### س78. Promise combinators الأربعة: تختار أي واحد في سيناريو dashboard؟

**الإجابة بالعربي:** `Promise.all` ينتظر نجاح الجميع ويُرفض عند أول rejection، مع أن الطلبات الأخرى لا تُلغى تلقائيًا. `allSettled` يعطيني نتيجة نجاح/فشل لكل طلب، مناسب لو widgets مستقلة. `race` يعطي أول promise تستقر، نجاحًا أو فشلًا؛ `any` يعطي أول نجاح ويرفض بـ`AggregateError` لو الكل فشل. لو أحتاج إلغاء فعلي للـfetch أستخدم `AbortController`، لا أعتمد على combinator وحده.

**Interview question (EN):** How do you choose among `all`, `allSettled`, `race`, and `any`?

**Answer (EN):** `all` requires every result and rejects on a rejection; `allSettled` reports every outcome independently. `race` settles with the first settlement, while `any` resolves with the first fulfillment and fails only if all reject. None of these automatically cancels the other requests; I use an abort mechanism when cancellation matters.

### س79. ما ناتج closure دي، ولماذا يحتفظ المتغير بقيمته؟

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const first = makeCounter();
const second = makeCounter();
console.log(first(), first(), second(), first());
```

**الإجابة بالعربي:** `1 2 1 3`. كل استدعاء `makeCounter()` ينشئ lexical environment مستقلة، والـfunction الراجعة تحتفظ بالوصول إلى `count` الخاصة بها بعد انتهاء الاستدعاء الأصلي. Closure ليست leak بحد ذاتها؛ قد تطيل عمر بيانات كبيرة إذا احتفظت بها callback أو listener طويل العمر. أزيل listeners/subscriptions التي لم أعد أحتاجها.

**Interview question (EN):** What is the output, and what state does each closure retain?

**Answer (EN):** The output is `1 2 1 3`. Each `makeCounter` call creates its own lexical environment. The returned function keeps access to that call's `count`. A closure is normal JavaScript behavior; retaining unnecessary large objects through long-lived callbacks is the memory concern.

### س80. Event delegation وdebounce وthrottle: إمتى تستخدم كل واحد؟

**الإجابة بالعربي:** Event delegation يضع listener على parent مستقر ويحدد العنصر المقصود من event target؛ مفيد لقائمة ديناميكية، مع الانتباه للـbubbling والعناصر المتداخلة. Debounce ينفذ بعد توقف الأحداث فترة، مناسب لبحث بعد الكتابة؛ throttle يحد التنفيذ لمرة خلال interval، مناسب لمراقبة scroll/resize حسب الحالة. أستخدم `event.target.closest(...)` بحذر وأتأكد أنه داخل الـcontainer، ولا أنسى cleanup للـlistener.

**Interview question (EN):** When would you use delegation, debounce, and throttle?

**Answer (EN):** Delegation handles bubbling events at a stable ancestor, useful for dynamic lists. Debounce waits for a quiet period, such as after typing; throttle caps execution frequency for repeated events such as scrolling. I validate the matched target stays within the container and remove listeners when their owner is destroyed.

---

## 3. TypeScript

### س14. لماذا `unknown` أفضل من `any` عند حدود الـAPI؟

**الإجابة بالعربي:** `any` يعطل فحص النوع، بينما `unknown` يجبرني أتحقق قبل استخدام القيمة. البيانات القادمة من الشبكة غير مضمونة حتى لو كتبت لها interface؛ الأنواع لا تجري runtime validation. أتحقق من الشكل عند حدود النظام ثم أتعامل مع نوع موثوق داخله.

**Interview question (EN):** Why is unknown safer than any at an API boundary?

**Answer (EN):** Any disables useful type checks. Unknown forces me to validate or narrow the value before using it. A TypeScript interface does not validate a network response at runtime, so I check external data at the boundary and only then expose a trusted application type.

### س15. اشرح union narrowing وdiscriminated union بمثال.

```ts
type LoadState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function label(state: LoadState<string>): string {
  switch (state.status) {
    case 'loading': return 'Loading';
    case 'success': return state.data;
    case 'error': return state.message;
  }
}
```

**الإجابة بالعربي:** `status` يميّز الحالات، فيعرف TypeScript أي properties متاحة في كل فرع. ده أنسب من object مليان حقول optional تسمح بحالة غير منطقية مثل `success` بلا `data`. [TypeScript narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing)

**Interview question (EN):** What is a discriminated union, and why is it useful?

**Answer (EN):** A discriminated union gives each valid case a distinct tag, such as loading, success, or error. TypeScript narrows the type when I check that tag, so success has data while error has a message. This prevents impossible combinations that a single object with many optional fields would allow.

### س16. إيه قيمة Generics عمليًا؟

**الإجابة بالعربي:** تربط نوع الإدخال بنوع الإخراج دون فقد المعلومة كما يحدث مع `any`، وتتيح API قابلة لإعادة الاستخدام مع الحفاظ على type safety.

```ts
function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}
const name = first(['Ali', 'Mona']); // string | undefined
```

**Interview question (EN):** What problem do TypeScript generics solve?

**Answer (EN):** Generics preserve the relationship between input and output types while keeping an API reusable. In the first function, an array of strings produces string or undefined, whereas an array of numbers produces number or undefined. Using any would lose that relationship.

---

### س81. `type` vs `interface`: كيف تختار بدون قواعد مطلقة؟

**الإجابة بالعربي:** الاتنين يصفان object shapes في حالات كثيرة. `interface` مناسبة لعقد object قابل للامتداد وdeclaration merging عند الحاجة؛ `type` أكثر مرونة للـunions والـtuples والـmapped/conditional types. لا أحوّلها لنقاش أسلوب فارغ؛ أختار convention ثابتًا للفريق، وأستخدم discriminated union للحالات المتبادلة بدل optional fields كثيرة.

**Interview question (EN):** How do you choose between a TypeScript type alias and an interface?

**Answer (EN):** Both model object shapes. Interfaces support extension and declaration merging; type aliases also represent unions, tuples, and type transformations. I follow team conventions for ordinary object contracts and use a discriminated union when I need mutually exclusive states.

### س82. لماذا `strictNullChecks` و`unknown` مهمان عند API boundary؟

**الإجابة بالعربي:** TypeScript لا يتحقق من JSON وقت التشغيل. أستقبل البيانات الخارجية كـ`unknown` أو type غير موثوق، ثم أتحقق من shape قبل استخدامها. `strictNullChecks` يجبرني أتعامل مع `null`/`undefined` بدل crash لاحق. `as User` لا يفعل validation؛ هو assertion للمترجم فقط. أميز أيضًا بين optional property `x?: T` وقيمة `T | undefined` حسب العقد.

**Interview question (EN):** Why are TypeScript assertions insufficient for API responses?

**Answer (EN):** TypeScript types disappear at runtime. An assertion does not validate JSON. I validate untrusted data at the boundary and use `unknown` until it is narrowed. Strict null checks force explicit handling of missing values, which prevents many runtime failures.

### س83. تستخدم `Partial`, `Pick`, `Omit`, و`Record` إمتى؟

**الإجابة بالعربي:** `Pick<User, 'id' | 'name'>` يحدد subset، و`Omit` يحذف حقولًا من contract، و`Partial` يجعل properties اختيارية، و`Record<Key, Value>` يصف mapping بمفاتيح معلومة. مثال: update DTO قد يكون `Partial<Pick<User, 'name' | 'phone'>>`، لكن يجب منع تحديث `id` على السيرفر كذلك. لا أفرط في تركيب utility types لحد ما العقد يصبح صعب القراءة.

**Interview question (EN):** Give practical uses for common TypeScript utility types.

**Answer (EN):** `Pick` selects fields, `Omit` removes fields, `Partial` makes fields optional, and `Record` models a key-to-value map. They help derive DTO shapes consistently, but I keep API contracts readable and still enforce field permissions on the server.

---

## 4. OOP وSOLID وDesign Patterns

### س17. اشرح أركان OOP باختصار وبدون مبالغة.

**الإجابة بالعربي:** **Encapsulation** إخفاء تفاصيل الحالة خلف API واضحة. **Abstraction** عرض ما يحتاجه المستهلك وإخفاء التنفيذ. **Inheritance** إعادة استخدام/تخصيص السلوك بعلاقة `is-a`، ولا تُستخدم لمجرد مشاركة بضعة أسطر. **Polymorphism** التعامل مع تطبيقات مختلفة عبر عقد مشترك. في Angular غالبًا composition وDI أوضح من inheritance ثقيلة.

**Interview question (EN):** Explain the four pillars of OOP and how they apply to Angular.

**Answer (EN):** Encapsulation controls access to state and behavior. Abstraction exposes a useful contract without exposing every implementation detail. Inheritance models a genuine is-a relationship, and polymorphism lets different implementations satisfy the same contract. In Angular, composition and dependency injection are often clearer than deep inheritance hierarchies.

### س18. اشرح SOLID بالإنجليزي مع مثال واحد واضح لكل مبدأ.

| Principle | إجابة قصيرة تصلح للمقابلة |
|---|---|
| **S — Single Responsibility** | “A class should have one reason to change. I keep HTTP access in a data service and UI rendering in a component.” |
| **O — Open/Closed** | “I extend behavior through a new strategy rather than editing a large conditional every time a payment method is added.” |
| **L — Liskov Substitution** | “An implementation must honor the contract expected by its callers; a subtype must not unexpectedly throw for a supported operation.” |
| **I — Interface Segregation** | “I prefer small focused contracts; a read-only view should not depend on write methods it never uses.” |
| **D — Dependency Inversion** | “High-level logic depends on an abstraction or injection token, while DI supplies the concrete implementation.” |

**ملحوظة:** لا تبيع كل مبدأ كقاعدة مطلقة؛ اشرح trade-off في مشروع حقيقي.

**الإجابة بالعربي:** المسؤولية الواحدة تعني سببًا واضحًا للتغيير، وOpen/Closed إضافة سلوك دون تعديل متكرر للكود المستقر، وLiskov احترام العقد عند استبدال implementation، وInterface Segregation عقودًا صغيرة، وDependency Inversion اعتماد المنطق الأعلى على abstraction تربطها DI بالتنفيذ.

**Interview question (EN):** Can you explain SOLID with practical Angular examples?

**Answer (EN):** Single Responsibility means a component renders the UI while a service owns data access. Open/Closed means I can add a new strategy without repeatedly changing a large conditional. Liskov Substitution means an implementation honors its contract. Interface Segregation keeps contracts focused. Dependency Inversion lets high-level logic depend on an abstraction, with Angular DI providing the concrete implementation. I apply these principles where they reduce change risk, not as rigid rules.

### س19. Design Patterns في Angular: تذكر إيه؟

**الإجابة بالعربي:** **Facade** تخفي تعقيد store/services خلف API مناسبة للـcomponent. **Observer** يظهر في Observable وsubscription. **Strategy** لاختيار سلوك متبدّل، مثل حساب سعر أو validation حسب نوع المستخدم. **Adapter** يحوّل API خارجي إلى نموذج التطبيق. DI وسيلة لتوصيل التطبيق المناسب للعقد. اذكر pattern فقط حين يحل مشكلة واضحة؛ كثرة الطبقات بلا حاجة تزيد التعقيد.

**Interview question (EN):** Which design patterns have you used in Angular?

**Answer (EN):** A Facade can expose a simple feature API over a store or several services. Observer appears in RxJS streams. Strategy lets me replace a business rule, and Adapter translates an external API model into my application model. I describe the problem and trade-off first, then name the pattern; I do not add abstraction just to use a pattern.

---

### س84. Composition vs inheritance في Angular: ماذا تختار ولماذا؟

**الإجابة بالعربي:** أفضّل composition لمعظم UI behaviors: component يستخدم service أو directive أو projected content بدل base component متضخم. Inheritance يفيد فقط لعقد مشترك حقيقي ومستقر، لكن lifecycle وDI وtemplate behavior قد تجعل التسلسل صعب الفهم. مثال: بدل `BaseListComponent` فيه فلترة وتصدير وصلاحيات، أفصل data source/service وdirectives صغيرة وأركب المطلوب.

**Interview question (EN):** When is composition preferable to inheritance in Angular?

**Answer (EN):** Composition lets a component combine focused services, directives, and content without inheriting a large base class. I reserve inheritance for a stable genuine is-a relationship. It reduces coupling and makes each behavior easier to test and replace.

### س85. طبّق Dependency Inversion وOpen/Closed بمثال payment UI.

**الإجابة بالعربي:** component لا يعتمد مباشرة على `StripeService`، بل على abstraction/token مثل `PAYMENT_GATEWAY` له `pay()`؛ الـprovider يختار implementation. إضافة gateway جديد تتم بإضافة implementation/provider بدل تعديل component في كل مرة. لكن لا أبني abstraction قبل وجود سبب أو اختلاف حقيقي؛ الهدف تقليل coupling وإتاحة الاختبار، وليس زيادة الملفات.

**Interview question (EN):** Show Dependency Inversion and Open/Closed in an Angular feature.

**Answer (EN):** A checkout component depends on a payment-gateway contract through an injection token, not a concrete provider. Different implementations can be supplied without rewriting the component. I introduce that abstraction when there is a real variation or testing need, rather than abstracting every service automatically.

### س86. Observer, Strategy, وFacade: أمثلة عملية لا مجرد تعريفات.

**الإجابة بالعربي:** Observer يظهر في Observable streams أو event subscriptions؛ المستهلكون يتفاعلون مع تغيّر المصدر. Strategy يبدّل خوارزمية حسب السياق، مثل pricing أو validation policy تُحقن كعقد. Facade يقدم API أصغر لfeature معقدة، مثل methods/selectors فوق NgRx، لكنه لا يجب أن يخفي كل تفاصيل الحالة أو يصبح service عملاق. أذكر trade-off والسبب قبل اسم الـpattern.

**Interview question (EN):** Where have you used Observer, Strategy, or Facade in Angular?

**Answer (EN):** Observable subscriptions are a form of Observer. A replaceable validation or pricing policy is Strategy. A feature facade can expose focused commands and view state over NgRx. I use each pattern to solve a concrete coupling or complexity problem and avoid adding a facade that merely forwards every store operation.

---

## 5. Data Structures وGit وHTTP

### س20. Array vs linked list، وإزاي تختار؟

**الإجابة بالعربي:** Array تتيح وصولًا مفهرسًا سريعًا عادةً `O(1)`، والبحث الخطي `O(n)`. الإدخال في وسطها يحتاج تحريك عناصر `O(n)`. Linked list يصل إدخال العقدة فيها إلى `O(1)` **إذا كان مرجع الموضع معروفًا**، لكن الوصول للعنصر رقم `k` يحتاج traversal `O(n)`، مع تكلفة ذاكرة للروابط. في JavaScript اليومية اختار array إلا إذا متطلبات فعلية تثبت غير ذلك.

**Interview question (EN):** Compare an array with a linked list.

**Answer (EN):** An array gives indexed access in O(1) but inserting in the middle generally shifts elements and costs O(n). A linked list can insert a node in O(1) if I already have the position, but finding an index takes O(n) and links cost extra memory. For ordinary JavaScript UI work, I start with an array unless requirements justify another structure.

### س21. اشرح Big O وtime/space complexity في مثال.

**الإجابة بالعربي:** Big O يصف كيف تنمو كلفة الخوارزمية مع حجم الإدخال؛ لا يقيس زمنًا ثابتًا بالميلي ثانية. حلقتان متداخلتان على `n` قد تكونان `O(n²)`، واستخدام `Set` إضافية لحفظ العناصر قد يخفّض زمن البحث مقابل `O(n)` مساحة. اسأل عن حجم البيانات وقيود الذاكرة قبل اختيار الحل.

**Interview question (EN):** What does Big O describe, and how do time and space trade off?

**Answer (EN):** Big O describes how resource use grows as input size grows, not an exact runtime in milliseconds. Nested loops over n items can be O(n squared). Adding a Set may reduce repeated lookups at the cost of O(n) extra space. I choose based on expected input size and constraints, then measure when performance matters.

### س22. HTTP: تفرق بين 401 و403 و500؟ وإيه دور caching؟

**الإجابة بالعربي:** `401` يعني أن طلب الوصول يحتاج اعتمادًا صالحًا، `403` يعني أن الوصول مرفوض حتى بعد فهم الطلب، و`500` خطأ من السيرفر. تعامل مع retry بحذر، خاصة في العمليات غير idempotent. التخزين المؤقت يحسن السرعة لكنه يحتاج سياسة freshness/invalidation مناسبة؛ لا تخزن بيانات حساسة بلا تصميم واضح.

**Interview question (EN):** What do HTTP 401, 403, and 500 mean, and how does caching affect a frontend?

**Answer (EN):** A 401 response means valid authentication is required, a 403 means access is forbidden, and a 500 indicates a server-side failure. I handle retries carefully, especially for non-idempotent writes. Caching can improve latency, but it needs a clear freshness and invalidation policy and careful treatment of sensitive data.

### س23. إيه Git workflow تقول عليه في المقابلة؟

**الإجابة بالعربي:** branch صغيرة مرتبطة بتغيير واحد، commits مفهومة، مراجعة diff، اختبارات قبل PR، ثم حل التعارضات بفهم التغييرات لا بمجرد اختيار طرف كامل. أعرف الفرق بين `merge` و`rebase` ومتى يُفضَّل كل واحد حسب سياسة الفريق. في deployment راجع build environment، config، smoke test، وطريقة rollback.

**Interview question (EN):** Describe your Git and deployment workflow.

**Answer (EN):** I keep changes small, review the diff, write clear commits, run relevant checks, and open a reviewable pull request. I resolve conflicts by understanding both changes rather than choosing one side blindly. For deployment, I check configuration and build output, run a smoke test, and know how to roll back if a release fails.

---

### س87. تختار `Array`, `Map`, أو `Set` للبحث وإزالة التكرار إزاي؟

**الإجابة بالعربي:** `Array` للترتيب والتكرار والفهرسة، لكن البحث عن عنصر غالبًا O(n). `Map` مناسب lookup بمفتاح، و`Set` لعضوية قيم فريدة؛ عمليات lookup/add متوسطة الأداء تقارب O(1)، لا ضمان مطلق لكل حالة. لو بيانات API كثيرة وتحتاج lookup متكرر، أبني index واحدًا بدل `find` داخل loop تتحول إلى O(n²). أقيس حجم البيانات الحقيقي قبل التعقيد.

**Interview question (EN):** How do you choose among Array, Map, and Set in a frontend feature?

**Answer (EN):** Arrays preserve order and support iteration, but repeated linear lookups can be costly. Maps index values by key; Sets model unique membership. For repeated lookups over a large collection, I build an index once instead of nesting `find` calls. Average complexity guides the choice, then I measure the actual workload.

### س88. HTTP methods وidempotency وcaching: ما الذي يهم الـfrontend؟

**الإجابة بالعربي:** `GET` للقراءة ويفترض أن يكون safe وقابلًا للكاش حسب headers؛ `POST` لإنشاء/تنفيذ عملية غالبًا غير idempotent؛ `PUT` يستبدل resource و`DELETE` غالبًا idempotent من حيث الحالة النهائية، و`PATCH` لتعديل جزئي وقد يكون idempotent حسب العملية. لا أعيد محاولة mutation عشوائيًا، خصوصًا الدفع أو إنشاء الطلب، إلا مع idempotency key أو عقد backend واضح. أفهم `Cache-Control`, `ETag` و`304` عند تشخيص stale data.

**Interview question (EN):** Why does HTTP idempotency matter when retrying requests?

**Answer (EN):** A retry must not accidentally create duplicate side effects. GET is safe by intent; PUT and DELETE are idempotent in their intended semantics, while POST usually is not. PATCH depends on its operation. For mutations such as payment, I require a backend idempotency strategy before automatic retries and inspect cache headers when reads appear stale.

### س89. CORS وpreflight: هل إصلاحها في Angular؟

**الإجابة بالعربي:** CORS سياسة متصفح يحددها **رد السيرفر**. طلب cross-origin غير simple قد يسبقه `OPTIONS` preflight يسأل عن method/headers المسموحة. `mode: 'no-cors'` لا يمنحني response قابلة للقراءة، وAngular interceptor لا يضيف صلاحية CORS. الحل في إعدادات backend أو reverse proxy الموثوق، مع `Access-Control-Allow-Origin` مضبوط؛ وعند credentials لا تستخدم wildcard. في dev قد أستخدم proxy محلي فقط لتسهيل التطوير.

**Interview question (EN):** How do you diagnose a CORS error and preflight failure?

**Answer (EN):** I inspect the browser Network panel for the OPTIONS preflight and response headers. The server must allow the requesting origin, method, and headers; a frontend interceptor cannot grant that permission. I avoid broad wildcard rules for credentialed requests and use a development proxy only as a local convenience.

---

## 6. Angular core وDI

### س24-أ. مكوّن Angular حديث بيتكوّن من إيه، وإزاي تمرّر بيانات؟

**الإجابة بالعربي:** Component تجمع class وtemplate وstyles وmetadata. مرّر البيانات من الأب للابن عبر inputs، والأحداث بالعكس عبر outputs؛ استخدم service عندما تكون المشاركة عبر أجزاء أوسع أو تمثل business state. Standalone components تسمح بتحديد dependencies مباشرة في `imports`، بينما تطبيقات أقدم قد تستخدم NgModules. افهم الاثنين لأنك قد تعمل على codebase قديمة وحديثة. لا تختبئ وراء service لتفادي data flow بسيط بين أب وابنه.

**Interview question (EN):** What makes up an Angular component, and how should components communicate?

**Answer (EN):** An Angular component combines a class, template, styles, and metadata. I use inputs for parent-to-child data and outputs for child-to-parent events; a service is appropriate for broader shared state or business behavior. Standalone components declare dependencies in imports, while older applications may still use NgModules. I keep simple parent-child communication explicit.

### س24. Component lifecycle وchange detection: ماذا تشرح؟

**الإجابة بالعربي:** component تُنشأ، تستقبل inputs، تُفحص/تُعرض، ثم تُدمّر. اختر hook حسب سبب العمل: إعداد يعتمد على inputs، أو تعامل مع view بعد إنشائها، أو cleanup عند التدمير. Change detection تربط state بالـtemplate؛ لا تضع عمليات مكلفة أو side effects غير محسوبة في تعبيرات template تتكرر. `OnPush` يقلل نطاق الفحص في تطبيقات مناسبة، وSignals المقروءة في template تُبلغ Angular بالتغير. راجع سلوك النسخة المستخدمة في المشروع بدل تعميم تفاصيل قد تختلف. [Angular lifecycle](https://angular.dev/guide/components/lifecycle) · [Angular performance](https://angular.dev/best-practices/performance)

**Interview question (EN):** How do component lifecycle and change detection work?

**Answer (EN):** A component is created, receives inputs, renders and gets checked, and is eventually destroyed. I choose lifecycle hooks according to when work is valid and clean up resources when the instance ends. Change detection keeps the template in sync with state. I avoid expensive work in frequently evaluated template expressions and use OnPush or signals when their update model fits the application.

### س25. DI scopes وعلاقتها بالـmemory leaks؟

**الإجابة بالعربي:** `providedIn: 'root'` يتيح instance مشتركة طوال عمر التطبيق. Provider على component يعطي instance مرتبطة بتلك الشجرة؛ ويمكن توفير dependencies على route أيضًا. الـscope يحدد **عمر ومشاركة الـinstance**، وليس leak تلقائيًا. الخطر أن service طويلة العمر تحتفظ بـsubscription أو callback أو cache أو reference إلى component/DOM لم تعد لازمة. أعالج السبب: cleanup، إلغاء listeners والاشتراكات، وتحديد سياسة cache. مثال: component تشترك في stream طويلة العمر بـ`takeUntilDestroyed`، أو تعرض stream بـ`async` pipe. [Angular DI](https://angular.dev/guide/di/defining-dependency-providers) · [takeUntilDestroyed](https://angular.dev/ecosystem/rxjs-interop/take-until-destroyed)

```ts
private readonly destroyRef = inject(DestroyRef);

ngOnInit() {
  this.notifications$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(message => this.show(message));
}
```

**Interview question (EN):** How do Angular DI scopes relate to memory leaks?

**Answer (EN):** A root-provided service is shared for the application lifetime, whereas a component-provided instance is scoped to that component tree; routes can have providers too. Scope affects lifetime and sharing, but does not cause a leak by itself. I look for long-lived subscriptions, listeners, caches, or references that retain components or DOM nodes. I use cleanup mechanisms such as the async pipe or takeUntilDestroyed where appropriate.

### س26. Service على root أم component أم route؟

**الإجابة بالعربي:** Root لما البيانات/السلوك مشتركان فعلًا عبر التطبيق. Component لما أحتاج instance معزولة لكل نسخة من widget أو feature قصيرة العمر. Route لما التبعية تخص feature في جزء معين من التنقل. أراجع مشاركة الحالة المتوقعة؛ provider في component قد ينشئ نسخًا متعددة بالخطأ إذا كنا نريد state موحدة. [Angular DI](https://angular.dev/guide/di/defining-dependency-providers) · [Route providers](https://angular.dev/guide/routing/define-routes)

**Interview question (EN):** When would you provide a service at root, component, or route level?

**Answer (EN):** I use root for genuinely application-wide behavior, a component provider for isolated per-instance state, and a route provider for a feature-specific dependency. The key question is which consumers must share the same instance and for how long. Providing a supposed singleton on every component can accidentally create multiple independent stores.

### س27. إمتى تستخدم directive أو pipe أو component؟

**الإجابة بالعربي:** Component لو عندي UI مستقل بtemplate. Directive لتغيير سلوك/مظهر عنصر موجود. Pipe لتحويل قيمة للعرض بشكل واضح، مع الانتباه إلى purity والكلفة. لا أضع business logic ثقيل في template أو pipe لمجرد اختصار الكود.

**Interview question (EN):** When would you create a component, directive, or pipe?

**Answer (EN):** I use a component for a reusable piece of UI with its own template, a directive to add behavior to an existing element, and a pipe for a clear display transformation. I avoid placing heavy business logic in template expressions or pipes simply to shorten component code.

---

### س90. ماذا يحدث فعليًا مع `OnPush`؟ ومتى لا يكفي وحده؟

**الإجابة بالعربي:** `OnPush` يقلل فحص subtree عندما لا توجد إشارة تستدعيه؛ Angular يراجعها مع تغير input reference، أحداث داخل subtree، async pipe/signals التي تبلغ عن تغير، أو طلب mark صريح حسب السياق. لو عدلت object input in-place قد لا يتغير reference فتظهر UI قديمة؛ تحديث immutable أو signal صحيح أوضح. `OnPush` لا يعالج request بطيئًا أو DOM ثقيلًا أو selector يعيد حسابًا مكلفًا؛ أقيس قبل اختياره كحل.

**Interview question (EN):** What does Angular OnPush change detection do, and what can still go wrong?

**Answer (EN):** OnPush lets Angular skip a component subtree until it is notified through inputs, events, reactive reads, or explicit marking. In-place mutation of an input object may not provide a new reference. It is useful for predictable rendering, but it does not fix slow networking, excessive DOM, or expensive computation by itself.

### س91. `providedIn: 'root'` vs component provider vs route provider في مثال memory.

**الإجابة بالعربي:** root service يعيش عادة طوال عمر التطبيق، فلو احتفظ بـsubscription أو cache أو reference لمكون قديم ستظل البيانات محتجزة. component provider يعطي instance لكل subtree ويُدمّر مع المكون؛ route provider يربطها بـroute injector، لكن مدة حياته تتأثر بإدارة الـroute/reuse ولا أعتمد على افتراض ساذج. scope يحدد عمر الـservice، لكن leak يحصل بسبب references وsubscriptions غير المنظفة. استخدم `DestroyRef`, `takeUntilDestroyed`, async pipe، وحدود cache واضحة.

**Interview question (EN):** How can DI scope influence memory retention without being a leak by itself?

**Answer (EN):** A root service can live for the whole application, so subscriptions or references it stores may retain old views or data. A component-scoped provider follows that component's injector lifetime, and a route provider follows its route environment injector lifecycle. The actual leak is an unwanted retained reference or side effect; I manage teardown and cache lifetime explicitly.

### س92. `ngOnInit`, `ngAfterViewInit`, `ngOnDestroy`, و`DestroyRef`: متى تستخدمهم؟

**الإجابة بالعربي:** `ngOnInit` لتهيئة تعتمد على inputs بعد ضبطها أول مرة؛ `ngAfterViewInit` عندما أحتاج view/query جاهزة، لا لوضع كل API calls تلقائيًا؛ `ngOnDestroy` لتنظيف موارد أنشأها المكون. `DestroyRef.onDestroy` أو `takeUntilDestroyed` يربط cleanup بعمر injection context. أفضّل declarative template/async pipe حيث يمكن، ولا أنشئ subscription يدوية لمجرد نقل قيمة إلى متغير.

**Interview question (EN):** Where do you initialize view-dependent work and clean up subscriptions?

**Answer (EN):** I use `ngOnInit` for initialization after initial inputs, `ngAfterViewInit` only when the rendered view or queries are needed, and destruction hooks for owned resources. `DestroyRef` and `takeUntilDestroyed` make teardown follow the relevant injection context. I prefer template bindings and async pipe for simple streams.

### س93. Standalone components وlazy routes: ما أثرهم على architecture والـbundle؟

**الإجابة بالعربي:** Standalone component يعلن imports التي يحتاجها مباشرة، ويسهل تنظيم features دون NgModule لمجرد التجميع. `loadComponent`/`loadChildren` يؤخران تحميل route code حتى الحاجة، لكن مقدار التوفير يعتمد على dependency graph وshared chunks. أراجع bundle analyzer وroute network waterfall، وأنتبه إلى أن provider في route أو root يغير lifetime/instance sharing، وليس مجرد مكان import.

**Interview question (EN):** Why use standalone components and lazy routes in a large Angular app?

**Answer (EN):** Standalone declarations make dependencies explicit, while lazy route loading can defer feature code until navigation. The real bundle effect depends on shared dependencies and chunking, so I inspect generated bundles. Provider placement also affects instance scope and state lifetime, not just code organization.

### س94. Component communication: Inputs/Outputs، service، أو store؟

**الإجابة بالعربي:** parent-child القريب: inputs وoutputs أو model binding حسب واجهة المكون؛ siblings داخل feature: service scoped للـfeature قد تكفي؛ state مشتركة بين routes أو تحتاج tracing/effects: store أو facade مدروس. لا أستخدم global NgRx لفتح dropdown، ولا event bus عامة تخفي مصدر التغيير. أفصل server state عن UI state وأحدد صاحب البيانات وعمرها قبل اختيار الآلية.

**Interview question (EN):** How do you choose a communication mechanism between Angular components?

**Answer (EN):** I use explicit inputs and outputs for local parent-child interaction, a scoped service for feature-level collaboration, and a store when state is shared broadly or needs coordinated effects and traceability. I first identify ownership, lifetime, and whether the state is server data or local UI state.

---

## 7. Routing وForms وHTTP وAuthentication

### س28. `canMatch` مقابل resolver؛ ما دور كل منهما؟

**الإجابة بالعربي:** Guard يقرر مطابقة/الدخول لمسار بحسب سياسة التنقل؛ `canMatch` مفيد عند اختيار route من عدة routes أو منع مطابقتها. Resolver يجلب بيانات يحتاجها المسار **قبل** عرضه، لكنه قد يؤخر التنقل؛ استخدمه حين يمنع صفحة بلا بيانات أساسية، وإلا فحالة loading داخل الصفحة قد تكون UX أفضل. Guards على العميل ليست حماية صلاحيات كافية؛ السيرفر يفرض authorization. [Angular guards](https://angular.dev/guide/routing/route-guards) · [Resolvers](https://angular.dev/guide/routing/data-resolvers)

**Interview question (EN):** How are canMatch and a route resolver different?

**Answer (EN):** A guard controls whether a route can be matched or entered; canMatch is useful when route matching itself is conditional. A resolver fetches required data before the route renders, which can remove an empty initial state but may delay navigation. Client-side guards are a UX mechanism, not a substitute for server-side authorization.

### س29. تصميم Reactive Form كبيرة؟

**الإجابة بالعربي:** أقسمها إلى مجموعات/مكونات واضحة، أعرّف validation متزامنة وغير متزامنة عند الحاجة، وأفصل server errors عن أخطاء الإدخال. أتحكم في حقول مشروطة وحالات disabled بدقة، وأختبر سيناريوهات valid/invalid والـsubmit. `FormArray` مناسبة لعناصر ديناميكية. لا أربط كل keystroke بطلب API؛ أستخدم debounce/cancellation حسب الحالة. [Angular Forms](https://angular.dev/guide/forms)

**Interview question (EN):** How would you design a large reactive form?

**Answer (EN):** I split it into coherent groups, define synchronous and asynchronous validation deliberately, and model dynamic rows with FormArray when appropriate. I keep server errors distinct from local validation and test valid, invalid, and submission states. For API checks triggered by typing, I debounce and cancel stale requests according to the product behavior.

### س30. لماذا HttpInterceptor؟

**الإجابة بالعربي:** للسلوك المشترك عبر الطلبات: token، logging، retry policy، caching أو error normalization. لا أجعل interceptor واحدًا يتحكم بكل منطق التطبيق. أتعامل مع `HttpRequest` بشكل immutable عبر `clone` عند تعديل headers. Angular تدعم functional interceptors، وترتيب السلسلة يؤثر في السلوك. [Angular interceptors](https://angular.dev/guide/http/interceptors)

**Interview question (EN):** Why would you use an Angular HTTP interceptor?

**Answer (EN):** An interceptor centralizes behavior that applies across requests, such as authentication headers, logging, caching, or a consistent error policy. I keep feature-specific business logic outside the interceptor. When changing a request, I clone it because request objects are immutable, and I pay attention to interceptor ordering.

### س31. Authentication vs Authorization؟

**الإجابة بالعربي:** Authentication تثبت هوية المستخدم، Authorization تحدد ما يحق له فعله. Angular guard قد يحسّن تجربة التنقل، لكن API يجب أن تتحقق من الصلاحية في كل عملية محمية. ناقش token expiry وتجديده وتعدد الطلبات عند التجديد، وتجنب عرض أسرار في الـclient. [Angular route guards](https://angular.dev/guide/routing/route-guards)

**Interview question (EN):** What is the difference between authentication and authorization?

**Answer (EN):** Authentication establishes who the user is; authorization determines what that user may do. A frontend guard can improve navigation and presentation, but the backend must enforce permission checks on protected operations. I also plan for token expiry and concurrent requests during token refresh.

---

### س95. Route guard يحمّي البيانات؟ اشرح `canMatch` وauthorization الصحيح.

**الإجابة بالعربي:** guard يحسن navigation UX ويمنع تفعيل route غير مسموحة في العميل، لكن كود العميل قابل للتعديل ولا يحمي API. السيرفر يتحقق من authentication وauthorization **لكل request**. `canMatch` يحدد هل route match أصلاً، وقد يسمح بتجربة route بديلة؛ `canActivate` يقرر بعد المطابقة. أستخدم redirect/UrlTree بدل side effect navigation عند الإمكان، وأتعامل مع session expiry و403 بوضوح.

**Interview question (EN):** Can an Angular route guard enforce authorization?

**Answer (EN):** A guard controls client-side navigation, not server security. The backend must authorize every protected request. `canMatch` affects route matching and can permit an alternative route; `canActivate` checks activation after matching. I return a redirect result where appropriate and handle expired sessions and 403 responses coherently.

### س96. Dynamic Reactive Form: كيف تدير validation وasync validation؟

**الإجابة بالعربي:** أبني `FormGroup`/`FormArray` حسب schema واضحة، وأستخدم `Validators` للقيود المحلية وasync validator لشرط يعتمد على server مثل username availability. أتحكم في إظهار الأخطاء بعد touched/submit، وأتعامل مع pending state وrace/cancellation. لا أكرر business rules في الـUI دون عقد server، والتحقق النهائي عند submit على backend. لو form كبيرة، أفصل الأقسام إلى components دون فقدان علاقة controls بالـparent form.

**Interview question (EN):** How would you structure a large dynamic reactive form?

**Answer (EN):** I model repeated fields with `FormArray`, keep validation rules close to the form model, and use async validators only for server-dependent checks. I show errors at useful times, account for pending and stale responses, and rely on backend validation as the final authority. I split the UI into focused components while keeping the form contract clear.

### س97. Interceptor فيه retry أو refresh token: ما الـrace conditions؟

**الإجابة بالعربي:** لو عدة requests رجعت 401 معًا، لا أرسل refresh لكل واحدة؛ أشارك refresh واحدًا وأعيد الطلبات بعد نجاحه. أمنع refresh loop عندما refresh نفسه يفشل، وأخرج المستخدم/أنظف session بصورة منضبطة. retry للـGET الشبكي قد يكون مناسبًا مع backoff، لكن لا أعيد POST حساسًا بلا idempotency contract. أستخدم interceptor للسياسة المشتركة فقط، وليس لإخفاء أخطاء feature عن المستخدم.

**Interview question (EN):** How do you avoid duplicate refresh calls and unsafe retries in an interceptor?

**Answer (EN):** I coordinate concurrent 401 responses around one refresh operation, replay requests after success, and stop retry loops if refresh fails. I retry only requests whose semantics and backend contract permit it, with bounded backoff. A generic interceptor should not silently hide feature-specific errors.

---

## 8. RxJS — الجزء الأكثر ارتباطًا بسيناريوهات Angular

### س32. Cold vs hot Observable؟

**الإجابة بالعربي:** في cold stream كل subscriber يبدأ مصدرًا مستقلًا غالبًا؛ مثال `HttpClient` request عند الاشتراك. في hot stream المصدر مشترك ويواصل الإصدار مستقلًا عن اشتراك جديد؛ مثال أحداث المستخدم أو Subject. لا تعتمد على الاسم فقط: افحص سلوك المصدر و`share/shareReplay` وسياسة إعادة الاشتراك والـcache.

**Interview question (EN):** What is the difference between cold and hot Observables?

**Answer (EN):** A cold Observable typically starts independent work for each subscriber; an HTTP request is a common example. A hot source is shared and can emit regardless of a new subscriber, as with many event streams or Subjects. I inspect the actual source and any sharing operators because subscription and caching behavior determine the result.

### س33. الفرق بين الـflattening operators الأربعة؟

| Operator | ماذا يفعل مع قيمة جديدة والطلب السابق مستمر؟ | مثال مناسب |
|---|---|
| `switchMap` | يلغي الاشتراك في السابق ويتابع الأحدث | بحث مباشر؛ نتيجة أحدث كلمة فقط |
| `mergeMap` | يشغّلها بالتوازي | عمليات مستقلة؛ مع الانتباه للتوازي والترتيب |
| `concatMap` | يضعها في طابور ويحافظ على ترتيب التنفيذ | عمليات يجب أن تصل بالترتيب |
| `exhaustMap` | يتجاهل الجديدة حتى تنتهي الحالية | منع تكرار submit أثناء الطلب |

**جواب Senior:** أختار وفق **سياسة التزامن المطلوبة**: أحدث فقط، الكل بالتوازي، الكل بالترتيب، أو الأول حتى يكتمل. في عمليات حفظ مهمة لا أستخدم `switchMap` لمجرد أنه شائع؛ إلغاء السابق قد يسقط عملية مطلوبة. [RxJS higher-order Observables](https://rxjs.dev/guide/higher-order-observables)

**Interview question (EN):** How do switchMap, mergeMap, concatMap, and exhaustMap differ?

**Answer (EN):** SwitchMap keeps the newest inner subscription, so it suits live search. MergeMap runs inner work concurrently when operations are independent. ConcatMap queues work and preserves order. ExhaustMap ignores new values until the current inner work completes, which can prevent duplicate submits. I choose based on the required concurrency policy, especially whether a previous write may be canceled.

### س34. كيف تمنع memory leaks من RxJS؟

**الإجابة بالعربي:** حدّد أولًا عمر الـsource والـsubscription. `HttpClient` request المفردة تنتهي عادةً بعد الاستجابة؛ stream أحداث أو interval قد تستمر. استخدم `async` pipe، `takeUntilDestroyed`، أو cleanup مناسب. راجع `shareReplay` وSubjects وcallbacks في root services، وراقب Heap snapshots أو عدد الاشتراكات عند فتح الصفحة وإغلاقها مرارًا. إزالة كل subscribe يدويًا ليست هدفًا بذاته؛ الهدف دورة حياة صحيحة. [Angular RxJS interop](https://angular.dev/ecosystem/rxjs-interop/take-until-destroyed)

**Interview question (EN):** How do you prevent RxJS memory leaks?

**Answer (EN):** I first identify whether the source completes by itself or can continue indefinitely. I use the async pipe, takeUntilDestroyed, or explicit cleanup for long-lived subscriptions and listeners. I also inspect shared streams, Subjects, caches, and root services, then verify the fix with repeated navigation and memory or subscription measurements.

---

### س98. `Subject`, `BehaviorSubject`, و`ReplaySubject`: ما الفرق في late subscriber؟

**الإجابة بالعربي:** `Subject` يبث القيم الجديدة فقط لمن اشترك وقت البث. `BehaviorSubject` يحتاج initial value ويعطي آخر قيمة فور الاشتراك. `ReplaySubject(n)` يعيد آخر `n` قيم (وقد يخزنها حتى انتهاء عمره)، فانتبه للـbuffer والذاكرة. الاختيار حسب contract وليس التفضيل الشخصي؛ وفي Angular Signals/store قد يكون تمثيل state الحالي أوضح من Subject مكشوف للجميع.

**Interview question (EN):** What will a late subscriber receive from Subject, BehaviorSubject, and ReplaySubject?

**Answer (EN):** A plain Subject only emits future values. BehaviorSubject immediately supplies its current value and requires an initial value. ReplaySubject replays its configured buffer to late subscribers, which has a memory cost. I choose according to whether consumers need events, current state, or history.

### س99. `combineLatest`, `forkJoin`, و`zip`: أيهم لطلبات HTTP وأيهم live filters؟

**الإجابة بالعربي:** `combineLatest` يخرج بعد أول قيمة من كل source، ثم عند تغير أي واحد؛ مناسب لfilters حية، لكنه لن يخرج لو source لم يبث. `forkJoin` ينتظر completion من الجميع ويعطي آخر قيمة لكل واحد؛ مناسب لطلبات HTTP أحادية القيمة، لكنه لا يخرج مع source لا ينتهي. `zip` يزاوج القيمة رقم 1 مع رقم 1 وهكذا؛ مفيد عندما تتوافق emissions بالترتيب. أقرر أيضًا كيف أعرض partial errors/loading.

**Interview question (EN):** When do you use combineLatest, forkJoin, and zip?

**Answer (EN):** `combineLatest` reacts whenever any source updates after all have emitted once. `forkJoin` waits for all sources to complete and returns their latest values, which suits one-shot HTTP calls but not never-ending streams. `zip` pairs emissions by position. I choose based on emission and completion behavior, not just output shape.

### س100. ليه `shareReplay(1)` ممكن يعمل memory leak أو stale data؟

**الإجابة بالعربي:** `shareReplay` يشارك subscription ويخزن آخر emission. لو source طويل العمر وobservable مشتركة محفوظة في root service، قد يستمر الاشتراك/الـcache أطول من المطلوب، خاصة مع إعدادات لا تفصل عند صفر subscribers. أحدد lifetime وسياسة invalidation، وأفكر في `shareReplay({ bufferSize: 1, refCount: true })` حين يناسب، لكن `refCount` قد يعيد التنفيذ عند اشتراك جديد. HTTP finite غالبًا مختلف عن live stream لا ينتهي. لا أستعمله كوصفة ثابتة.

**Interview question (EN):** What are the trade-offs of shareReplay in an Angular service?

**Answer (EN):** It can avoid duplicate work and replay the latest value, but the cached value and source subscription may outlive the view that needed them. I decide whether the source completes, when it should disconnect, and how data is invalidated. `refCount` can release a live source when unused, but may trigger a new execution later.

### س101. `catchError` داخل أم خارج `switchMap`؟ وماذا يحدث للـstream؟

**الإجابة بالعربي:** لو `catchError` داخل inner HTTP observable، أتعامل مع فشل request واحد وأبقي outer search stream حيًا ليستقبل كتابة جديدة. لو وضعته بعد `switchMap` وأرجعت fallback observable ينتهي، قد تنتهي سلسلة البحث كلها بعد أول خطأ. أضع error boundary في مستوى الاستمرار المطلوب، وأعرض error state للمستخدم؛ لا أبتلع الخطأ بصمت.

**Interview question (EN):** Why does catchError placement matter in a search stream?

**Answer (EN):** Catching inside the switched inner request lets one failed request recover while the outer input stream continues. Catching after `switchMap` handles failure at the outer chain and may terminate future search handling if the recovery stream completes. I place the boundary according to the intended lifetime and surface errors in the UI.

---

## 9. Signals وNgRx

### س35. `signal` و`computed` و`effect`: إمتى كل واحدة؟

**الإجابة بالعربي:** `signal` حالة قابلة للتغيير؛ `computed` قيمة مشتقة تُحسب من dependencies وتُقرأ synchronously؛ `effect` يربط التغير بسلوك خارجي لا يناسب الاشتقاق المباشر. لا أضع تعديل state مشتق داخل effect إن أمكن التعبير عنه بـ`computed`؛ ده يقلل الدورات والتعقيد. Signals يمكن وصلها بـRxJS عند التعامل مع streams وطلبات غير متزامنة. [Angular Signals](https://angular.dev/guide/signals)

**Interview question (EN):** When do you use signal, computed, and effect?

**Answer (EN):** A signal stores writable reactive state. Computed derives a read-only value from other signals, and effect is for synchronizing changes with an external or non-reactive side effect. I prefer computed for derivation instead of using an effect to copy derived state. I connect signals with RxJS when I need asynchronous streams.

### س36. NgRx vs Angular Signals؟

**الإجابة بالعربي:** ليست مقارنة «واحد يلغي الثاني». Signals أداة تفاعلية ممتازة للـlocal/feature state والاشتقاق داخل Angular. NgRx Store يفيد حين توجد state مشتركة ومعقدة، transitions موحدة، effects واضحة، وإمكانية تتبّع الأحداث واختبارها. أبدأ بأبسط مستوى يفي بالمتطلبات؛ إذا زاد عدد المستهلكين والـside effects والتزامن، أقيّم Store. يمكن عرض بيانات NgRx داخل واجهة تستخدم Signals. القرار يتبع **نطاق الحالة وتعقيد تدفقها** لا حجم المشروع بالاسم. [Angular Signals](https://angular.dev/guide/signals) · [NgRx Store](https://ngrx.io/guide/store/why)

**Interview question (EN):** When would you use NgRx instead of Angular Signals?

**Answer (EN):** I do not treat them as mutually exclusive. Signals are a good fit for local or feature-level reactive state and derived values. NgRx Store becomes useful when shared state has many transitions, effects, and consumers and we benefit from explicit actions, predictable updates, and debugging tools. I choose based on state scope and complexity, and I can use signals in a UI backed by NgRx.

### س37. NgRx performance والمشاكل الشائعة؟

**الإجابة بالعربي:** استخدم selectors نقية ومركبة ومحددة، وتجنب اختيار object كبير لكل component بلا حاجة. Memoization تساعد عندما تبقى inputs كما هي؛ إذا صنعت مراجع جديدة بلا داعٍ تفقد الفائدة. تعامل مع state بشكل immutable، ولا تضع فيها بيانات مشتقة يمكن حسابها. افحص effects التي تعيد dispatch بلا توقف، subscriptions طويلة العمر، وcache تكبر دون حد. قِس render count وselector recomputation قبل التعديل. [NgRx selectors](https://ngrx.io/guide/store/selectors) · [NgRx Store](https://ngrx.io/guide/store/why)

**سؤال متابعة:** أين تضع API call؟ في Effect أو طبقة service يتعامل معها Effect، لا في reducer؛ reducer يحسب state الجديدة دون side effects. اختيار `switchMap/concatMap/mergeMap/exhaustMap` داخل Effect يظل قرارًا عن سياسة التزامن، لا وصفة ثابتة لكل action.

**Interview question (EN):** How would you optimize NgRx and avoid state-related leaks?

**Answer (EN):** I select only the data each view needs, use pure memoized selectors, and avoid creating new object references unnecessarily. I keep reducers pure and immutable, and put asynchronous work in effects or services used by effects. I inspect effect loops, long-lived subscriptions, and unbounded caches. I measure selector recomputation and renders before claiming an optimization.

### س38. Facade فوق NgRx: دائمًا جيدة؟

**الإجابة بالعربي:** مفيدة حين تقدم API مستقرة للـfeature وتخفي تفاصيل actions/selectors عن الـUI، أو تسهّل تغيير التنفيذ والاختبار. تصبح عبئًا إذا كانت مجرد wrappers واحد لواحد بلا منطق أو تبسيط. أقرر وفق تعقيد feature وحجم الفريق.

**Interview question (EN):** Is a Facade over NgRx always a good idea?

**Answer (EN):** No. A Facade is useful if it gives a feature a stable, simpler API and hides meaningful store or service complexity. If it merely mirrors every action and selector one-to-one, it adds a layer without reducing coupling. I evaluate it against the feature complexity and team needs.

---

### س102. متى تكفي Signals، ومتى يصبح NgRx مفيدًا؟

**الإجابة بالعربي:** Signal ممتازة لstate متزامنة محلية وderived values بـ`computed`. NgRx يفيد عندما state مشتركة واسعة، updates/events كثيرة، effects معقدة، وتحتاج أدوات tracing واتفاقًا واضحًا على التغييرات. ممكن يستخدم التطبيق الاثنين: NgRx للـfeature/global state وSignals للـlocal UI أو selectors عبر interop. لا أنقل كل state إلى store، ولا أستخدم `effect` لتقليد reducer من غير داعٍ.

**Interview question (EN):** How do you decide between Angular Signals and NgRx?

**Answer (EN):** Signals are strong for local synchronous state and derived values. NgRx adds structured events, reducers, effects, selectors, and tooling when state and side effects span features. They can coexist; I decide based on ownership, lifetime, coordination complexity, and debugging needs rather than treating one as a universal replacement.

### س103. لماذا selector memoization قد لا ينقذك من re-renders؟

**الإجابة بالعربي:** selector يعيد استخدام الناتج عندما inputs نفسها لم تتغير، لكن لو reducer يرجع references جديدة بلا تغير حقيقي أو selector factory تُنشأ داخل كل render، ستضيع الفائدة. أختار state normalized وselectors مركبة صغيرة، وأتجنب mapping ثقيل في template أو إنشاء arrays/objects جديدة كل مرة. أستخدم trackBy/`track` مناسبًا للقوائم، وأقيس component renders وselector recomputations قبل التعديل.

**Interview question (EN):** What can undermine NgRx selector memoization and UI performance?

**Answer (EN):** Memoization depends on stable input references and selector instances. Unnecessary immutable copies, newly created selector factories, and view mappings that allocate fresh objects can still cause work. I normalize state where useful, compose focused selectors, use stable list identity, and profile before optimizing.

### س104. Effect طويل العمر يسبب leak إزاي رغم إن NgRx يدير الاشتراك؟

**الإجابة بالعربي:** NgRx يدير subscription الخاصة بالـeffect، لكن inner streams أو manual subscriptions أو timers أنشأتها داخل service قد تستمر. `mergeMap` إلى stream لا ينتهي لكل action قد يراكم subscriptions، و`shareReplay`/cache في root قد تحتفظ ببيانات قديمة. أختار flattening operator حسب سياسة التزامن، وأربط stream بعمرها مثل `takeUntil` عند logout أو route leave، ولا أعمل `subscribe` داخل effect بلا سبب.

**Interview question (EN):** Can an NgRx effect still cause retained subscriptions or memory growth?

**Answer (EN):** Yes. NgRx owns the effect subscription, but an effect can start long-lived inner streams, timers, or manual subscriptions that accumulate. I choose the flattening policy deliberately, define cancellation and feature lifetime, and inspect caches and retained data when memory grows across navigation or logout.

---

## 10. Performance وSSR وSecurity وTesting

### س39. صفحة Angular بطيئة؛ ماذا تفعل قبل اقتراح `OnPush`؟

**الإجابة بالعربي:** أحدد نوع البطء: تحميل أولي، render متكرر، interaction بطيئة، network، أم صورة كبيرة. أستخدم DevTools/Lighthouse والـperformance profiler، أضع baseline، ثم أختبر تغييرًا واحدًا. حلول محتملة حسب السبب: lazy routes و`@defer`، تحسين الصور، تقليل حسابات template، `track` للقوائم، selectors مشتقة بكفاءة، أو ضبط change detection. LCP للتحميل المرئي، INP للاستجابة، CLS لثبات التخطيط. لا أصف optimization ناجحًا من غير قياس. [Angular performance](https://angular.dev/best-practices/performance) · [Core Web Vitals](https://web.dev/articles/vitals)

**Interview question (EN):** An Angular page is slow. What do you do before suggesting OnPush?

**Answer (EN):** I identify whether the bottleneck is initial loading, network, rendering, or interaction. I collect a baseline with browser and Angular profiling tools, then test one targeted change at a time. Depending on the cause, I may use lazy loading, image optimization, list tracking, cheaper template computation, better selectors, or change-detection adjustments. I validate the result with relevant metrics, not intuition.

### س40. SSR وhydration: فائدتهم ومخاطرهم؟

**الإجابة بالعربي:** SSR يولّد HTML مبدئيًا على السيرفر؛ hydration تربط الصفحة المعروضة بالـclient interactivity. مفيدان خصوصًا للصفحات العامة/المحتوى الذي يحتاج عرضًا أوليًا وSEO. التحديات: استخدام `window/document` على السيرفر، اختلاف HTML بين السيرفر والعميل، caching بيانات خاصة بمستخدم، وتكلفة الخادم. القرار حسب نوع الصفحات والقياسات؛ ليس كل dashboard داخلي يحتاج SSR. [Angular hydration](https://angular.dev/guide/hydration) · [Angular performance](https://angular.dev/best-practices/performance)

**Interview question (EN):** What do SSR and hydration provide, and what can go wrong?

**Answer (EN):** SSR generates initial HTML on the server, and hydration attaches client interactivity to that HTML. They can help public, content-heavy pages with initial display and indexing. I watch for browser-only APIs on the server, server-client HTML mismatches, private data in shared caches, and extra server cost. I choose them based on page requirements and measurements.

### س41. كيف تمنع XSS في Angular؟

**الإجابة بالعربي:** استخدم template binding الطبيعي بدل تركيب HTML من user input. Angular تتعامل مع القيم غير الموثوقة عبر escaping/sanitization بحسب السياق؛ تجاوز الحماية عبر trusted/bypass APIs يحتاج مراجعة شديدة لمصدر القيمة. اعزل HTML الغني، وفكر في CSP/Trusted Types حسب التطبيق. ولا تخلط بين XSS وحماية API: authorization على السيرفر. [Angular security](https://angular.dev/best-practices/security)

**Interview question (EN):** How do you prevent XSS in an Angular application?

**Answer (EN):** I use normal template bindings rather than constructing HTML from untrusted input. Angular escapes or sanitizes untrusted values according to their context, and bypassing those protections requires careful review. I consider CSP or Trusted Types where appropriate and ensure backend authorization independently of client-side guards.

### س42. تختبر إيه في Angular؟

**الإجابة بالعربي:** اختبر السلوك المهم، لا تفاصيل التنفيذ: service business rule، component interaction وDOM الناتج، validation، request/error handling، selector أو reducer أو effect له منطق. Mock عند حدود الشبكة أو الأنظمة الخارجية، ولا تكتب اختبارًا يكرر نفس implementation. TestBed وHTTP testing utilities تتيحان طلبات وهمية والتحقق من الاستجابة والخطأ. [Angular testing](https://angular.dev/guide/testing) · [HTTP testing](https://angular.dev/guide/http/testing)

**Interview question (EN):** What would you test in an Angular feature?

**Answer (EN):** I test important behavior rather than implementation details: business rules in services, user interactions and rendered output in components, form validation, and HTTP success and error paths. I mock external boundaries, not every internal call. TestBed and HTTP testing tools help me verify behavior without live network requests.

---

### س105. LCP وINP وCLS سيئين: تشخّص كل واحد إزاي؟

**الإجابة بالعربي:** LCP: أحدد العنصر الرئيسي ووقت اكتشافه/تحميله، server response، CSS/JS blocking، وأولوية الصورة. INP: أسجل interaction بطيء وأقسمه input delay، processing، وpresentation؛ أبحث عن long tasks وrender كثيف. CLS: أشاهد layout shifts ومصدرها، وأثبت أبعاد صور/إعلانات ومحتوى يُضاف قبل العنصر المرئي. أستخدم field data حين متاحة ومعها lab profiling، وأقيس قبل/بعد على نفس السيناريو.

**Interview question (EN):** How would you diagnose poor LCP, INP, and CLS rather than guessing fixes?

**Answer (EN):** For LCP I identify the candidate element and its discovery, fetch, and render delays. For INP I profile the slow interaction and separate input delay, processing, and presentation work. For CLS I inspect shift sources and reserve space for images and dynamic content. I compare field and lab data and verify a measured improvement.

### س106. ماذا تختبر في feature Angular مهمة، وماذا لا يستحق اختبارًا هشًا؟

**الإجابة بالعربي:** أختبر behavior يهم المستخدم: form validation/submission، حالة loading/error، authorization UI، routing، وcancellation عند request متأخر. Unit tests للمنطق الصافي والـreducers/selectors، component tests للتفاعل والـDOM، وE2E لمسار حرج واحد أو اثنين. لا أختبر implementation detail مثل اسم private method أو عدد `detectChanges`؛ هذه اختبارات هشة لا تحمي السلوك. أختبر keyboard/accessibility في المسارات المهمة.

**Interview question (EN):** What is a practical testing strategy for a senior Angular feature?

**Answer (EN):** I test user-visible behavior and important failure paths, use unit tests for pure logic, component tests for interaction and DOM state, and a small number of critical end-to-end flows. I avoid tests tied to private implementation details and include keyboard and accessibility checks where the feature depends on them.

---

## 11. سيناريوهات Senior — إجابات مختصرة في الصميم

### س43. Search box يرسل طلبًا مع كل حرف، والنتائج القديمة تظهر فوق الجديدة. الحل؟

**الإجابة بالعربي:** `valueChanges` مع `debounceTime` و`distinctUntilChanged` ثم `switchMap` للطلب؛ عالج loading/error/empty states. السبب: نحتاج أحدث query فقط. اختبر rapid typing والانتقال خارج الصفحة. لا أستخدم `concatMap` لأنه يجعل النتائج القديمة تتراكم.

**Interview question (EN):** A search box shows stale results after fast typing. How would you fix it?

**Answer (EN):** I debounce the input, skip unchanged values, and use switchMap so each new query replaces the previous inner request. I also handle loading, error, and empty states and clean up when the view is destroyed. This matches the product rule that only the latest query matters.

### س44. زر Save ضغطه المستخدم ٣ مرات. تختار operator إيه؟

**الإجابة بالعربي:** السؤال ناقص حتى أعرف سياسة المنتج. لو المطلوب تجاهل الضغطات أثناء حفظ جارٍ: `exhaustMap` مع تعطيل الزر. لو كل تغيير لازم يُحفظ وبالترتيب: `concatMap`. لو عمليات مستقلة يمكن تنفيذها بالتوازي: `mergeMap` بحذر. لا ألغي عملية حفظ سابقة بـ`switchMap` إلا إن السلوك المطلوب يجيز ذلك.

**Interview question (EN):** A user clicks Save three times. Which RxJS flattening operator would you choose?

**Answer (EN):** I first clarify the intended product behavior. If extra clicks should be ignored while one save is running, I use exhaustMap and disable the button. If every change must be saved in order, I use concatMap. If writes are independent, mergeMap may work. I avoid switchMap for essential writes unless cancellation is explicitly safe.

### س45. صفحة تتدهور بعد فتحها وإغلاقها عدة مرات. ماذا تحقق؟

**الإجابة بالعربي:** أثبت المشكلة أولًا عبر repeated navigation وHeap snapshots/عداد listeners. أفحص subscriptions لأحداث وintervals، `shareReplay`/Subjects، closures، root service يحتفظ بcomponent، observers، والـDOM references. أصلح موضع الاحتفاظ، ثم أقارن الذاكرة وعدد listeners بعد الإصلاح. DI scope قد يشرح مدة حياة instance لكنه ليس سببًا كافيًا وحده.

**Interview question (EN):** A page gets slower every time you leave and revisit it. How do you investigate?

**Answer (EN):** I reproduce the issue with repeated navigation and compare heap snapshots, listener counts, and active subscriptions. I check event handlers, intervals, shared streams, Subjects, and root services holding references to old components or DOM nodes. I remove the retention source and repeat the same measurement to prove the fix.

### س46. إمتى تنقل state من component signal إلى NgRx؟

**الإجابة بالعربي:** عندما تصبح الحالة مشتركة عبر features، ولها transitions وأحداث وside effects متعددة يصعب تتبعها، وتحتاج قواعد موحدة أو devtools/tests على مستوى التطبيق. لو state محلية واضحة، إضافة Store قد تزيد التكلفة الذهنية بلا فائدة. أذكر مثالًا من مشروع، مثل cart أو workflow متعدد الصفحات، مع سبب الاختيار.

**Interview question (EN):** When would you move component state from a signal to NgRx?

**Answer (EN):** I would consider NgRx when the state becomes shared across features, has many explicit transitions or side effects, and is hard to debug locally. A component signal remains simpler for isolated UI state. I would justify the move with a real workflow and the coordination problem it solves, rather than using application size alone.

### س47. تطبيق UI يحتاج RTL وSEO وperformance معًا؛ ما ترتيبك؟

**الإجابة بالعربي:** أبدأ بـsemantic HTML ومحتوى واضح، CSS logical properties وتصميم responsive، وأقيس LCP/INP/CLS. أحدد الصفحات العامة التي قد تستفيد من SSR، ثم أقيس HTML الأولي والـhydration. أحسّن الصور والـbundle بحسب bottleneck. أختبر العربية والإنجليزية والكيبورد على الأجهزة المستهدفة.

**Interview question (EN):** How would you approach a UI that needs RTL, SEO, and good performance?

**Answer (EN):** I start with semantic content and a responsive layout using logical CSS properties. I measure LCP, INP, and CLS, then decide whether public pages benefit from SSR. I optimize images and JavaScript based on the measured bottleneck and test both language directions, keyboard use, and the actual initial HTML.

### س48. كيف تقدم code review محترم؟

**الإجابة بالعربي:** أحدد المشكلة وأثرها ثم أقترح تعديلًا قابلًا للتنفيذ، وأفرق بين bug وperformance risk وتفضيل أسلوبي. أراجع correctness، cancellation وcleanup، types، accessibility، tests، وحجم التغيير. مثال: “This subscription remains active after navigation; could we bind it through the async pipe or takeUntilDestroyed so reopening the page does not duplicate events?”

**Interview question (EN):** What does a useful code review comment look like?

**Answer (EN):** I describe the concrete issue and its impact, then propose a practical fix. I distinguish a correctness or security issue from a style preference. For example, I might point out a subscription that survives navigation and suggest the async pipe or takeUntilDestroyed, with a test for repeated page visits.

---

## 12. تقديم نفسك بالإنجليزي

### نسخة ٤٥–٦٠ ثانية مبنية على الـCV الخاص بك

> “Hi, I’m Hossam Nazeer. I’m a frontend developer with over four years of experience building Angular applications for enterprise and public-sector products. At DXC Technologies, I worked on the London Market insurance platform, where I built dashboards, complex data grids, and reporting features using Angular, NgRx, and RxJS. I also worked on frontend architecture and performance improvements, including lazy loading and more efficient rendering; our initial page-load time improved by 30%. Earlier, at Spectrum 360, I developed modules for the Egyptian Drug Authority platform, including multi-step registration and licensing workflows. More recently, I’ve also been working across Angular and Java Spring Boot on an insurance application, which helps me collaborate closely with backend teams. I’m interested in this senior Angular role because I enjoy owning complex frontend features and making them reliable, maintainable, and easy to use.”

**المعنى بالعربي:** أنا حسام نذير، مطوّر Frontend بخبرة أكثر من ٤ سنوات في تطبيقات Angular للأنظمة المؤسسية والحكومية. في DXC اشتغلت على منصة London Market للتأمين، وبنيت dashboards وواجهات بيانات وتقارير باستخدام Angular وNgRx وRxJS. اشتغلت أيضًا على تنظيم الـfrontend وتحسين الأداء، ومن ضمن النتائج المذكورة في الـCV تحسن زمن التحميل الأولي 30%. قبلها في Spectrum 360 طورت أجزاء من منصة هيئة الدواء المصرية، منها نماذج التسجيل والترخيص متعددة الخطوات. ومؤخرًا أعمل على Angular وJava Spring Boot في تطبيق تأمين، وده يساعدني أتعاون بعمق مع فرق الـbackend. مهتم بدور Senior Angular لأنني أحب تحمّل مسؤولية features معقدة وجعلها موثوقة وسهلة الصيانة والاستخدام.


### Follow-up متوقع: “Tell me about a technical challenge.”

> “On the London Market platform, initial page load was an important performance concern because the application had several complex enterprise modules. I worked on lazy loading and more efficient rendering with Signals and custom `trackBy` functions. According to the performance result reported in my CV, these improvements reduced initial page-load time by 30%. I would start by explaining how we measured the baseline, which pages were affected, and which change had the biggest impact.”

**قبل استخدام القصة:** أكملها من ذاكرتك بتفاصيل حقيقية: ما المقياس؟ هل كانت بيئة production أم test؟ هل التحسين نتج من عدة تغييرات معًا؟ لا تدّعِ أن `trackBy` وحده خفّض initial load؛ اعرض النتيجة كمحصلة للعمل المذكور في الـCV.

**قصة ثانية جاهزة للتحضير:** Egyptian Drug Authority: multi-step forms، registration/licensing، API integrations وdocument uploads. احكِ صعوبة حقيقية في validation أو state أو UX، ثم قرارك ونتيجته. الـCV يذكر انخفاض UI-related bugs بعد النشر بنسبة 40%؛ استخدم الرقم فقط إذا تقدر تشرح مصدره وطريقة حسابه.

---

## 13. HTML وHTML5 — مراجعة Senior مركزة

الفصل ده يبدأ من بنية الصفحة وينتهي بسيناريوهات code review. في المقابلة، اشرح **اختيار العنصر ولماذا**، ثم أثره على accessibility وSEO والسلوك الافتراضي. HTML5 اسم شائع لمجموعة تطورات الويب؛ المرجع الحالي للغة HTML هو **HTML Living Standard**.

**مراجع الفصل:** [HTML Living Standard](https://html.spec.whatwg.org/multipage/) · [HTML forms](https://html.spec.whatwg.org/dev/forms.html) · [W3C WAI: Forms](https://www.w3.org/WAI/tutorials/forms/) · [W3C WAI: Images](https://www.w3.org/WAI/tutorials/images/) · [W3C WAI: Developing for accessibility](https://www.w3.org/WAI/tips/developing/).

### س49. اكتب skeleton صحيح لصفحة HTML حديثة، واشرح دور كل سطر.

**الإجابة بالعربي:** `<!doctype html>` يطلب standards mode بدل quirks mode. `lang` يحدد لغة المستند لقارئات الشاشة والبحث، و`dir` يحدد اتجاه النص عند الحاجة. `charset` يحدد الترميز، و`viewport` يجعل عرض الصفحة على الموبايل مطابقًا لعرض الجهاز، و`title` اسم الصفحة في التبويب ونتائج البحث. `meta description` وصف مفيد للصفحات العامة، وليس ضمانًا لترتيب البحث.

```html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>الطلبات | التطبيق</title>
    <meta name="description" content="تابع طلباتك وحالتها">
  </head>
  <body>
    <main><h1>الطلبات</h1></main>
  </body>
</html>
```

**Interview question (EN):** What belongs in a minimal modern HTML document, and why?

**Answer (EN):** I use the HTML doctype for standards mode, a document language and direction where relevant, UTF-8 encoding, a viewport declaration for mobile layout, a descriptive title, and meaningful content inside `main`. A page-specific meta description can help describe a public page, but it does not guarantee ranking.

### س50. تختار `header`, `nav`, `main`, `section`, `article`, `aside`, و`footer` إزاي؟

**الإجابة بالعربي:** `header` و`footer` مقدمة ونهاية الصفحة أو جزء منها؛ `nav` لمجموعة روابط تنقل مهمة؛ `main` للمحتوى الأساسي الفريد للصفحة؛ `article` لمحتوى مستقل يمكن فهمه وحده مثل مقال أو بطاقة خبر؛ `section` لتجميع موضوعي له عنوان مناسب؛ `aside` لمحتوى جانبي مرتبط. لا أستخدم عنصرًا semantic لمجرد شكله. أرتب العناوين `h1` ثم `h2` بحسب الهيكل، ولا أختار المستوى بسبب حجم الخط؛ CSS للشكل. لو `section` بلا معنى موضوعي، `div` أنسب.

**Interview question (EN):** How do you choose semantic landmarks and heading levels?

**Answer (EN):** I choose elements by meaning: `main` is the page's primary content, `nav` groups major navigation, `article` stands independently, `section` groups a titled theme, and `aside` is related supplementary content. I keep headings in a logical hierarchy and style them with CSS. I use `div` when no semantic element fits.

### س51. إمتى تستخدم `a` وإمتى `button`؟ وإيه مشكلة clickable `div`؟

**الإجابة بالعربي:** `a href` للانتقال إلى URL أو مكان في الصفحة، و`button` لتنفيذ فعل داخل الواجهة مثل فتح dialog أو حفظ تعديل. الاتنين لهما keyboard behavior وfocus وsemantics أصلًا. `div (click)` لا يوفّر كل ده تلقائيًا، فتضطر تقلّد Enter/Space والتركيز والدور والحالات. الرابط بلا `href` لا يصبح رابط تنقل حقيقي. داخل `form` اكتب `type="button"` للزر غير المخصص للإرسال، لأن default للـ`button` هو submit.

**Interview question (EN):** When do you use a link versus a button?

**Answer (EN):** A link navigates to a destination; a button performs an action. Native elements already support keyboard interaction, focus, and accessible semantics. A clickable `div` requires recreating those behaviors and is easy to get wrong. In a form, I explicitly set `type="button"` for actions that should not submit it.

### س52. هل HTML5 يقسم العناصر إلى block وinline؟ وماذا يحدث في nesting غير صحيح؟

**الإجابة بالعربي:** block/inline أساسًا سلوك عرض CSS قد يتغير، بينما HTML الحديث يصف **content categories** وقواعد المحتوى المسموح داخل كل عنصر. مثلًا لا تضع `button` داخل `button`، ولا عنصرًا تفاعليًا داخل زر. والـparser قد يصلح markup غير صحيح: `<p>نص<div>صندوق</div></p>` سيغلق `p` تلقائيًا قبل `div`، فيختلف DOM عما تتخيله. افحص DOM الفعلي في DevTools واستخدم validator وقت الحاجة.

**Interview question (EN):** Why is “block versus inline” not enough to reason about valid HTML?

**Answer (EN):** Display is a CSS concern; HTML has content categories and nesting rules. Invalid nesting may be repaired by the parser, so the resulting DOM can differ from the source. For example, a paragraph closes before a `div`, and nested interactive controls are invalid. I inspect the actual DOM when markup behaves unexpectedly.

### س53. اشرح `id`, `class`, `data-*`, boolean attributes, `hidden`, `lang`, و`dir`.

**الإجابة بالعربي:** `id` فريد داخل المستند ويستخدم للربط مثل `label for` أو fragment URL؛ `class` لتجميع عناصر للـCSS/JS؛ `data-*` لبيانات مخصصة يمكن قراءتها عبر `dataset`، وليس لتخزين secrets. الـboolean attribute مثل `disabled` وجوده يعني true حتى لو كتبت `disabled="false"` في HTML. `hidden` يخفي عنصرًا لا ينبغي عرضه حاليًا؛ لا تستخدمه كوسيلة authorization. `lang` للغة المحتوى، و`dir="rtl"` لاتجاه النص؛ يمكن تطبيقهما على جزء داخل صفحة ثنائية اللغة.

**Interview question (EN):** What are common global attributes and boolean-attribute pitfalls?

**Answer (EN):** An `id` uniquely identifies an element in a document, classes group elements, and `data-*` holds non-sensitive custom data. For HTML boolean attributes, presence means true, so `disabled="false"` still disables the control. `hidden` controls presentation, while `lang` and `dir` describe language and text direction, including mixed-language regions.

### س54. كيف تبني form سليمة: `action`, `method`, `name`, `label`, و`fieldset`؟

**الإجابة بالعربي:** الـform يمكن إرسالها بدون JavaScript. `action` يحدد الوجهة و`method="get"` يضع البيانات في URL المناسب للبحث غير الحساس؛ `post` يرسل body لتغيير البيانات، مع HTTPS والتحقق على السيرفر. قيمة `name` هي مفتاح البيانات المرسلة؛ `id` وحده لا يكفي. اربط `label for` بـ`input id`، واستخدم `fieldset` و`legend` لتجميع حقول مترابطة. الزر `type="submit"` يرسل النموذج.

```html
<form action="/search" method="get">
  <label for="query">Search products</label>
  <input id="query" name="q" type="search" required>
  <button type="submit">Search</button>
</form>
```

**Interview question (EN):** What makes an HTML form work correctly without JavaScript?

**Answer (EN):** The form needs an action and an appropriate method; controls need `name` attributes for submission and associated labels for usability. I use GET for non-sensitive searches and POST for changes, with HTTPS and server-side validation. `fieldset` and `legend` describe related controls, and a submit button triggers native form behavior.

### س55. `input type`, validation attributes, `autocomplete`, و`novalidate`: ما حدودها؟

**الإجابة بالعربي:** `type="email"`, `number`, `date`, `search`, `tel`, `password` تؤثر في سلوك المتصفح ولوحة مفاتيح الموبايل وبعض التحقق، لكن اختر النوع حسب **معنى** البيانات؛ رقم تليفون `tel` وليس `number`. `required`, `min`, `max`, `minlength`, `pattern` تدعم constraint validation، و`autocomplete` يعطي المتصفح hint مناسبًا مثل `email` أو `current-password`. `novalidate` يوقف التحقق التلقائي عند الإرسال؛ لا يعني أن البيانات صحيحة. التحقق client-side لتحسين UX، أما التحقق الأمني والنهائي فعلى السيرفر.

**Interview question (EN):** How do native input types and constraint validation fit into a production form?

**Answer (EN):** I choose input types by data meaning, which can improve mobile keyboards and native validation. Attributes such as `required`, `min`, and `pattern` provide useful feedback, and `autocomplete` helps users complete fields. `novalidate` opts out of automatic submission validation. None of these replaces validation on the server.

### س56. الفرق بين `disabled` و`readonly` و`hidden` في form؟

**الإجابة بالعربي:** `disabled` يمنع التعديل والتركيز المعتاد ولا يرسل قيمة الحقل مع form submission. `readonly` يمنع التعديل في أنواع الحقول التي تدعمه، لكن القيمة تُرسل ويمكن التركيز عليه غالبًا. `hidden` أو `type="hidden"` لا يوفر حماية للقيمة؛ المستخدم يستطيع تعديل request. لو احتجت عرض قيمة للقراءة فقط أقرر هل إرسالها مطلوب أصلًا، ولا أعتمد على أي قيمة من العميل كحقيقة موثوقة.

**Interview question (EN):** How do disabled, readonly, and hidden form controls differ?

**Answer (EN):** Disabled controls are generally not focusable and are not submitted. Readonly controls, where supported, remain submitted and can usually receive focus. A hidden field is merely invisible in the UI; its value can be changed by the client, so the server must not treat it as trusted.

### س57. ما قواعد accessibility الأساسية التي تتوقعها في مراجعة HTML؟

**الإجابة بالعربي:** أبدأ بـnative semantics، عناوين مرتبة، `lang` صحيح، labels لكل controls، `alt` للصور حسب غرضها، تنقل بالكيبورد مع focus ظاهر، نص رابط واضح، ورسائل أخطاء مفهومة مرتبطة بالحقل (`aria-describedby` عند الحاجة). أستخدم `aria-label` فقط عندما لا يوجد اسم نصي مناسب، ولا أضيف `role="button"` إلى `button` أصلًا. `placeholder` مثال/تلميح وليس بديلًا للـlabel. أراجع UI بحالة zoom ومع قارئ شاشة أو فحوص آلية، لكن الفحص الآلي وحده لا يكفي.

**Interview question (EN):** What is your practical HTML accessibility checklist?

**Answer (EN):** I start with native semantic elements, a logical heading order, document language, associated form labels, purpose-based image alternatives, keyboard access with visible focus, meaningful link text, and understandable errors connected to inputs. I add ARIA only where native HTML does not express the needed information. Placeholder text is not a label, and automated checks complement manual keyboard and assistive-technology testing.

### س58. كيف تكتب `alt`، ومتى تستخدم `picture`, `srcset`, `sizes`, وlazy loading؟

**الإجابة بالعربي:** الصورة المعلوماتية تحتاج `alt` يشرح المعلومة؛ صورة الزخرفة `alt=""`؛ ولو الصورة داخل رابط أو زر فالنص يشرح **الفعل**. `srcset` و`sizes` يتيحان للمتصفح اختيار حجم مناسب حسب العرض، و`picture` لتغيير القصّة الفنية أو الصيغة عند الحاجة. حدّد `width` و`height` أو aspect ratio لتقليل layout shift. استخدم `loading="lazy"` للصور البعيدة أسفل الصفحة، ولا تعمل lazy للـhero/LCP image؛ يمكن إعطاؤها أولوية مناسبة بعد القياس. صورة CSS الخلفية للزينة، وليست بديلًا عن صورة تحمل معلومة.

**Interview question (EN):** How do you make images accessible and performant?

**Answer (EN):** I write alt text for the image's purpose: essential information for informative images, an empty alternative for decoration, and the action for a functional image. `srcset` and `sizes` serve appropriate resolutions; `picture` supports art direction or format choices. I reserve image dimensions to limit layout shift, lazy-load offscreen images, and keep the LCP image eager and appropriately prioritized.

### س59. كيف تستخدم `audio`, `video`, و`track` بشكل قابل للاستخدام؟

**الإجابة بالعربي:** أضيف `controls` ليتمكن المستخدم من التشغيل والتحكم، وأوفر صيغة أو أكثر مع fallback مناسب. الفيديو الذي يحتوي كلامًا يحتاج captions باستخدام `<track kind="captions">`، والمحتوى الصوتي المهم يحتاج transcript حسب السياق. `autoplay` خاصة بالصوت مقيدة بسياسات المتصفح ومزعجة للمستخدم؛ لا أبني تجربة أساسية عليها. `poster` يعطي صورة قبل تشغيل الفيديو، وأضع أبعادًا أو نسبة عرض لتجنب القفز في التخطيط.

**Interview question (EN):** What should you consider when embedding audio or video?

**Answer (EN):** I provide native controls, appropriate media sources, captions for spoken video, and a transcript where useful. I avoid relying on autoplay because browser policies restrict audible autoplay and it harms usability. A poster and reserved dimensions make video loading more stable.

### س60. ما الفرق بين normal script و`defer` و`async` و`type="module"`؟

**الإجابة بالعربي:** الـclassic script العادي في الـHTML يوقف parsing أثناء تحميله/تنفيذه. `defer` يحمّل بالتوازي، وينفذ بعد انتهاء parsing وبترتيب ظهوره **قبل** `DOMContentLoaded`. `async` يحمّل بالتوازي وينفذ بمجرد جاهزيته؛ لا تعتمد على ترتيب بين scripts async أو توقيته بالنسبة لانتهاء parsing. Module script يُعامل deferred افتراضيًا مع تحميل dependencies، و`async` للـmodule يغير هذا السلوك. `DOMContentLoaded` لا ينتظر الصور، لكنه ينتظر deferred/module scripts المعتادة. لو scripts تعتمد على ترتيب بعضها، `defer` أو modules أفضل من `async` المستقل.

**Interview question (EN):** Compare classic, deferred, async, and module scripts.

**Answer (EN):** A parser-inserted classic script can block parsing. Deferred scripts download in parallel and run after parsing, in document order, before `DOMContentLoaded`. Async scripts run when ready, so their order is not guaranteed. Module scripts defer by default while loading their dependency graph; an async module changes that scheduling. I choose based on dependencies and when the code needs the DOM.

### س61. متى تستخدم `preload`, `preconnect`, و`modulepreload`؟

**الإجابة بالعربي:** `preload` يخبر المتصفح عن resource مهم مبكرًا، مثل خط أساسي أو صورة LCP لم يكتشفها سريعًا؛ `preconnect` يفتح اتصالًا مبكرًا مع origin خارجي تحتاجه الصفحة قريبًا؛ `modulepreload` يجهّز module وdependencies مناسبة. لا أضيف hints لكل الملفات: قد تزاحم الموارد الأهم وتضر الأداء. أبدأ بقياس network waterfall وLCP، ثم أضيف hint واحدًا له سبب واضح وأقيس النتيجة.

**Interview question (EN):** How do HTML resource hints help, and when can they hurt?

**Answer (EN):** Preload can expose a critical resource early, preconnect can prepare a needed third-party origin, and modulepreload can prepare module resources. Overusing hints competes for bandwidth and may worsen performance. I inspect the loading waterfall, target a measured bottleneck, and verify the impact.

### س62. ما علاقة HTML بالـSEO؟ وماذا يضيف SSR في تطبيق Angular؟

**الإجابة بالعربي:** HTML واضح فيه `title` فريد، meta description ملائمة، headings منطقية، روابط `href` حقيقية، `lang`، نص محتوى ظاهر، وcanonical URL للصفحات التي تحتاجه، يساعد محركات البحث والمستخدمين. Robots directives تتحكم في الفهرسة عند الحاجة. SSR يجعل الـHTML الأولي يحمل المحتوى بدل الاعتماد الكامل على تنفيذ JS، لكن فائدته تتوقف على نوع الصفحة ومحرك البحث والقياس؛ ولا يصلح تلقائيًا محتوى ضعيفًا أو metadata مكررة. أفحص **View Source/response HTML** وليس DOM بعد hydration فقط.

**Interview question (EN):** What can HTML do for SEO, and what changes with Angular SSR?

**Answer (EN):** I provide unique titles, useful descriptions, logical headings, real crawlable links, meaningful page content, language, and canonical URLs where needed. SSR can include content in the initial HTML response rather than requiring client-side rendering first. I verify the response HTML and metadata per route and measure the result; SSR alone is not an SEO guarantee.

### س63. كيف تراجع `iframe` أمنيًا ومن ناحية accessibility؟

**الإجابة بالعربي:** أعطي الـiframe `title` يصف محتواه لقارئ الشاشة، و`loading="lazy"` لو خارج الشاشة. أحدد `sandbox` بأقل صلاحيات يحتاجها المحتوى، وأستخدم `allow` للميزات المطلوبة فقط، و`referrerpolicy` حسب سياسة الخصوصية. لا أفترض أن iframe من origin آخر يمكنني قراءة DOM داخله؛ Same-Origin Policy تمنع ذلك عادة، والتواصل المنضبط يكون بـ`postMessage` مع التحقق من `origin` والرسالة. تحميل third-party له أثر أداء وخصوصية فأقيسه.

**Interview question (EN):** What do you check before embedding a third-party iframe?

**Answer (EN):** I give it a descriptive title, consider lazy loading, restrict capabilities with `sandbox` and `allow`, and set an appropriate referrer policy. Cross-origin DOM access is restricted; if communication is necessary, I use `postMessage` with origin and payload checks. I also measure its performance and privacy impact.

### س64. هل `localStorage`, `sessionStorage`, وCookies جزء من HTML نفسه؟ وأيهما تختار؟

**الإجابة بالعربي:** دي Web Platform APIs مرتبطة بعصر HTML5، وليست HTML tags. `localStorage` يبقى عبر جلسات المتصفح، و`sessionStorage` مربوط بالتبويب/الجلسة؛ الاتنين synchronous وقابلان للوصول من JS لنفس origin، فلا أخزن فيهما secrets. Cookies تُرسل مع HTTP requests بحسب خصائصها؛ للجلسة الحساسة أفضل cookie بخصائص `HttpOnly`, `Secure`, و`SameSite` وفق تصميم الـbackend، مع مراعاة CSRF. التخزين المناسب يعتمد على العمر المطلوب والـthreat model، وليس شعارًا عامًا.

**Interview question (EN):** How do localStorage, sessionStorage, and cookies differ?

**Answer (EN):** They are web platform storage mechanisms, not HTML elements. Local storage persists across browser sessions; session storage is scoped to a tab session. Both are synchronous and readable by same-origin JavaScript, so I avoid putting secrets there. Cookies can accompany requests; for sensitive sessions I prefer a properly designed HttpOnly, Secure, SameSite cookie strategy and account for CSRF.

### س65. إمتى تستخدم `canvas` وSVG وWeb Workers؟

**الإجابة بالعربي:** SVG مناسب لرسومات vector وعناصر يمكن تكبيرها والتعامل معها كعناصر DOM؛ `canvas` سطح رسم bitmap مناسب للرسم المتكرر أو مشاهد كثيفة، لكن يجب توفير بديل accessible للمعلومات والتفاعلات. Web Worker ينقل computation ثقيلة خارج main thread، لكنه لا يتعامل مع DOM مباشرة. لا أضع كل مشكلة performance في Worker؛ أبدأ بتحديد blocking task ثم أقيس أثر النقل والتواصل بين threads.

**Interview question (EN):** When would you choose SVG, canvas, or a Web Worker?

**Answer (EN):** SVG suits scalable vector graphics with DOM-level structure. Canvas is useful for dense or frequently redrawn scenes, with accessibility alternatives for meaningful content. A Web Worker handles heavy computation off the main thread but cannot directly manipulate the DOM. I profile first and account for message-transfer overhead.

### س66. كيف تبني data table سليمة وقابلة للقراءة؟

**الإجابة بالعربي:** استخدم `<table>` للبيانات الجدولية فقط، وليس layout. `caption` يوضح غرض الجدول، `th scope="col"` و`scope="row"` يربطان العناوين بالخلايا، و`thead/tbody/tfoot` ينظمون المحتوى. للجداول المعقدة قد أستخدم `headers`/`id` وربما تبسيط العرض على الموبايل بدل تمرير جدول ضخم دون تفكير. لو قائمة cards لا علاقة صفوف/أعمدة فيها، أستخدم list أو articles.

**Interview question (EN):** What makes an HTML data table semantic and accessible?

**Answer (EN):** I use a table for genuinely tabular data, add a useful caption, identify row and column headers with `th` and `scope`, and group rows where helpful. Complex associations may require explicit header IDs. I also design a usable small-screen presentation rather than using tables for page layout.

### س67. ما الفرق بين source HTML وDOM؟ ولماذا `innerHTML` خطر مع نص غير موثوق؟

**الإجابة بالعربي:** المتصفح يفسر source HTML ويبني DOM، وقد يصلح markup غير صحيح، ثم JavaScript/Angular يغير DOM لاحقًا. `textContent` يعرض النص كنص؛ `innerHTML` يفسر markup، فإدخال user content غير موثوق فيه قد يؤدي إلى XSS. في Angular استخدم binding العادي وآليات sanitization، ولا تتجاوزها بـ`bypassSecurityTrust...` إلا بعد مراجعة مصدر المحتوى وسياقه بعناية. `View Source` يريك response الأولي، وElements في DevTools يريك DOM الحالي.

**Interview question (EN):** How do source HTML and the live DOM differ, and where does XSS enter?

**Answer (EN):** The browser parses source markup into a DOM, repairs some invalid markup, and scripts or frameworks can then change it. `textContent` treats input as text, while `innerHTML` parses markup, so untrusted content can introduce XSS. In Angular I rely on normal bindings and contextual sanitization rather than bypassing them casually. View Source and the Elements panel answer different questions.

### س68. Code review: ما العيوب في المثال، وإزاي تصلحها؟

```html
<div onclick="save()">Save</div>
<form action="/profile" method="post">
  <input id="email" type="email" placeholder="Email">
  <button onclick="preview()">Preview</button>
  <button>Submit</button>
</form>
<img src="avatar.jpg">
```

**الإجابة بالعربي:** `Save` يجب أن يكون `<button type="button">` مع اسم واضح (أو `a href` لو ينقل). `email` يحتاج `<label for="email">` و`name="email"` حتى يُرسل؛ placeholder ليس label. زر Preview داخل form default بتاعه submit، فليكن `type="button"`، وزر الإرسال `type="submit"` بوضوح. الصورة: لو avatar معلوماتية ضع `alt` مناسبًا مثل اسم الشخص، ولو زخرفية `alt=""`، وحدد dimensions قدر الإمكان. تجنب inline handlers في التطبيق؛ اربط events من كود التطبيق، وتحقق من البيانات على السيرفر.

**Interview question (EN):** Review this markup for semantics, submission bugs, and accessibility.

**Answer (EN):** The Save action should use a real button, or a link if it navigates. The email control needs an associated label and a `name` to submit its value; a placeholder is insufficient. Preview needs `type="button"` to avoid accidental form submission, while Submit should be explicit. Give the image a purpose-appropriate alt value and dimensions. I would wire behavior in application code and validate submitted data server-side.

### س69. إمتى تستخدم `details/summary`, `dialog`, و`template`؟

**الإجابة بالعربي:** `<details><summary>...</summary>...</details>` إفصاح بسيط قابل للفتح والإغلاق بسلوك keyboard جاهز، مناسب لـFAQ لا لتجربة معقدة بلا مراجعة UX. `<dialog>` نافذة أصلية؛ فتحها بـ`showModal()` يضعها في top layer ويجعل باقي الصفحة غير تفاعلية ضمن سلوك modal، ويمكن غلقها بـ`close()`؛ انتبه لإدارة focus والاسم الواضح واختبار الإغلاق. `<template>` يحتفظ بmarkup غير مرسوم حتى تستخدمه من JavaScript. وفي Web Components، `slot` يحدد موضع المحتوى الممرر داخل shadow tree؛ هذه ميزة متقدمة وليست لازمة لكل تطبيق Angular.

**Interview question (EN):** What do details, dialog, and template provide natively?

**Answer (EN):** `details` and `summary` provide a built-in disclosure control. A modal `dialog` opened with `showModal()` participates in the top layer and modal interaction model; I still test its accessible name, focus, and closing behavior. `template` stores inert markup for later use. Slots are relevant when building Web Components, not a default requirement for Angular components.

### س70. ماذا تقصد بـ“HTML5 APIs” مثل History, Geolocation, وDrag and Drop؟

**الإجابة بالعربي:** دي browser APIs، وليست tags أو مزايا مضمونة لمجرد كتابة doctype HTML5. History API مثل `pushState` يغير URL/history بدون reload، لكن التطبيق مسؤول عن تحديث الواجهة والتعامل مع `popstate`. Geolocation يحتاج secure context وإذن المستخدم؛ لا تطلبه قبل حاجة واضحة له، ووفر fallback عند الرفض. Native Drag and Drop يحتاج دعم keyboard/touch بديل في الواجهات المهمة؛ لا تفترض أنه حل accessibility كامل. في Angular غالبًا أستخدم Router للتنقل وواجهة مناسبة للـdrag بدل التعامل الخام مع APIs بلا داعٍ.

**Interview question (EN):** Are History, Geolocation, and Drag and Drop part of the HTML syntax?

**Answer (EN):** They are browser APIs often grouped under the historical “HTML5” umbrella, not HTML elements. History APIs change navigation state without automatically rendering the application; geolocation requires a secure context and user permission. Native drag and drop needs accessible keyboard and touch alternatives. In Angular I normally use the Router for navigation and choose an interaction library only when the product needs it.

---
## قائمة المراجعة قبل المقابلة

- أقدر أشرح SOLID بالإنجليزي مع مثال Angular واحد على الأقل.
- أقدر أحل أسئلة closure وhoisting و`this` وevent loop **بالخطوات**، لا بالتخمين.
- أقدر أختار flattening operator من سياسة التزامن المطلوبة.
- أقدر أشرح NgRx vs Signals بدون حكم مطلق.
- أقدر أربط DI scopes والـsubscriptions والـmemory leaks بشكل صحيح.
- أقدر أشخّص performance بمقياس قبل اقتراح علاج.
- أقدر أشرح مشروعين، قراراتي فيهما، والأثر الحقيقي.
- أقدر أتكلم عن HTML/CSS/RTL/Accessibility كجزء من جودة المنتج، وليس تجميلًا فقط.

## مراجع رسمية للتحديث قبل المقابلة

- [Angular documentation](https://angular.dev/overview) · [Angular performance](https://angular.dev/best-practices/performance) · [Angular security](https://angular.dev/best-practices/security)
- [RxJS higher-order Observables](https://rxjs.dev/guide/higher-order-observables) · [NgRx Store](https://ngrx.io/guide/store/why) · [NgRx selectors](https://ngrx.io/guide/store/selectors)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/narrowing) · [MDN JavaScript closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) · [Core Web Vitals](https://web.dev/articles/vitals)




