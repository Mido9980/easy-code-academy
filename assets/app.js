(() => {
  const { tracks } = window.LESSONS;
  const all = tracks.flatMap(t => t.lessons.map(l => ({ ...l, track: t.id, trackTitle: t.title, color: t.color })));
  const view = document.getElementById("view");
  const nav = document.getElementById("lessonNav");
  const searchInput = document.getElementById("search");
  const sidebar = document.getElementById("sidebar");
  const DONE_KEY = "easycode.done";
  const THEME_KEY = "easycode.theme";

  const done = new Set(JSON.parse(localStorage.getItem(DONE_KEY) || "[]"));
  const saveDone = () => localStorage.setItem(DONE_KEY, JSON.stringify([...done]));

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lessonById = id => all.find(l => l.id === id);

  /* ---------- theme ---------- */
  const applyTheme = t => {
    document.documentElement.dataset.theme = t;
    document.getElementById("themeBtn").textContent = t === "light" ? "☀️" : "🌙";
    localStorage.setItem(THEME_KEY, t);
  };
  applyTheme(localStorage.getItem(THEME_KEY) || "dark");
  document.getElementById("themeBtn").onclick = () =>
    applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");

  /* ---------- progress ---------- */
  function paintProgress() {
    const pct = Math.round((done.size / all.length) * 100);
    document.getElementById("progressText").textContent = pct + "%";
    document.getElementById("progressFill").style.width = pct + "%";
  }

  /* ---------- sidebar ---------- */
  function renderNav(activeId) {
    nav.innerHTML = tracks.map(t => `
      <div class="track">
        <h3 class="track-title"><span class="dot" style="background:${t.color}"></span>${t.title}</h3>
        ${t.lessons.map(l => `
          <a href="#/lesson/${l.id}" class="${l.id === activeId ? "active" : ""}">
            ${done.has(l.id) ? '<span class="tick">✔</span>' : '<span style="opacity:.35">○</span>'}
            <span>${esc(l.title)}</span>
          </a>`).join("")}
      </div>`).join("") + `<div class="track"><a href="#/playground" class="${activeId === "pg" ? "active" : ""}">
        <span style="opacity:.5">◧</span><span>المحرر التجريبي</span></a></div>`;
    paintProgress();
  }

  /* ---------- home ---------- */
  function renderHome() {
    renderNav("");
    view.innerHTML = `
      <section class="hero">
        <span class="tag">منصة عربية · مجانية</span>
        <h1 style="margin-top:12px">اتعلم البرمجة بالتطبيق العملي</h1>
        <p class="lead">دروس مختصرة وواضحة في HTML و CSS و JavaScript، وكل مثال تقدر تجرّبه وتعدّل فيه وتشوف النتيجة فورًا من متصفحك.</p>
        <div class="pg-actions" style="margin-top:16px">
          <a class="btn primary" href="#/lesson/${all[0].id}">ابدأ من هنا</a>
          <a class="btn" href="#/playground">افتح المحرر</a>
        </div>
        <div class="stats">
          <span><b>${all.length}</b> درس</span>
          <span><b>${tracks.length}</b> مسارات</span>
          <span><b>${done.size}</b> مكتمل</span>
          <span>يعمل أوفلاين بعد أول زيارة</span>
        </div>
      </section>
      <div class="grid">
        ${tracks.map(t => `
          <a class="tile" href="#/lesson/${t.lessons[0].id}">
            <div class="ico">${t.icon}</div>
            <h3>${t.title}</h3>
            <p>${t.lessons.length} دروس · ${t.lessons.map(l => esc(l.title)).slice(0, 2).join(" · ")}</p>
          </a>`).join("")}
        <a class="tile" href="#/playground">
          <div class="ico">🧪</div>
          <h3>المحرر التجريبي</h3>
          <p>اكتب HTML و CSS و JS وشوف النتيجة مباشرة.</p>
        </a>
      </div>`;
  }

  /* ---------- lesson ---------- */
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
        const code = document.getElementById(btn.dataset.try).textContent;
        sessionStorage.setItem("easycode.play", code);
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

  /* ---------- playground ---------- */
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
          <span style="color:var(--muted);font-size:13px;align-self:center">التنفيذ تلقائي أثناء الكتابة</span>
        </div>
        <div class="pg">
          <div class="pane">
            <div class="pane-head"><span>الكود</span><span>HTML</span></div>
            <textarea id="code" class="editor" spellcheck="false" dir="ltr"></textarea>
          </div>
          <div class="pane">
            <div class="pane-head"><span>النتيجة</span><span>Live</span></div>
            <iframe id="preview" title="معاينة" sandbox="allow-scripts allow-modals allow-forms"></iframe>
          </div>
        </div>
      </div>`;
    const ta = document.getElementById("code");
    const frame = document.getElementById("preview");
    ta.value = starter;
    let t;
    const run = () => {
      frame.srcdoc = ta.value;
      localStorage.setItem("easycode.last", ta.value);
    };
    ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(run, 500); });
    document.getElementById("run").onclick = run;
    document.getElementById("reset").onclick = () => { ta.value = starter; run(); };
    document.getElementById("clear").onclick = () => { ta.value = ""; run(); ta.focus(); };
    run();
  }

  /* ---------- search ---------- */
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
      <p class="lead">الدرس اللي بتدور عليه مش موجود.</p>
      <a class="btn primary" href="#/home">العودة للرئيسية</a></div>`;
  }

  /* ---------- router ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [part, arg] = h.split("/");
    sidebar.classList.remove("open");
    document.body.classList.remove("nav-open");
    if (!part || part === "home") return renderHome();
    if (part === "lesson" && arg) return renderLesson(arg);
    if (part === "playground") return renderPlayground();
    if (part === "search") return renderSearch(decodeURIComponent(arg || ""));
    return renderNotFound();
  }

  window.addEventListener("hashchange", route);

  /* ---------- search box ---------- */
  let st;
  searchInput.addEventListener("input", e => {
    clearTimeout(st);
    st = setTimeout(() => {
      const q = e.target.value.trim();
      if (!q) { location.hash = "#/home"; return; }
      location.hash = "#/search/" + encodeURIComponent(q);
    }, 350);
  });

  /* ---------- mobile menu ---------- */
  document.getElementById("menuBtn").onclick = () => {
    sidebar.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  };

  /* ---------- pwa ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }

  route();
})();
