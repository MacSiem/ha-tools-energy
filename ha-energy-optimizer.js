/* HA Tools split — ha-energy-optimizer v4.0.0 (2026-05-10) — single-tool standalone repo */
(function() {
'use strict';

// -- HA Tools Persistence (stub -- full impl in ha-tools-panel.js) --
window._haToolsPersistence = window._haToolsPersistence || { _cache: {}, _hass: null, setHass(h) { this._hass = h; }, async save(k, d) { try { localStorage.setItem('ha-energy-optimizer-' + k, JSON.stringify(d)); } catch(e) { console.debug('[ha-energy-optimizer] caught:', e); } }, async load(k) { try { const r = localStorage.getItem('ha-energy-optimizer-' + k); return r ? JSON.parse(r) : null; } catch(e) { return null; } }, loadSync(k) { try { const r = localStorage.getItem('ha-energy-optimizer-' + k); return r ? JSON.parse(r) : null; } catch(e) { return null; } } };

// -- HA Tools Escape helper (fallback) --
const _esc = window._haToolsEsc || ((s) => String(s == null ? '' : s).replace(/[&<>"\']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));

/* ===== HA Tools split — inline shared infrastructure ===== */
// Bento Design System CSS (inline copy — keeps tool standalone)
if (typeof window !== 'undefined' && !window.HAToolsBentoCSS) {
  window.HAToolsBentoCSS = `
/* ═══════════════════════════════════════════════
   HA Tools — Bento Design System v2.0 (Premium)
   ═══════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

:host {
  /* Brand palette — diamond top, gradient-friendly */
  --bento-primary: #6366f1;
  --bento-primary-2: #8b5cf6;
  --bento-primary-3: #ec4899;
  --bento-primary-hover: #4f46e5;
  --bento-primary-light: rgba(99, 102, 241, 0.08);
  --bento-primary-glow: rgba(99, 102, 241, 0.35);
  --bento-success: #10B981;
  --bento-success-light: rgba(16, 185, 129, 0.10);
  --bento-success-border: rgba(16, 185, 129, 0.25);
  --bento-error: #EF4444;
  --bento-error-light: rgba(239, 68, 68, 0.10);
  --bento-error-border: rgba(239, 68, 68, 0.25);
  --bento-warning: #F59E0B;
  --bento-warning-light: rgba(245, 158, 11, 0.10);
  --bento-warning-border: rgba(245, 158, 11, 0.25);
  --bento-info: #06b6d4;
  --bento-info-light: rgba(6, 182, 212, 0.10);
  --bento-info-border: rgba(6, 182, 212, 0.25);

  /* Theme */
  --bento-bg:     var(--primary-background-color, #fafaf9);
  --bento-bg-2:   var(--card-background-color, #f5f5f4);
  --bento-card:   var(--card-background-color, #ffffff);
  --bento-glass:  rgba(255, 255, 255, 0.7);
  --bento-border: var(--divider-color, #e7e5e4);
  --bento-border-strong: rgba(0, 0, 0, 0.08);
  --bento-text:           var(--primary-text-color,   #0c0a09);
  --bento-text-secondary: var(--secondary-text-color, #57534e);
  --bento-text-muted:     var(--disabled-text-color,  #a8a29e);

  /* Radii */
  --bento-radius-xs: 8px;
  --bento-radius-sm: 12px;
  --bento-radius-md: 18px;
  --bento-radius-lg: 24px;
  --bento-radius-pill: 999px;

  /* Shadows — modern, layered */
  --bento-shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02);
  --bento-shadow-md: 0 4px 12px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.03);
  --bento-shadow-lg: 0 24px 48px -12px rgba(0,0,0,0.10), 0 12px 24px -8px rgba(0,0,0,0.05);
  --bento-shadow-glow: 0 0 0 1px rgba(99,102,241,0.15), 0 8px 32px -8px rgba(99,102,241,0.25);

  /* Gradients */
  --bento-grad-primary: linear-gradient(135deg, #6366f1, #8b5cf6);
  --bento-grad-rainbow: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  --bento-grad-success: linear-gradient(135deg, #10b981, #34d399);
  --bento-grad-error:   linear-gradient(135deg, #ef4444, #f87171);
  --bento-grad-warning: linear-gradient(135deg, #f59e0b, #fbbf24);

  /* Motion */
  --bento-trans-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --bento-trans:      0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --bento-trans-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Typography */
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif;
  font-feature-settings: "cv11" 1, "ss01" 1;
  letter-spacing: -0.01em;
  display: block;
  color: var(--bento-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── Dark mode ───────────────────────────────── */
@media (prefers-color-scheme: dark) {
  :host {
    --bento-bg:     var(--primary-background-color, #0a0a0f);
    --bento-bg-2:   var(--card-background-color,    #111119);
    --bento-card:   var(--card-background-color,    #16161f);
    --bento-glass:  rgba(22, 22, 31, 0.7);
    --bento-border: var(--divider-color,            #27272f);
    --bento-border-strong: rgba(255, 255, 255, 0.08);
    --bento-text:           var(--primary-text-color,   #fafaf9);
    --bento-text-secondary: var(--secondary-text-color, #d6d3d1);
    --bento-text-muted:     var(--disabled-text-color,  #78716c);
    --bento-primary:        #818cf8;
    --bento-primary-2:      #a78bfa;
    --bento-primary-3:      #f472b6;
    --bento-primary-light:  rgba(129, 140, 248, 0.12);
    --bento-primary-glow:   rgba(129, 140, 248, 0.45);
    --bento-success: #34d399;
    --bento-success-light:  rgba(52, 211, 153, 0.12);
    --bento-success-border: rgba(52, 211, 153, 0.30);
    --bento-error:   #f87171;
    --bento-error-light:    rgba(248, 113, 113, 0.12);
    --bento-error-border:   rgba(248, 113, 113, 0.30);
    --bento-warning: #fbbf24;
    --bento-warning-light:  rgba(251, 191, 36, 0.12);
    --bento-warning-border: rgba(251, 191, 36, 0.30);
    --bento-info:    #22d3ee;
    --bento-info-light:     rgba(34, 211, 238, 0.12);
    --bento-info-border:    rgba(34, 211, 238, 0.30);
    --bento-shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
    --bento-shadow-md: 0 4px 12px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.2);
    --bento-shadow-lg: 0 24px 48px -12px rgba(0,0,0,0.6), 0 12px 24px -8px rgba(0,0,0,0.3);
    --bento-shadow-glow: 0 0 0 1px rgba(129,140,248,0.2), 0 8px 32px -8px rgba(129,140,248,0.5);
    --bento-grad-primary: linear-gradient(135deg, #818cf8, #a78bfa);
    --bento-grad-rainbow: linear-gradient(135deg, #818cf8, #a78bfa 50%, #f472b6);
    color-scheme: dark !important;
  }
  .card, .card-container, .main-card, .panel-card {
    background: var(--bento-card) !important; color: var(--bento-text) !important; border-color: var(--bento-border) !important;
  }
  input, select, textarea { background: var(--bento-bg-2); color: var(--bento-text); border-color: var(--bento-border); }
  table th { background: var(--bento-bg-2); color: var(--bento-text-secondary); border-color: var(--bento-border); }
  table td { color: var(--bento-text); border-color: var(--bento-border); }
  pre, code { background: #1e1e2e !important; color: #e2e8f0 !important; }
}

/* ── Reset & motion preferences ──────────────── */
* { box-sizing: border-box; }
@media (prefers-reduced-motion: reduce) { * { animation-duration: 0s !important; transition-duration: 0s !important; } }

/* ── Main Card Wrapper ───────────────────────── */
.card {
  background: var(--bento-card);
  border: 1px solid var(--bento-border);
  border-radius: var(--bento-radius-md);
  box-shadow: var(--bento-shadow-md);
  color: var(--bento-text);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  transition: box-shadow var(--bento-trans), border-color var(--bento-trans);
}

/* ── Header ──────────────────────────────────── */
.header {
  padding: 20px 24px 0;
  display: flex; align-items: center; gap: 12px;
}
.header-icon { font-size: 24px; }
.header-title {
  font-size: 18px; font-weight: 700; letter-spacing: -0.02em;
  color: var(--bento-text);
}
.header-badge {
  margin-left: auto;
  background: var(--bento-grad-primary); color: #fff;
  font-size: 11px; padding: 4px 10px; border-radius: var(--bento-radius-pill);
  font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  box-shadow: 0 4px 14px -2px var(--bento-primary-glow);
}
.content { padding: 20px 24px 24px; }

/* ── Tabs (modern pill style) ────────────────── */
.tabs, .tab-bar, .tab-nav, .tab-header {
  display: flex !important; gap: 4px !important;
  padding: 4px !important;
  background: var(--bento-bg-2) !important;
  border-radius: var(--bento-radius-pill) !important;
  margin-bottom: 20px !important;
  overflow-x: auto !important; overflow-y: hidden !important;
  -webkit-overflow-scrolling: touch !important;
  flex-wrap: nowrap !important; border-bottom: 0 !important;
  width: fit-content; max-width: 100%;
}
.tab, .tab-btn, .tab-button, .dtab {
  padding: 8px 16px !important;
  border: none !important; background: transparent !important; cursor: pointer !important;
  font-size: 13px !important; font-weight: 600 !important;
  font-family: "Inter", sans-serif !important;
  color: var(--bento-text-secondary) !important;
  border-radius: var(--bento-radius-pill) !important;
  margin-bottom: 0 !important;
  transition: all var(--bento-trans) !important;
  white-space: nowrap !important; flex: none !important;
  letter-spacing: -0.005em !important;
}
.tab:hover, .tab-btn:hover, .tab-button:hover, .dtab:hover {
  color: var(--bento-text) !important;
  background: var(--bento-card) !important;
}
.tab.active, .tab-btn.active, .tab-button.active, .dtab.active {
  background: var(--bento-card) !important;
  color: var(--bento-primary) !important;
  box-shadow: var(--bento-shadow-sm) !important;
  font-weight: 700 !important;
}
.tab-content { display: block; }
.tab-content.active { animation: bentoFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
@keyframes bentoFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Stat / KPI cards (premium) ──────────────── */
.stat-card, .stat-item, .metric-card, .kpi-card {
  background: var(--bento-bg-2) !important;
  border: 1px solid var(--bento-border) !important;
  border-radius: var(--bento-radius-sm) !important;
  padding: 18px !important;
  text-align: left !important;
  transition: transform var(--bento-trans), box-shadow var(--bento-trans), border-color var(--bento-trans);
  position: relative; overflow: hidden;
}
.stat-card::before, .metric-card::before, .kpi-card::before {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--bento-grad-primary);
  opacity: 0; transition: opacity var(--bento-trans);
}
.stat-card:hover, .stat-item:hover, .metric-card:hover, .kpi-card:hover {
  transform: translateY(-2px); box-shadow: var(--bento-shadow-lg); border-color: var(--bento-primary-light);
}
.stat-card:hover::before, .metric-card:hover::before, .kpi-card:hover::before { opacity: 1; }
.stat-icon { font-size: 22px; margin-bottom: 6px; opacity: 0.85; }
.stat-value, .stat-val, .metric-value, .kpi-val {
  font-size: 26px; font-weight: 800; line-height: 1.1;
  letter-spacing: -0.02em; color: var(--bento-text);
  font-feature-settings: "tnum" 1;
}
.stat-label, .stat-lbl, .metric-label, .kpi-lbl {
  font-size: 11px; color: var(--bento-text-secondary);
  margin-top: 4px; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;
}
.stat-num {
  font-size: 24px; font-weight: 800; color: var(--bento-primary);
  font-feature-settings: "tnum" 1; letter-spacing: -0.02em;
}
.stat-sub { font-size: 12px; color: var(--bento-text-muted); font-weight: 500; }

/* ── Overview grid ───────────────────────────── */
.overview-grid, .stats-grid, .summary-grid, .stat-cards, .kpi-grid, .metrics-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px; margin-bottom: 20px;
}

/* ── Section headers ─────────────────────────── */
.section-header, .section-title {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 12px; font-weight: 700; color: var(--bento-text-secondary);
  text-transform: uppercase; letter-spacing: 0.08em;
  margin: 16px 0 10px;
}
.section-header::before, .section-title::before {
  content: ""; width: 4px; height: 4px; border-radius: 50%; background: var(--bento-primary);
  margin-right: 8px; flex-shrink: 0;
}

/* ── Loading / Empty / Info ──────────────────── */
.loading-bar {
  height: 3px; border-radius: var(--bento-radius-pill);
  background: linear-gradient(90deg, var(--bento-primary), var(--bento-primary-2), transparent);
  background-size: 200% 100%;
  animation: bentoLoad 1.5s linear infinite; margin-bottom: 12px;
}
@keyframes bentoLoad { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-state, .no-data, .no-results {
  text-align: center; color: var(--bento-text-secondary);
  padding: 40px 20px; font-size: 14px;
  background: var(--bento-bg-2); border-radius: var(--bento-radius-md);
  border: 1px dashed var(--bento-border);
}
.info-note, .tip-box {
  font-size: 13px; color: var(--bento-text-secondary);
  background: var(--bento-primary-light);
  border-radius: var(--bento-radius-sm); padding: 12px 14px;
  border-left: 3px solid var(--bento-primary); margin-top: 12px;
  line-height: 1.55;
}
.last-updated {
  font-size: 11px; color: var(--bento-text-muted);
  text-align: right; margin-top: 12px; font-feature-settings: "tnum" 1;
}

/* ── Buttons (premium) ───────────────────────── */
.refresh-btn {
  background: var(--bento-bg-2); border: 1px solid var(--bento-border);
  border-radius: var(--bento-radius-pill); padding: 6px 14px;
  font-size: 12px; color: var(--bento-text-secondary);
  cursor: pointer; font-weight: 600; transition: all var(--bento-trans);
  font-family: "Inter", sans-serif;
}
.refresh-btn:hover {
  background: var(--bento-card); color: var(--bento-primary);
  border-color: var(--bento-primary); transform: translateY(-1px);
  box-shadow: var(--bento-shadow-sm);
}
.toggle-btn, .action-btn {
  background: var(--bento-grad-primary); border: none;
  border-radius: var(--bento-radius-xs); padding: 8px 16px;
  font-size: 13px; color: #fff; cursor: pointer; font-weight: 600;
  transition: all var(--bento-trans); font-family: "Inter", sans-serif;
  letter-spacing: -0.005em;
  box-shadow: 0 4px 12px -2px var(--bento-primary-glow);
}
.toggle-btn:hover, .action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px -4px var(--bento-primary-glow);
}
.send-btn, .btn-primary {
  width: 100%;
  background: var(--bento-grad-primary); color: #fff;
  border: none; border-radius: var(--bento-radius-sm);
  padding: 12px 20px; font-size: 14px; font-weight: 700;
  cursor: pointer; font-family: "Inter", sans-serif;
  letter-spacing: -0.01em;
  transition: all var(--bento-trans);
  box-shadow: 0 4px 14px -2px var(--bento-primary-glow);
}
.send-btn:hover, .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -6px var(--bento-primary-glow);
}
.send-btn:active, .btn-primary:active { transform: translateY(0); }
.send-btn:disabled, .btn-primary:disabled {
  opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none;
}

/* ── Badges / Status (modern pill) ───────────── */
.badge, .status-badge, .tag, .chip {
  padding: 4px 12px; border-radius: var(--bento-radius-pill);
  font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;
  letter-spacing: 0.04em; text-transform: uppercase;
  border: 1px solid;
}
.badge-ok, .badge-success { background: var(--bento-success-light); color: var(--bento-success); border-color: var(--bento-success-border); }
.badge-er, .badge-error   { background: var(--bento-error-light);   color: var(--bento-error);   border-color: var(--bento-error-border); }
.badge-warn, .badge-warning { background: var(--bento-warning-light); color: var(--bento-warning); border-color: var(--bento-warning-border); }
.badge-info { background: var(--bento-info-light); color: var(--bento-info); border-color: var(--bento-info-border); }

.count-badge {
  font-size: 11px; font-weight: 700; padding: 3px 10px;
  border-radius: var(--bento-radius-pill); display: inline-flex; align-items: center;
  font-feature-settings: "tnum" 1;
}
.error-badge { background: var(--bento-error-light); color: var(--bento-error); border: 1px solid var(--bento-error-border); }
.warn-badge  { background: var(--bento-warning-light); color: var(--bento-warning); border: 1px solid var(--bento-warning-border); }
.info-badge  { background: var(--bento-primary-light); color: var(--bento-primary); border: 1px solid var(--bento-border); }
.ok-badge    { background: var(--bento-success-light); color: var(--bento-success); border: 1px solid var(--bento-success-border); }

/* ── Tables (modern) ─────────────────────────── */
table { width: 100%; border-collapse: separate; border-spacing: 0; }
th {
  background: var(--bento-bg-2); color: var(--bento-text-secondary);
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
  padding: 12px 16px; text-align: left;
  border-bottom: 1px solid var(--bento-border);
}
th:first-child { border-top-left-radius: var(--bento-radius-sm); }
th:last-child  { border-top-right-radius: var(--bento-radius-sm); }
td {
  padding: 14px 16px; border-bottom: 1px solid var(--bento-border);
  color: var(--bento-text); font-size: 13px;
}
tr { transition: background var(--bento-trans-fast); }
tr:hover td { background: var(--bento-primary-light); }
tr:last-child td { border-bottom: 0; }

/* ── Forms / Inputs ──────────────────────────── */
input, select, textarea {
  padding: 10px 14px; border: 1.5px solid var(--bento-border);
  border-radius: var(--bento-radius-xs);
  background: var(--bento-card); color: var(--bento-text);
  font-size: 14px; font-family: "Inter", sans-serif;
  transition: all var(--bento-trans); outline: none;
  letter-spacing: -0.005em;
}
input:focus, select:focus, textarea:focus {
  border-color: var(--bento-primary);
  box-shadow: 0 0 0 4px var(--bento-primary-light);
}
input::placeholder, textarea::placeholder { color: var(--bento-text-muted); }

/* ── Code blocks ─────────────────────────────── */
code {
  background: var(--bento-bg-2); padding: 2px 6px;
  border-radius: 4px; font-size: 12px;
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  border: 1px solid var(--bento-border);
}
pre {
  background: #1e1e2e; color: #e2e8f0;
  padding: 16px; border-radius: var(--bento-radius-sm);
  font-size: 12.5px; overflow-x: auto; line-height: 1.65;
  white-space: pre-wrap; word-break: break-word;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  box-shadow: var(--bento-shadow-md);
}

/* ── Grid layouts ────────────────────────────── */
.schedule-grid, .send-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
}
.schedule-card, .send-card, .info-card {
  background: var(--bento-bg-2); border: 1px solid var(--bento-border);
  border-radius: var(--bento-radius-sm); padding: 16px;
  transition: all var(--bento-trans);
}
.schedule-card:hover, .send-card:hover, .info-card:hover {
  border-color: var(--bento-primary-light); transform: translateY(-1px);
  box-shadow: var(--bento-shadow-md);
}

/* ── Log entries ─────────────────────────────── */
.log-entry {
  display: flex; flex-wrap: wrap; align-items: flex-start;
  gap: 4px 8px; padding: 10px 12px;
  border-radius: var(--bento-radius-sm); margin-bottom: 6px;
  font-size: 12.5px; min-width: 0; overflow: hidden;
  border: 1px solid transparent; transition: all var(--bento-trans-fast);
}
.error-entry { background: var(--bento-error-light); border-color: var(--bento-error-border); }
.warn-entry  { background: var(--bento-warning-light); border-color: var(--bento-warning-border); }
.log-time { color: var(--bento-text-muted); font-feature-settings: "tnum" 1; flex-shrink: 0; font-family: "JetBrains Mono", monospace; }
.log-domain {
  font-weight: 700; flex-shrink: 1; min-width: 0; max-width: 100%;
  overflow: hidden; text-overflow: ellipsis; word-break: break-all;
}
.error-domain { color: var(--bento-error); }
.warn-domain  { color: var(--bento-warning); }
.log-msg {
  color: var(--bento-text-secondary); flex-basis: 100%;
  word-break: break-word; overflow-wrap: anywhere;
  white-space: pre-wrap; min-width: 0; line-height: 1.55;
}

/* ── Send status ─────────────────────────────── */
.send-status {
  padding: 12px 16px; border-radius: var(--bento-radius-sm);
  margin-top: 14px; font-size: 13px; font-weight: 600;
  text-align: center; letter-spacing: -0.005em;
  border: 1px solid;
}
.send-status.sending { background: var(--bento-primary-light); color: var(--bento-primary); border-color: var(--bento-border); }
.send-status.success { background: var(--bento-success-light); color: var(--bento-success); border-color: var(--bento-success-border); }
.send-status.error   { background: var(--bento-error-light);   color: var(--bento-error);   border-color: var(--bento-error-border); }

/* ── Scrollbar ───────────────────────────────── */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--bento-border); border-radius: var(--bento-radius-pill); border: 2px solid transparent; background-clip: content-box; }
::-webkit-scrollbar-thumb:hover { background: var(--bento-text-muted); background-clip: content-box; }

/* ── Animations ──────────────────────────────── */
@keyframes bentoSpin  { to { transform: rotate(360deg); } }
@keyframes bentoPulse { 0%,100% { opacity: 1; } 50% { opacity: .5; } }
@keyframes bentoSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bentoStaggerIn { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

/* Apply stagger to grids of stat-cards */
.stats-grid > *, .overview-grid > *, .summary-grid > * {
  animation: bentoStaggerIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
}
.stats-grid > *:nth-child(1)  { animation-delay: 0.02s; }
.stats-grid > *:nth-child(2)  { animation-delay: 0.06s; }
.stats-grid > *:nth-child(3)  { animation-delay: 0.10s; }
.stats-grid > *:nth-child(4)  { animation-delay: 0.14s; }
.stats-grid > *:nth-child(5)  { animation-delay: 0.18s; }
.stats-grid > *:nth-child(6)  { animation-delay: 0.22s; }

/* ── Mobile — 768 px ─────────────────────────── */
@media (max-width: 768px) {
  .content { padding: 16px; }
  .header { padding: 16px 16px 0; }
  .tabs { gap: 2px !important; padding: 3px !important; }
  .tab, .tab-button, .tab-btn { padding: 6px 12px !important; font-size: 12px !important; }
  .overview-grid, .stats-grid, .summary-grid, .stat-cards, .kpi-grid, .metrics-grid {
    grid-template-columns: repeat(2, 1fr); gap: 10px;
  }
  .stat-value, .stat-val, .kpi-val, .metric-val { font-size: 22px; }
  .stat-label, .stat-lbl, .kpi-lbl, .metric-lbl { font-size: 10px; }
  .send-grid, .schedule-grid { grid-template-columns: 1fr; }
  .log-entry { flex-wrap: wrap; gap: 2px 6px; padding: 8px 10px; }
  .log-domain { max-width: 60%; font-size: 11.5px; }
  .log-msg { flex-basis: 100%; max-width: 100%; font-size: 11.5px; }
  pre { padding: 12px; font-size: 11.5px; }
  h2 { font-size: 18px; }
  h3 { font-size: 15px; }
  table { font-size: 12.5px; }
  th, td { padding: 10px 12px; }
}
@media (max-width: 480px) {
  .tabs { gap: 1px !important; padding: 2px !important; }
  .tab, .tab-button, .tab-btn { padding: 5px 10px !important; font-size: 11px !important; }
  .overview-grid, .stats-grid, .summary-grid { grid-template-columns: 1fr 1fr; }
  .stat-value, .stat-val, .kpi-val { font-size: 18px; }
}
`;
}
// XSS escape singleton (idempotent)
if (typeof window !== 'undefined') {
  window._haToolsEsc = window._haToolsEsc || (function(){
    var MAP = {};
    MAP[String.fromCharCode(38)] = '&amp;';
    MAP[String.fromCharCode(60)] = '&lt;';
    MAP[String.fromCharCode(62)] = '&gt;';
    MAP[String.fromCharCode(34)] = '&quot;';
    MAP[String.fromCharCode(39)] = '&#39;';
    return function(s){ return typeof s === 'string' ? s.replace(/[&<>"']/g, function(c){ return MAP[c]; }) : (s == null ? '' : s); };
  })();
}
// Universal donate footer injector — guarantees the support box appears
// on every split-tool card regardless of internal render state.
if (typeof window !== 'undefined' && !window.__haToolsSplitDonateInjector) {
  window.__haToolsSplitDonateInjector = true;
  var SPLIT_TAGS = ['ha-purge-cache','ha-yaml-checker','ha-data-exporter','ha-baby-tracker','ha-chore-tracker','ha-energy-optimizer','ha-energy-insights','ha-energy-email','ha-log-email','ha-smart-reports','ha-network-map','ha-trace-viewer','ha-automation-analyzer','ha-storage-monitor','ha-backup-manager','ha-security-check','ha-device-health','ha-sentence-manager','ha-encoding-fixer','ha-entity-renamer','ha-frigate-privacy','ha-vacuum-water-monitor'];
  var DONATE_HTML = ''
    + '<div class="donate-section" data-source="ha-tools-split-injector">'
    + '  <div class="donate-text">'
    + '    <h3>❤️ Support HA Tools Development</h3>'
    + '    <p>If this tool makes your Home Assistant life easier, consider supporting the project. Every coffee motivates further development!</p>'
    + '  </div>'
    + '  <div class="donate-buttons">'
    + '    <a class="donate-btn coffee" href="https://buymeacoffee.com/macsiem" target="_blank" rel="noopener noreferrer">☕ Buy Me a Coffee</a>'
    + '    <a class="donate-btn paypal" href="https://www.paypal.com/donate/?hosted_button_id=Y967H4PLRBN8W" target="_blank" rel="noopener noreferrer">💳 PayPal</a>'
    + '  </div>'
    + '</div>';
  function deepFindAll(tag, root) {
    var out = [];
    (function walk(node){
      if (!node || !node.querySelectorAll) return;
      var children = node.querySelectorAll('*');
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (c.tagName && c.tagName.toLowerCase() === tag) out.push(c);
        if (c.shadowRoot) walk(c.shadowRoot);
      }
    })(root || document);
    return out;
  }
  // Per-tool prerequisite check + inline install banner
  var PREREQS = {
    'ha-energy-email': { service: 'ha_tools_email', repo: 'ha-tools-email-integration', label: 'HA Tools Email integration', kind: 'integration' },
    'ha-log-email':    { service: 'ha_tools_email', repo: 'ha-tools-email-integration', label: 'HA Tools Email integration', kind: 'integration' },
    'ha-encoding-fixer': { shellCommand: 'fix_encoding', label: 'shell_command.fix_encoding (optional advanced feature)', kind: 'shell_command_optional' }
  };
  // Per-tool first-run intro banner (one-line scope + 3 use cases)
  var INTROS = {
    'ha-yaml-checker': { headline: 'Validate Home Assistant YAML configuration on demand.', steps: ['Click \'Check HA Configuration\' to run homeassistant.check_config.', 'Switch to \'Encje\' tab to search entities by domain.', 'Use \'Template\' tab to preview Jinja2 templates.'] },
    'ha-data-exporter': { headline: 'Browse, filter, and export Home Assistant entity data.', steps: ['Filter by domain or search entities live.', 'Take a snapshot or export selection to CSV / JSON.', 'Privacy warning before downloading attributes with sensitive data.'] },
    'ha-chore-tracker': { headline: 'Household chore tracker with kanban + recurring schedules.', steps: ['Add a chore: name + assignee + frequency.', 'Drag from \'Todo\' to \'Done\' to mark complete.', 'Stats tab shows counts per assignee.'] },
    'ha-energy-optimizer': { headline: 'Tariff-aware energy usage with hourly heatmaps + tips.', steps: ['Today / Yesterday / 7-day / 30-day usage and cost.', 'Patterns tab — hourly heatmap of consumption.', 'Recommendations tab — auto-generated tips.'] },
    'ha-energy-insights': { headline: 'Daily / weekly / monthly energy charts + top consumers.', steps: ['Switch view tabs to see consumption over time.', 'Top devices ranked by kWh.', 'Tips tab with energy-saving suggestions.'] },
    'ha-energy-email': { headline: 'Energy reports delivered by email via ha_tools_email.', steps: ['Click \'Send Now\' to email the current snapshot.', 'Schedule daily / weekly / monthly delivery.', 'Configure SMTP in the Schedule tab (one-time).'] },
    'ha-log-email': { headline: 'Daily error / warning digests delivered by email.', steps: ['Click \'Send Now\' to email the current digest.', 'Schedule daily delivery + threshold (e.g. \u22653 errors).', 'Requires ha-tools-email-integration.'] },
    'ha-smart-reports': { headline: 'Aggregate weekly / monthly reports — energy + automations + state changes.', steps: ['Weekly summary card on Overview.', 'Drill down by Energy / Automations / System sub-tabs.', 'Privacy-safe view strips entity names before sharing.'] },
    'ha-network-map': { headline: 'Visualise the network around HA — devices, topology, MAC bindings.', steps: ['Devices tab — table of all known devices.', 'Topology tab — graph view of the network.', 'Click \'Rescan\' to ping the local subnet (user-initiated).'] },
    'ha-trace-viewer': { headline: 'Step through HA automation traces with a flow graph.', steps: ['Pick automation in sidebar to see latest 5 traces.', 'Click trace for full path through triggers / conditions / actions.', 'Export trace as JSON for offline debug.'] },
    'ha-automation-analyzer': { headline: 'Surface slow / failing / suspicious automations.', steps: ['Overview shows total + health score + top failing.', 'Performance tab ranks by avg runtime.', 'Optimization tab suggests improvements (loops, redundant triggers).'] },
    'ha-storage-monitor': { headline: 'Disk + recorder DB + add-on storage breakdown.', steps: ['Overview shows used / free + per-category breakdown.', 'Backups tab — count + size warning.', 'Cleanup tab — actionable suggestions.'] },
    'ha-backup-manager': { headline: 'Create + list + inspect HA backups.', steps: ['List existing backups (date / size / encryption).', 'Click \'Create backup now\' to invoke backup.create.', 'Restore selected backup.'] },
    'ha-security-check': { headline: 'Security audit + remediation tips.', steps: ['Overview shows score (X/100) + letter grade.', 'Click warning row for step-by-step remediation.', 'Tips tab — checklist of best practices.'] },
    'ha-device-health': { headline: 'Device battery / signal / last-seen health.', steps: ['List devices grouped by health (OK / Warning / Critical).', 'Filter by low battery (<20%) or weak signal.', 'Click device for model / manufacturer / last seen.'] },
    'ha-encoding-fixer': { headline: 'Detect + fix UTF-8 / mojibake issues across HA.', steps: ['Click \'Scan\' to walk entity registry + states.', 'Per-entity \'Fix\' button calls homeassistant.reload.', 'Optional: deep file scan via shell_command (see README).'] },
    'ha-entity-renamer': { headline: 'Bulk-rename HA entities + friendly names.', steps: ['Pick an entity, set new ID — entity_registry/update.', 'Bulk pattern: sensor.old_* \u2192 sensor.new_*.', 'Optional: rewrite Lovelace dashboard refs.'] },
    'ha-frigate-privacy': { headline: 'One-click Frigate privacy mode (pause detection / recording / snapshots).', steps: ['Click \'Pause 15 min\' for instant privacy.', 'Schedules tab — daily privacy window (e.g. 22:00\u201306:00).', 'Resume at any time to re-enable cameras.'] }
  };
  var PREREQ_HTML_CACHE = {};
  function buildPrereqBanner(tag, prereq, hass) {
    if (PREREQ_HTML_CACHE[tag]) return PREREQ_HTML_CACHE[tag];
    var html = '';
    if (prereq.kind === 'integration') {
      html = '<div class="prereq-banner prereq-error" data-prereq="' + tag + '">' +
        '<div class="prereq-icon">⚠️</div>' +
        '<div class="prereq-text">' +
          '<strong>This tool requires the ' + prereq.label + '</strong><br>' +
          'Install it from HACS: <code>https://github.com/MacSiem/' + prereq.repo + '</code> ' +
          '(Category: <strong>Integration</strong>) — then add <code>' + prereq.service + ':</code> to your <code>configuration.yaml</code> and restart HA.' +
        '</div>' +
        '<a class="prereq-cta" href="https://github.com/MacSiem/' + prereq.repo + '" target="_blank" rel="noopener noreferrer">Open install guide ↗</a>' +
      '</div>';
    } else if (prereq.kind === 'shell_command_optional') {
      html = '<div class="prereq-banner prereq-info" data-prereq="' + tag + '">' +
        '<div class="prereq-icon">💡</div>' +
        '<div class="prereq-text">' +
          '<strong>Optional advanced feature: deep file scan</strong><br>' +
          'To enable scanning of <code>configuration.yaml</code> files, install the bundled <code>encoding_scanner.py</code> + add <code>shell_command:</code> entries. See README.' +
        '</div>' +
      '</div>';
    }
    PREREQ_HTML_CACHE[tag] = html;
    return html;
  }
  function buildIntroBanner(tag, intro) {
    var stepsHtml = intro.steps.map(function(s){ return '<li>' + s + '</li>'; }).join('');
    return '<div class="intro-banner" data-intro="' + tag + '">' +
      '<button class="intro-dismiss" type="button" title="Dismiss" aria-label="Dismiss">✕</button>' +
      '<div class="intro-headline">💡 ' + intro.headline + '</div>' +
      '<ol class="intro-steps">' + stepsHtml + '</ol>' +
    '</div>';
  }
  function introDismissed(tag) {
    try { return localStorage.getItem('ha-intro-dismissed-' + tag) === '1'; } catch(e) { return false; }
  }
  function dismissIntro(tag, el) {
    try { localStorage.setItem('ha-intro-dismissed-' + tag, '1'); } catch(e) {}
    var node = el.shadowRoot && el.shadowRoot.querySelector('.intro-banner[data-intro="' + tag + '"]');
    if (node) node.remove();
  }
  function injectAll() {
    SPLIT_TAGS.forEach(function(tag){
      deepFindAll(tag).forEach(function(el){
        // panel_custom auto-init: HA assigns hass/panel/narrow but does not always call setConfig.
        if (typeof el.setConfig === 'function' && !el.config && !el._config) {
          try { el.setConfig({ type: 'custom:' + tag, title: tag }); } catch(e) {}
        }
        if (!el.shadowRoot) return;
        // 0) First-run intro banner (skip if tool has its own native tip)
        var intro = INTROS[tag];
        if (intro && !introDismissed(tag)) {
          var hasOwnTip = el.shadowRoot.querySelector('#tip-banner, .tip-banner');
          var injectedIntro = el.shadowRoot.querySelector('.intro-banner[data-intro="' + tag + '"]');
          if (!hasOwnTip && !injectedIntro) {
            var topCard = el.shadowRoot.querySelector('.card, .card-container, .main-card, [class$="-card"]') || el.shadowRoot.firstElementChild;
            if (topCard) {
              try {
                topCard.insertAdjacentHTML('afterbegin', buildIntroBanner(tag, intro));
                var btn = el.shadowRoot.querySelector('.intro-banner[data-intro="' + tag + '"] .intro-dismiss');
                if (btn) btn.addEventListener('click', function(ev){ ev.stopPropagation(); dismissIntro(tag, el); });
              } catch(e) {}
            }
          }
        }
        // 1) Prereq banner — checked every poll so it disappears when prereq becomes available
        var prereq = PREREQS[tag];
        if (prereq && el._hass) {
          var hassReady = !!el._hass;
          var present = true;
          if (prereq.service) present = !!(el._hass.services && el._hass.services[prereq.service]);
          if (prereq.shellCommand) present = !!(el._hass.services && el._hass.services.shell_command && el._hass.services.shell_command[prereq.shellCommand]);
          var existing = el.shadowRoot.querySelector('.prereq-banner[data-prereq="' + tag + '"]');
          if (!present && hassReady) {
            if (!existing) {
              var top = el.shadowRoot.querySelector('.card, .card-container, .main-card, [class$="-card"]') || el.shadowRoot.firstElementChild || el.shadowRoot;
              try { top.insertAdjacentHTML('afterbegin', buildPrereqBanner(tag, prereq, el._hass)); } catch(e) {}
            }
          } else if (present && existing) {
            existing.remove();
          }
        }
        // 2) Donate footer
        if (el.shadowRoot.querySelector('.donate-section')) return;
        var target = el.shadowRoot.querySelector('.card, .card-container, .main-card, [class$="-card"]') || el.shadowRoot.firstElementChild || el.shadowRoot;
        try { target.insertAdjacentHTML('beforeend', DONATE_HTML); } catch(e) {}
      });
    });
  }
  // Run immediately, then aggressive MutationObserver for late mounts + view switches.
  injectAll();
  setTimeout(injectAll, 250);
  setTimeout(injectAll, 1000);
  setTimeout(injectAll, 3000);
  // MutationObserver catches every new node anywhere in the DOM, including shadow root attachments
  // that are deferred until the user navigates to a view.
  try {
    var obs = new MutationObserver(function(muts){
      // Debounce: schedule a microtask injection
      if (window.__haToolsDonateScheduled) return;
      window.__haToolsDonateScheduled = true;
      setTimeout(function(){ window.__haToolsDonateScheduled = false; injectAll(); }, 100);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  } catch(e) {}
  // Also re-inject on hash/path change (Lovelace view switches)
  window.addEventListener('hashchange', function(){ setTimeout(injectAll, 200); });
  window.addEventListener('popstate', function(){ setTimeout(injectAll, 200); });
  // Backup interval (every 3s for first 5min — handles cases where MutationObserver missed events)
  var pollCount = 0;
  var pollInterval = setInterval(function(){
    injectAll();
    if (++pollCount >= 100) clearInterval(pollInterval);
  }, 3000);
}
/* ============================================================ */

class HaEnergyOptimizer extends HTMLElement {
  constructor() {
    super();
    this._lang = (navigator.language || '').startsWith('pl') ? 'pl' : 'en';
    this.attachShadow({ mode: 'open' });
    this._toolId = this.tagName.toLowerCase().replace('ha-', '');
    // --- Throttle fields ---
    this._lastRenderTime = 0;
    this._renderScheduled = false;
    this._firstHassRender = false;
    // --- Pagination ---
    this._currentPage = {};
    this._pageSize = 15;
    this._hass = null;
    this._config = null;
    this._currentTab = 'dashboard';
    this._timeRange = 'today'; // 'today' | 'yesterday' | '7days' | '30days' | 'custom'
    this._energyData = [];
    this._weeklyData = [];
    this._recommendations = [];
    this._comparisonData = null;
    this._compareMode = 'week'; // 'week' | 'month'
    this._comparePeriod = 'w-w'; // 'w-w' | 'm-m' | 'y-y'
    this._longTermData = null; // daily totals for 13 months
    // --- Real data fields ---
    this._hasRealData = false;
    this._currentPowerW = 0;
    this._statsLoading = false;
    this._lastStatsFetch = 0;
    this._energySensorIds = [];    this._charts = {};
    this._chartJsLoaded = false;
    this._domBuilt = false;
    this._lastHtml = '';
  }
  disconnectedCallback() {
    this._destroyAllCharts();
  }

  static getConfigElement() {
    return document.createElement('ha-energy-optimizer-editor');
  }

  getCardSize() { return 8; }

  static getStubConfig() {
    return {
      type: 'custom:ha-energy-optimizer',
      title: 'Energy Optimizer',
      currency: 'PLN',
      peak_hours: { start: 6, end: 22 },
      entities: ['sensor.energy_total', 'sensor.energy_grid']
    };
  }



  _sanitize(str) {
    if (!str) return str;
    try { return decodeURIComponent(escape(str)); } catch(e) { return str; }
  }


  get _t() {
    const T = {
      pl: {
        title: 'Optymalizator Energii',
        loading: 'Wczytywanie...',
        noData: 'Brak danych',
        error: 'Błąd',
        refresh: 'Odśwież',
        save: 'Zapisz',
        cancel: 'Anuluj',
        locale: 'pl-PL',
      },
      en: {
        title: 'Energy Optimizer',
        loading: 'Loading...',
        noData: 'No data',
        error: 'Error',
        refresh: 'Refresh',
        save: 'Save',
        cancel: 'Cancel',
        locale: 'en-US',
      },
    };
    return T[this._lang] || T.en;
  }

  setConfig(config) {
    this._config = { ...config };
    // Load saved rate settings from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('ha-tools-energy-optimizer-settings') || '{}');
      if (saved.energy_tariff_mode) this._config.energy_tariff_mode = saved.energy_tariff_mode;
      if (saved.energy_price) this._config.energy_price = saved.energy_price;
      if (saved.energy_price_day) this._config.energy_price_day = saved.energy_price_day;
      if (saved.energy_price_night) this._config.energy_price_night = saved.energy_price_night;
      if (saved.energy_day_hour_start) this._config.energy_day_hour_start = saved.energy_day_hour_start;
      if (saved.energy_night_hour_start) this._config.energy_night_hour_start = saved.energy_night_hour_start;
      if (saved.currency) this._config.currency = saved.currency;
    } catch(e) { console.debug('[ha-energy-optimizer] caught:', e); }
    this._domBuilt = false;
    this._generateFallbackData();
    this._generateRecommendations();
    this._generateComparisonData();
  }

  _getRate(hour, dayOfWeek) {
    const c = this._config;
    const mode = c.energy_tariff_mode || 'flat';
    const dayStart = c.energy_day_hour_start || 6;
    const nightStart = c.energy_night_hour_start || 22;
    const isDay = (dayStart < nightStart) ? (hour >= dayStart && hour < nightStart) : (hour >= dayStart || hour < nightStart);
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    switch (mode) {
      case 'day_night':
        return isDay ? (c.energy_price_day || 0.65) : (c.energy_price_night || 0.45);
      case 'weekday_weekend':
        return isWeekend ? (c.energy_price_weekend || 0.50) : (c.energy_price_weekday || 0.65);
      case 'mixed':
        if (isWeekend) return isDay ? (c.energy_price_we_day || 0.55) : (c.energy_price_we_night || 0.40);
        return isDay ? (c.energy_price_wd_day || 0.65) : (c.energy_price_wd_night || 0.45);
      default:
        return c.energy_price || 0.65;
    }
  }

  _getAvgRate() {
    const c = this._config;
    const mode = c.energy_tariff_mode || 'flat';
    if (mode === 'flat') return c.energy_price || 0.65;
    let sum = 0;
    for (let dow = 0; dow < 7; dow++) {
      for (let h = 0; h < 24; h++) {
        sum += this._getRate(h, dow);
      }
    }
    return sum / 168;
  }

  _getTimeRangeDates() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    switch (this._timeRange) {
      case 'yesterday': {
        const yest = new Date(today); yest.setDate(yest.getDate() - 1);
        return { start: yest, end: today };
      }
      case '7days': {
        const s = new Date(today); s.setDate(s.getDate() - 7);
        return { start: s, end: tomorrow };
      }
      case '30days': {
        const s = new Date(today); s.setDate(s.getDate() - 30);
        return { start: s, end: tomorrow };
      }
      default: // 'today'
        return { start: today, end: tomorrow };
    }
  }

  _getTariffLabel() {
    const c = this._config;
    const mode = c.energy_tariff_mode || 'flat';
    const cur = c.currency || 'PLN';
    const suffix = { 'day_night': ' (day/night)', 'weekday_weekend': ' (weekday/weekend)' };
    switch (mode) {
      case 'day_night': return cur + ' ' + (c.energy_price_day || 0.65) + '/' + (c.energy_price_night || 0.45) + (suffix['day_night'] || '');
      case 'weekday_weekend': return cur + ' ' + (c.energy_price_weekday || 0.65) + '/' + (c.energy_price_weekend || 0.50) + (suffix['weekday_weekend'] || '');
      case 'mixed': return cur + ' mix';
      default: return cur + ' @ ' + (c.energy_price || 0.65) + '/kWh';
    }
  }


  set hass(hass) {

    if (hass?.language) this._lang = hass.language.startsWith('pl') ? 'pl' : 'en';    this._hass = hass;
    if (!hass) return;
    if (!this._config) return; // wait for setConfig
    const now = Date.now();
    if (!this._firstHassRender) {
      this._firstHassRender = true;
      this._updateEnergyData();
      this._fetchEnergyStats();
      this._render();
      this._lastRenderTime = now;
      return;
    }
    if (now - (this._lastRenderTime || 0) < 15000) {
      if (!this._renderScheduled) {
        this._renderScheduled = true;
        setTimeout(() => {
          this._renderScheduled = false;
          // Check if energy-relevant state actually changed
          const powerSensors = Object.entries(hass.states)
            .filter(([id, s]) => (s.attributes.device_class === 'power' || s.attributes.unit_of_measurement === 'W') && !isNaN(parseFloat(s.state)));
          const newHash = powerSensors.map(([id, s]) => id + '=' + s.state).join(',');
          if (newHash === this._lastStateHash) return;
          this._lastStateHash = newHash;
          this._updateEnergyData();
          this._render();
          this._lastRenderTime = Date.now();
        }, 10000);
      }
      return;
    }
      this._updateEnergyData();
    this._render();
    this._lastRenderTime = now;
  }

  async _fetchEnergyStats() {
    if (!this._hass || !this._hass.callWS) return;
    if (this._statsLoading) return;
    this._statsLoading = true;

    try {
      // Step 1: Find all kWh statistic IDs
      const allStats = await this._hass.callWS({
        type: 'recorder/list_statistic_ids',
        statistic_type: 'sum'
      });
      const kwhIds = allStats
        .filter(s => s.statistics_unit_of_measurement === 'kWh')
        .filter(s => {
          const id = s.statistic_id;
          return !id.includes('_daily') && !id.includes('_weekly') && !id.includes('_monthly') && !id.includes('_last_') && !id.includes('_cost');
        })
        .map(s => s.statistic_id);

      if (kwhIds.length === 0) {
        this._statsLoading = false;
        this._hasRealData = false; this._recommendations = []; return; // No energy sensors
      }

      this._energySensorIds = kwhIds;

      // Step 2: Determine date range based on _timeRange
      const now = new Date();
      const { start: rangeStart, end: rangeEnd } = this._getTimeRangeDates();
      // Always fetch at least 7 days for weekly data and comparison
      const fetchStart = new Date(Math.min(rangeStart.getTime(), now.getTime() - 7 * 24 * 3600000));

      const stats = await this._hass.callWS({
        type: 'recorder/statistics_during_period',
        start_time: fetchStart.toISOString(),
        end_time: now.toISOString(),
        statistic_ids: kwhIds,
        period: 'hour',
        types: ['change']
      });

      // Step 3: Aggregate all sensors into hourly totals for selected time range
      const hourlySelected = {};
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const hourlyToday = new Array(24).fill(0);

      // Step 4: Aggregate into weekly data (7 days x 24 hours)
      const weeklyHourly = Array.from({length: 7}, () => new Array(24).fill(0));

      kwhIds.forEach(id => {
        const sensorData = stats[id] || [];
        // Check unit - convert Wh to kWh if needed
        const attrs = this._hass.states?.[id]?.attributes || {};
        const isWh = attrs.unit_of_measurement === 'Wh';
        sensorData.forEach(entry => {
          let change = Math.max(0, entry.change ?? 0); // ignore negative (meter resets)
          if (isWh) change /= 1000; // Wh → kWh
          const entryDate = new Date(entry.start);
          const hour = entryDate.getHours();
          const dateKey = `${entryDate.getFullYear()}-${String(entryDate.getMonth()+1).padStart(2,'0')}-${String(entryDate.getDate()).padStart(2,'0')}`;

          // Selected time range data (for display)
          if (entryDate >= rangeStart && entryDate < rangeEnd) {
            if (!hourlySelected[dateKey]) hourlySelected[dateKey] = new Array(24).fill(0);
            hourlySelected[dateKey][hour] += change;
          }

          // Today's data
          if (entryDate >= todayStart) {
            hourlyToday[hour] += change;
          }

          // Weekly data - find which day (0=oldest, 6=today)
          const dayDiff = Math.floor((now - entryDate) / 86400000);
          const dayIndex = 6 - dayDiff;
          if (dayIndex >= 0 && dayIndex < 7) {
            weeklyHourly[dayIndex][hour] += change;
          }
        });
      });

      // For display, use either today's data or aggregated range data depending on _timeRange
      if (this._timeRange === 'today') {
        this._energyData = hourlyToday;
      } else {
        // Aggregate all hourly data from selected range into one 24-hour view
        const aggregated = new Array(24).fill(0);
        const daysInRange = Object.values(hourlySelected);
        daysInRange.forEach(dayData => {
          dayData.forEach((kwh, hour) => {
            aggregated[hour] += kwh;
          });
        });
        if (daysInRange.length > 0) {
          this._energyData = aggregated.map(h => h / daysInRange.length); // Average per hour
        } else {
          this._energyData = hourlyToday; // Fallback to today
        }
      }
      this._weeklyData = weeklyHourly;
      this._hasRealData = true;

      // Step 5: Fetch long-term daily data (13 months) for comparison modes
      try {
        const yearAgo = new Date(now.getTime() - 400 * 24 * 3600000);
        const longStats = await this._hass.callWS({
          type: 'recorder/statistics_during_period',
          start_time: yearAgo.toISOString(),
          end_time: now.toISOString(),
          statistic_ids: kwhIds,
          period: 'day',
          types: ['change']
        });
        // Aggregate into daily totals keyed by 'YYYY-MM-DD'
        const dailyMap = {};
        kwhIds.forEach(id => {
          const sensorData = longStats[id] || [];
          const attrs = this._hass.states?.[id]?.attributes || {};
          const isWh = attrs.unit_of_measurement === 'Wh';
          sensorData.forEach(entry => {
            let change = Math.max(0, entry.change ?? 0);
            if (isWh) change /= 1000;
            const d = new Date(entry.start);
            const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            dailyMap[key] = (dailyMap[key] || 0) + change;
          });
        });
        this._longTermData = dailyMap;
      } catch (e) {
        console.warn('Energy Optimizer: Long-term fetch failed:', e.message);
        this._longTermData = {};
      }

      // Recalculate dependent data
      this._generateRecommendations();
      this._generateComparisonData();
      // Update DOM in place (no full rebuild)
      if (this._domBuilt) {
        this._updateDomValues();
        // Redraw chart only after fresh data fetch
        this._showTab(this._currentTab);
      }

    } catch (err) {
      console.warn('Energy Optimizer: Failed to fetch stats, using demo fallback:', err.message);
      // Keep existing demo data as fallback
    }
    this._statsLoading = false;
  }

  _updateEnergyData() {
    if (!this._hass) return;
    // Update current power draw from power sensors
    const powerSensors = Object.entries(this._hass.states)
      .filter(([id, s]) => {
        const dc = s.attributes.device_class;
        const unit = s.attributes.unit_of_measurement;
        return (dc === 'power' || unit === 'W') && !isNaN(parseFloat(s.state));
      });
    this._currentPowerW = powerSensors.reduce((sum, [, s]) => sum + parseFloat(s.state), 0);

    // Fetch stats every 5 minutes (not on every hass update)
    const now = Date.now();
    if (!this._lastStatsFetch || (now - this._lastStatsFetch) > 300000) {
      this._lastStatsFetch = now;
      this._fetchEnergyStats();
    }
  }

  _generateFallbackData() {
    if (this._energyData && this._energyData.length > 0) return; // Use cached data
    // Generate 24-hour energy data
    const rng = this._seededRandom('energy-demo-data');
    this._energyData = [];
    const baseUsage = 0.5;
    for (let hour = 0; hour < 24; hour++) {
      let usage = baseUsage;
      if (hour >= 6 && hour <= 9) usage += 1.2; // Morning peak
      if (hour >= 18 && hour <= 21) usage += 1.8; // Evening peak
      if (hour >= 23 || hour <= 5) usage -= 0.3; // Night low
      usage += rng() * 0.3 - 0.15; // Random variation
      this._energyData.push(Math.max(0.1, usage));
    }

    // Generate weekly data (7 days x 24 hours)
    this._weeklyData = [];
    for (let day = 0; day < 7; day++) {
      const dayData = [];
      for (let hour = 0; hour < 24; hour++) {
        let usage = baseUsage;
        if (hour >= 6 && hour <= 9) usage += (day < 5 ? 1.2 : 0.8); // Weekday vs weekend
        if (hour >= 18 && hour <= 21) usage += (day < 5 ? 1.8 : 1.0);
        if (hour >= 23 || hour <= 5) usage -= 0.3;
        usage += rng() * 0.3 - 0.15;
        dayData.push(Math.max(0.1, usage));
      }
      this._weeklyData.push(dayData);
    }
  }

  _generateRecommendations() {
    if (!this._hasRealData) { this._recommendations = []; return; }
    const peakHourStart = this._config.peak_hours?.start || 6;
    const peakHourEnd = this._config.peak_hours?.end || 22;
    const avgPeakUsage = this._energyData.slice(peakHourStart, peakHourEnd).reduce((a, b) => a + b, 0) / (peakHourEnd - peakHourStart);
    const avgOffPeakUsage = this._energyData.slice(0, peakHourStart).concat(this._energyData.slice(peakHourEnd)).reduce((a, b) => a + b, 0) / (24 - (peakHourEnd - peakHourStart));

    this._recommendations = [
      {
        id: 1,
        icon: '🧺',
        title: `Shift laundry to off-peak hours`,
        description: `Your peak usage is ${peakHourStart}-${peakHourEnd}. Running laundry at night saves up to 30% on that load.`,
        savings: 12.5,
        difficulty: 'easy',
        impact: 'high'
      },
      {
        id: 2,
        icon: '🍽️',
        title: 'Use dishwasher in off-peak time',
        description: 'Schedule dishwasher runs for morning or late evening when rates are lower.',
        savings: 8.3,
        difficulty: 'easy',
        impact: 'medium'
      },
      {
        id: 3,
        icon: '🌡️',
        title: 'Optimize thermostat settings',
        description: `Reduce heating by 1Â°C during peak hours (${peakHourStart}-${peakHourEnd}) for consistent savings.`,
        savings: 15.0,
        difficulty: 'medium',
        impact: 'high'
      },
      {
        id: 4,
        icon: '💡',
        title: 'Replace with LED lighting',
        description: 'Your evening usage spikes significantly. LED bulbs reduce lighting energy by 75%.',
        savings: 6.2,
        difficulty: 'medium',
        impact: 'medium'
      },
      {
        id: 5,
        icon: '🔌',
        title: 'Reduce standby power consumption',
        description: 'Use smart power strips to eliminate phantom loads from devices in standby mode.',
        savings: 4.5,
        difficulty: 'easy',
        impact: 'low'
      }
    ];
  }

  // Helper: sum dailyMap values in date range [from, to)
  _sumRange(from, to) {
    const dm = this._longTermData || {};
    let sum = 0;
    const d = new Date(from);
    while (d < to) {
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      sum += dm[key] || 0;
      d.setDate(d.getDate() + 1);
    }
    return sum;
  }

  // Helper: get daily totals array in date range [from, to)
  _dailyRange(from, to) {
    const dm = this._longTermData || {};
    const result = [];
    const d = new Date(from);
    while (d < to) {
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      result.push(dm[key] || 0);
      d.setDate(d.getDate() + 1);
    }
    return result;
  }

  _generateComparisonData() {
    if (!this._energyData || this._energyData.length === 0) return;
    const rate = this._getAvgRate();
    const currency = this._config.currency || 'PLN';
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // === Week-to-week ===
    const thisWeekStart = new Date(today); thisWeekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
    if (thisWeekStart > today) thisWeekStart.setDate(thisWeekStart.getDate() - 7);
    const lastWeekStart = new Date(thisWeekStart); lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const thisWeekKwh = this._sumRange(thisWeekStart, today);
    const lastWeekKwh = this._sumRange(lastWeekStart, thisWeekStart);
    const thisWeekDaily = this._dailyRange(thisWeekStart, today);
    const lastWeekDaily = this._dailyRange(lastWeekStart, thisWeekStart);

    // === Month-to-month ===
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthKwh = this._sumRange(thisMonthStart, today);
    const lastMonthKwh = this._sumRange(lastMonthStart, thisMonthStart);
    const thisMonthDaily = this._dailyRange(thisMonthStart, today);
    const lastMonthDaily = this._dailyRange(lastMonthStart, thisMonthStart);

    // === Year-to-year (same month last year vs this year) ===
    const lastYearMonthStart = new Date(now.getFullYear() - 1, now.getMonth(), 1);
    const lastYearMonthEnd = new Date(now.getFullYear() - 1, now.getMonth() + 1, 0);
    lastYearMonthEnd.setDate(lastYearMonthEnd.getDate() + 1); // exclusive end
    const lastYearMonthKwh = this._sumRange(lastYearMonthStart, lastYearMonthEnd) || 0;
    const lastYearMonthDaily = this._dailyRange(lastYearMonthStart, lastYearMonthEnd) || [];

    // Monthly totals for last 12 months (for chart)
    const monthlyTotals = [];
    for (let i = 11; i >= 0; i--) {
      const ms = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const me = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const label = ms.toLocaleString('default', { month: 'short', year: '2-digit' });
      monthlyTotals.push({ label, kwh: this._sumRange(ms, me) || 0 });
    }

    // Weekly totals for last 8 weeks
    const weeklyTotals = [];
    for (let i = 7; i >= 0; i--) {
      const ws = new Date(thisWeekStart); ws.setDate(ws.getDate() - i * 7);
      const we = new Date(ws); we.setDate(we.getDate() + 7);
      const wn = ws.toLocaleDateString('default', { day: 'numeric', month: 'short' });
      weeklyTotals.push({ label: wn, kwh: this._sumRange(ws, we > now ? today : we) || 0 });
    }

    this._comparisonData = {
      rate, currency,
      // Week
      thisWeekKwh, lastWeekKwh, thisWeekDaily: thisWeekDaily || [], lastWeekDaily: lastWeekDaily || [],
      // Month
      thisMonthKwh, lastMonthKwh, thisMonthDaily: thisMonthDaily || [], lastMonthDaily: lastMonthDaily || [],
      // Year
      lastYearMonthKwh, lastYearMonthDaily, thisMonthLabel: now.toLocaleString('default', { month: 'long' }),
      // Aggregates
      monthlyTotals, weeklyTotals
    };
  }

  _renderCompareBody() {
    const c = this._comparisonData;
    if (!c) return '<div style="text-align:center;color:var(--bento-text-secondary);padding:40px">Ładowanie danych...</div>';
    const mode = this._comparePeriod;
    const r = c.rate;
    const cur = c.currency;

    let currentKwh, prevKwh, currentLabel, prevLabel, chartLabels, chartCurrent, chartPrev;

    if (mode === 'w-w') {
      currentKwh = c.thisWeekKwh; prevKwh = c.lastWeekKwh;
      currentLabel = 'Ten tydzień'; prevLabel = 'Poprzedni tydz.';
      const days = ['Pn','Wt','Śr','Cz','Pt','So','Nd'];
      chartLabels = days.slice(0, Math.max(c.thisWeekDaily.length, c.lastWeekDaily.length));
      chartCurrent = c.thisWeekDaily; chartPrev = c.lastWeekDaily;
    } else if (mode === 'm-m') {
      currentKwh = c.thisMonthKwh; prevKwh = c.lastMonthKwh;
      currentLabel = 'Ten miesiąc'; prevLabel = 'Poprzedni mies.';
      const maxLen = Math.max(c.thisMonthDaily.length, c.lastMonthDaily.length);
      chartLabels = Array.from({length: maxLen}, (_, i) => i + 1);
      chartCurrent = c.thisMonthDaily; chartPrev = c.lastMonthDaily;
    } else { // y-y
      currentKwh = c.thisMonthKwh; prevKwh = c.lastYearMonthKwh;
      currentLabel = `${c.thisMonthLabel} ${new Date().getFullYear()}`;
      prevLabel = `${c.thisMonthLabel} ${new Date().getFullYear() - 1}`;
      const maxLen = Math.max(c.thisMonthDaily.length, c.lastYearMonthDaily.length);
      chartLabels = Array.from({length: maxLen}, (_, i) => i + 1);
      chartCurrent = c.thisMonthDaily; chartPrev = c.lastYearMonthDaily;
    }

    const diff = prevKwh > 0 ? ((currentKwh - prevKwh) / prevKwh * 100) : 0;
    const isUp = currentKwh > prevKwh;
    const costDiff = (currentKwh - prevKwh) * r;

    return `
      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-title">${currentLabel}</div>
          <div class="comparison-value">${currentKwh.toFixed(1)}</div>
          <div class="comparison-title">kWh • ${(currentKwh * r).toFixed(2)} ${cur}</div>
        </div>
        <div class="comparison-card">
          <div class="comparison-title">${prevLabel}</div>
          <div class="comparison-value">${prevKwh.toFixed(1)}</div>
          <div class="comparison-title">kWh • ${(prevKwh * r).toFixed(2)} ${cur}</div>
          <div class="change-indicator ${isUp ? 'change-up' : 'change-down'}">
            ${isUp ? '▲' : '▼'} ${Math.abs(diff).toFixed(1)}%
          </div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-title">
          <span>${currentLabel} vs ${prevLabel}</span>
          <span style="font-size:12px;color:var(--bento-text-secondary);font-weight:400">kWh/dzień</span>
        </div>
        <canvas id="comparison-chart"></canvas>
      </div>

      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-label">Różnica kosztów</div>
          <div class="stat-value" style="color:${isUp ? 'var(--bento-error)' : 'var(--bento-success)'}">${costDiff >= 0 ? '+' : ''}${costDiff.toFixed(2)} ${cur}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">${this._lang === 'pl' ? '\u015Ar. dzienny koszt (teraz)' : 'Avg. daily cost (current)'}</div>
          <div class="stat-value">${chartCurrent.length > 0 ? ((currentKwh / chartCurrent.length) * r).toFixed(2) : '—'} ${cur}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">${this._lang === 'pl' ? '\u015Ar. dzienny koszt (poprz.)' : 'Avg. daily cost (previous)'}</div>
          <div class="stat-value">${chartPrev.length > 0 ? ((prevKwh / chartPrev.length) * r).toFixed(2) : '—'} ${cur}</div>
        </div>
      </div>

      ${mode !== 'y-y' ? `
      <div class="chart-container" style="height:200px;overflow:hidden">
        <div class="chart-title">
          <span>${mode === 'w-w' ? 'Ostatnie 8 tygodni' : 'Ostatnie 12 miesięcy'}</span>
        </div>
        <canvas id="trend-bar-chart"></canvas>
      </div>` : ''}
    `;
  }

  _render() {
    if (!this._hass) return;
    const L = this._lang === 'pl';
    if (!this._domBuilt) {
      // First render: full DOM build
      this._destroyAllCharts();
      const html = this._getStyles() + this._getTemplate();
      if (this._lastHtml === html) return;
      this._lastHtml = html;
      this.shadowRoot.innerHTML = html;
      this._setupEventListeners();
      this._renderCurrentTab();
      this._domBuilt = true;
    } else {
      // Subsequent renders: update values in place without rebuilding DOM
      this._updateDomValues();
      // Do NOT redraw charts on every hass update - only on tab change or data refresh
    }
  }

  _updateDomValues() {
    const sr = this.shadowRoot;
    if (!sr) return;
    // Update summary cards
    const summaryValues = sr.querySelectorAll('.summary-value');
    if (summaryValues[0]) summaryValues[0].textContent = this._calculateTodayUsage().toFixed(2);
    if (summaryValues[1]) summaryValues[1].textContent = this._calculateTodayCost().toFixed(2);
    // 3rd card: either savings or peak hour
    if (summaryValues[2]) {
      const hasDualTariff = (this._config.energy_tariff_mode || 'flat') !== 'flat';
      summaryValues[2].textContent = hasDualTariff
        ? this._calculatePotentialSavings().toFixed(2)
        : this._getPeakHour() + ':00';
    }
    if (summaryValues[3]) summaryValues[3].textContent = this._calculateEfficiencyScore();
    // Update power draw
    const powerVal = sr.querySelector('.power-draw-value');
    if (powerVal) powerVal.textContent = (this._currentPowerW / 1000).toFixed(2);
    // Update data source badge
    const badge = sr.querySelector('.data-source-badge');
    if (badge) {
      badge.textContent = this._hasRealData
        ? `\u{1F4CA} Dane z ${(this._energySensorIds || []).length} sensor\u00F3w energii`
        : (this._statsLoading ? '\u23F3 Wczytywanie danych z recorder...' : '\u26A0\uFE0F Demo data \u2014 brak sensor\u00F3w kWh');
    }
    // Update comparison tab body
    if (this._comparisonData) {
      const cmpBody = sr.querySelector('#compare-body');
      if (cmpBody) cmpBody.innerHTML = this._renderCompareBody();
    }
    // Update pattern stats
    const statValues = sr.querySelectorAll('#patterns .stat-value');
    if (statValues[0]) statValues[0].textContent = this._energyData.reduce((a, b) => Math.max(a, b), 0).toFixed(2) + ' kWh';
    if (statValues[1]) statValues[1].textContent = (this._energyData.slice(0, this._config.peak_hours?.start || 6).reduce((a, b) => a + b, 0) / (this._config.peak_hours?.start || 6)).toFixed(2) + ' kWh/h';
    if (statValues[2]) statValues[2].textContent = this._calculatePeakRatio().toFixed(1) + ':1';
  }

  _getStyles() {
    return `
      <style>${window.HAToolsBentoCSS || ""}
/* === HA Tools split — premium banners (donate / intro / prereq) === */

/* Donation footer — diamond top */
.donate-section {  margin: 24px 0 4px; padding: 20px 24px; position: relative; overflow: hidden;  background: linear-gradient(135deg, rgba(99,102,241,0.06), rgba(236,72,153,0.06));  border: 1px solid rgba(99,102,241,0.18); border-radius: var(--bento-radius-md, 18px);  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 18px;  font-family: 'Inter', -apple-system, sans-serif;}
.donate-section::before {  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);}
.donate-section .donate-text { flex: 1; min-width: 240px; }
.donate-section h3 {  margin: 0 0 6px; font-size: 16px; font-weight: 700; letter-spacing: -0.02em;  background: linear-gradient(135deg, #6366f1, #ec4899);  -webkit-background-clip: text; background-clip: text; color: transparent;}
.donate-section p { margin: 0; font-size: 13px; line-height: 1.55; color: var(--bento-text-secondary, #57534e); letter-spacing: -0.005em; }
.donate-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
.donate-btn {  display: inline-flex; align-items: center; gap: 6px; padding: 10px 18px;  border-radius: 12px; font-weight: 700; font-size: 13px; letter-spacing: -0.005em;  text-decoration: none; transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s, filter 0.2s;  border: 1px solid transparent;}
.donate-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
.donate-btn.coffee {  background: linear-gradient(135deg, #FFDD00, #FFC700); color: #000;  box-shadow: 0 4px 14px -2px rgba(255, 221, 0, 0.4);}
.donate-btn.coffee:hover { box-shadow: 0 8px 24px -4px rgba(255, 221, 0, 0.55); }
.donate-btn.paypal {  background: linear-gradient(135deg, #0070ba, #005ea6); color: #fff;  box-shadow: 0 4px 14px -2px rgba(0, 112, 186, 0.45);}
.donate-btn.paypal:hover { box-shadow: 0 8px 24px -4px rgba(0, 112, 186, 0.6); }
@media (prefers-color-scheme: dark) {  .donate-section { background: linear-gradient(135deg, rgba(129,140,248,0.10), rgba(244,114,182,0.10)); border-color: rgba(129,140,248,0.25); }  .donate-section h3 { background: linear-gradient(135deg, #a5b4fc, #f9a8d4); -webkit-background-clip: text; background-clip: text; color: transparent; }  .donate-section p { color: #d6d3d1; } }
@media (max-width: 600px) {  .donate-section { flex-direction: column; text-align: center; padding: 18px; }  .donate-buttons { justify-content: center; width: 100%; } }

/* Prereq banner — premium */
.prereq-banner {  display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px;  border-radius: var(--bento-radius-sm, 12px); margin: 0 0 16px;  font-size: 13px; line-height: 1.55; border: 1px solid;  font-family: 'Inter', sans-serif; letter-spacing: -0.005em;  position: relative; overflow: hidden;}
.prereq-banner::before {  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;}
.prereq-banner.prereq-error { background: rgba(239,68,68,0.06); border-color: rgba(239,68,68,0.25); color: #991b1b; }
.prereq-banner.prereq-error::before { background: linear-gradient(180deg, #ef4444, #f87171); }
.prereq-banner.prereq-info  { background: rgba(99,102,241,0.06); border-color: rgba(99,102,241,0.25); color: #4338ca; }
.prereq-banner.prereq-info::before  { background: linear-gradient(180deg, #6366f1, #8b5cf6); }
.prereq-banner .prereq-icon { font-size: 22px; line-height: 1; padding-top: 2px; flex-shrink: 0; }
.prereq-banner .prereq-text { flex: 1; min-width: 0; }
.prereq-banner .prereq-text strong { font-weight: 700; letter-spacing: -0.01em; }
.prereq-banner code {  background: rgba(0,0,0,0.06); padding: 1px 7px; border-radius: 5px;  font-size: 12px; font-family: 'JetBrains Mono', ui-monospace, monospace;  border: 1px solid rgba(0,0,0,0.08);}
.prereq-banner .prereq-cta {  display: inline-flex; align-items: center; padding: 8px 16px; border-radius: 10px;  background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff !important;  text-decoration: none; font-weight: 700; font-size: 12.5px; flex-shrink: 0;  letter-spacing: -0.005em;  box-shadow: 0 4px 14px -2px rgba(99,102,241,0.45);  transition: all 0.2s cubic-bezier(0.4,0,0.2,1);}
.prereq-banner .prereq-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px -4px rgba(99,102,241,0.6); }
@media (prefers-color-scheme: dark) {  .prereq-banner.prereq-error { background: rgba(248,113,113,0.10); border-color: rgba(248,113,113,0.30); color: #fca5a5; }  .prereq-banner.prereq-info  { background: rgba(129,140,248,0.10); border-color: rgba(129,140,248,0.30); color: #c7d2fe; }  .prereq-banner code { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.10); } }
@media (max-width: 600px) {  .prereq-banner { flex-direction: column; align-items: stretch; padding-left: 20px; }  .prereq-banner .prereq-cta { align-self: flex-start; } }

/* First-run intro banner — premium */
.intro-banner {  position: relative; padding: 18px 52px 18px 22px; margin: 0 0 18px;  background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(236,72,153,0.06));  border: 1px solid rgba(99,102,241,0.20);  border-radius: var(--bento-radius-sm, 12px);  font-size: 13px; line-height: 1.55; overflow: hidden;  font-family: 'Inter', sans-serif; letter-spacing: -0.005em;  animation: bentoSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);}
.intro-banner::before {  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);}
.intro-banner .intro-headline {  font-weight: 700; font-size: 14.5px; margin-bottom: 10px; letter-spacing: -0.02em;  background: linear-gradient(135deg, #6366f1, #ec4899);  -webkit-background-clip: text; background-clip: text; color: transparent;  display: flex; align-items: center; gap: 8px;}
.intro-banner .intro-steps {  margin: 8px 0 0; padding: 0; list-style: none; counter-reset: introstep;}
.intro-banner .intro-steps li {  margin-bottom: 8px; line-height: 1.55; color: var(--bento-text, #0c0a09);  padding-left: 32px; position: relative; counter-increment: introstep;  font-size: 12.5px;}
.intro-banner .intro-steps li::before {  content: counter(introstep); position: absolute; left: 0; top: -1px;  width: 22px; height: 22px; border-radius: 50%;  background: var(--bento-card, #fff); border: 1px solid rgba(99,102,241,0.25);  display: flex; align-items: center; justify-content: center;  font-size: 11px; font-weight: 800; color: #6366f1;  font-family: 'JetBrains Mono', ui-monospace, monospace;  font-feature-settings: 'tnum' 1;}
.intro-banner .intro-dismiss {  position: absolute; top: 12px; right: 14px;  background: var(--bento-card, transparent); border: 1px solid var(--bento-border, transparent);  cursor: pointer; font-size: 14px; line-height: 1;  color: var(--bento-text-secondary, #64748B);  padding: 4px 8px; border-radius: 999px;  transition: all 0.15s ease;}
.intro-banner .intro-dismiss:hover {  background: var(--bento-bg-2, #e7e5e4); color: var(--bento-text, #0c0a09);  transform: rotate(90deg);}
@media (prefers-color-scheme: dark) {  .intro-banner { background: linear-gradient(135deg, rgba(129,140,248,0.14), rgba(244,114,182,0.10)); border-color: rgba(129,140,248,0.30); }  .intro-banner .intro-headline { background: linear-gradient(135deg, #a5b4fc, #f9a8d4); -webkit-background-clip: text; background-clip: text; color: transparent; }  .intro-banner .intro-steps li { color: #fafaf9; }  .intro-banner .intro-steps li::before { background: #16161f; border-color: rgba(129,140,248,0.35); color: #a5b4fc; }  .intro-banner .intro-dismiss { background: #16161f; border-color: #27272f; color: #d6d3d1; }  .intro-banner .intro-dismiss:hover { background: #27272f; color: #fafaf9; } }


        
/* ===== BENTO DESIGN SYSTEM (local fallback) ===== */

:host {
  --bento-primary: #3B82F6;
  --bento-primary-hover: #2563EB;
  --bento-primary-light: rgba(59, 130, 246, 0.08);
  --bento-success: #10B981;
  --bento-success-light: rgba(16, 185, 129, 0.08);
  --bento-error: #EF4444;
  --bento-error-light: rgba(239, 68, 68, 0.08);
  --bento-warning: #F59E0B;
  --bento-warning-light: rgba(245, 158, 11, 0.08);
  --bento-bg: var(--primary-background-color, #F8FAFC);
  --bento-card: var(--card-background-color, #FFFFFF);
  --bento-border: var(--divider-color, #E2E8F0);
  --bento-text: var(--primary-text-color, #1E293B);
  --bento-text-secondary: var(--secondary-text-color, #64748B);
  --bento-text-muted: var(--disabled-text-color, #94A3B8);
  --bento-radius-xs: 6px;
  --bento-radius-sm: 10px;
  --bento-radius-md: 16px;
  --bento-shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
  --bento-shadow-md: 0 4px 12px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04);
  --bento-shadow-lg: 0 8px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.04);
  --bento-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

:host {
          font-family: 'Inter', sans-serif;
        }
        
@media (prefers-color-scheme: dark) {
  :host {
    --bento-bg: var(--primary-background-color, #1a1a2e);
    --bento-card: var(--card-background-color, #16213e);
    --bento-text: var(--primary-text-color, #e2e8f0);
    --bento-text-secondary: var(--secondary-text-color, #94a3b8);
    --bento-border: var(--divider-color, #334155);
    --bento-shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
    --bento-shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  }
}
        .card { background: var(--bento-card); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-md); padding: 20px; box-shadow: var(--bento-shadow-sm); }
        .card-title { font-size: 17px; font-weight: 700; color: var(--bento-text); margin: 0 0 4px; }
        .data-source-badge { font-size: 11px; color: var(--bento-text-muted); margin-bottom: 14px; }
        .tabs { display: flex; gap: 4px; border-bottom: 2px solid var(--bento-border); margin-bottom: 18px; overflow-x: auto; overflow-y: hidden; }
        .tab-btn { padding: 8px 16px; border: none; background: transparent; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--bento-text-secondary); border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all .2s; white-space: nowrap; font-family: 'Inter', sans-serif; border-radius: 0; }
        .tab-btn:hover { color: var(--bento-primary); background: var(--bento-primary-light); }
        .tab-btn.active { color: var(--bento-primary); border-bottom-color: var(--bento-primary); font-weight: 600; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; margin-bottom: 16px; }
        .summary-card { background: var(--bento-bg); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); padding: 14px; text-align: center; }
        .summary-card.alt { border-left: 3px solid var(--bento-primary); }
        .summary-card.warn { border-left: 3px solid var(--bento-warning); }
        .summary-label { font-size: 11px; font-weight: 500; color: var(--bento-text-secondary); text-transform: uppercase; letter-spacing: .4px; }
        .summary-value { font-size: 24px; font-weight: 700; color: var(--bento-text); }
        .power-draw { text-align: center; padding: 14px; background: var(--bento-bg); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); margin-bottom: 16px; }
        .power-draw-value { font-size: 28px; font-weight: 700; color: var(--bento-primary); }
        .power-draw-unit { font-size: 11px; color: var(--bento-text-secondary); text-transform: uppercase; letter-spacing: .4px; }
        .chart-container { position: relative; height: 300px; background: var(--bento-bg); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); padding: 14px; margin-bottom: 16px; overflow: visible; display: flex; flex-direction: column; }
        .chart-title { font-size: 13px; font-weight: 600; color: var(--bento-text); margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
        .chart-title span:last-child { font-size: 11px; color: var(--bento-text-secondary); font-weight: 400; }
        canvas { max-width: 100% !important; border: none !important; display: block !important; flex: 1; min-height: 0; }
        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 16px; }
        .stat-item { background: var(--bento-bg); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); padding: 14px; text-align: center; }
        .stat-label { font-size: 11px; font-weight: 500; color: var(--bento-text-secondary); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 4px; }
        .stat-value { font-size: 18px; font-weight: 700; color: var(--bento-text); }
        .heatmap-legend { display: flex; gap: 16px; justify-content: center; margin-top: 12px; flex-wrap: wrap; overflow: visible; min-height: 24px; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--bento-text-secondary); min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .legend-color { width: 14px; height: 14px; border-radius: 3px; flex-shrink: 0; }
        .compare-mode-bar { display: flex; gap: 4px; margin-bottom: 16px; background: var(--bento-bg); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); padding: 4px; }
        .compare-mode-btn { flex: 1; padding: 8px 10px; border: none; background: transparent; cursor: pointer; font-size: 12px; font-weight: 500; color: var(--bento-text-secondary); border-radius: 8px; transition: all .2s; font-family: 'Inter', sans-serif; white-space: nowrap; }
        .compare-mode-btn:hover { color: var(--bento-primary); background: var(--bento-primary-light); }
        .compare-mode-btn.active { color: #fff; background: var(--bento-primary); font-weight: 600; box-shadow: 0 2px 6px rgba(59,130,246,.3); }
        .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
        .comparison-card { background: var(--bento-bg); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); padding: 14px; text-align: center; }
        .comparison-title { font-size: 11px; font-weight: 500; color: var(--bento-text-secondary); text-transform: uppercase; letter-spacing: .4px; }
        .comparison-value { font-size: 24px; font-weight: 700; color: var(--bento-text); margin: 4px 0; }
        .change-indicator { font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 12px; }
        .change-up { color: var(--bento-error); background: var(--bento-error-light); }
        .change-down { color: var(--bento-success); background: var(--bento-success-light); }
        .change-up { color: var(--bento-error); }
        .change-down { color: var(--bento-success); }
        .section-title { font-size: 13px; font-weight: 600; color: var(--bento-text-secondary); text-transform: uppercase; letter-spacing: .5px; margin: 16px 0 8px; }
        .recommendation { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); margin-bottom: 10px; transition: background .15s; }
        .recommendation:hover { background: var(--bento-primary-light); }
        .recommendation.high { border-left: 3px solid var(--bento-error); }
        .recommendation.medium { border-left: 3px solid var(--bento-warning); }
        .recommendation.low { border-left: 3px solid var(--bento-success); }
        .rec-icon { font-size: 20px; flex-shrink: 0; }
        .rec-content { flex: 1; }
        .rec-title { font-size: 13px; font-weight: 600; color: var(--bento-text); margin-bottom: 4px; }
        .rec-description { font-size: 12px; color: var(--bento-text-secondary); line-height: 1.5; }
        .rec-footer { display: flex; gap: 8px; margin-top: 8px; }
        .savings-badge { display: inline-flex; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: var(--bento-success-light); color: var(--bento-success); }
        .difficulty-badge { display: inline-flex; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: var(--bento-primary-light); color: var(--bento-primary); text-transform: capitalize; }
        .pagination { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--bento-border); }
        .pagination-btn { padding: 6px 14px; border: 1.5px solid var(--bento-border); background: var(--bento-card); color: var(--bento-text); border-radius: var(--bento-radius-xs); cursor: pointer; font-size: 13px; font-weight: 500; font-family: 'Inter', sans-serif; transition: all .2s; }
        .pagination-btn:hover:not(:disabled) { background: var(--bento-primary); color: #fff; border-color: var(--bento-primary); }
        .pagination-btn:disabled { opacity: .4; cursor: not-allowed; }
        .pagination-info { font-size: 12px; color: var(--bento-text-secondary); }
        .page-size-select { padding: 5px 8px; border: 1.5px solid var(--bento-border); border-radius: var(--bento-radius-xs); font-size: 12px; font-family: 'Inter', sans-serif; background: var(--bento-card); color: var(--bento-text); }
        
        .tabs, .tab-bar { scrollbar-width: thin; scrollbar-color: var(--bento-border, #E2E8F0) transparent; }
        .tabs::-webkit-scrollbar, .tab-bar::-webkit-scrollbar { height: 4px; }
        .tabs::-webkit-scrollbar-track, .tab-bar::-webkit-scrollbar-track { background: transparent; }
        .tabs::-webkit-scrollbar-thumb, .tab-bar::-webkit-scrollbar-thumb { background: var(--bento-border, #E2E8F0); border-radius: 4px; }
        .time-range-selector { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
        .time-range-btn { padding: 6px 12px; border: 1px solid var(--bento-border); background: var(--bento-bg); color: var(--bento-text-secondary); border-radius: var(--bento-radius-xs); cursor: pointer; font-size: 12px; font-weight: 500; font-family: 'Inter', sans-serif; transition: all .2s; }
        .time-range-btn:hover { color: var(--bento-primary); border-color: var(--bento-primary); background: var(--bento-primary-light); }
        .time-range-btn.active { background: var(--bento-primary); color: #fff; border-color: var(--bento-primary); font-weight: 600; }
@media (max-width: 768px) {
          .tabs { flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; gap: 2px; }
          .tab-btn { padding: 6px 10px; font-size: 12px; }
          .card { padding: 14px; }
          .grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .summary-value, .comparison-value { font-size: 18px; }
          .summary-label, .comparison-title { font-size: 10px; }
        }
        @media (max-width: 480px) {
          .tabs { gap: 1px; }
          .tab-btn { padding: 5px 8px; font-size: 11px; }
          .summary-value, .comparison-value { font-size: 16px; }
        }
        @media (max-width: 360px) {
          .grid, .stats-row, .comparison-grid { grid-template-columns: 1fr; }
        }



        /* G6: Chart container constraints */
        .chart-container { max-height: 300px; overflow: hidden; position: relative; }
        .chart-container canvas { max-height: 250px; width: 100%; }
        canvas { max-height: 300px; }
        .settings-btn { position: absolute; top: 16px; right: 16px; background: var(--bento-bg); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); padding: 6px 12px; cursor: pointer; font-size: 12px; color: var(--bento-text-secondary); transition: all .2s; font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 6px; z-index: 5; }
        .settings-btn:hover { color: var(--bento-primary); border-color: var(--bento-primary); background: var(--bento-primary-light); }
        .settings-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,.5); z-index: 100; justify-content: center; align-items: center; }
        .settings-overlay.active { display: flex; }
        .settings-panel { background: var(--bento-card, #1e293b); border: 1px solid var(--bento-border); border-radius: var(--bento-radius-md); padding: 24px; max-width: 480px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,.4); }
        .settings-panel h3 { margin: 0 0 16px; font-size: 16px; color: var(--bento-text); }
        .settings-panel .form-row { margin-bottom: 14px; }
        .settings-panel label { display: block; font-size: 12px; font-weight: 500; color: var(--bento-text-secondary); margin-bottom: 4px; text-transform: uppercase; letter-spacing: .4px; }
        .settings-panel input, .settings-panel select { width: 100%; padding: 8px 12px; border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); background: var(--bento-bg); color: var(--bento-text); font-size: 13px; font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .settings-panel .btn-row { display: flex; gap: 8px; justify-content: flex-end; margin-top: 18px; }
        .settings-panel .btn-save { padding: 8px 20px; background: var(--bento-primary); color: #fff; border: none; border-radius: var(--bento-radius-sm); cursor: pointer; font-weight: 600; font-size: 13px; }
        .settings-panel .btn-cancel { padding: 8px 20px; background: transparent; border: 1px solid var(--bento-border); border-radius: var(--bento-radius-sm); cursor: pointer; color: var(--bento-text-secondary); font-size: 13px; }
        .rate-annotation { font-size: 11px; color: var(--bento-text-muted, #64748b); margin-top: 2px; }
        </style>
    `;
  }

  _getTemplate() {
    return `
      <div class="card">
        <h2 class="card-title" style="position:relative;">${this._config?.title || 'Energy Optimizer'}
          <button class="settings-btn" data-action="open-settings">
            \u2699\uFE0F Rates
          </button>
        </h2>

        <div class="rate-annotation">
          Tariff: ${this._getTariffLabel()}
        </div>

        <div class="data-source-badge">
          ${this._hasRealData ? '\u{1F4CA} Dane z ' + (this._energySensorIds || []).length + ' sensor\u00F3w energii' : (this._statsLoading ? '\u23F3 Wczytywanie danych z recorder...' : '\u26A0\uFE0F Demo data \u2014 brak sensor\u00F3w kWh')}
        </div>

        <div class="tabs">
          <button class="tab-btn active" data-tab="dashboard">Dashboard</button>
          <button class="tab-btn" data-tab="patterns">Patterns</button>
          <button class="tab-btn" data-tab="recommendations">Recommendations</button>
          <button class="tab-btn" data-tab="compare">Compare</button>
        </div>

        <div id="dashboard" class="tab-content active">
          <div class="time-range-selector">
            <button class="time-range-btn${this._timeRange === 'today' ? ' active' : ''}" data-time-range="today">Today</button>
            <button class="time-range-btn${this._timeRange === 'yesterday' ? ' active' : ''}" data-time-range="yesterday">Yesterday</button>
            <button class="time-range-btn${this._timeRange === '7days' ? ' active' : ''}" data-time-range="7days">Last 7 days</button>
            <button class="time-range-btn${this._timeRange === '30days' ? ' active' : ''}" data-time-range="30days">Last 30 days</button>
          </div>
          <div class="grid">
            <div class="summary-card">
              <span class="summary-label">Today's Usage</span>
              <div class="summary-value">${this._calculateTodayUsage().toFixed(2)}</div>
              <span class="summary-label">kWh</span>
            </div>
            <div class="summary-card alt">
              <span class="summary-label">Cost Estimate</span>
              <div class="summary-value">${this._calculateTodayCost().toFixed(2)}</div>
              <span class="summary-label">${this._config.currency || 'PLN'}${((this._config.energy_tariff_mode || 'flat') !== 'flat') ? ' (dual-tariff)' : ''}</span>
            
        <!-- Support / Donation -->
        <div class="donate-section" data-source="ha-tools-split">
          <div class="donate-text">
            <h3>❤️ ${this._lang === 'pl' ? 'Wesprzyj rozwój HA Tools' : 'Support HA Tools Development'}</h3>
            <p>${this._lang === 'pl' ? 'Jeśli to narzędzie ułatwia Ci życie z Home Assistant, rozważ wsparcie projektu. Każda kawa motywuje do dalszego rozwoju!' : 'If this tool makes your Home Assistant life easier, consider supporting the project. Every coffee motivates further development!'}</p>
          </div>
          <div class="donate-buttons">
            <a class="donate-btn coffee" href="https://buymeacoffee.com/macsiem" target="_blank" rel="noopener noreferrer">☕ Buy Me a Coffee</a>
            <a class="donate-btn paypal" href="https://www.paypal.com/donate/?hosted_button_id=Y967H4PLRBN8W" target="_blank" rel="noopener noreferrer">💳 PayPal</a>
          </div>
        </div>
        </div>
            ${((this._config.energy_tariff_mode || 'flat') !== 'flat') ? `
            <div class="summary-card" style="border-left:3px solid var(--bento-success)">
              <span class="summary-label">Potential Savings</span>
              <div class="summary-value">${this._calculatePotentialSavings().toFixed(2)}</div>
              <span class="summary-label">${this._config.currency || 'PLN'}/day by shifting to off-peak</span>
            </div>` : `
            <div class="summary-card warn">
              <span class="summary-label">Peak Hour</span>
              <div class="summary-value">${this._getPeakHour()}:00</div>
              <span class="summary-label">Highest consumption</span>
            </div>`}
            <div class="summary-card">
              <span class="summary-label">Efficiency Score</span>
              <div class="summary-value">${this._calculateEfficiencyScore()}</div>
              <span class="summary-label">/ 100</span>
            </div>
          </div>

          <div class="power-draw">
            <div class="power-draw-unit">Current Power Draw</div>
            <div class="power-draw-value">${(this._currentPowerW / 1000).toFixed(2)}</div>
            <div class="power-draw-unit">kW</div>
          </div>

          <div class="chart-container">
            <div class="chart-title">
              <span>24-Hour Usage</span>
              <span style="font-size: 12px; color: var(--bento-text-secondary); font-weight: 400;">kWh by hour</span>
            </div>
            <canvas id="dashboard-chart"></canvas>
          </div>
        </div>

        <div id="patterns" class="tab-content">
          <div class="chart-container">
            <div class="chart-title">
              <span>Weekly Heat Map</span>
              <span style="font-size: 12px; color: var(--bento-text-secondary); font-weight: 400;">Energy intensity by day & hour</span>
            </div>
            <canvas id="heatmap-canvas"></canvas>
            <div class="heatmap-legend">
              <div class="legend-item">
                <div class="legend-color" style="background: #1e3a8a;"></div>
                <span>Low</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background: #3b82f6;"></div>
                <span>Moderate</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background: #fbbf24;"></div>
                <span>High</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background: #dc2626;"></div>
                <span>Peak</span>
              </div>
            </div>
          </div>

          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-label">Peak Usage</div>
              <div class="stat-value">${(this._energyData.reduce((a, b) => Math.max(a, b))).toFixed(2)} kWh</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Off-Peak Usage</div>
              <div class="stat-value">${(this._energyData.slice(0, this._config.peak_hours?.start || 6).reduce((a, b) => a + b, 0) / (this._config.peak_hours?.start || 6)).toFixed(2)} kWh/h</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Ratio</div>
              <div class="stat-value">${this._calculatePeakRatio().toFixed(1)}:1</div>
            </div>
          </div>

          <div class="chart-container">
            <div class="chart-title">
              <span>7-Day Trend</span>
              <span style="font-size: 12px; color: var(--bento-text-secondary); font-weight: 400;">Daily consumption average</span>
            </div>
            <canvas id="trend-chart"></canvas>
          </div>

          <div class="chart-container">
            <div class="chart-title">
              <span>Day-of-Week Comparison</span>
              <span style="font-size: 12px; color: var(--bento-text-secondary); font-weight: 400;">Average daily usage</span>
            </div>
            <canvas id="weekday-chart"></canvas>
          </div>
        </div>

        <div id="recommendations" class="tab-content">
          <div id="recommendations-list"></div>
        </div>

        <div id="compare" class="tab-content">
          <div class="compare-mode-bar">
            <button class="compare-mode-btn ${this._comparePeriod === 'w-w' ? 'active' : ''}" data-cmp="w-w">Week vs Week</button>
            <button class="compare-mode-btn ${this._comparePeriod === 'm-m' ? 'active' : ''}" data-cmp="m-m">Month vs Month</button>
            <button class="compare-mode-btn ${this._comparePeriod === 'y-y' ? 'active' : ''}" data-cmp="y-y">Year vs Year</button>
          </div>
          <div id="compare-body">${this._renderCompareBody()}</div>
        </div>

        <div class="settings-overlay" id="settings-overlay">
          <div class="settings-panel">
            <h3>\u2699\uFE0F Energy Rate Settings</h3>
            <div class="form-row">
              <label>Tariff Mode</label>
              <select class="input-tariff-mode">
                <option value="flat" ${(this._config.energy_tariff_mode || 'flat') === 'flat' ? 'selected' : ''}>Flat rate</option>
                <option value="day_night" ${this._config.energy_tariff_mode === 'day_night' ? 'selected' : ''}>Day / Night</option>
                <option value="weekday_weekend" ${this._config.energy_tariff_mode === 'weekday_weekend' ? 'selected' : ''}>Weekday / Weekend</option>
                <option value="mixed" ${this._config.energy_tariff_mode === 'mixed' ? 'selected' : ''}>Mixed (day/night + weekend)</option>
              </select>
            </div>
            <div class="form-row">
              <label>Rate (per kWh)</label>
              <input type="number" step="0.01" class="input-energy-price" value="${_esc(this._config.energy_price || 0.65)}" />
              <div class="rate-annotation">For flat mode — single 24h rate</div>
            </div>
            <div class="form-row">
              <label>Day Rate</label>
              <input type="number" step="0.01" class="input-price-day" value="${_esc(this._config.energy_price_day || 0.65)}" />
            </div>
            <div class="form-row">
              <label>Night Rate</label>
              <input type="number" step="0.01" class="input-price-night" value="${_esc(this._config.energy_price_night || 0.45)}" />
            </div>
            <div class="form-row">
              <label>Day Start Hour</label>
              <input type="number" min="0" max="23" class="input-day-start" value="${_esc(this._config.energy_day_hour_start || 6)}" />
            </div>
            <div class="form-row">
              <label>Night Start Hour</label>
              <input type="number" min="0" max="23" class="input-night-start" value="${_esc(this._config.energy_night_hour_start || 22)}" />
            </div>
            <div class="form-row">
              <label>Currency</label>
              <input type="text" class="input-currency" value="${_esc(this._config.currency || 'PLN')}" />
            </div>
            <div class="btn-row">
              <button class="btn-cancel" data-action="close-settings">Cancel</button>
              <button class="btn-save" data-action="save-settings">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _setupEventListeners() {
    const sr = this.shadowRoot;
    sr.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        sr.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this._currentTab = e.target.dataset.tab;
        history.replaceState(null, '', location.pathname + '#' + this._toolId + '/' + this._currentTab);
        this._showTab(e.target.dataset.tab);
      });
    });
    // Time range selector (only on dashboard tab, not on compare)
    sr.querySelectorAll('.time-range-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        sr.querySelectorAll('.time-range-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this._timeRange = e.target.dataset.timeRange;
        // Reload data with new time range and re-render dashboard
        this._lastStatsFetch = 0; // Force data reload
        this._fetchEnergyStats().then(() => {
          this._showTab('dashboard');
        }).catch(() => {
          this._showTab('dashboard');
        });
      });
    });
    // Comparison mode buttons (use delegation since body is rebuilt)
    sr.addEventListener('click', (e) => {
      const btn = e.target.closest('.compare-mode-btn');
      if (!btn) return;
      this._comparePeriod = btn.dataset.cmp;
      sr.querySelectorAll('.compare-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const body = sr.querySelector('#compare-body');
      if (body) body.innerHTML = this._renderCompareBody();
      this._drawComparisonChart().catch(() => {});
      this._drawTrendBarChart().catch(() => {});
    });

    // Settings button
    const settingsBtn = sr.querySelector('[data-action="open-settings"]');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        const overlay = sr.querySelector('#settings-overlay');
        if (overlay) overlay.classList.add('active');
      });
    }
    const closeSettings = sr.querySelector('[data-action="close-settings"]');
    if (closeSettings) {
      closeSettings.addEventListener('click', () => {
        const overlay = sr.querySelector('#settings-overlay');
        if (overlay) overlay.classList.remove('active');
      });
    }
    const saveSettings = sr.querySelector('[data-action="save-settings"]');
    if (saveSettings) {
      saveSettings.addEventListener('click', () => {
        const mode = sr.querySelector('.input-tariff-mode')?.value || 'flat';
        const price = parseFloat(sr.querySelector('.input-energy-price')?.value) || 0.65;
        const priceDay = parseFloat(sr.querySelector('.input-price-day')?.value) || 0.65;
        const priceNight = parseFloat(sr.querySelector('.input-price-night')?.value) || 0.45;
        const dayStart = parseInt(sr.querySelector('.input-day-start')?.value) || 6;
        const nightStart = parseInt(sr.querySelector('.input-night-start')?.value) || 22;
        const currency = sr.querySelector('.input-currency')?.value || 'PLN';
        this._config = { ...this._config,
          energy_tariff_mode: mode, energy_price: price,
          energy_price_day: priceDay, energy_price_night: priceNight,
          energy_day_hour_start: dayStart, energy_night_hour_start: nightStart,
          currency: currency
        };
        try {
          localStorage.setItem('ha-tools-energy-optimizer-settings', JSON.stringify({
            energy_tariff_mode: mode, energy_price: price,
            energy_price_day: priceDay, energy_price_night: priceNight,
            energy_day_hour_start: dayStart, energy_night_hour_start: nightStart,
            currency: currency
          }));
        } catch(e) { console.debug('[ha-energy-optimizer] caught:', e); }
        const overlay = sr.querySelector('#settings-overlay');
        if (overlay) overlay.classList.remove('active');
        this._domBuilt = false;
        this._generateRecommendations();
        this._generateComparisonData();
        this._render();
      });
    }
    const settingsOverlay = sr.querySelector('#settings-overlay');
    if (settingsOverlay) {
      settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) settingsOverlay.classList.remove('active');
      });
    }
  }
  async _loadChartJS() {
    if (this._chartJsLoaded) {
      return window.Chart;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/local/community/ha-tools/vendor/chart.umd.min.js';
      script.async = true;
      script.onload = () => {
        this._chartJsLoaded = true;
        resolve(window.Chart);
      };
      script.onerror = () => {
        reject(new Error('Failed to load Chart.js'));
      };
      document.head.appendChild(script);
    });
  }

  _destroyChart(chartKey) {
    if (this._charts[chartKey]) {
      this._charts[chartKey].destroy();
      delete this._charts[chartKey];
    }
  }

  _destroyAllCharts() {
    Object.keys(this._charts).forEach(key => {
      this._destroyChart(key);
    });
  }

  _showTab(tabName) {
    const tabs = this.shadowRoot.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    const tabEl = this.shadowRoot.getElementById(tabName);
    if (tabEl) {
      tabEl.classList.add('active');
    }

    // Draw charts after showing tab (needed for canvas sizing)
    setTimeout(() => {
      if (tabName === 'dashboard') {
        this._drawDashboardChart().catch(err => console.error('Dashboard chart error:', err));
      } else if (tabName === 'patterns') {
        this._drawHeatmap();
        this._drawTrendChart().catch(err => console.error('Trend chart error:', err));
        this._drawWeekdayChart().catch(err => console.error('Weekday chart error:', err));
      } else if (tabName === 'recommendations') {
        this._renderRecommendations();
      } else if (tabName === 'compare') {
        this._drawComparisonChart().catch(err => console.error('Comparison chart error:', err));
        this._drawTrendBarChart().catch(err => console.error('Trend bar chart error:', err));
      }
    }, 100);
  }

  _renderCurrentTab() {
    setTimeout(() => this._showTab('dashboard'), 100);
  }

  async _drawDashboardChart() {
    try {
      await this._loadChartJS();
      if (!window.Chart) {
        console.warn('ha-energy-optimizer: Chart.js not loaded');
        return;
      }
      const canvas = this.shadowRoot.getElementById('dashboard-chart');
      if (!canvas) return;

      this._destroyChart('dashboard');

      const ctx = canvas.getContext('2d');
      const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      const data = this._energyData || Array(24).fill(0);

      const chartConfig = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Energy Usage (kWh)',
            data: data,
            backgroundColor: data.map((val, hour) => {
              const isPeak = hour >= (this._config?.peak_hours?.start || 6) && hour < (this._config?.peak_hours?.end || 22);
              return isPeak ? 'rgba(59, 130, 246, 0.7)' : 'rgba(100, 200, 100, 0.7)';
            }),
            borderColor: data.map((val, hour) => {
              const isPeak = hour >= (this._config?.peak_hours?.start || 6) && hour < (this._config?.peak_hours?.end || 22);
              return isPeak ? 'rgb(59, 130, 246)' : 'rgb(100, 200, 100)';
            }),
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: undefined,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.formattedValue} kWh`;
                },
                title: (context) => {
                  return context[0].label;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Energy (kWh)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Hour of Day'
              }
            }
          }
        }
      };

      this._charts['dashboard'] = new window.Chart(ctx, chartConfig);
    } catch (error) {
      console.error('Error drawing dashboard chart:', error);
    }
  }
_drawHeatmap() {
    const canvas = this.shadowRoot.getElementById('heatmap-canvas');
    if (!canvas) return;

    this._fixCanvasSize(canvas);
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = 200;
    const padding = rect.width < 350 ? 20 : 40;
    const days = rect.width < 350 ? ['M','T','W','T','F','S','S'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const cellWidth = (width - padding * 2) / 24;
    const cellHeight = (height - padding * 2) / 7;

    // Find min/max for color scaling
    const allValues = (this._weeklyData || []).flat();
    const minVal = allValues.length > 0 ? Math.min(...allValues) : 0;
    const maxVal = allValues.length > 0 ? Math.max(...allValues) : 1;
    const range = maxVal - minVal || 1;

    // Detect dark mode for text and border colors
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDark ? 'rgba(226, 232, 240, 0.85)' : 'rgba(0, 0, 0, 0.7)';

    // Helper to get color from value (blue to red gradient)
    const getColor = (val) => {
      const normalized = (val - minVal) / range;
      const hue = (1 - normalized) * 240; // 240 = blue, 0 = red
      return `hsl(${hue}, 70%, 50%)`;
    };

    // Draw cells
    (this._weeklyData || []).forEach((dayData, dayIndex) => {
      dayData.forEach((value, hourIndex) => {
        const x = padding + hourIndex * cellWidth;
        const y = padding + dayIndex * cellHeight;

        ctx.fillStyle = getColor(value);
        ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1);

        // Draw cell border
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellWidth - 1, cellHeight - 1);
      });
    });

    // Day labels (Y-axis)
    ctx.fillStyle = textColor;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    days.forEach((day, i) => {
      const y = padding + (i + 0.5) * cellHeight;
      ctx.fillText(day, padding - 10, y);
    });

    // Hour labels (X-axis)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const hourStep = rect.width < 350 ? 6 : 3;
    for (let h = 0; h < 24; h += hourStep) {
      const x = padding + (h + 0.5) * cellWidth;
      ctx.fillText(h + ':00', x, height - padding + 5);
    }

    // Legend
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    const legendX = padding;
    const legendY = height - 15;
    ctx.fillText(`Min: ${minVal.toFixed(2)} kWh`, legendX, legendY);
    ctx.fillText(`Max: ${maxVal.toFixed(2)} kWh`, legendX + 120, legendY);
  }


  async _drawTrendChart() {
    try {
      await this._loadChartJS();
      if (!window.Chart) {
        console.warn('ha-energy-optimizer: Chart.js not loaded');
        return;
      }
      const canvas = this.shadowRoot.getElementById('trend-chart');
      if (!canvas) return;

      this._destroyChart('trend');

      const ctx = canvas.getContext('2d');
      const dailyTotals = this._weeklyData?.map(day => (day || []).reduce((a, b) => a + b, 0)) || [0, 0, 0, 0, 0, 0, 0];
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      const chartConfig = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Daily Total Usage (kWh)',
            data: dailyTotals,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: 'white',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: { boxWidth: 12, padding: 8, font: { size: 11 } }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.formattedValue} kWh`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Daily Total (kWh)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Day of Week'
              }
            }
          }
        }
      };

      this._charts['trend'] = new window.Chart(ctx, chartConfig);
    } catch (error) {
      console.error('Error drawing trend chart:', error);
    }
  }
async _drawWeekdayChart() {
    try {
      await this._loadChartJS();
      if (!window.Chart) {
        console.warn('ha-energy-optimizer: Chart.js not loaded');
        return;
      }
      const canvas = this.shadowRoot.getElementById('weekday-chart');
      if (!canvas) return;

      this._destroyChart('weekday');

      const ctx = canvas.getContext('2d');
      const dailyTotals = this._weeklyData?.map(day => (day || []).reduce((a, b) => a + b, 0)) || [0, 0, 0, 0, 0, 0, 0];
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      const chartConfig = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Daily Total Usage (kWh)',
            data: dailyTotals,
            backgroundColor: [
              'rgba(100, 200, 100, 0.7)',
              'rgba(100, 200, 100, 0.7)',
              'rgba(100, 200, 100, 0.7)',
              'rgba(100, 200, 100, 0.7)',
              'rgba(100, 200, 100, 0.7)',
              'rgba(59, 130, 246, 0.7)',
              'rgba(59, 130, 246, 0.7)'
            ],
            borderColor: [
              'rgb(100, 200, 100)',
              'rgb(100, 200, 100)',
              'rgb(100, 200, 100)',
              'rgb(100, 200, 100)',
              'rgb(100, 200, 100)',
              'rgb(59, 130, 246)',
              'rgb(59, 130, 246)'
            ],
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: { boxWidth: 12, padding: 8, font: { size: 11 } }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.formattedValue} kWh`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Daily Total (kWh)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Day of Week'
              }
            }
          }
        }
      };

      this._charts['weekday'] = new window.Chart(ctx, chartConfig);
    } catch (error) {
      console.error('Error drawing weekday chart:', error);
    }
  }
async _drawComparisonChart() {
    try {
      await this._loadChartJS();
      if (!window.Chart) {
        console.warn('ha-energy-optimizer: Chart.js not loaded');
        return;
      }
      const canvas = this.shadowRoot.getElementById('comparison-chart');
      if (!canvas) return;
      this._destroyChart('comparison');
      const ctx = canvas.getContext('2d');
      const c = this._comparisonData;
      if (!c) return;
      const mode = this._comparePeriod;

      let currentData, prevData, currentLabel, prevLabel, xLabels;
      if (mode === 'w-w') {
        currentData = c.thisWeekDaily; prevData = c.lastWeekDaily;
        currentLabel = 'Ten tydzień'; prevLabel = 'Poprzedni tydz.';
        xLabels = ['Pn','Wt','Śr','Cz','Pt','So','Nd'].slice(0, Math.max(currentData.length, prevData.length));
      } else if (mode === 'm-m') {
        currentData = c.thisMonthDaily; prevData = c.lastMonthDaily;
        currentLabel = 'Ten miesiąc'; prevLabel = 'Poprzedni mies.';
        xLabels = Array.from({length: Math.max(currentData.length, prevData.length)}, (_, i) => i + 1);
      } else {
        currentData = c.thisMonthDaily; prevData = c.lastYearMonthDaily;
        currentLabel = `${c.thisMonthLabel} ${new Date().getFullYear()}`;
        prevLabel = `${c.thisMonthLabel} ${new Date().getFullYear() - 1}`;
        xLabels = Array.from({length: Math.max(currentData.length, prevData.length)}, (_, i) => i + 1);
      }

      this._charts['comparison'] = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: xLabels,
          datasets: [
            { label: currentLabel, data: currentData, backgroundColor: 'rgba(59,130,246,.7)', borderColor: '#3B82F6', borderWidth: 1, borderRadius: 4 },
            { label: prevLabel, data: prevData, backgroundColor: 'rgba(148,163,184,.5)', borderColor: '#94A3B8', borderWidth: 1, borderRadius: 4 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, position: 'top', labels: { boxWidth: 12, padding: 8, font: { size: 11 } } }, tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${parseFloat(c.formattedValue).toFixed(2)} kWh` } } },
          scales: { y: { beginAtZero: true, title: { display: true, text: 'kWh' } }, x: { title: { display: true, text: mode === 'w-w' ? 'Dzień tygodnia' : 'Dzień miesiąca' } } }
        }
      });
    } catch (error) {
      console.error('Error drawing comparison chart:', error);
    }
  }

  async _drawTrendBarChart() {
    try {
      await this._loadChartJS();
      if (!window.Chart) {
        console.warn('ha-energy-optimizer: Chart.js not loaded');
        return;
      }
      const canvas = this.shadowRoot.getElementById('trend-bar-chart');
      if (!canvas) return;
      this._destroyChart('trendBar');
      const ctx = canvas.getContext('2d');
      const c = this._comparisonData;
      if (!c) return;
      const mode = this._comparePeriod;

      const data = mode === 'w-w' ? c.weeklyTotals : c.monthlyTotals;
      if (!data || data.length === 0) return;

      const labels = data.map(d => d.label);
      const values = data.map(d => d.kwh);
      const colors = values.map((_, i) => i === values.length - 1 ? 'rgba(59,130,246,.8)' : 'rgba(148,163,184,.5)');

      this._charts['trendBar'] = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{ label: 'kWh', data: values, backgroundColor: colors, borderRadius: 4, borderSkipped: false }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${parseFloat(c.formattedValue).toFixed(1)} kWh` } } },
          scales: { y: { beginAtZero: true }, x: {} }
        }
      });
    } catch (error) {
      console.error('Error drawing trend bar chart:', error);
    }
  }


  _renderRecommendations() {
    const container = this.shadowRoot.getElementById('recommendations-list');
    container.innerHTML = this._recommendations.map(rec => `
      <div class="recommendation ${rec.impact}">
        <div class="rec-icon">${rec.icon}</div>
        <div class="rec-content">
          <div class="rec-title">${rec.title}</div>
          <div class="rec-description">${rec.description}</div>
          <div class="rec-footer">
            <div class="savings-badge">Save ~${rec.savings}${this._config.currency || 'PLN'}/mo</div>
            <div class="difficulty-badge">${rec.difficulty}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  _calculateTodayUsage() {
    return this._energyData.reduce((a, b) => a + b, 0);
  }

  _calculateTodayCost() {
    // For today or when displaying single-day data, use current day
    // For ranges, average across typical week pattern
    let dow = new Date().getDay();
    if (this._timeRange !== 'today') {
      dow = 2; // Use Wednesday as typical day for range calculations
    }
    let cost = 0;
    this._energyData.forEach((kwh, hour) => {
      cost += kwh * this._getRate(hour, dow);
    });
    return cost;
  }

  _calculatePotentialSavings() {
    const mode = this._config.energy_tariff_mode || 'flat';
    if (mode === 'flat') return 0;
    let dow = new Date().getDay();
    if (this._timeRange !== 'today') {
      dow = 2; // Use Wednesday as typical day for range calculations
    }
    const nightStart = this._config.energy_night_hour_start || 22;
    const dayStart = this._config.energy_day_hour_start || 6;
    let savings = 0;
    this._energyData.forEach((kwh, hour) => {
      const currentRate = this._getRate(hour, dow);
      const nightRate = this._getRate(nightStart, dow);
      if (currentRate > nightRate) {
        savings += kwh * (currentRate - nightRate) * 0.3;
      }
    });
    return savings;
  }

  _getPeakHour() {
    return this._energyData.indexOf(Math.max(...this._energyData));
  }

  _calculateEfficiencyScore() {
    const peakRatio = this._calculatePeakRatio();
    const baseScore = 100;
    const peakPenalty = Math.min(30, peakRatio * 5);
    return Math.max(30, baseScore - peakPenalty).toFixed(0);
  }

  _calculatePeakRatio() {
    const peakStart = this._config.peak_hours?.start || 6;
    const peakEnd = this._config.peak_hours?.end || 22;
    const peakUsage = this._energyData.slice(peakStart, peakEnd).reduce((a, b) => a + b, 0) / (peakEnd - peakStart);
    const offPeakUsage = this._energyData.slice(0, peakStart).concat(this._energyData.slice(peakEnd)).reduce((a, b) => a + b, 0) / (24 - (peakEnd - peakStart));
    return peakUsage / offPeakUsage;
  }
  // --- Pagination helper ---
  _renderPagination(tabName, totalItems) {
    if (!this._currentPage[tabName]) this._currentPage[tabName] = 1;
    const pageSize = this._pageSize;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const page = Math.min(this._currentPage[tabName], totalPages);
    this._currentPage[tabName] = page;
    return `
      <div class="pagination">
        <button class="pagination-btn" data-page-tab="${tabName}" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''}>&#8249; Prev</button>
        <span class="pagination-info">${page} / ${totalPages} (${totalItems})</span>
        <button class="pagination-btn" data-page-tab="${tabName}" data-page="${page + 1}" ${page >= totalPages ? 'disabled' : ''}>Next &#8250;</button>
        <select class="page-size-select" data-page-tab="${tabName}" data-action="page-size">
          ${[10,15,25,50].map(s => `<option value="${s}" ${s === pageSize ? 'selected' : ''}>${s}/page</option>`).join('')}
        </select>
      </div>`;
  }

  _paginateItems(items, tabName) {
    if (!this._currentPage[tabName]) this._currentPage[tabName] = 1;
    const start = (this._currentPage[tabName] - 1) * this._pageSize;
    return items.slice(start, start + this._pageSize);
  }

  _setupPaginationListeners() {
    if (!this.shadowRoot) return;
    this.shadowRoot.querySelectorAll('.pagination-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.target.dataset.pageTab;
        const page = parseInt(e.target.dataset.page);
        if (tab && page > 0) {
          this._currentPage[tab] = page;
          this._render ? this._render() : (this.render ? this.render() : this.renderCard());
        }
      });
    });
    this.shadowRoot.querySelectorAll('.page-size-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        this._pageSize = parseInt(e.target.value);
        // Reset all pages to 1
        Object.keys(this._currentPage).forEach(k => this._currentPage[k] = 1);
        this._render ? this._render() : (this.render ? this.render() : this.renderCard());
      });
    });
  }
  // --- Seeded random for stable data ---
  _seededRandom(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
      h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }
  // --- Canvas size fix for Bento CSS ---
  _fixCanvasSize(canvas) {
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
  }

  setActiveTab(tabId) {
    this._currentTab = tabId;
    this._render();
  }

}

if (!customElements.get('ha-energy-optimizer')) { customElements.define('ha-energy-optimizer', HaEnergyOptimizer); }
class HaEnergyOptimizerEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
  }
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }
  _dispatch() {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
  }
  _render() {
    this.shadowRoot.innerHTML = `
      <style>
            :host { display:block; padding:16px; }
            h3 { margin:0 0 16px; font-size:15px; font-weight:600; color:var(--bento-text, var(--primary-text-color,#1e293b)); }
            input { outline:none; transition:border-color .2s; }
            input:focus { border-color:var(--bento-primary, var(--primary-color,#3b82f6)); }
        </style>
      <h3>Energy Optimizer</h3>
            <div style="margin-bottom:12px;">
              <label style="display:block;font-weight:500;margin-bottom:4px;font-size:13px;">Title</label>
              <input type="text" id="cf_title" value="${_esc(this._config?.title || 'Energy Optimizer')}"
                style="width:100%;padding:8px 12px;border:1px solid var(--divider-color,#e2e8f0);border-radius:8px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#1e293b);font-size:14px;box-sizing:border-box;">
            </div>
            <div style="margin-bottom:12px;">
              <label style="display:block;font-weight:500;margin-bottom:4px;font-size:13px;">Currency</label>
              <input type="text" id="cf_currency" value="${_esc(this._config?.currency || 'PLN')}"
                style="width:100%;padding:8px 12px;border:1px solid var(--divider-color,#e2e8f0);border-radius:8px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#1e293b);font-size:14px;box-sizing:border-box;">
            </div>
    `;
        const f_title = this.shadowRoot.querySelector('#cf_title');
        if (f_title) f_title.addEventListener('input', (e) => {
          this._config = { ...this._config, title: e.target.value };
          this._dispatch();
        });
        const f_currency = this.shadowRoot.querySelector('#cf_currency');
        if (f_currency) f_currency.addEventListener('input', (e) => {
          this._config = { ...this._config, currency: e.target.value };
          this._dispatch();
        });
  }
  connectedCallback() { this._render(); }
}
if (!customElements.get('ha-energy-optimizer-editor')) { customElements.define('ha-energy-optimizer-editor', HaEnergyOptimizerEditor); }

})();

window.customCards = window.customCards || [];
window.customCards.push({ type: 'ha-energy-optimizer', name: 'Energy Optimizer', description: 'Optimize energy consumption with peak/off-peak analysis', preview: false });
