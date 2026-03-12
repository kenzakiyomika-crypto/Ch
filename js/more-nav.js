/**
 * TACTICAL FITNESS — More Navigation Sheet v1.0
 * Phase 2: Bottom Nav "เพิ่มเติม" opens a bottom sheet
 * with all secondary pages grouped clearly.
 *
 * Inject via: <script src="../js/more-nav.js"></script>
 * Depends on: i18n.js (optional, degrades gracefully)
 */

'use strict';

const MoreNav = (() => {

  /* ── PAGE DEFINITIONS ─────────────────────────────── */
  const PAGES = {
    // Primary nav (shown in bottom nav always)
    primary: [
      { id: 'dashboard',  href: 'dashboard.html',  icon: '🏠', nameTH: 'ภาพรวม',     nameEN: 'Overview' },
      { id: 'training',   href: 'training.html',   icon: '⚔️', nameTH: 'ฝึกวันนี้',  nameEN: 'Train' },
      { id: 'planner',    href: 'planner.html',    icon: '📅', nameTH: 'ตารางฝึก',   nameEN: 'Schedule' },
      { id: 'missions',   href: 'missions.html',   icon: '🏅', nameTH: 'เกียรติยศ',  nameEN: 'Honors' },
      // 5th slot: "More" button — opens sheet
    ],

    // Secondary: shown inside More sheet
    secondary: [
      {
        sectionTH: '// ความก้าวหน้า',
        sectionEN: '// PROGRESS',
        items: [
          { href: 'performance.html', icon: '📊', nameTH: 'บันทึกการฝึก',    nameEN: 'Performance Log', descTH: 'PR + ประวัติ session', descEN: 'PRs + session history' },
          { href: 'rank.html',        icon: '◆',  nameTH: 'ยศ & ความสามารถ', nameEN: 'Rank',           descTH: 'ตรวจสอบยศและเงื่อนไข', descEN: 'Check rank & criteria' },
          { href: 'skill-tree.html',  icon: '🌿', nameTH: 'ต้นไม้ทักษะ',     nameEN: 'Skill Tree',     descTH: 'ปลดล็อกความสามารถ',    descEN: 'Unlock abilities' },
        ]
      },
      {
        sectionTH: '// วิเคราะห์',
        sectionEN: '// ANALYZE',
        items: [
          { href: 'intel-center.html',    icon: '📈', nameTH: 'ศูนย์วิเคราะห์',  nameEN: 'Intel Center',    descTH: 'สถิติ + การบาดเจ็บ',   descEN: 'Stats + injury tracking' },
          { href: 'science-planner.html', icon: '⚗',  nameTH: 'Science Planner', nameEN: 'Science Planner', descTH: 'วางแผนแบบวิทยาศาสตร์', descEN: 'Evidence-based planning' },
          { href: 'ultimate-coach.html',  icon: '🧠', nameTH: 'Ultimate Coach',  nameEN: 'Ultimate Coach',  descTH: 'AI coach ส่วนตัว',     descEN: 'Personal AI coach' },
          { href: 'ops-hub.html',         icon: '🎖', nameTH: 'OPS Hub',         nameEN: 'OPS Hub',         descTH: 'ทดสอบ ACFT + เสียง',  descEN: 'ACFT test + audio' },
        ]
      },
      {
        sectionTH: '// ระบบ',
        sectionEN: '// SYSTEM',
        items: [
          { href: 'settings.html',      icon: '⚙️', nameTH: 'ตั้งค่า',          nameEN: 'Settings',     descTH: 'ปรับการตั้งค่าทั้งหมด', descEN: 'All settings' },
          { href: 'import-export.html', icon: '⇅',  nameTH: 'นำเข้า / ส่งออก', nameEN: 'Import/Export', descTH: 'สำรองและกู้คืนข้อมูล',  descEN: 'Backup & restore data' },
        ]
      }
    ]
  };

  /* ── DETECT CURRENT PAGE ─────────────────────────── */
  function getCurrentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'dashboard.html';
    return file;
  }

  function isActive(href) {
    return getCurrentPage() === href;
  }

  function isSecondaryPage() {
    const cur = getCurrentPage();
    for (const group of PAGES.secondary) {
      for (const item of group.items) {
        if (item.href === cur) return true;
      }
    }
    return false;
  }

  /* ── LANGUAGE HELPER ─────────────────────────────── */
  function lang() {
    if (typeof I18n !== 'undefined') return I18n.getLang();
    try { return localStorage.getItem('tf_lang') || 'th'; } catch(e) { return 'th'; }
  }

  function tx(th, en) { return lang() === 'en' ? en : th; }

  /* ── BUILD BOTTOM NAV HTML ──────────────────────── */
  function buildBottomNav() {
    const cur = getCurrentPage();
    const moreActive = isSecondaryPage();

    const items = PAGES.primary.map(p => `
      <a href="${p.href}" class="bnav-item${cur === p.href ? ' active' : ''}">
        <div class="bnav-icon">${p.icon}</div>
        <div class="bnav-label">${tx(p.nameTH, p.nameEN)}</div>
      </a>
    `).join('');

    const moreLabel = tx('เพิ่มเติม', 'More');
    const moreBtn = `
      <button class="bnav-item${moreActive ? ' active' : ''}" id="more-nav-btn"
              onclick="MoreNav.open()" style="background:none;border:none;cursor:pointer;width:100%">
        <div class="bnav-icon">☰</div>
        <div class="bnav-label">${moreLabel}</div>
      </button>
    `;

    return `<div class="bnav-inner">${items}${moreBtn}</div>`;
  }

  /* ── BUILD MORE SHEET HTML ───────────────────────── */
  function buildSheet() {
    const allSections = PAGES.secondary.map(group => {
      const sectionLabel = tx(group.sectionTH, group.sectionEN);
      const items = group.items.map(item => {
        const active = isActive(item.href) ? ' style="border-color:rgba(0,255,136,.35);background:var(--green-dim)"' : '';
        return `
          <a href="${item.href}" class="more-item"${active} onclick="MoreNav.close()">
            <div class="more-item-icon">${item.icon}</div>
            <div class="more-item-text">
              <div class="more-item-name">${tx(item.nameTH, item.nameEN)}</div>
              <div class="more-item-desc">${tx(item.descTH, item.descEN)}</div>
            </div>
          </a>
        `;
      }).join('');

      return `
        <div class="more-section-label">${sectionLabel}</div>
        <div class="more-grid">${items}</div>
      `;
    }).join('');

    const title = tx('// ทุกหน้า', '// ALL PAGES');

    return `
      <div id="more-sheet-overlay" onclick="MoreNav.close()"></div>
      <div id="more-sheet" role="dialog" aria-modal="true" aria-label="${tx('เมนูเพิ่มเติม', 'More menu')}">
        <div class="more-handle"></div>
        <div class="more-sheet-title">${title}</div>
        ${allSections}
      </div>
    `;
  }

  /* ── OPEN / CLOSE ────────────────────────────────── */
  function open() {
    const sheet   = document.getElementById('more-sheet');
    const overlay = document.getElementById('more-sheet-overlay');
    if (!sheet) return;
    sheet.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Trap focus inside sheet
    setTimeout(() => { sheet.querySelector('a')?.focus(); }, 100);
  }

  function close() {
    const sheet   = document.getElementById('more-sheet');
    const overlay = document.getElementById('more-sheet-overlay');
    if (!sheet) return;
    sheet.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── SWIPE DOWN TO CLOSE ──────────────────────────── */
  function addSwipeClose(sheet) {
    let startY = 0;
    sheet.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
    sheet.addEventListener('touchend',   e => {
      const dy = e.changedTouches[0].clientY - startY;
      if (dy > 80) close();
    }, { passive: true });
  }

  /* ── KEYBOARD CLOSE ──────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  /* ── INJECT INTO PAGE ─────────────────────────────── */
  function inject() {
    // 1. Replace existing bottom nav inner content
    const bnav = document.querySelector('.bottom-nav');
    if (bnav) {
      bnav.innerHTML = buildBottomNav();
    }

    // 2. Inject More sheet + overlay into body
    if (!document.getElementById('more-sheet')) {
      const div = document.createElement('div');
      div.innerHTML = buildSheet();
      document.body.appendChild(div.firstElementChild); // overlay
      document.body.appendChild(div.lastElementChild);  // sheet
    }

    // 3. Add swipe-close
    const sheet = document.getElementById('more-sheet');
    if (sheet) addSwipeClose(sheet);

    // 4. Re-inject on language change
    document.addEventListener('langchange', () => {
      const bnav2 = document.querySelector('.bottom-nav');
      if (bnav2) bnav2.innerHTML = buildBottomNav();
      // Rebuild sheet content
      const oldSheet   = document.getElementById('more-sheet');
      const oldOverlay = document.getElementById('more-sheet-overlay');
      if (oldSheet)   oldSheet.remove();
      if (oldOverlay) oldOverlay.remove();
      const div2 = document.createElement('div');
      div2.innerHTML = buildSheet();
      document.body.appendChild(div2.firstElementChild);
      document.body.appendChild(div2.lastElementChild);
      const sheet2 = document.getElementById('more-sheet');
      if (sheet2) addSwipeClose(sheet2);
    });
  }

  /* ── INIT ─────────────────────────────────────────── */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject);
    } else {
      inject();
    }
  }

  init();
  return { open, close };

})();
