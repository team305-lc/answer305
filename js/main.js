// 年齢の自動計算・更新
// 誕生日: 1982年9月28日、9月27日23:59:59に年齢を更新
function calculateAge() {
  const now = new Date();
  const year = now.getFullYear();
  // 年齢更新タイミング: 9月27日 23:59:59
  const threshold = new Date(year, 8, 27, 23, 59, 59);
  return now >= threshold ? year - 1982 : year - 1982 - 1;
}

function updateAgeTag() {
  const tag = document.getElementById('age-tag');
  if (tag) tag.textContent = calculateAge() + '歳';
}

function scheduleNextAgeUpdate() {
  const now = new Date();
  const year = now.getFullYear();
  let next = new Date(year, 8, 27, 23, 59, 59);
  if (now >= next) next = new Date(year + 1, 8, 27, 23, 59, 59);
  const msUntilNext = next - now;
  setTimeout(() => {
    updateAgeTag();
    scheduleNextAgeUpdate();
  }, msUntilNext);
}

updateAgeTag();
scheduleNextAgeUpdate();

// ===== profile.js の内容をプロフィール欄に反映 =====
const profileBio = document.getElementById('profileBio');
if (profileBio && typeof profileText !== 'undefined') {
  profileBio.innerHTML = profileText
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

// トップへ戻るボタン
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  // 中身がなければ ↑ を入れる
  if (!backToTopBtn.textContent.trim()) backToTopBtn.textContent = '↑';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ===== 理念スライドショー =====
const slides     = document.querySelectorAll('.philosophy-slide');
const indWrap    = document.getElementById('philosophyIndicators');
const progressEl = document.getElementById('philosophyProgress');
const INTERVAL   = 6000; // 表示時間 (ms)

if (slides.length > 0 && indWrap) {
  let current   = 0;
  let timer     = null;
  let progTimer = null;

  // ドットを生成
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'indicator-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `スライド ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    indWrap.appendChild(dot);
  });

  const dots = indWrap.querySelectorAll('.indicator-dot');

  function goTo(next) {
    // 前スライドを非表示
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    // フェードインアニメーションをリセット（次回再生のため）
    const prevContent = slides[current].querySelector('.slide-content');
    prevContent.style.animation = 'none';
    void prevContent.offsetHeight; // reflow
    prevContent.style.animation = '';

    current = next;

    // 新スライドを表示
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    // プログレスバーをリセットして再スタート
    restartProgress();
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function restartProgress() {
    if (!progressEl) return;
    clearTimeout(progTimer);
    progressEl.classList.remove('running');
    progressEl.style.transition = 'none';
    progressEl.style.width = '0%';
    // reflow
    progressEl.offsetHeight;
    progressEl.classList.add('running');
  }

  function startAutoPlay() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  // 初期化
  restartProgress();
  startAutoPlay();
}

// Worksページ サービスブロック スライドイン
const serviceBlocks = document.querySelectorAll('.service-block');
if (serviceBlocks.length > 0) {
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  serviceBlocks.forEach(block => serviceObserver.observe(block));
}

// StrengthsFinder アコーディオン
const strengthsToggle = document.getElementById('strengthsToggle');
const strengthsBody = document.getElementById('strengthsBody');

if (strengthsToggle && strengthsBody) {
  strengthsToggle.addEventListener('click', () => {
    const isOpen = strengthsBody.classList.toggle('open');
    strengthsToggle.classList.toggle('open', isOpen);
    strengthsToggle.querySelector('span:first-child').textContent =
      isOpen ? '6〜34位を閉じる' : '6〜34位を見る';
  });
}

// タイムラインのフェードイン
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-12px)';
  item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(item);
});

// ファビコンを正方形に整形して円表示に対応
const faviconImg = new Image();
faviconImg.onload = () => {
  const target = 64;
  const canvas = document.createElement('canvas');
  canvas.width = target;
  canvas.height = target;
  const ctx = canvas.getContext('2d');
  const scale = Math.min(target / faviconImg.width, target / faviconImg.height);
  const w = faviconImg.width * scale;
  const h = faviconImg.height * scale;
  ctx.drawImage(faviconImg, (target - w) / 2, (target - h) / 2, w, h);
  const link = document.querySelector("link[rel='icon']");
  if (link) link.href = canvas.toDataURL('image/png');
};
const _inHtml = window.location.pathname.replace(/\\/g, '/').includes('/html/');
faviconImg.src = (_inHtml ? '../img/' : 'img/') + 'favicon.png';

// トップへ戻るボタン
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 依頼フォーム → Google Forms 送信（fetch no-cors）
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

// 文字数カウンター
function setupCounter(inputId, counterId, max) {
  const el = document.getElementById(inputId);
  const counter = document.getElementById(counterId);
  if (!el || !counter) return;
  const update = () => {
    const len = el.value.length;
    counter.textContent = `${len} / ${max}`;
    counter.classList.toggle('char-counter--over', len >= max);
  };
  el.addEventListener('input', update);
  update();
}

setupCounter('nameInput', 'nameCounter', 100);
setupCounter('messageInput', 'messageCounter', 2000);

// メールアドレス：全角文字を半角に自動変換 + カウンター
const emailInput = document.getElementById('emailInput');
const emailCounter = document.getElementById('emailCounter');
if (emailInput) {
  emailInput.addEventListener('input', () => {
    emailInput.value = emailInput.value
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
      .replace(/[^\x21-\x7E]/g, '');
    if (emailCounter) {
      const len = emailInput.value.length;
      emailCounter.textContent = `${len} / 255`;
      emailCounter.classList.toggle('char-counter--over', len >= 255);
    }
  });
}

if (form && successMsg) {
  const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSdxUFkpD2PlWuRv-FYXbDCwIAzQHo5LSJNHbzBBnc8VLKxb-A/formResponse';
  const ENTRY = {
    name:          'entry.1919308361',
    email:         'entry.1874592689',
    service:       'entry.382928516',
    serviceOther:  'entry.382928516.other_option_response',
    budget:        'entry.1969688026',
    deadlineYear:  'entry.1520928296_year',
    deadlineMonth: 'entry.1520928296_month',
    deadlineDay:   'entry.1520928296_day',
    videoChat:     'entry.2091505868',
    message:       'entry.2014809105',
  };

  // チェックを入れたときだけエラーを消す
  form.querySelectorAll('[name="service"]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) {
        const errEl = document.getElementById('serviceError');
        if (errEl) errEl.style.display = 'none';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // チェックボックス必須チェック
    const checked = Array.from(form.querySelectorAll('[name="service"]:checked'));
    const errEl = document.getElementById('serviceError');
    if (checked.length === 0) {
      if (errEl) errEl.style.display = 'block';
      return;
    }
    if (errEl) errEl.style.display = 'none';

    const params = new URLSearchParams();
    params.append(ENTRY.name, form.querySelector('[name="name"]').value.trim());
    params.append(ENTRY.email, form.querySelector('[name="email"]').value.trim());

    checked.forEach(cb => {
      if (cb.value === 'その他') {
        params.append(ENTRY.service, '__other_option__');
        params.append(ENTRY.serviceOther, 'その他');
      } else {
        params.append(ENTRY.service, cb.value);
      }
    });

    params.append(ENTRY.budget, form.querySelector('[name="budget"]').value);

    const deadline = form.querySelector('[name="deadline"]').value;
    if (deadline) {
      const [year, month, day] = deadline.split('-');
      params.append(ENTRY.deadlineYear, year);
      params.append(ENTRY.deadlineMonth, String(Number(month)));
      params.append(ENTRY.deadlineDay, String(Number(day)));
    }

    const videoChatEl = form.querySelector('[name="videoChat"]:checked');
    if (videoChatEl) params.append(ENTRY.videoChat, videoChatEl.value);

    params.append(ENTRY.message, form.querySelector('[name="message"]').value.trim());

    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.disabled = true;

    fetch(GOOGLE_FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      body: params,
    })
      .then(() => {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      })
      .catch(() => {
        submitBtn.disabled = false;
      });
  });
}

// ===== 本棚カルーセル =====
(function () {
  const shelves = document.querySelectorAll('.shelf-carousel');
  if (!shelves.length) return;

  const INTERVAL = 3600; // 自動スクロール間隔 (ms)
  const ALL_POS = ['pos-prev2', 'pos-prev1', 'pos-active', 'pos-next1', 'pos-next2'];

  /** 符号付き距離 (i と current の差を -n/2 〜 n/2 に正規化) */
  function signedDist(i, current, n) {
    let d = ((i - current) % n + n) % n;
    if (d > n / 2) d -= n;
    return d;
  }

  /** 距離から位置クラス名を返す */
  function posClass(dist) {
    if (dist ===  0) return 'pos-active';
    if (dist ===  1) return 'pos-next1';
    if (dist === -1) return 'pos-prev1';
    if (dist ===  2) return 'pos-next2';
    if (dist === -2) return 'pos-prev2';
    return null; // それ以外は非表示
  }

  shelves.forEach(shelf => {
    const stage      = shelf.querySelector('.carousel-stage');
    const items      = Array.from(stage.querySelectorAll('.carousel-item'));
    const dotsWrap   = shelf.querySelector('.carousel-dots');
    const prevBtn    = shelf.querySelector('.carousel-prev');
    const nextBtn    = shelf.querySelector('.carousel-next');
    const n          = items.length;

    if (!n) return;

    let current = 0;
    let timer   = null;

    // ---- ドットを生成 ----
    items.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('aria-label', `${i + 1}冊目`);
      btn.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(btn);
    });
    const dots = Array.from(dotsWrap.querySelectorAll('.carousel-dot'));

    // ---- 表示更新 ----
    function update() {
      items.forEach((item, i) => {
        // 既存の位置クラスをすべて削除
        ALL_POS.forEach(c => item.classList.remove(c));
        const cls = posClass(signedDist(i, current, n));
        if (cls) item.classList.add(cls);
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }

    function goTo(idx) {
      current = ((idx % n) + n) % n;
      update();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // ---- 自動スクロール ----
    function startAuto() {
      clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }
    function stopAuto() { clearInterval(timer); }

    // ---- ボタン ----
    prevBtn.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    nextBtn.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

    // ---- ホバーで一時停止 ----
    shelf.addEventListener('mouseenter', stopAuto);
    shelf.addEventListener('mouseleave', startAuto);

    // ---- 背表紙クリックで移動 ----
    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        if (i !== current) { goTo(i); stopAuto(); startAuto(); }
      });
    });

    // ---- タッチスワイプ ----
    let touchX = 0;
    stage.addEventListener('touchstart', e => {
      touchX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });
    stage.addEventListener('touchend', e => {
      const dx = touchX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 45) { dx > 0 ? next() : prev(); }
      startAuto();
    }, { passive: true });

    // ---- 初期表示 ----
    update();
    startAuto();
  });
})();
