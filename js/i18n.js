/**
 * TACTICAL FITNESS — i18n Engine v1.0
 * ระบบสลับภาษา EN ↔ TH
 * ใช้ data-i18n attribute บน HTML elements
 * เรียก I18n.apply() หลัง DOM ready
 */

'use strict';

const I18n = (() => {

  /* ─────────────────────────────────────────
     TRANSLATION DICTIONARY
     Key: unique string ID
     Value: { th: '...', en: '...' }
  ───────────────────────────────────────── */
  const DICT = {

    /* ═══════════════════════════════════════
       SIDEBAR — ทุกหน้า
    ═══════════════════════════════════════ */
    'nav.system':         { th: '// ระบบ',           en: '// SYSTEM' },
    'nav.dashboard':      { th: 'ศูนย์บัญชาการ',     en: 'Command Center' },
    'nav.training':       { th: 'ฝึกวันนี้',          en: "Today's Training" },
    'nav.planner':        { th: 'ตารางรายเดือน',      en: 'Monthly Planner' },
    'nav.analyze':        { th: '// วิเคราะห์',       en: '// ANALYZE' },
    'nav.intel':          { th: 'ศูนย์วิเคราะห์',     en: 'Intel Center' },
    'nav.ops':            { th: 'OPS Hub',             en: 'OPS Hub' },
    'nav.coach':          { th: 'Ultimate Coach',      en: 'Ultimate Coach' },
    'nav.science':        { th: 'Science Planner',     en: 'Science Planner' },
    'nav.progress':       { th: '// ความก้าวหน้า',    en: '// PROGRESS' },
    'nav.performance':    { th: 'บันทึกผลการฝึก',     en: 'Performance Log' },
    'nav.rank':           { th: 'ยศ & ความสามารถ',    en: 'Rank & Capability' },
    'nav.missions':       { th: 'ภารกิจ & เหรียญ',    en: 'Missions & Medals' },
    'nav.skilltree':      { th: 'ต้นไม้ทักษะ',        en: 'Skill Tree' },
    'nav.settings':       { th: 'ตั้งค่า',             en: 'Settings' },
    'nav.importexport':   { th: 'นำเข้า / ส่งออก',   en: 'Import / Export' },

    /* ═══════════════════════════════════════
       BOTTOM NAV — ทุกหน้า
    ═══════════════════════════════════════ */
    'bnav.overview':      { th: 'ภาพรวม',    en: 'Overview' },
    'bnav.schedule':      { th: 'ตารางฝึก',  en: 'Schedule' },
    'bnav.today':         { th: 'ฝึกวันนี้', en: 'Train' },
    'bnav.honors':        { th: 'เกียรติยศ', en: 'Honors' },
    'bnav.settings':      { th: 'ตั้งค่า',   en: 'Settings' },
    'bnav.progress':  { th: 'ผล',         en: 'Progress' },
    'bnav.goals':     { th: 'เป้าหมาย',   en: 'Goals' },
    'bnav.me':        { th: 'ฉัน',         en: 'Me' },


    /* ═══════════════════════════════════════
       DASHBOARD
    ═══════════════════════════════════════ */
    'dash.loading':          { th: 'กำลังโหลดข้อมูล...', en: 'Loading data...' },
    'dash.pr_title':         { th: '// PR ส่วนตัว',       en: '// PERSONAL RECORDS' },
    'dash.missions_active':  { th: '// ภารกิจที่กำลังดำเนินการ', en: '// ACTIVE MISSIONS' },
    'dash.this_week':        { th: '// THIS WEEK',         en: '// THIS WEEK' },
    'dash.operator_status':  { th: '// OPERATOR STATUS',   en: '// OPERATOR STATUS' },
    'dash.no_pr':            { th: 'ยังไม่มี PR — เริ่ม training', en: 'No PR yet — start training' },
    'dash.no_missions':      { th: '// ไม่มีภารกิจที่ Active', en: '// No active missions' },
    'dash.missions_all_done':{ th: '// ภารกิจทั้งหมดสำเร็จแล้ว 🎖', en: '// All missions complete 🎖' },
    'dash.start_mission':    { th: '→ เริ่มภารกิจใหม่',  en: '→ Start new mission' },
    'dash.new_mission':      { th: '→ รับภารกิจใหม่',    en: '→ Accept new mission' },
    'dash.start_today':      { th: 'START TODAY',          en: 'START TODAY' },
    'dash.battle_log':       { th: 'BATTLE LOG',           en: 'BATTLE LOG' },
    'dash.days':             { th: 'days',                 en: 'days' },
    'dash.active':           { th: 'active',               en: 'active' },
    'dash.pts':              { th: 'pts',                  en: 'pts' },

    /* ═══════════════════════════════════════
       TRAINING PAGE
    ═══════════════════════════════════════ */
    'train.title':            { th: 'ฝึกวันนี้',                   en: "TODAY'S TRAINING" },
    'train.select_focus':     { th: '// SELECT FOCUS',              en: '// SELECT FOCUS' },
    'train.exercise_list':    { th: '// ท่าฝึก LIST',              en: '// EXERCISE LIST' },
    'train.quick_add':        { th: '// QUICK ADD',                 en: '// QUICK ADD' },
    'train.session_mode':     { th: '// SESSION MODE',              en: '// SESSION MODE' },
    'train.start_session':    { th: '⚡ START SESSION',             en: '⚡ START SESSION' },
    'train.standard':         { th: 'STANDARD',                     en: 'STANDARD' },
    'train.standard_desc':    { th: 'Sets × Reps ปกติ',            en: 'Standard Sets × Reps' },
    'train.superset':         { th: 'SUPERSET',                     en: 'SUPERSET' },
    'train.superset_desc':    { th: '2 exercises สลับ ไม่มีพัก',  en: '2 exercises alternated, no rest' },
    'train.amrap':            { th: 'AMRAP',                        en: 'AMRAP' },
    'train.amrap_desc':       { th: 'Max reps ใน X นาที',          en: 'Max reps in X minutes' },
    'train.emom':             { th: 'EMOM',                         en: 'EMOM' },
    'train.emom_desc':        { th: 'Every Minute On Minute',       en: 'Every Minute On Minute' },
    'train.tabata':           { th: 'TABATA',                       en: 'TABATA' },
    'train.tabata_desc':      { th: '20s ON / 10s OFF × 8',        en: '20s ON / 10s OFF × 8' },
    'train.cluster':          { th: 'CLUSTER',                      en: 'CLUSTER' },
    'train.cluster_desc':     { th: 'Mini sets ในช่วงพัก',         en: 'Mini sets during rest' },
    'train.full_body':        { th: '⚡ FULL BODY',                 en: '⚡ FULL BODY' },
    'train.full_body_sub':    { th: 'COMPOUND',                     en: 'COMPOUND' },
    'train.upper':            { th: 'UPPER',                        en: 'UPPER' },
    'train.upper_sub':        { th: 'PUSH + PULL',                  en: 'PUSH + PULL' },
    'train.lower':            { th: 'LOWER',                        en: 'LOWER' },
    'train.lower_sub':        { th: 'LEGS + GLUTES',                en: 'LEGS + GLUTES' },
    'train.core':             { th: 'CORE',                         en: 'CORE' },
    'train.core_sub':         { th: 'ABS + BACK',                   en: 'ABS + BACK' },
    'train.cardio':           { th: 'CARDIO',                       en: 'CARDIO' },
    'train.cardio_sub':       { th: 'ENDURANCE',                    en: 'ENDURANCE' },
    'train.custom':           { th: 'CUSTOM',                       en: 'CUSTOM' },
    'train.custom_sub':       { th: 'YOUR LIST',                    en: 'YOUR LIST' },
    'train.no_exercises':     { th: '// เลือก focus หรือเพิ่ม exercise เอง', en: '// Select a focus or add exercises' },
    'train.add_btn':          { th: '+ ADD',                        en: '+ ADD' },
    'train.ex_input_ph':      { th: 'ชื่อ exercise...',            en: 'Exercise name...' },
    'train.duration_min':     { th: '⏱ DURATION (MINUTES)',        en: '⏱ DURATION (MINUTES)' },
    'train.rounds':           { th: '🔄 ROUNDS',                   en: '🔄 ROUNDS' },
    'train.work_sec':         { th: '⚡ WORK (SEC)',                en: '⚡ WORK (SEC)' },
    'train.rest_sec':         { th: '💤 REST (SEC)',                en: '💤 REST (SEC)' },
    'train.total_reps':       { th: '🎯 TOTAL REPS',               en: '🎯 TOTAL REPS' },
    'train.mini_set':         { th: '◼ MINI SET SIZE',             en: '◼ MINI SET SIZE' },
    'train.intra_rest':       { th: '⏳ INTRA REST (SEC)',         en: '⏳ INTRA REST (SEC)' },
    'train.abort':            { th: '✕ ABORT',                     en: '✕ ABORT' },
    'train.session_progress': { th: '// SESSION PROGRESS',         en: '// SESSION PROGRESS' },
    'train.sets_label':       { th: '// เซตS',                     en: '// SETS' },
    'train.skip_btn':         { th: 'SKIP ›',                      en: 'SKIP ›' },
    'train.done_next':        { th: 'DONE — NEXT ⚡',              en: 'DONE — NEXT ⚡' },
    'train.rest_period':      { th: '// REST PERIOD',              en: '// REST PERIOD' },
    'train.skip_rest':        { th: '⚡ SKIP REST',                en: '⚡ SKIP REST' },
    'train.log_set':          { th: 'LOG SET',                     en: 'LOG SET' },
    'train.mark_done':        { th: 'MARK DONE',                   en: 'MARK DONE' },
    'train.log_run':          { th: 'LOG RUN',                     en: 'LOG RUN' },
    'train.record_time':      { th: 'บันทึกเวลา',                  en: 'Record time' },
    'train.breakdown':        { th: '// ท่าฝึก BREAKDOWN',         en: '// EXERCISE BREAKDOWN' },
    'train.session_notes':    { th: '// SESSION NOTES',            en: '// SESSION NOTES' },
    'train.notes_ph':         { th: 'บันทึกความรู้สึก, PR, หรืออะไรก็ได้...', en: 'Note how you felt, PRs, or anything...' },
    'train.save_session':     { th: '💾 SAVE SESSION',             en: '💾 SAVE SESSION' },
    'train.back_cc':          { th: '← BACK TO COMMAND CENTER',    en: '← BACK TO COMMAND CENTER' },
    'train.session_complete': { th: 'เซสชัน สำเร็จ!',             en: 'Session Complete!' },
    'train.consecutive_days': { th: 'วันติดต่อกัน',               en: 'consecutive days' },
    'train.exercises_label':  { th: 'EXERCISES',                   en: 'EXERCISES' },
    'train.minutes_label':    { th: 'MINUTES',                     en: 'MINUTES' },
    'train.total_reps_label': { th: 'TOTAL REPS',                  en: 'TOTAL REPS' },
    'train.live_coach':       { th: '// LIVE COACH',               en: '// LIVE COACH' },
    'train.analyzing':        { th: 'กำลังวิเคราะห์...',          en: 'Analyzing...' },
    'train.confirm_abort':    { th: 'ยกเลิก session นี้?',        en: 'Cancel this session?' },
    'train.select_at_least':  { th: 'เลือก exercise อย่างน้อย 1 ตัว', en: 'Select at least 1 exercise' },

    /* ═══════════════════════════════════════
       PLANNER PAGE
    ═══════════════════════════════════════ */
    'plan.title':           { th: 'ตาราง รายเดือน',             en: 'Monthly Planner' },
    'plan.save':            { th: '💾 บันทึก',                  en: '💾 Save' },
    'plan.training_days':   { th: '// TRAINING DAYS PER WEEK', en: '// TRAINING DAYS PER WEEK' },
    'plan.program_type':    { th: '// PROGRAM TYPE',            en: '// PROGRAM TYPE' },
    'plan.generate':        { th: '⚡ GENERATE FOR',            en: '⚡ GENERATE FOR' },
    'plan.clear':           { th: 'CLEAR',                      en: 'CLEAR' },
    'plan.auto_generate':   { th: '⚡ AUTO-GENERATE PLAN',      en: '⚡ AUTO-GENERATE PLAN' },
    'plan.auto_desc':       { th: 'ระบบจะสร้างตารางซ้อม progressive overload ให้อัตโนมัติ\nโดยคำนวณจาก fitness level และจำนวนวันที่เลือก',
                              en: 'The system will auto-generate a progressive overload schedule\nbased on your fitness level and selected training days.' },
    'plan.rest_day':        { th: '🛌 REST DAY',                en: '🛌 REST DAY' },
    'plan.full_body':       { th: '⚡ FULL BODY',               en: '⚡ FULL BODY' },
    'plan.upper':           { th: '💪 UPPER',                   en: '💪 UPPER' },
    'plan.lower':           { th: '🦵 LOWER',                   en: '🦵 LOWER' },
    'plan.core':            { th: '🧱 CORE',                    en: '🧱 CORE' },
    'plan.cardio':          { th: '🏃 CARDIO',                  en: '🏃 CARDIO' },
    'plan.custom':          { th: '✏️ CUSTOM',                  en: '✏️ CUSTOM' },
    'plan.save_day':        { th: '✓ SAVE DAY',                 en: '✓ SAVE DAY' },
    'plan.clear_day':       { th: 'CLEAR',                      en: 'CLEAR' },
    'plan.add_exercise':    { th: '+ เพิ่ม exercise...',        en: '+ Add exercise...' },
    'plan.no_exercises':    { th: '// ยังไม่มี exercise',       en: '// No exercises yet' },
    'plan.session_type':    { th: '// SESSION TYPE',            en: '// SESSION TYPE' },
    'plan.exercises_lbl':   { th: '// ท่าฝึกS',                en: '// EXERCISES' },
    'plan.days_remaining':  { th: 'DAYS REMAINING',             en: 'DAYS REMAINING' },
    'plan.completed':       { th: 'COMPLETED',                  en: 'COMPLETED' },
    'plan.rest_label':      { th: '— REST —',                   en: '— REST —' },
    'plan.confirm_clear':   { th: 'ล้างแผนเดือนนี้ทั้งหมด?',  en: 'Clear all plans this month?' },
    'plan.prog_fullbody':   { th: 'Full Body 3x/week',          en: 'Full Body 3x/week' },
    'plan.prog_ul':         { th: 'Upper / Lower Split',        en: 'Upper / Lower Split' },
    'plan.prog_ppl':        { th: 'Push / Pull / Legs',         en: 'Push / Pull / Legs' },
    'plan.prog_cs':         { th: 'Strength + Cardio',          en: 'Strength + Cardio' },

    /* ═══════════════════════════════════════
       PERFORMANCE / LOG PAGE
    ═══════════════════════════════════════ */
    'perf.title':           { th: 'บันทึก ผลการฝึก',           en: 'Performance Log' },
    'perf.pr_title':        { th: 'PR ส่วนตัว',                 en: 'Personal Records' },
    'perf.session_hist':    { th: 'ประวัติเซสชัน',              en: 'Session History' },
    'perf.results':         { th: 'ผลการฝึก',                   en: 'Results' },
    'perf.all_sessions':    { th: '// เซสชันทั้งหมด',           en: '// ALL SESSIONS' },
    'perf.no_filter':       { th: '// ไม่มี session ที่ตรงเงื่อนไข', en: '// No sessions match filter' },
    'perf.no_pr':           { th: '// ยังไม่มีข้อมูล PR',       en: '// No PR data yet' },
    'perf.no_exercises':    { th: 'ไม่มีข้อมูล exercise',       en: 'No exercise data' },
    'perf.exercises_lbl':   { th: '// ท่าฝึกS',                en: '// EXERCISES' },
    'perf.this_month':      { th: '// THIS MONTH',              en: '// THIS MONTH' },
    'perf.total_time':      { th: '// TOTAL TIME',              en: '// TOTAL TIME' },
    'perf.weekly_vol':      { th: '// WEEKLY VOLUME',           en: '// WEEKLY VOLUME' },
    'perf.heatmap':         { th: '// ACTIVITY HEATMAP — LAST 12 WEEKS', en: '// ACTIVITY HEATMAP — LAST 12 WEEKS' },
    'perf.operator_card':   { th: '// OPERATOR CARD — PNG',    en: '// OPERATOR CARD — PNG' },
    'perf.weekly_report':   { th: '// WEEKLY REPORT — HTML',   en: '// WEEKLY REPORT — HTML' },
    'perf.gen_card':        { th: '🎖 GENERATE CARD',           en: '🎖 GENERATE CARD' },
    'perf.dl_png':          { th: '⬇ DOWNLOAD PNG',            en: '⬇ DOWNLOAD PNG' },
    'perf.gen_report':      { th: '📋 GENERATE REPORT',         en: '📋 GENERATE REPORT' },
    'perf.print_pdf':       { th: '🖨 PRINT / SAVE PDF',        en: '🖨 PRINT / SAVE PDF' },
    'perf.settings_link':   { th: 'ไปที่ Settings →',           en: 'Go to Settings →' },
    'perf.settings_note':   { th: '⚙ อัปเดต PT Test ได้ใน Settings', en: '⚙ Update PT Test in Settings' },
    'perf.no_change':       { th: '— no change',               en: '— no change' },
    'perf.sessions':        { th: '— sessions',                 en: '— sessions' },

    /* ═══════════════════════════════════════
       RANK PAGE
    ═══════════════════════════════════════ */
    'rank.title':           { th: 'ยศ & ความสามารถ',            en: 'Rank & Capability' },
    'rank.page_title':      { th: 'ยศ & ความสามารถ',            en: 'Rank & Capability' },
    'rank.all_ranks':       { th: '// RANK LADDER — ALL 21 RANKS', en: '// RANK LADDER — ALL 21 RANKS' },
    'rank.track_criteria':  { th: '// TRACK CRITERIA — NEXT RANK', en: '// TRACK CRITERIA — NEXT RANK' },
    'rank.promo_test':      { th: '// PROMOTION TEST',          en: '// PROMOTION TEST' },
    'rank.capability':      { th: '// CAPABILITY SCORES',       en: '// CAPABILITY SCORES' },
    'rank.career_path':     { th: '// CAREER PATH',             en: '// CAREER PATH' },
    'rank.progress':        { th: '// ความก้าวหน้า TO NEXT RANK', en: '// PROGRESS TO NEXT RANK' },
    'rank.no_criteria':     { th: 'ไม่พบข้อมูล Track Criteria', en: 'No Track Criteria found' },
    'rank.no_special':      { th: 'ไม่มีเงื่อนไขพิเศษ',        en: 'No special requirements' },
    'rank.loading':         { th: 'กำลังโหลด...',               en: 'Loading...' },
    'rank.level':           { th: 'ระดับ: —',                   en: 'Level: —' },
    'rank.prestige':        { th: '⭐ PRESTIGE',                 en: '⭐ PRESTIGE' },
    'rank.prestige_tip':    { th: 'กด PRESTIGE เพื่อรีเซ็ตและรับ Prestige Star', en: 'Press PRESTIGE to reset and earn a Prestige Star' },
    'rank.max_achieved':    { th: '🏆 MAX RANK ACHIEVED',        en: '🏆 MAX RANK ACHIEVED' },
    'rank.locked':          { th: '🔒 ปลดล็อกที่ ร้อยตรี',     en: '🔒 Unlocks at 2nd Lieutenant' },
    'rank.tier':            { th: '// — TIER',                  en: '// — TIER' },
    'rank.current':         { th: 'CURRENT',                    en: 'CURRENT' },

    /* ═══════════════════════════════════════
       MISSIONS PAGE
    ═══════════════════════════════════════ */
    'mission.title':        { th: 'ภารกิจ & เหรียญ',           en: 'Missions & Medals' },
    'mission.active':       { th: '// ภารกิจที่กำลังดำเนินการ', en: '// ACTIVE MISSIONS' },
    'mission.completed':    { th: '// ภารกิจที่เสร็จสิ้น',      en: '// COMPLETED MISSIONS' },
    'mission.medal_wall':   { th: '// ผนังเหรียญ',              en: '// MEDAL WALL' },
    'mission.no_active':    { th: '// ไม่มี active mission — เริ่มจาก panel ด้านล่าง', en: '// No active missions — start from panel below' },
    'mission.all_active':   { th: '// Mission ทั้งหมด active แล้ว', en: '// All missions are active' },
    'mission.start_new':    { th: '+ เริ่ม Mission ใหม่',        en: '+ Start New Mission' },
    'mission.choose_tmpl':  { th: 'เลือก mission template หรือสร้าง custom เพื่อเพิ่มเป้าหมายใหม่', en: 'Choose a mission template or create a custom goal' },
    'mission.loading':      { th: 'กำลังโหลด...',               en: 'Loading...' },
    'mission.abandon':      { th: 'ABANDON',                    en: 'ABANDON' },
    'mission.day_streak':   { th: 'DAY STREAK',                 en: 'DAY STREAK' },
    'mission.medals_earned':{ th: 'MEDALS EARNED',              en: 'MEDALS EARNED' },

    /* ═══════════════════════════════════════
       SETTINGS PAGE
    ═══════════════════════════════════════ */
    'set.title':            { th: 'ระบบ ตั้งค่า',              en: 'System Settings' },
    'set.personal':         { th: '// ข้อมูลส่วนตัว',          en: '// PERSONAL INFO' },
    'set.body_data':        { th: '// ข้อมูลร่างกาย',           en: '// BODY DATA' },
    'set.training_sched':   { th: '// ตารางฝึก',               en: '// TRAINING SCHEDULE' },
    'set.training_defaults':{ th: '// ค่าเริ่มต้นการฝึก',      en: '// TRAINING DEFAULTS' },
    'set.pt_test':          { th: '// ทดสอบ PT & ข้อมูลสมรรถภาพ', en: '// PT TEST & PERFORMANCE DATA' },
    'set.display':          { th: '// การแสดงผล',               en: '// DISPLAY' },
    'set.notifications':    { th: '// การแจ้งเตือน & การเตือน', en: '// NOTIFICATIONS & ALERTS' },
    'set.injury':           { th: '// สถานะบาดเจ็บ',           en: '// INJURY STATUS' },
    'set.app_info':         { th: '// ข้อมูลแอป',              en: '// APP INFO' },
    'set.language':         { th: 'ภาษาของ interface',          en: 'Interface language' },
    'set.lang_th':          { th: 'ภาษาไทย',                    en: 'Thai' },
    'set.lang_en':          { th: 'English',                    en: 'English' },
    'set.units':            { th: 'หน่วยวัดที่ใช้แสดงผล',      en: 'Measurement units' },
    'set.weekstart':        { th: 'วันเริ่มต้นสัปดาห์',        en: 'Week start day' },
    'set.weekstart_sub':    { th: 'วันเริ่มต้นสัปดาห์ใน planner', en: 'Week start day in planner' },
    'set.font_size':        { th: 'ขนาดตัวอักษร',              en: 'Font size' },
    'set.font_size_sub':    { th: 'ขนาดตัวอักษรทั่วไป',        en: 'General font size' },
    'set.ui_color':         { th: 'สีหลัก UI',                  en: 'Primary UI color' },
    'set.ui_color_sub':     { th: 'สีหลักของ UI (เขียว = default)', en: 'Main UI color (green = default)' },
    'set.wakelock':         { th: 'ป้องกันหน้าจอดับ',           en: 'Prevent screen lock' },
    'set.wakelock_sub':     { th: 'ป้องกันหน้าจอดับขณะออกกำลังกาย (WakeLock API)', en: 'Keep screen on during training (WakeLock API)' },
    'set.auto_rest':        { th: 'เริ่มจับเวลาพักอัตโนมัติ',  en: 'Auto-start rest timer' },
    'set.auto_rest_sub':    { th: 'เริ่ม rest countdown อัตโนมัติหลัง log set', en: 'Auto-start rest countdown after logging a set' },
    'set.default_rest':     { th: 'เวลาพักเริ่มต้น',            en: 'Default rest time' },
    'set.default_rest_sub': { th: 'เวลาพักระหว่าง set (วินาที)', en: 'Rest time between sets (seconds)' },
    'set.default_sets':     { th: 'จำนวน Set เริ่มต้น',        en: 'Default sets' },
    'set.default_sets_sub': { th: 'จำนวน set default ใน training', en: 'Default set count in training' },
    'set.save_btn':         { th: '💾 บันทึก',                  en: '💾 Save' },
    'set.reset_training':   { th: 'รีเซ็ตข้อมูลการฝึก',        en: 'Reset training data' },
    'set.reset_training_sub':{ th: 'ลบ Workout Logs, Monthly Plans, Fatigue Snapshots, Missions และ Medals', en: 'Delete Workout Logs, Monthly Plans, Fatigue Snapshots, Missions and Medals' },
    'set.reset_all':        { th: 'รีเซ็ตทั้งหมด (Factory Reset)', en: 'Factory Reset (Delete All)' },
    'set.reset_all_sub':    { th: 'ลบข้อมูลทุกอย่าง รวมโปรไฟล์และ settings — เริ่มต้นใหม่', en: 'Delete everything including profile and settings — start fresh' },
    'set.danger_zone':      { th: '⚠ DANGER ZONE',             en: '⚠ DANGER ZONE' },
    'set.confirm_reset':    { th: 'ยืนยันการรีเซ็ต',           en: 'Confirm reset' },
    'set.loading':          { th: 'กำลังโหลด...',               en: 'Loading...' },
    'set.enter_to_use':     { th: 'กรอกเพื่อใช้งาน',            en: 'Fill in to use' },
    'set.member_since':     { th: 'เป็นสมาชิกตั้งแต่',          en: 'Member since' },
    'set.total_sessions':   { th: 'เซสชันทั้งหมด',              en: 'Total sessions' },
    'set.storage_used':     { th: 'พื้นที่ที่ใช้',              en: 'Storage used' },
    'set.cancel':           { th: '✕ ยกเลิก',                  en: '✕ Cancel' },
    'set.morning':          { th: 'เช้า (06:00–10:00)',         en: 'Morning (06:00–10:00)' },
    'set.afternoon':        { th: 'บ่าย (12:00–16:00)',         en: 'Afternoon (12:00–16:00)' },
    'set.evening':          { th: 'เย็น (17:00–21:00)',         en: 'Evening (17:00–21:00)' },
    'set.shoulder':         { th: 'ไหล่',                       en: 'Shoulder' },
    'set.knee':             { th: 'เข่า',                       en: 'Knee' },
    'set.lower_back':       { th: 'หลังล่าง',                   en: 'Lower back' },
    'set.elbow':            { th: 'ข้อศอก',                     en: 'Elbow' },
    'set.wrist':            { th: 'ข้อมือ',                     en: 'Wrist' },
    'set.ankle':            { th: 'ข้อเท้า',                    en: 'Ankle' },

    /* ═══════════════════════════════════════
       IMPORT / EXPORT PAGE
    ═══════════════════════════════════════ */
    'io.title':             { th: 'นำเข้า / ส่งออก',            en: 'Import / Export' },
    'io.export':            { th: '// EXPORT BACKUP',            en: '// EXPORT BACKUP' },
    'io.import':            { th: '// IMPORT / RESTORE',         en: '// IMPORT / RESTORE' },
    'io.backup_preview':    { th: '// BACKUP PREVIEW',           en: '// BACKUP PREVIEW' },
    'io.danger':            { th: '// DANGER ZONE',              en: '// DANGER ZONE' },
    'io.drop_json':         { th: 'DROP JSON FILE HERE',         en: 'DROP JSON FILE HERE' },
    'io.or_click':          { th: 'หรือ click เพื่อเลือกไฟล์ · รองรับ .json เท่านั้น', en: 'or click to select file · .json only' },
    'io.or_paste':          { th: '// หรือ paste JSON โดยตรง',  en: '// or paste JSON directly' },
    'io.merge':             { th: '↩ MERGE (keep existing)',     en: '↩ MERGE (keep existing)' },
    'io.overwrite':         { th: '⚠ OVERWRITE ALL',            en: '⚠ OVERWRITE ALL' },
    'io.cannot_undo':       { th: 'ไม่สามารถย้อนกลับได้',       en: 'Cannot be undone' },
    'io.ios_note':          { th: 'iOS SAFARI NOTE',             en: 'iOS SAFARI NOTE' },
    'io.share_notes':       { th: 'วางใน Notes หรือ iCloud Drive ได้ทันที', en: 'Paste directly into Notes or iCloud Drive' },
    'io.share_sheet':       { th: 'ใช้ iOS Share Sheet ส่งไปยังอุปกรณ์อื่น', en: 'Use iOS Share Sheet to send to another device' },
    'io.delete_logs':       { th: 'ลบประวัติ session ทั้งหมด — เก็บ profile และ PR', en: 'Delete all session history — keep profile and PR' },
    'io.delete_all':        { th: 'ลบข้อมูลทั้งหมด — กลับสู่ onboarding', en: 'Delete all data — return to onboarding' },
    'io.merge_overwrite':   { th: 'merge หรือ overwrite',        en: 'merge or overwrite' },
    'io.checking':          { th: 'ตรวจสอบ backup ล่าสุด...',   en: 'Checking latest backup...' },
    'io.active_days':       { th: 'ACTIVE DAYS',                 en: 'ACTIVE DAYS' },
    'io.cancel':            { th: 'CANCEL',                      en: 'CANCEL' },
    'io.confirm':           { th: 'CONFIRM',                     en: 'CONFIRM' },

    /* ═══════════════════════════════════════
       INTEL CENTER
    ═══════════════════════════════════════ */
    'intel.title':           { th: 'ศูนย์ วิเคราะห์',          en: 'Intel Center' },
    'intel.next_session':    { th: '// SESSION ถัดไป — TARGET', en: '// NEXT SESSION — TARGET' },
    'intel.aar':             { th: '// THIS WEEK — AFTER ACTION REVIEW', en: '// THIS WEEK — AFTER ACTION REVIEW' },
    'intel.history':         { th: '// HISTORY (4 สัปดาห์ล่าสุด)', en: '// HISTORY (Last 4 weeks)' },
    'intel.medical':         { th: '// MEDICAL HISTORY (30 รายการล่าสุด)', en: '// MEDICAL HISTORY (Last 30 entries)' },
    'intel.log_injury':      { th: '🚨 LOG INJURY / PAIN',      en: '🚨 LOG INJURY / PAIN' },
    'intel.no_history':      { th: 'ยังไม่มีประวัติ',           en: 'No history yet' },
    'intel.no_injury':       { th: 'ยังไม่มีประวัติการบาดเจ็บ', en: 'No injury history' },
    'intel.no_risk':         { th: 'ไม่มี risk factors',        en: 'No risk factors' },
    'intel.no_active_injury':{ th: '✅ ไม่มีอาการบาดเจ็บที่ active', en: '✅ No active injuries' },
    'intel.resolved':        { th: '✓ resolved',                en: '✓ resolved' },
    'intel.calculating':     { th: 'กำลังคำนวณ...',             en: 'Calculating...' },
    'intel.calc_phase':      { th: 'กำลังคำนวณ phase...',       en: 'Calculating phase...' },
    'intel.building_aar':    { th: 'กำลังสร้าง AAR...',         en: 'Building AAR...' },
    'intel.building_proj':   { th: 'กำลังสร้าง projection...',  en: 'Building projection...' },
    'intel.cycle_start':     { th: '// CYCLE START DATE',       en: '// CYCLE START DATE' },
    'intel.pain_mild':       { th: '1 — เจ็บเล็กน้อย',         en: '1 — Mild pain' },
    'intel.pain_mod':        { th: '2 — เจ็บปานกลาง',          en: '2 — Moderate pain' },
    'intel.pain_high':       { th: '3 — เจ็บมาก',              en: '3 — Severe pain' },
    'intel.pain_vhigh':      { th: '4 — เจ็บรุนแรงมาก',        en: '4 — Very severe pain' },
    'intel.pain_cant':       { th: '5 — ไม่สามารถฝึก',         en: '5 — Cannot train' },
    'intel.choose_location': { th: '-- เลือกตำแหน่ง --',       en: '-- Select location --' },
    'intel.save':            { th: '💾 บันทึก',                 en: '💾 Save' },
    'intel.overload_desc':   { th: 'คำนวณจาก PR + session ล่าสุด — เพิ่ม load อัตโนมัติ', en: 'Calculated from PR + recent sessions — auto-increment load' },
    'intel.cycle_tip':       { th: 'ตั้งวันเริ่มต้น 12-week cycle — ระบบจะคำนวณ phase ปัจจุบันให้อัตโนมัติ', en: 'Set the 12-week cycle start date — system will auto-calculate current phase' },

    /* ═══════════════════════════════════════
       OPS HUB
    ═══════════════════════════════════════ */
    'ops.title':            { th: 'TACTICAL FITNESS — OPERATIONS HUB', en: 'TACTICAL FITNESS — OPERATIONS HUB' },
    'ops.my_card':          { th: '// MY OPERATOR CARD',        en: '// MY OPERATOR CARD' },
    'ops.platoon':          { th: '🪖 PLATOON MODE',            en: '🪖 PLATOON MODE' },
    'ops.leaderboard':      { th: '// PLATOON LEADERBOARD',     en: '// PLATOON LEADERBOARD' },
    'ops.add_member':       { th: '// ADD PLATOON MEMBER',      en: '// ADD PLATOON MEMBER' },
    'ops.share':            { th: '// SHARE TO PLATOON',        en: '// SHARE TO PLATOON' },
    'ops.audio':            { th: '// AUDIO SETTINGS',          en: '// AUDIO SETTINGS' },
    'ops.sfx':              { th: '// SFX LIBRARY — กดทดสอบ',  en: '// SFX LIBRARY — tap to test' },
    'ops.drill_sergeant':   { th: '// DRILL SERGEANT — คำสั่งภาษาไทย', en: '// DRILL SERGEANT — Thai commands' },
    'ops.custom_msg':       { th: '// CUSTOM MESSAGE',          en: '// CUSTOM MESSAGE' },
    'ops.acft':             { th: '// ACFT SCORE',              en: '// ACFT SCORE' },
    'ops.test_history':     { th: '// TEST HISTORY',            en: '// TEST HISTORY' },
    'ops.select_std':       { th: '// เลือกมาตรฐาน',           en: '// SELECT STANDARD' },
    'ops.fill_below':       { th: '// กรอกผลทดสอบด้านล่าง',   en: '// FILL TEST RESULTS BELOW' },
    'ops.thai_std':         { th: '🇹🇭 มาตรฐานทหารไทย',        en: '🇹🇭 Thai Military Standard' },
    'ops.us_std':           { th: '🇺🇸 US Army ACFT',           en: '🇺🇸 US Army ACFT' },
    'ops.no_history':       { th: 'ยังไม่มีประวัติ',            en: 'No history yet' },
    'ops.no_test_hist':     { th: 'ยังไม่มีประวัติ — บันทึกผลทดสอบด้านบน', en: 'No history — save test results above' },
    'ops.loading':          { th: 'กำลังโหลด...',               en: 'Loading...' },
    'ops.fill_settings':    { th: 'กรอกใน Settings',            en: 'Fill in Settings' },
    'ops.scan_qr':          { th: 'ให้เพื่อนสแกน QR เพื่อเพิ่มข้อมูลลง Platoon', en: 'Have friends scan QR to add data to Platoon' },
    'ops.add_friend':       { th: 'เพิ่มเพื่อนด้วย link ด้านบน', en: 'Add friends via the link above' },
    'ops.paste_link':       { th: 'วาง link ที่ได้จากเพื่อน หรือ code จาก URL', en: 'Paste a friend\'s link or URL code' },
    'ops.drill_voice':      { th: 'เสียงคำสั่งภาษาไทย (TTS)',   en: 'Thai command voice (TTS)' },
    'ops.sfx_desc':         { th: 'เสียงประกอบ set complete, PR, rank up', en: 'Sound effects for set complete, PR, rank up' },
    'ops.mm_ss':            { th: 'นาที : วินาที',               en: 'Minutes : Seconds' },
    'ops.save_test':        { th: '💾 SAVE TEST RESULT',         en: '💾 SAVE TEST RESULT' },
    'ops.master_vol':       { th: '// MASTER VOLUME',            en: '// MASTER VOLUME' },
    'ops.audio_warfare':    { th: '🔊 AUDIO WARFARE',            en: '🔊 AUDIO WARFARE' },

    /* ═══════════════════════════════════════
       SCIENCE PLANNER
    ═══════════════════════════════════════ */
    'sci.title':            { th: 'วางแผน วิทยาศาสตร์',         en: 'Science Planner' },
    'sci.no_data':          { th: '// ยังไม่มีข้อมูล — กด Analyze ก่อน', en: '// No data yet — press Analyze first' },
    'sci.no_data2':         { th: 'ยังไม่มีข้อมูล — Generate mission แล้วให้ feedback', en: 'No data yet — Generate mission then give feedback' },
    'sci.loading':          { th: 'กำลังโหลด...',               en: 'Loading...' },
    'sci.fill_settings':    { th: 'กรอกข้อมูลใน Settings',       en: 'Fill in data in Settings' },
    'sci.generate_first':   { th: 'กด GENERATE เพื่อสร้างโปรแกรม', en: 'Press GENERATE to create a program' },
    'sci.gen_assessment':   { th: 'กด GENERATE ASSESSMENT ในแท็บ Profile', en: 'Press GENERATE ASSESSMENT in Profile tab' },
    'sci.gen_any_tab':      { th: 'กด Generate ในแท็บใดก็ได้',  en: 'Press Generate in any tab' },
    'sci.analyze_first':    { th: 'กด Analyze ก่อน',             en: 'Press Analyze first' },
    'sci.input_sessions':   { th: 'ใส่ sessions แล้วกด ANALYZE', en: 'Enter sessions then press ANALYZE' },
    'sci.try_again':        { th: 'กรุณาลองกด GENERATE อีกครั้ง', en: 'Please try pressing GENERATE again' },
    'sci.prog_fullbody':    { th: 'ทั่วไป (8wk)',                en: 'General (8wk)' },
    'sci.prog_muscle':      { th: 'สายกล้าม (12wk)',             en: 'Muscle (12wk)' },
    'sci.prog_military':    { th: 'สายทหาร (12wk)',              en: 'Military (12wk)' },
    'sci.prog_athlete':     { th: 'สายนักกีฬา (12wk)',           en: 'Athlete (12wk)' },
    'sci.maintain':         { th: 'รักษาน้ำหนัก',               en: 'Maintain weight' },
    'sci.walk_stretch':     { th: 'เดิน · ยืด · Foam Roll',     en: 'Walk · Stretch · Foam Roll' },
    'sci.military_hp':      { th: 'ทหาร (High Performance)',     en: 'Military (High Performance)' },
    'sci.general':          { th: 'ทั่วไป',                      en: 'General' },
    'sci.run3k':            { th: 'วิ่ง 3km',                    en: 'Run 3km' },

    /* ═══════════════════════════════════════
       SKILL TREE
    ═══════════════════════════════════════ */
    'skill.title':          { th: 'ต้นไม้ ทักษะ',               en: 'Skill Tree' },
    'skill.total_nodes':    { th: 'โหนดทั้งหมด',                en: 'Total nodes' },
    'skill.unlocked':       { th: 'ปลดล็อค',                    en: 'Unlocked' },
    'skill.mastered':       { th: 'เชี่ยวชาญ',                  en: 'Mastered' },

    /* ═══════════════════════════════════════
       ULTIMATE COACH
    ═══════════════════════════════════════ */
    'coach.title':          { th: 'โค้ช อัจฉริยะ',              en: 'Ultimate Coach' },
    'coach.engine':         { th: '🧠 COACH ENGINE',             en: '🧠 COACH ENGINE' },
    'coach.baseline':       { th: '📊 BASELINE',                 en: '📊 BASELINE' },
    'coach.meta':           { th: '⚙ META-LEARNING',            en: '⚙ META-LEARNING' },
    'coach.community':      { th: '🌐 COMMUNITY',               en: '🌐 COMMUNITY' },
    'coach.generate':       { th: '⚡ สร้างแผน',                en: '⚡ Generate Plan' },
    'coach.use_plan':       { th: 'ใช้แผนนี้',                   en: 'Use This Plan' },
    'coach.feedback':       { th: 'FEEDBACK — ประเมินแผนนี้',   en: 'FEEDBACK — Rate this plan' },
    'coach.good':           { th: '👍 ดี',                      en: '👍 Good' },
    'coach.ok':             { th: '😐 พอใช้',                   en: '😐 OK' },
    'coach.bad':            { th: '👎 แย่',                     en: '👎 Bad' },
    'coach.no_data':        { th: 'ยังไม่มีข้อมูลเพียงพอ',      en: 'Not enough data yet' },
    'coach.need_sessions':  { th: 'ต้องการข้อมูลอย่างน้อย 10 sessions', en: 'Need at least 10 sessions' },
    'coach.need_5':         { th: 'ยังไม่มีข้อมูล — ต้องฝึกอย่างน้อย 5 sessions', en: 'No data yet — need at least 5 sessions' },
    'coach.need_feedback':  { th: 'ยังไม่มีข้อมูล — Generate mission แล้วให้ feedback', en: 'No data yet — Generate mission and give feedback' },
    'coach.learn_after':    { th: 'ระบบเรียนรู้หลังจากคุณให้ feedback — Generate mission แล้วกด GOOD/BAD', en: 'System learns after you give feedback — Generate mission then press GOOD/BAD' },
    'coach.click_copy':     { th: 'คลิกเพื่อ copy',             en: 'Click to copy' },
    'coach.paste_url':      { th: 'วาง URL ที่ได้จากคนอื่น',    en: 'Paste URL from someone else' },
    'coach.personal_engine':{ th: '// PERSONAL BASELINE ENGINE — จากข้อมูลจริงของคุณ', en: '// PERSONAL BASELINE ENGINE — from your real data' },
    'coach.mission_input':  { th: '// MISSION INPUT — State Variables', en: '// MISSION INPUT — State Variables' },
    'coach.rule_perf':      { th: '// RULE PERFORMANCE — Auto-Evolution', en: '// RULE PERFORMANCE — Auto-Evolution' },
    'coach.export_rule':    { th: '// EXPORT RULESET — แชร์ให้เพื่อน', en: '// EXPORT RULESET — share with friends' },
    'coach.import_rule':    { th: '// IMPORT RULESET — รับจากเพื่อน', en: '// IMPORT RULESET — receive from friends' },
    'coach.forecast':       { th: '// พยากรณ์ 72 ชม. — Scenario Simulation', en: '// 72hr Forecast — Scenario Simulation' },
    'coach.export_desc':    { th: 'Export baseline profile + rule performance สำหรับ import ไปยังอุปกรณ์อื่น', en: 'Export baseline profile + rule performance for import to another device' },
    'coach.shift1':         { th: 'พลัด 1 (06:00-14:00)',       en: 'Shift 1 (06:00-14:00)' },
    'coach.shift2':         { th: 'พลัด 2 (14:00-22:00)',       en: 'Shift 2 (14:00-22:00)' },
    'coach.shift3':         { th: 'พลัด 3 (22:00-06:00)',       en: 'Shift 3 (22:00-06:00)' },
    'coach.no_shift':       { th: 'ไม่มีเวร',                    en: 'No shift' },
    'coach.civilian':       { th: 'พลเรือน',                    en: 'Civilian' },
    'coach.gen_export':     { th: '📤 GENERATE EXPORT URL',      en: '📤 GENERATE EXPORT URL' },
    'coach.import_merge':   { th: '📥 IMPORT & MERGE',           en: '📥 IMPORT & MERGE' },

    /* ═══════════════════════════════════════
       ONBOARDING
    ═══════════════════════════════════════ */
    'ob.init':              { th: '// ระบบ INITIALIZATION',     en: '// SYSTEM INITIALIZATION' },
    'ob.step1':             { th: '// STEP 01 — OPERATOR IDENTITY', en: '// STEP 01 — OPERATOR IDENTITY' },
    'ob.step2':             { th: '// STEP 02 — ASSESS FITNESS LEVEL', en: '// STEP 02 — ASSESS FITNESS LEVEL' },
    'ob.step3':             { th: '// STEP 03 — TRAINING PATH', en: '// STEP 03 — TRAINING PATH' },
    'ob.step4':             { th: '// STEP 04 — BASELINE PERFORMANCE', en: '// STEP 04 — BASELINE PERFORMANCE' },
    'ob.step5':             { th: '// STEP 05 — MISSION OBJECTIVES', en: '// STEP 05 — MISSION OBJECTIVES' },
    'ob.step6':             { th: '// STEP 06 — RANK ASSIGNMENT', en: '// STEP 06 — RANK ASSIGNMENT' },
    'ob.callsign':          { th: 'CALLSIGN / ชื่อที่ใช้ในระบบ', en: 'CALLSIGN / System name' },
    'ob.identity':          { th: 'ตัวตน',                      en: 'Identity' },
    'ob.body':              { th: 'ร่างกาย',                    en: 'Body' },
    'ob.goal':              { th: 'เป้าหมาย',                   en: 'Goal' },
    'ob.gender':            { th: 'เพศ',                        en: 'Gender' },
    'ob.male':              { th: '♂ ชาย',                     en: '♂ Male' },
    'ob.female':            { th: '♀ หญิง',                    en: '♀ Female' },
    'ob.age':               { th: 'อายุ (ปี)',                  en: 'Age (years)' },
    'ob.weight':            { th: 'น้ำหนัก (kg)',               en: 'Weight (kg)' },
    'ob.height_cm':         { th: 'ส่วนสูง (cm)',               en: 'Height (cm)' },
    'ob.height_ft':         { th: 'ส่วนสูง (ft / in)',          en: 'Height (ft / in)' },
    'ob.units':             { th: 'หน่วยที่ใช้',                en: 'Units' },
    'ob.body_data_info':    { th: 'ข้อมูลนี้ใช้คำนวณ BMI · TDEE · VO2Max', en: 'Used to calculate BMI · TDEE · VO2Max' },
    'ob.skip_ok':           { th: 'ข้ามได้ถ้าไม่รู้ — กรอกทีหลังได้เสมอ', en: 'OK to skip — can fill in later' },
    'ob.skip_all':          { th: 'ข้ามได้ทั้งหมด — ระบบจะเริ่มจากค่า 0', en: 'All can be skipped — system will start from 0' },
    'ob.beginner':          { th: 'มือใหม่ — Recruit',          en: 'Beginner — Recruit' },
    'ob.beginner_desc':     { th: 'เพิ่งเริ่มออกกำลังกาย / Push-up < 20 ครั้ง / วิ่ง 1km ยาก', en: 'Just started / Push-up < 20 reps / Run 1km is hard' },
    'ob.intermediate':      { th: 'ระดับกลาง — Soldier',       en: 'Intermediate — Soldier' },
    'ob.intermediate_desc': { th: 'ออกกำลังกายสม่ำเสมอ / Push-up 20–50 / วิ่ง 3km ได้', en: 'Trains regularly / Push-up 20–50 / Can run 3km' },
    'ob.advanced':          { th: 'ขั้นสูง — Veteran',          en: 'Advanced — Veteran' },
    'ob.advanced_desc':     { th: 'ฟิตมาก / Push-up 50+ / Pull-up 15+ / วิ่ง 5km < 25 นาที', en: 'Very fit / Push-up 50+ / Pull-up 15+ / Run 5km < 25 min' },
    'ob.activity_level':    { th: 'ระดับกิจกรรมในชีวิตประจำวัน', en: 'Daily activity level' },
    'ob.sedentary':         { th: 'นั่งทำงาน',                  en: 'Sedentary (desk job)' },
    'ob.light':             { th: 'เดินบ้าง',                   en: 'Lightly active' },
    'ob.moderate':          { th: 'ปานกลาง',                    en: 'Moderately active' },
    'ob.active':            { th: 'งานหนัก',                    en: 'Heavy work' },
    'ob.vactive':           { th: 'ทหาร/ใช้แรง',               en: 'Military / Physical labor' },
    'ob.training_days':     { th: 'วันออกกำลังกายต่อสัปดาห์',  en: 'Training days per week' },
    'ob.select_0_days':     { th: 'เลือก 0 วัน — แนะนำ 3 วัน/สัปดาห์ขึ้นไป', en: '0 days selected — recommend 3+ days/week' },
    'ob.session_duration':  { th: 'ระยะเวลาต่อครั้ง',           en: 'Session duration' },
    'ob.train_time':        { th: 'ช่วงเวลาออกกำลังกาย',        en: 'Preferred training time' },
    'ob.morning':           { th: 'เช้า',                       en: 'Morning' },
    'ob.afternoon':         { th: 'บ่าย',                       en: 'Afternoon' },
    'ob.evening':           { th: 'เย็น',                       en: 'Evening' },
    'ob.night':             { th: 'กลางคืน',                   en: 'Night' },
    'ob.multiple_paths':    { th: '(เลือกได้หลายอย่าง)',        en: '(Multiple selections allowed)' },
    'ob.balanced_tip':      { th: 'กดเลือกทุกอัน = Balanced Mode', en: 'Select all = Balanced Mode' },
    'ob.goal_types':        { th: '// ประเภทเป้าหมาย (เลือกได้หลายอัน)', en: '// GOAL TYPES (select multiple)' },
    'ob.goal_target':       { th: '// ระยะเวลาเป้าหมาย',        en: '// GOAL DURATION' },
    'ob.goal_number':       { th: '// เป้าหมายตัวเลข (ไม่บังคับ)', en: '// TARGET NUMBER (optional)' },
    'ob.max_value':         { th: 'กรอกค่าสูงสุดที่ทำได้ตอนนี้', en: 'Enter your current maximum value' },
    'ob.no_goal_data':      { th: 'ไม่มีเป้าหมายตัวเลขสำหรับสายที่เลือก', en: 'No numeric target for selected path' },
    'ob.conditions':        { th: 'โรคประจำตัว / ข้อจำกัดร่างกาย', en: 'Medical conditions / Physical limitations' },
    'ob.other_conditions':  { th: '(นอกจากออกกำลังกาย)',        en: '(other than exercise)' },
    'ob.calculate':         { th: 'คำนวณยศ',                    en: 'Calculate Rank' },
    'ob.initial_rank':      { th: '// INITIAL RANK ASSIGNED',   en: '// INITIAL RANK ASSIGNED' },
    'ob.rank_system':       { th: 'ระบบยศทหาร 21 ระดับ — เลื่อนขั้นด้วยผลจริง', en: '21-tier military rank system — advance with real results' },
    'ob.fatigue_engine':    { th: 'Fatigue Engine — วิเคราะห์ความล้าแบบ Real-time', en: 'Fatigue Engine — Real-time fatigue analysis' },
    'ob.auto_plan':         { th: 'ตารางฝึกอัตโนมัติ + Progressive Overload', en: 'Auto training schedule + Progressive Overload' },
    'ob.missions_system':   { th: 'ภารกิจ + เหรียญเกียรติยศ',   en: 'Missions + Medals of Honor' },
    'ob.offline':           { th: 'ไม่ต้องใช้อินเทอร์เน็ต — ทำงานได้ทุกที่', en: 'No internet required — works anywhere' },
    'ob.private':           { th: 'ไม่ถูกส่งออกนอกเครื่อง',    en: 'Not sent outside your device' },
    'ob.enter_system':      { th: 'เข้าสู่ระบบ',               en: 'Enter System' },
    'ob.custom_enter':      { th: 'กรอกเอง',                    en: 'Enter manually' },
    'ob.days_count':        { th: 'จำนวนวัน (1–365)',           en: 'Number of days (1–365)' },
    'ob.select_0_paths':    { th: 'เลือก 0 สาย',                en: '0 paths selected' },
    'ob.select_multiple':   { th: 'เลือกได้หลายสาย — ระบบจะผสมโปรแกรมให้', en: 'Select multiple — system will mix programs' },
    'ob.select_multi2':     { th: 'เลือกได้หลายอย่าง — ระบบจะปรับโปรแกรมให้', en: 'Select multiple — system will adjust program' },
    'ob.or_balanced':       { th: 'หรือเลือก "ผสม" เพื่อ Balanced Program', en: 'Or select "Mix" for a Balanced Program' },
    'ob.balanced_all':      { th: '⚠ ผสมทุกสาย → Balanced Mode', en: '⚠ Mix all paths → Balanced Mode' },
    'ob.who_guidelines':    { th: 'ตาม WHO Guidelines',         en: 'Per WHO Guidelines' },
    'ob.system_ready':      { th: 'ระบบพร้อมใช้งาน ✓',         en: 'System ready ✓' },
    'ob.creating_profile':  { th: 'สร้าง Profile ในเครื่อง...',  en: 'Creating profile on device...' },
    'ob.creating_sched':    { th: 'สร้างตารางฝึกประจำเดือน...', en: 'Creating monthly training schedule...' },
    'ob.installing_missions':{ th: 'ติดตั้ง Mission System...',  en: 'Installing Mission System...' },
    'ob.saving_baseline':   { th: 'บันทึก Baseline Performance...', en: 'Saving Baseline Performance...' },
    'ob.current':           { th: 'ปัจจุบัน',                   en: 'Current' },
    'ob.level':             { th: 'ระดับ',                      en: 'Level' },
    'ob.value':             { th: 'ค่า',                        en: 'Value' },
    'ob.endurance':         { th: 'ความทนทาน',                  en: 'Endurance' },
    'ob.strength':          { th: 'แรงสูงสุด',                  en: 'Max strength' },
    'ob.finish':            { th: 'จบ',                         en: 'Finish' },
    'ob.back':              { th: '◀ BACK',                     en: '◀ BACK' },
    'ob.next':              { th: 'NEXT ▶',                     en: 'NEXT ▶' },
    'ob.start':             { th: 'เริ่ม',                      en: 'Start' },
    'ob.choose':            { th: 'เลือก',                      en: 'Choose' },
    'ob.set':               { th: 'ตั้ง',                       en: 'Set' },
    'ob.normal':            { th: 'ปกติ',                       en: 'Normal' },

    /* ═══════════════════════════════════════
       RANKUP PAGE
    ═══════════════════════════════════════ */
    'rankup.next_goal':     { th: '// เป้าหมายถัดไป',           en: '// NEXT GOAL' },
    'rankup.promoted':      { th: '// เลื่อนยศสำเร็จ',          en: '// RANK UP SUCCESSFUL' },

    /* ═══════════════════════════════════════
       COMMON / SHARED
    ═══════════════════════════════════════ */
    'common.loading':       { th: '// LOADING...',              en: '// LOADING...' },
    'common.loading2':      { th: 'กำลังโหลด...',               en: 'Loading...' },
    'common.save':          { th: 'บันทึก',                     en: 'Save' },
    'common.cancel':        { th: 'ยกเลิก',                     en: 'Cancel' },
    'common.confirm':       { th: 'ยืนยัน',                     en: 'Confirm' },
    'common.back':          { th: '← BACK',                     en: '← BACK' },
    'common.done':          { th: '✓ DONE',                     en: '✓ DONE' },
    'common.skip':          { th: 'SKIP',                       en: 'SKIP' },
    'common.add':           { th: 'เพิ่ม',                      en: 'Add' },
    'common.delete':        { th: 'ลบ',                         en: 'Delete' },
    'common.edit':          { th: 'แก้ไข',                      en: 'Edit' },
    'common.active':        { th: 'ACTIVE',                     en: 'ACTIVE' },
    'common.completed':     { th: 'COMPLETED',                  en: 'COMPLETED' },
    'common.days':          { th: 'วัน',                        en: 'days' },
    'common.weeks':         { th: 'สัปดาห์',                   en: 'weeks' },
    'common.months':        { th: 'เดือน',                      en: 'months' },
    'common.year':          { th: 'ปี',                         en: 'year' },
    'common.min':           { th: 'นาที',                       en: 'min' },
    'common.sec':           { th: 'วินาที',                     en: 'sec' },
    'common.sets':          { th: 'sets',                       en: 'sets' },
    'common.reps':          { th: 'reps',                       en: 'reps' },
    'common.operator':      { th: 'OPERATOR',                   en: 'OPERATOR' },
    'common.fitness_system':{ th: 'FITNESS SYSTEM v3.0',        en: 'FITNESS SYSTEM v3.0' },
    'common.no_data':       { th: 'ยังไม่มีข้อมูล',             en: 'No data yet' },
    'common.error_reload':  { th: '// ERROR — RELOAD',          en: '// ERROR — RELOAD' },
  };

  /* ─────────────────────────────────────────
     STORAGE
  ───────────────────────────────────────── */
  let _lang = 'th';

  function getLang() {
    try {
      // Primary: tf_lang (set by i18n toggle button)
      const direct = localStorage.getItem('tf_lang');
      if (direct) return direct;
      // Fallback: tf_prefs.lang (set by settings page)
      const prefs = JSON.parse(localStorage.getItem('tf_prefs') || '{}');
      return prefs.lang || 'th';
    } catch(e) { return 'th'; }
  }

  function setLang(lang) {
    _lang = lang;
    try {
      localStorage.setItem('tf_lang', lang);
      // Sync to tf_prefs so settings page stays in sync
      const prefs = JSON.parse(localStorage.getItem('tf_prefs') || '{}');
      prefs.lang = lang;
      localStorage.setItem('tf_prefs', JSON.stringify(prefs));
      // Update html lang attribute
      document.documentElement.lang = lang;
    } catch(e) {}
  }

  /* ─────────────────────────────────────────
     TRANSLATE
  ───────────────────────────────────────── */
  function t(key, fallback) {
    const entry = DICT[key];
    if (!entry) return fallback || key;
    return entry[_lang] || entry['th'] || fallback || key;
  }

  /* ─────────────────────────────────────────
     APPLY — scan DOM for data-i18n
  ───────────────────────────────────────── */
  function apply(root) {
    const scope = root || document;

    // Text content
    scope.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.textContent = val;
    });

    // HTML content (for elements with markup inside)
    scope.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = t(key);
      if (val) el.innerHTML = val;
    });

    // Placeholder
    scope.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      const val = t(key);
      if (val) el.placeholder = val;
    });

    // Title attribute
    scope.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = t(key);
      if (val) el.title = val;
    });

    // Document title
    const titleEl = scope.querySelector('title[data-i18n]') || document.querySelector('title[data-i18n]');
    if (titleEl) {
      const key = titleEl.getAttribute('data-i18n');
      const val = t(key);
      if (val) document.title = val;
    }
  }

  /* ─────────────────────────────────────────
     TOGGLE — switch language
  ───────────────────────────────────────── */
  function toggle() {
    const next = _lang === 'th' ? 'en' : 'th';
    setLang(next);
    apply();
    updateToggleBtn();
    // Broadcast to other components that may need refresh
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: next } }));
  }

  /* ─────────────────────────────────────────
     TOGGLE BUTTON
  ───────────────────────────────────────── */
  function updateToggleBtn() {
    const btns = document.querySelectorAll('.lang-toggle-btn');
    btns.forEach(btn => {
      btn.textContent = _lang === 'th' ? '🇬🇧 EN' : '🇹🇭 TH';
      btn.title = _lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย';
    });
  }

  /* ─────────────────────────────────────────
     INJECT TOGGLE BUTTON into topbar
  ───────────────────────────────────────── */
  function injectToggleButton() {
    // Look for topbar-right to inject button
    const topbarRight = document.querySelector('.topbar-right');
    if (!topbarRight) return;

    // Don't double-inject
    if (topbarRight.querySelector('.lang-toggle-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'lang-toggle-btn';
    btn.style.cssText = [
      'background:none',
      'border:1px solid rgba(255,255,255,.15)',
      'color:var(--gray)',
      'font-family:var(--mono)',
      'font-size:9px',
      'letter-spacing:1px',
      'padding:4px 8px',
      'cursor:pointer',
      'border-radius:3px',
      'transition:all .15s',
      '-webkit-tap-highlight-color:transparent',
    ].join(';');
    btn.addEventListener('mouseenter', () => {
      btn.style.borderColor = 'rgba(0,255,136,.4)';
      btn.style.color = 'var(--green)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.borderColor = 'rgba(255,255,255,.15)';
      btn.style.color = 'var(--gray)';
    });
    btn.addEventListener('click', toggle);
    updateToggleBtn();

    // Insert before the last child (usually clock / live-dot)
    topbarRight.insertBefore(btn, topbarRight.firstChild);
    updateToggleBtn();
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init() {
    _lang = getLang();
    document.documentElement.lang = _lang;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        apply();
        injectToggleButton();
        updateToggleBtn();
      });
    } else {
      apply();
      injectToggleButton();
      updateToggleBtn();
    }
  }

  /* ─────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────── */
  return { init, t, apply, toggle, getLang, setLang, DICT };

})();

// Auto-init on load
I18n.init();
