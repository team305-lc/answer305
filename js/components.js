// ===================================================
// components.js  ヘッダー・フッターの共通部品
// ナビのリンク追加・変更はこのファイルだけ編集すればOK
// ===================================================

(function () {
  const page = document.body.dataset.page || '';

  // catalog/index.html (root) か catalog/html/*.html (サブフォルダ) かを判定
  const inHtml   = window.location.pathname.replace(/\\/g, '/').includes('/html/');
  const imgBase  = inHtml ? '../img/' : 'img/';
  const pageBase = inHtml ? '' : 'html/';
  const toIndex  = inHtml ? '../index.html' : 'index.html';

  function isActive(target) {
    return page === target ? ' class="nav-active"' : '';
  }

  // ===== ヘッダー =====
  const header = document.querySelector('header');
  if (header) {
    header.innerHTML = `
      <h1><img src="${imgBase}answer305_logo.png" alt="3.05" class="header-logo"></h1>
      <nav>
        <a href="${toIndex}"${isActive('top')}>TOP</a>
        <a href="${pageBase}works.html"${isActive('works')}>Works</a>
        <a href="${pageBase}skills.html"${isActive('skills')}>経歴・資格</a>
        <a href="${pageBase}library.html"${isActive('library')}>本棚・ゲーム</a>
        <a href="${pageBase}basketball.html"${isActive('basketball')}>バスケ</a>
        <a href="${pageBase}investment.html"${isActive('investment')}>投資</a>
        <a href="${pageBase}request.html" class="btn-request">お仕事を依頼する</a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="メニュー">
        <span></span><span></span><span></span>
      </button>
    `;
  }

  // ===== モバイルメニュー =====
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.innerHTML = `
      <a href="${toIndex}">TOP</a>
      <a href="${pageBase}works.html">Works</a>
      <a href="${pageBase}skills.html">経歴・資格</a>
      <a href="${pageBase}library.html">本棚・ゲーム</a>
      <a href="${pageBase}basketball.html">バスケ</a>
      <a href="${pageBase}investment.html">投資</a>
      <a href="${pageBase}request.html" class="btn-request">お仕事を依頼する</a>
    `;
  }

  // ===== フッター =====
  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `
      <img src="${imgBase}answer305_logo.png" alt="3.05" class="footer-logo">
      <nav class="footer-nav">
        <a href="${toIndex}">TOP</a>
        <a href="${pageBase}works.html">Works</a>
        <a href="${pageBase}skills.html">経歴・資格</a>
        <a href="${pageBase}library.html">本棚・ゲーム</a>
        <a href="${pageBase}basketball.html">バスケ</a>
        <a href="${pageBase}investment.html">投資</a>
        <a href="${pageBase}request.html">お仕事を依頼する</a>
      </nav>
      <p class="footer-copy">&copy; 2026 3.05. All rights reserved.</p>
    `;
  }
})();
