# ⚡ HA Tools — Energy

![Preview](banner.png)

Energy optimizer and energy insights — usage, costs, budgets, recommendations.

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1+-blue.svg?logo=homeassistant)](https://www.home-assistant.io/) [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) [![Version](https://img.shields.io/badge/Version-4.0.0-success.svg)](#changelog)

> Part of the [HA Tools](https://github.com/MacSiem) ecosystem — split into individual HACS-installable plugins.

## Installation (HACS)

1. Open HACS → Frontend → ⋮ → **Custom repositories**
2. Repository URL: `https://github.com/MacSiem/ha-energy` — Category: **Lovelace**
3. Install **HA Tools — Energy** from HACS
4. Restart Home Assistant

## Usage

### Lovelace card

```yaml
type: custom:ha-tools-energy
```

This bundle ships multiple cards. You can also add the others:

- `custom:ha-energy-optimizer`
- `custom:ha-energy-insights`

### Optional sidebar panel (`configuration.yaml`)

```yaml
panel_custom:
  - name: ha-tools-energy
    sidebar_title: HA Tools — Energy
    sidebar_icon: mdi:home-assistant
    url_path: ha-tools-energy
    js_url: /local/community/ha-energy/ha-energy.js
    embed_iframe: false
    config: {}
```

After restart, **HA Tools — Energy** appears in the HA sidebar.

## Features

- Energy optimizer and energy insights — usage, costs, budgets, recommendations.
- Bundled Bento Design System (light + dark mode, mobile-friendly)
- Self-contained — no shared HA Tools dependency
- Tool settings and dismissed-banner state are cached in browser `localStorage`
## Privacy

- No telemetry, no analytics, no tracking
- Chart.js is loaded from a public CDN (cdn.jsdelivr.net) on first chart render — self-host if you prefer fully offline operation
- No data leaves your device (no external network calls)
## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Support

If this tool makes your Home Assistant life easier, consider supporting development:

- [☕ Buy Me a Coffee](https://buymeacoffee.com/macsiem)
- [💳 PayPal](https://www.paypal.com/donate/?hosted_button_id=Y967H4PLRBN8W)

## License

MIT — see [LICENSE](LICENSE).
