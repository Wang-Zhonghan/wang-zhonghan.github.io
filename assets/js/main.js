/* 主题切换 + BibTeX 展开/复制 + 年份自动更新。无依赖，几十行。 */
(function () {
  'use strict';

  /* ---- 深色/浅色切换 -------------------------------------------------- */
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- BibTeX 展开，再点一次收起；点击代码块本身可复制 ----------------- */
  document.querySelectorAll('.bib-toggle').forEach(function (btn) {
    var bib = btn.closest('.pub__body').querySelector('.bib');
    if (!bib) return;

    btn.addEventListener('click', function () {
      var open = bib.hidden;
      bib.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });

    bib.title = 'Click to copy';
    bib.style.cursor = 'copy';
    bib.addEventListener('click', function () {
      navigator.clipboard.writeText(bib.textContent).then(function () {
        var old = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = old; }, 1200);
      }).catch(function () {});
    });
  });

  /* ---- 页脚年份 -------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
