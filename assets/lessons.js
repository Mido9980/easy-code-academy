window.LESSONS = {
  tracks: [
    {
      id: "html", title: "HTML", icon: "🧱", color: "#ff7a5c",
      lessons: [
        {
          id: "html-intro", title: "مقدمة في HTML",
          blocks: [
            { type: "p", text: "HTML هي لغة هيكل الصفحة. كل صفحة ويب بتشوفها في المتصفح مبنية من عناصر HTML، وكل عنصر بيوصف جزء من المحتوى: عنوان، فقرة، صورة، لينك." },
            { type: "code", lang: "html", code: '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n  <head>\n    <title>صفحتي الأولى</title>\n  </head>\n  <body>\n    <h1>أهلاً بالعالم</h1>\n    <p>دي أول صفحة ليا.</p>\n  </body>\n</html>' },
            { type: "h", text: "مكونات العنصر" },
            { type: "list", items: ["وسم الفتح: <p>", "المحتوى: النص أو العناصر الداخلية", "وسم الإغلاق: </p>"] },
            { type: "tip", text: "عناصر زي <img> و <br> مفيهاش وسم إغلاق، وبتسمى void elements." }
          ]
        },
        {
          id: "html-tags", title: "العناوين والفقرات",
          blocks: [
            { type: "p", text: "العناوين من h1 لحد h6 مرتبة بالأهمية: h1 أهم عنوان في الصفحة، وh6 الأصغر. استخدم h1 مرة واحدة في كل صفحة." },
            { type: "code", lang: "html", code: '<h1>عنوان رئيسي</h1>\n<h2>عنوان فرعي</h2>\n<h3>عنوان أصغر</h3>\n<p>دي فقرة عادية فيها <strong>نص مهم</strong> و <em>نص مميز</em>.</p>' },
            { type: "p", text: "الفقرات بتتقسم تلقائيًا بمسافات فوق وتحت، لكن سطر جديد مش بيتكتب بـ Enter — لازم <br> أو عنصر جديد." }
          ]
        },
        {
          id: "html-links", title: "اللينكات والصور",
          blocks: [
            { type: "p", text: "اللينك بيتعمل بوسم <a> وخاصية href. الصورة بوسم <img> وخاصية src، وalt مهم لقارئات الشاشة ولما الصورة متتحملش." },
            { type: "code", lang: "html", code: '<a href="https://example.com" target="_blank">زيارة الموقع</a>\n\n<img src="logo.png" alt="شعار الموقع" width="160">' },
            { type: "h", text: "قواعد سريعة" },
            { type: "list", items: ["target=\"_blank\" بيفتح اللينك في تاب جديد", "rel=\"noopener\" معاه للأمان", "alt لازم يوصف الصورة بجملة مفيدة"] }
          ]
        },
        {
          id: "html-forms", title: "الفورمز والمدخلات",
          blocks: [
            { type: "p", text: "الفورم هو الطريقة اللي بتاخد بيها بيانات من المستخدم: اسم، إيميل، كلمة سر، رسالة." },
            { type: "code", lang: "html", code: '<form onsubmit="event.preventDefault(); alert(\'تم الإرسال\');">\n  <label>الاسم\n    <input type="text" name="name" required>\n  </label>\n  <label>الإيميل\n    <input type="email" name="email" required>\n  </label>\n  <button type="submit">إرسال</button>\n</form>' },
            { type: "tip", text: "استخدم type=\"email\" و type=\"number\" و required — المتصفح بيراجع البيانات قبل الإرسال بدالك." }
          ]
        },
        {
          id: "html-semantic", title: "العناصر الدلالية",
          blocks: [
            { type: "p", text: "بدل ما تعمل كل حاجة <div>، استخدم عناصر بتوصف المعنى: header، nav، main، section، article، footer. ده بيساعد محركات البحث وقارئات الشاشة." },
            { type: "code", lang: "html", code: '<header>\n  <h1>متجري</h1>\n  <nav><a href="/">الرئيسية</a> | <a href="/cart">السلة</a></nav>\n</header>\n<main>\n  <article>\n    <h2>منتج جديد</h2>\n    <p>وصف قصير للمنتج.</p>\n  </article>\n</main>\n<footer>© 2026</footer>' }
          ]
        }
      ]
    },
    {
      id: "css", title: "CSS", icon: "🎨", color: "#4aa8ff",
      lessons: [
        {
          id: "css-intro", title: "مقدمة في CSS",
          blocks: [
            { type: "p", text: "CSS هي لغة التنسيق: ألوان، مسافات، خطوط، ترتيب العناصر. القاعدة بتتكتب كده: محدد { خاصية: قيمة; }." },
            { type: "code", lang: "html", code: '<style>\n  h1 { color: #f7c948; text-align: center; }\n  p  { font-size: 18px; line-height: 1.8; }\n</style>\n\n<h1>عنوان ذهبي</h1>\n<p>فقرة بخط أكبر ومسافة مريحة.</p>' },
            { type: "p", text: "تقدر تحط CSS في ملف خارجي: <link rel=\"stylesheet\" href=\"style.css\"> وده الأفضل للمشاريع الكبيرة." }
          ]
        },
        {
          id: "css-selectors", title: "المحددات (Selectors)",
          blocks: [
            { type: "p", text: "المحدد بيقول المتصفح: طبّق التنسيق على مين؟" },
            { type: "list", items: [".class — عناصر بكلاس معين", "#id — عنصر واحد بمعرّف", "div p — كل p جوّه div", "a:hover — عند مرور الماوس", "* — كل العناصر"] },
            { type: "code", lang: "html", code: '<style>\n  .card { background:#131d3a; padding:16px; border-radius:14px; }\n  #hero { border:2px solid #f7c948; }\n  .card p { color:#9fb0d4; }\n</style>\n\n<div id="hero" class="card"><p>بطاقة مميزة</p></div>' }
          ]
        },
        {
          id: "css-box", title: "الصندوق والمسافات",
          blocks: [
            { type: "p", text: "كل عنصر في CSS عبارة عن صندوق: المحتوى، ثم padding (مسافة داخلية)، ثم border (إطار)، ثم margin (مسافة خارجية)." },
            { type: "code", lang: "html", code: '<style>\n  .box {\n    width: 220px;\n    padding: 20px;\n    border: 2px solid #f7c948;\n    margin: 24px auto;\n    box-sizing: border-box;\n  }\n</style>\n<div class="box">صندوق في النص</div>' },
            { type: "tip", text: "استخدم box-sizing: border-box دايمًا — بيخلي العرض شامل المسافات والإطار، وده بيريحك من حسابات كتير." }
          ]
        },
        {
          id: "css-flex", title: "Flexbox",
          blocks: [
            { type: "p", text: "Flexbox بيوزّع العناصر في صف أو عمود بسهولة. تحطه على الأب: display:flex، وتتحكم في الترتيب بالـ justify-content و align-items." },
            { type: "code", lang: "html", code: '<div style="display:flex; gap:12px; justify-content:space-between; align-items:center; background:#132; padding:14px; border-radius:12px">\n  <b style="color:#f7c948">شعار</b>\n  <span style="color:#fff">رابط ١</span>\n  <span style="color:#fff">رابط ٢</span>\n</div>' },
            { type: "list", items: ["gap — المسافة بين العناصر", "justify-content — التوزيع الأفقي", "align-items — المحاذاة الرأسية", "flex-wrap: wrap — العناصر تنزل سطر جديد لما تضيق"] }
          ]
        },
        {
          id: "css-responsive", title: "التصميم المتجاوب",
          blocks: [
            { type: "p", text: "الموقع لازم يشتغل على الموبايل والكمبيوتر. الحل: وحدات مرنة + media queries." },
            { type: "code", lang: "html", code: '<style>\n  .row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }\n  .cell { background:#182547; color:#e9eefc; padding:18px; border-radius:12px; }\n  @media (max-width:640px){\n    .row { grid-template-columns:1fr; }\n  }\n</style>\n<div class="row">\n  <div class="cell">عمود ١</div>\n  <div class="cell">عمود ٢</div>\n</div>' },
            { type: "tip", text: "ابدأ تصميمك من الموبايل لفوق (mobile first)، وكبّر بعدين — أسهل وأسرع." }
          ]
        }
      ]
    },
    {
      id: "js", title: "JavaScript", icon: "⚙️", color: "#f7c948",
      lessons: [
        {
          id: "js-intro", title: "مقدمة في JavaScript",
          blocks: [
            { type: "p", text: "JavaScript هي اللي بتخلي الصفحة تتفاعل: زرار يشتغل، بيانات تتحسب، محتوى يتغير من غير ما الصفحة تعمل reload." },
            { type: "code", lang: "html", code: '<button onclick="sayHi()">اضغط</button>\n<script>\n  function sayHi() {\n    alert("أهلاً بيك!");\n  }\n</script>' },
            { type: "p", text: "الكود بيتقرأ من فوق لتحت. لو حطيت script في الآخر، الصفحة كلها تكون اتحملت." }
          ]
        },
        {
          id: "js-vars", title: "المتغيرات والأنواع",
          blocks: [
            { type: "p", text: "المتغير مكان في الذاكرة بيحفظ قيمة. استخدم let للقيم المتغيرة، و const للثوابت." },
            { type: "code", lang: "html", code: '<script>\n  const name = "سالمي";\n  let points = 10;\n  points = points + 5;\n  console.log(name, points); // سالمي 15\n</script>' },
            { type: "list", items: ["string — نص", "number — رقم", "boolean — true/false", "object — بيانات مركبة", "array — قائمة"] }
          ]
        },
        {
          id: "js-functions", title: "الدوال",
          blocks: [
            { type: "p", text: "الدالة بتجمع خطوات تحت اسم، وتستقبل مدخلات (parameters) وترجّع نتيجة." },
            { type: "code", lang: "html", code: '<script>\n  function total(price, qty) {\n    return price * qty;\n  }\n  const t = total(50, 3);\n  document.body.innerHTML = "<h2>الإجمالي: " + t + " جنيه</h2>";\n</script>' }
          ]
        },
        {
          id: "js-dom", title: "التعامل مع الصفحة (DOM)",
          blocks: [
            { type: "p", text: "DOM هو شجرة العناصر. بتبحث عن عنصر بـ querySelector، وتغيّر نصه أو تنسيقه أو تسمع لأحداثه." },
            { type: "code", lang: "html", code: '<h2 id="title">قبل</h2>\n<button id="btn">غيّر العنوان</button>\n<script>\n  document.getElementById("btn").addEventListener("click", () => {\n    document.getElementById("title").textContent = "اتغير يا معلم ✅";\n    document.getElementById("title").style.color = "#f7c948";\n  });\n</script>' },
            { type: "tip", text: "textContent للنص، innerHTML لو عايز HTML، و style للتنسيق المباشر." }
          ]
        },
        {
          id: "js-events", title: "الأحداث والمدخلات",
          blocks: [
            { type: "p", text: "الأحداث هي تفاعلات المستخدم: click, input, submit, keydown. تقدر تسمع ليها وتنفّذ كود." },
            { type: "code", lang: "html", code: '<input id="name" placeholder="اكتب اسمك">\n<p id="out">النتيجة هتظهر هنا</p>\n<script>\n  document.getElementById("name").addEventListener("input", (e) => {\n    document.getElementById("out").textContent =\n      e.target.value ? "أهلاً يا " + e.target.value : "اكتب اسمك";\n  });\n</script>' }
          ]
        }
      ]
    }
  ]
};
