(() => {
  const { tracks } = window.LESSONS;
  const all = tracks.flatMap(t => t.lessons.map(l => ({ ...l, track: t.id, trackTitle: t.title, color: t.color })));
  const view = document.getElementById("view");
  const nav = document.getElementById("lessonNav");
  const searchInput = document.getElementById("search");
  const sidebar = document.getElementById("sidebar");
  const installBtn = document.getElementById("installBtn");
  const netPill = document.getElementById("netPill");

  const K = {
    done: "easycode.done",
    theme: "easycode.theme",
    profile: "easycode.profile",
    activity: "easycode.activity"
  };

  const done = new Set(JSON.parse(localStorage.getItem(K.done) || "[]"));
  const saveDone = () => localStorage.setItem(K.done, JSON.stringify([...done]));
  const profile = Object.assign({ name: "", avatar: "🧑‍💻", joined: new Date().toISOString().slice(0, 10) },
    JSON.parse(localStorage.getItem(K.profile) || "{}"));
  const saveProfile = () => localStorage.setItem(K.profile, JSON.stringify(profile));
  const activity = new Set(JSON.parse(localStorage.getItem(K.activity) || "[]"));

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lessonById = id => all.find(l => l.id === id);
  const today = () => new Date().toISOString().slice(0, 10);

  function touchActivity() {
    const t = today();
    if (!activity.has(t)) { activity.add(t); localStorage.setItem(K.activity, JSON.stringify([...activity])); }
  }
  function streak() {
    const days = [...activity].sort();
    if (!days.length) return 0;
    let n = 1, cur = new Date(days[days.length - 1]);
    if (days[days.length - 1] !== today()) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      if (days[days.length - 1] !== y.toISOString().slice(0, 10)) return 0;
      cur = y;
    }
    for (let i = days.length - 2; i >= 0; i--) {
      const p = new Date(cur); p.setDate(p.getDate() - 1);
      if (days[i] === p.toISOString().slice(0, 10)) { n++; cur = p; } else break;
    }
    return n;
  }

  /* theme */
  const applyTheme = t => {
    document.documentElement.dataset.theme = t;
    document.getElementById("themeBtn").textContent = t === "light" ? "☀️" : "🌙";
    localStorage.setItem(K.theme, t);
  };
  applyTheme(localStorage.getItem(K.theme) || "dark");
  document.getElementById("themeBtn").onclick = () =>
    applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");

  /* network pill */
  const paintNet = () => {
    const on = navigator.onLine;
    netPill.textContent = on ? "متصل" : "أوفلاين — الدروس شغالة";
    netPill.classList.toggle("off", !on);
  };
  addEventListener("online", paintNet); addEventListener("offline", paintNet); paintNet();

  /* progress */
  function paintProgress() {
    const pct = Math.round((done.size / all.length) * 100);
    document.getElementById("progressText").textContent = pct + "%";
    document.getElementById("progressFill").style.width = pct + "%";
  }

  /* sidebar */
  function renderNav(activeId) {
    nav.innerHTML = tracks.map(t => `
      <div class="track">
        <h3 class="track-title"><span class="dot" style="background:${t.color}"></span>${t.title}</h3>
        ${t.lessons.map(l => `
          <a href="#/lesson/${l.id}" class="${l.id === activeId ? "active" : ""}">
            ${done.has(l.id) ? '<span class="tick">✔</span>' : '<span style="opacity:.35">○</span>'}
            <span>${esc(l.title)}</span>
          </a>`).join("")}
      </div>`).join("") + `
      <div class="track">
        <h3 class="track-title"><span class="dot" style="background:#f7c948"></span>المنصة</h3>
        <a href="#/playground" class="${activeId === "pg" ? "active" : ""}"><span style="opacity:.5">◧</span><span>المحرر التجريبي</span></a>
        <a href="#/programs" class="${activeId === "programs" ? "active" : ""}"><span style="opacity:.5">◆</span><span>البرامج والمصادر</span></a>
        <a href="#/profile" class="${activeId === "profile" ? "active" : ""}"><span style="opacity:.5">☺</span><span>بروفايلي</span></a>
      </div>`;
    paintProgress();
  }

  /* home */
  function renderHome() {
    renderNav("");
    view.innerHTML = `
      <section class="hero">
        <span class="tag">منصة عربية · مجانية · أوفلاين</span>
        <h1 style="margin-top:12px">اتعلم البرمجة بالتطبيق العملي</h1>
        <p class="lead">دروس مختصرة في HTML و CSS و JavaScript، وكل مثال تجرّبه وتعدّل فيه وتشوف النتيجة فورًا — على الموبايل أو الكمبيوتر، وبدون إنترنت.</p>
        <div class="pg-actions" style="margin-top:16px">
          <a class="btn primary" href="#/lesson/${all[0].id}">ابدأ من هنا</a>
          <a class="btn" href="#/playground">افتح المحرر</a>
          <a class="btn" href="#/profile">بروفايلي</a>
        </div>
        <div class="stats">
          <span><b>${all.length}</b> درس</span>
          <span><b>${tracks.length}</b> مسارات</span>
          <span><b>${done.size}</b> مكتمل</span>
          <span><b>${streak()}</b> يوم متتابع</span>
        </div>
      </section>
      <div class="grid">
        ${tracks.map(t => `
          <a class="tile" href="#/lesson/${t.lessons[0].id}">
            <div class="ico">${t.icon}</div>
            <h3>${t.title}</h3>
            <p>${t.lessons.length} دروس · ${t.lessons.map(l => esc(l.title)).slice(0, 2).join(" · ")}</p>
          </a>`).join("")}
        <a class="tile" href="#/playground"><div class="ico">🧪</div><h3>المحرر التجريبي</h3><p>اكتب HTML و CSS و JS وشوف النتيجة مباشرة.</p></a>
        <a class="tile" href="#/programs"><div class="ico">🎯</div><h3>البرامج والمصادر</h3><p>Kaggle وGitHub وأدوات هتساعدك تتقدم بسرعة.</p></a>
        <a class="tile" href="#/profile"><div class="ico">☺</div><h3>بروفايلي</h3><p>اسمك، تقدّمك، والسلسلة اليومية.</p></a>
      </div>`;
  }

  /* lesson */
  function blockHTML(b) {
    if (b.type === "p") return `<p>${b.text}</p>`;
    if (b.type === "h") return `<h2>${esc(b.text)}</h2>`;
    if (b.type === "tip") return `<div class="tip"><b>💡 نصيحة:</b> ${b.text}</div>`;
    if (b.type === "list") return `<ul class="plain">${b.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    if (b.type === "code") {
      const id = "c" + Math.random().toString(36).slice(2, 8);
      return `
        <div class="code-wrap">
          <div class="code-head">
            <span class="lang">${esc(b.lang || "code")}</span>
            <div class="acts">
              <button class="btn small" data-copy="${id}">نسخ</button>
              <button class="btn small" data-try="${id}">جرّبه بنفسك</button>
            </div>
          </div>
          <pre><code id="${id}">${esc(b.code)}</code></pre>
        </div>`;
    }
    return "";
  }

  function renderLesson(id) {
    const l = lessonById(id);
    if (!l) return renderNotFound();
    renderNav(id);
    const idx = all.findIndex(x => x.id === id);
    const prev = all[idx - 1], next = all[idx + 1];
    const isDone = done.has(id);
    view.innerHTML = `
      <article class="card">
        <div class="meta">
          <span class="tag" style="border-color:${l.color};color:${l.color};background:transparent">${l.trackTitle}</span>
          <span style="color:var(--muted);font-size:13px">درس ${idx + 1} من ${all.length}</span>
        </div>
        <h1>${esc(l.title)}</h1>
        ${l.blocks.map(blockHTML).join("")}
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:26px;padding-top:18px;border-top:1px solid var(--line)">
          <button id="doneBtn" class="btn ${isDone ? "" : "primary"}">${isDone ? "✔ تم إكماله — إلغاء" : "علّم كمكتمل"}</button>
          ${prev ? `<a class="btn" href="#/lesson/${prev.id}">→ السابق</a>` : ""}
          ${next ? `<a class="btn" href="#/lesson/${next.id}">التالي ←</a>` : ""}
        </div>
      </article>`;

    view.querySelectorAll("[data-try]").forEach(btn => {
      btn.onclick = () => {
        sessionStorage.setItem("easycode.play", document.getElementById(btn.dataset.try).textContent);
        location.hash = "#/playground";
      };
    });
    view.querySelectorAll("[data-copy]").forEach(btn => {
      btn.onclick = async () => {
        const code = document.getElementById(btn.dataset.copy).textContent;
        try { await navigator.clipboard.writeText(code); btn.textContent = "تم النسخ ✔"; }
        catch { btn.textContent = "مش مسموح"; }
        setTimeout(() => (btn.textContent = "نسخ"), 1600);
      };
    });
    document.getElementById("doneBtn").onclick = e => {
      if (done.has(id)) done.delete(id); else done.add(id);
      saveDone(); paintProgress();
      e.target.textContent = done.has(id) ? "✔ تم إكماله — إلغاء" : "علّم كمكتمل";
      e.target.classList.toggle("primary", !done.has(id));
      renderNav(id);
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* playground */
  function renderPlayground() {
    renderNav("pg");
    const starter = sessionStorage.getItem("easycode.play") ||
      '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head><meta charset="utf-8"><style>\n  body{font-family:sans-serif;padding:18px;background:#0b1020;color:#e9eefc}\n  h1{color:#f7c948}\n</style></head>\n<body>\n  <h1>أهلاً 👋</h1>\n  <p>عدّل الكود وشوف النتيجة فورًا.</p>\n  <button onclick="alert(\'شغال!\')">جرّب زرار</button>\n</body>\n</html>';
    sessionStorage.removeItem("easycode.play");
    view.innerHTML = `
      <div class="card" style="padding:16px">
        <div class="pg-actions">
          <button class="btn primary" id="run">▶ تشغيل</button>
          <button class="btn" id="reset">إرجاع للمثال</button>
          <button class="btn" id="clear">مسح</button>
          <span style="color:var(--muted);font-size:13px;align-self:center">التنفيذ تلقائي ويشتغل أوفلاين</span>
        </div>
        <div class="pg">
          <div class="pane"><div class="pane-head"><span>الكود</span><span>HTML</span></div>
            <textarea id="code" class="editor" spellcheck="false" dir="ltr"></textarea></div>
          <div class="pane"><div class="pane-head"><span>النتيجة</span><span>Live</span></div>
            <iframe id="preview" title="معاينة" sandbox="allow-scripts allow-modals allow-forms"></iframe></div>
        </div>
      </div>`;
    const ta = document.getElementById("code");
    const frame = document.getElementById("preview");
    ta.value = localStorage.getItem("easycode.last") || starter;
    let t;
    const run = () => { frame.srcdoc = ta.value; localStorage.setItem("easycode.last", ta.value); };
    ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(run, 500); });
    document.getElementById("run").onclick = run;
    document.getElementById("reset").onclick = () => { ta.value = starter; run(); };
    document.getElementById("clear").onclick = () => { ta.value = ""; run(); ta.focus(); };
    run();
  }

  /* profile */
  function renderProfile() {
    renderNav("profile");
    const pct = Math.round((done.size / all.length) * 100);
    const avatars = ["🧑‍💻", "👩‍💻", "⚡", "🚀", "🦉", "🧠", "🏆", "🌙"];
    view.innerHTML = `
      <article class="card">
        <div class="prof-head">
          <div class="avatar" id="avatarView">${profile.avatar}</div>
          <div>
            <h1 style="margin:0">${profile.name ? esc(profile.name) : "بروفايلك"}</h1>
            <p class="lead" style="margin:4px 0 0">عضو من ${profile.joined} · التقدّم محفوظ على جهازك</p>
          </div>
          <span class="badge-off" style="margin-inline-start:auto">أوفلاين جاهز</span>
        </div>
        <div class="avatar-picker" id="avatarPicker">
          ${avatars.map(a => `<button data-a="${a}" class="${profile.avatar === a ? "on" : ""}">${a}</button>`).join("")}
        </div>
        <label class="field"><label>اسمك</label>
          <input id="nameInput" value="${esc(profile.name)}" placeholder="اكتب اسمك هنا">
        </label>
        <div class="kpis">
          <div class="kpi"><b>${done.size}/${all.length}</b><span>دروس مكتملة</span></div>
          <div class="kpi"><b>${pct}%</b><span>نسبة الإنجاز</span></div>
          <div class="kpi"><b>${streak()}</b><span>سلسلة أيام</span></div>
          <div class="kpi"><b>${activity.size}</b><span>أيام نشاط</span></div>
        </div>
        ${tracks.map(t => {
          const d = t.lessons.filter(l => done.has(l.id)).length;
          const p = Math.round((d / t.lessons.length) * 100);
          return `<div class="trackbar">
            <div class="lbl"><span>${t.title}</span><span>${d}/${t.lessons.length}</span></div>
            <div class="bar"><i style="width:${p}%;background:${t.color}"></i></div>
          </div>`;
        }).join("")}
        <h3 style="margin-top:26px">التطبيق على أجهزتك</h3>
        <p style="color:var(--muted);font-size:14px">ثبّت EASY CODE كتطبيق مستقل يعمل أوفلاين على أندرويد وiOS وويندوز وماك ولينكس.</p>
        <div class="pg-actions">
          <button class="btn primary" id="installInline">تثبيت التطبيق</button>
          <a class="btn" href="#/programs">البرامج والمصادر</a>
        </div>
        <div class="tip"><b>للأندرويد وأي متصفح:</b> من قائمة المتصفح اختار «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».<br>
        <b>لآيفون (Safari):</b> زرار المشاركة ⤴ ثم «إضافة إلى الشاشة الرئيسية».<br>
        <b>للكمبيوتر (كروم/إيدج):</b> أيقونة ⬇️ في شريط العنوان أو القائمة ثم «تثبيت EASY CODE».</div>
        <h3 style="margin-top:20px">نسخة احتياطية</h3>
        <div class="pg-actions">
          <button class="btn" id="exportBtn">تنزيل نسخة من تقدّمي</button>
          <label class="btn" style="cursor:pointer">استرجاع نسخة<input id="importFile" type="file" accept="application/json" hidden></label>
          <button class="btn" id="resetBtn" style="border-color:#7a2b2b;color:#ff9b9b">تصفير كل شيء</button>
        </div>
      </article>`;

    view.querySelectorAll("#avatarPicker button").forEach(b => {
      b.onclick = () => {
        profile.avatar = b.dataset.a; saveProfile();
        document.getElementById("avatarView").textContent = profile.avatar;
        view.querySelectorAll("#avatarPicker button").forEach(x => x.classList.toggle("on", x === b));
      };
    });
    const nameInput = document.getElementById("nameInput");
    nameInput.oninput = () => { profile.name = nameInput.value.trim(); saveProfile(); };
    const doInstall = () => triggerInstall();
    document.getElementById("installInline").onclick = doInstall;
    document.getElementById("exportBtn").onclick = () => {
      const data = { done: [...done], activity: [...activity], profile };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "easy-code-progress.json";
      a.click(); URL.revokeObjectURL(a.href);
    };
    document.getElementById("importFile").onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const d = JSON.parse(r.result);
          (d.done || []).forEach(x => done.add(x));
          (d.activity || []).forEach(x => activity.add(x));
          Object.assign(profile, d.profile || {});
          saveDone(); saveProfile();
          localStorage.setItem(K.activity, JSON.stringify([...activity]));
          renderProfile();
        } catch { alert("الملف مش صالح"); }
      };
      r.readAsText(f);
    };
    document.getElementById("resetBtn").onclick = () => {
      if (!confirm("متأكد؟ هيتمسح تقدّمك وبروفايلك من الجهاز.")) return;
      done.clear(); activity.clear();
      localStorage.removeItem(K.done); localStorage.removeItem(K.activity); localStorage.removeItem(K.profile);
      location.hash = "#/home";
    };
  }

  /* programs & resources (including Kaggle) */
  function renderPrograms() {
    renderNav("programs");
    const items = [
      { ico: "🎓", name: "Kaggle", badge: "الأهم لك", desc: "أكبر مجتمع للبيانات والذكاء الاصطناعي. داتاستات مجانية، نوتبوكس بجوجل كولاب GPU مجاني، وكومبتيشنز للتعلّم والمشاركة المدفوعة.", tags: ["Datasets", "Notebooks", "Competitions", "GPU مجاني"], url: "https://www.kaggle.com" },
      { ico: "🐙", name: "GitHub", badge: "شغل واحترافية", desc: "خزّن كودك، اشتغل مع فريق، وابنِ بورتفوليو حقيقي بلينكات تفرج على العملاء.", tags: ["Repos", "Pages", "Actions"], url: "https://github.com" },
      { ico: "🧠", name: "Google Colab", badge: "تشغيل مجاني", desc: "تشغيل بايثون و AI من المتصفح على GPU مجاني — مثالي للتجارب السريعة ودراسة الموديلات.", tags: ["Python", "GPU", "Notebooks"], url: "https://colab.research.google.com" },
      { ico: "📚", name: "MDN Web Docs", badge: "مرجع أساسي", desc: "المرجع الرسمي لـ HTML و CSS و JavaScript بالمستندات والأمثلة المحدّثة.", tags: ["HTML", "CSS", "JS"], url: "https://developer.mozilla.org" },
      { ico: "🏋️", name: "CodeWars", badge: "تمارين", desc: "تحديات برمجة بالتدريج، تدريب يومي يقوي منطقك في جافاسكربت وغيرها.", tags: ["Kata", "JS", "Python"], url: "https://www.codewars.com" },
      { ico: "🆓", name: "freeCodeCamp", badge: "منهج كامل", desc: "منهج مجاني كامل بشهادات، من أساسيات الويب لحد قواعد البيانات والتعلم الآلي.", tags: ["Certificates", "Projects"], url: "https://www.freecodecamp.org" }
    ];
    view.innerHTML = `
      <article class="card">
        <span class="tag">البرامج والمصادر</span>
        <h1 style="margin-top:12px">البرامج اللي تبني بها نفسك</h1>
        <p class="lead">كل برنامج هنا له دور واضح في رحلتك: تتعلّم، تطبّق، وتعمل شيئًا حقيقيًا يتحط في بورتفوليو.</p>
        <div class="res">
          ${items.map(i => `
            <div class="item">
              <div class="ico">${i.ico}</div>
              <div style="flex:1;min-width:0">
                <h3>${i.name} <span class="tag" style="font-size:11px;padding:2px 8px">${i.badge}</span></h3>
                <div class="tags">${i.tags.map(t => `<span>${t}</span>`).join("")}</div>
                <p>${i.desc}</p>
                <a class="btn small" href="${i.url}" target="_blank" rel="noopener">فتح ${i.name}</a>
              </div>
            </div>`).join("")}
        </div>
      </article>`;
  }

  /* install flow */
  let deferredPrompt = null;
  addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });
  addEventListener("appinstalled", () => { installBtn.hidden = true; deferredPrompt = null; });

  async function triggerInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const res = await deferredPrompt.userChoice.catch(() => null);
      if (res && res.outcome === "accepted") installBtn.hidden = true;
      deferredPrompt = null;
      return;
    }
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    alert(isIOS
      ? "لتثبيت التطبيق على آيفون: اضغط زرار المشاركة ⤴ ثم «إضافة إلى الشاشة الرئيسية»."
      : "افتح قائمة المتصفح (⋮) واختار «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية». لو الخيار مش ظاهر، التطبيق مثبّت بالفعل.");
  }
  installBtn.onclick = triggerInstall;

  /* search */
  function renderSearch(q) {
    renderNav("");
    const term = q.trim().toLowerCase();
    const hits = all.filter(l =>
      l.title.toLowerCase().includes(term) ||
      l.blocks.some(b => (b.text || "") && b.text.toLowerCase().includes(term))
    );
    view.innerHTML = `
      <div class="card">
        <h1>نتائج البحث: ${esc(q)}</h1>
        ${hits.length ? hits.map(l => `
          <a class="tile" style="margin-top:12px" href="#/lesson/${l.id}">
            <div class="meta"><span class="tag">${l.trackTitle}</span></div>
            <h3>${esc(l.title)}</h3>
          </a>`).join("") : '<p class="empty">مفيش نتائج — جرّب كلمة تانية زي flex أو متغيرات.</p>'}
      </div>`;
  }

  function renderNotFound() {
    view.innerHTML = `<div class="card"><h1>الصفحة مش موجودة</h1>
      <p class="lead">اللي بتدور عليه مش موجود.</p>
      <a class="btn primary" href="#/home">العودة للرئيسية</a></div>`;
  }

  /* router */
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [part, arg] = h.split("/");
    sidebar.classList.remove("open");
    document.body.classList.remove("nav-open");
    touchActivity();
    if (!part || part === "home") return renderHome();
    if (part === "lesson" && arg) return renderLesson(arg);
    if (part === "playground") return renderPlayground();
    if (part === "profile") return renderProfile();
    if (part === "programs") return renderPrograms();
    if (part === "search") return renderSearch(decodeURIComponent(arg || ""));
    return renderNotFound();
  }
  addEventListener("hashchange", route);

  /* search box */
  let st;
  searchInput.addEventListener("input", e => {
    clearTimeout(st);
    st = setTimeout(() => {
      const q = e.target.value.trim();
      if (!q) { location.hash = "#/home"; return; }
      location.hash = "#/search/" + encodeURIComponent(q);
    }, 350);
  });

  /* menu */
  document.getElementById("menuBtn").onclick = () => {
    sidebar.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  };

  /* pwa */
  if ("serviceWorker" in navigator) {
    addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then(reg => {
        reg.addEventListener("updatefound", () => {});
      }).catch(() => {});
    });
  }

  route();
})();
