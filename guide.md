# Senior Frontend Angular — دليل المراجعة للمقابلة

> **المستوى:** حوالي ٤ سنوات خبرة · **الهدف:** إجابات دقيقة بأمثلة وقرارات تقنية، لا حفظ تعريفات.  
> **طريقة الاستخدام:** اقرأ السؤال بالعربي والإنجليزي، جاوب بصوت عالٍ بالإنجليزي في ٦٠–٩٠ ثانية، ثم قارن إجابتك بالنموذج العربي والإنجليزي. جرّب أسئلة الكود قبل قراءة الحل. التفاصيل التي تعتمد على نسخة Angular أو NgRx في مشروعك راجعها مع نسخة المشروع.

## خريطة المذاكرة

1. HTML وCSS وSass وAccessibility
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

**تنبيه للمقابلة:** جملة الـ30% موجودة في الـCV؛ جهّز شرح طريقة القياس والـbaseline قبل استخدامها شفهيًا. لو المسؤولية أو الرقم اتغيروا منذ كتابة الـCV، حدّث هذه الفقرة كذلك. احفظ تسلسل القصة، لا النص كلمة بكلمة.

### Follow-up متوقع: “Tell me about a technical challenge.”

> “On the London Market platform, initial page load was an important performance concern because the application had several complex enterprise modules. I worked on lazy loading and more efficient rendering with Signals and custom `trackBy` functions. According to the performance result reported in my CV, these improvements reduced initial page-load time by 30%. I would start by explaining how we measured the baseline, which pages were affected, and which change had the biggest impact.”

**قبل استخدام القصة:** أكملها من ذاكرتك بتفاصيل حقيقية: ما المقياس؟ هل كانت بيئة production أم test؟ هل التحسين نتج من عدة تغييرات معًا؟ لا تدّعِ أن `trackBy` وحده خفّض initial load؛ اعرض النتيجة كمحصلة للعمل المذكور في الـCV.

**قصة ثانية جاهزة للتحضير:** Egyptian Drug Authority: multi-step forms، registration/licensing، API integrations وdocument uploads. احكِ صعوبة حقيقية في validation أو state أو UX، ثم قرارك ونتيجته. الـCV يذكر انخفاض UI-related bugs بعد النشر بنسبة 40%؛ استخدم الرقم فقط إذا تقدر تشرح مصدره وطريقة حسابه.

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
