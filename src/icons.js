/* Иконкаҳо: Lucide (ISC license) — line icons, currentColor */
(function () {
  'use strict';
  const P = {
  "share-2": "<circle cx=\"18\" cy=\"5\" r=\"3\" /> <circle cx=\"6\" cy=\"12\" r=\"3\" /> <circle cx=\"18\" cy=\"19\" r=\"3\" /> <line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\" /> <line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\" />",
  "search": "<path d=\"m21 21-4.34-4.34\" /> <circle cx=\"11\" cy=\"11\" r=\"8\" />",
  "message-circle": "<path d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719\" />",
  "heart": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\" />",
  "user": "<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /> <circle cx=\"12\" cy=\"7\" r=\"4\" />",
  "x": "<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />",
  "phone": "<path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\" />",
  "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" /> <circle cx=\"12\" cy=\"10\" r=\"3\" />",
  "package": "<path d=\"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z\" /> <path d=\"M12 22V12\" /> <polyline points=\"3.29 7 12 12 20.71 7\" /> <path d=\"m7.5 4.27 9 5.15\" />",
  "house": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />",
  "menu": "<path d=\"M4 5h16\" /> <path d=\"M4 12h16\" /> <path d=\"M4 19h16\" />",
  "mail": "<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" /> <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" />",
  "plus": "<path d=\"M5 12h14\" /> <path d=\"M12 5v14\" />",
  "arrow-right": "<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />",
  "arrow-left": "<path d=\"m12 19-7-7 7-7\" /> <path d=\"M19 12H5\" />",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 6v6l4 2\" />",
  "wrench": "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z\" />",
  "settings": "<path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "sliders-horizontal": "<path d=\"M10 5H3\" /> <path d=\"M12 19H3\" /> <path d=\"M14 3v4\" /> <path d=\"M16 17v4\" /> <path d=\"M21 12h-9\" /> <path d=\"M21 19h-5\" /> <path d=\"M21 5h-7\" /> <path d=\"M8 10v4\" /> <path d=\"M8 12H3\" />",
  "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "banknote": "<rect width=\"20\" height=\"12\" x=\"2\" y=\"6\" rx=\"2\" /> <circle cx=\"12\" cy=\"12\" r=\"2\" /> <path d=\"M6 12h.01M18 12h.01\" />",
  "gem": "<path d=\"M10.5 3 8 9l4 13 4-13-2.5-6\" /> <path d=\"M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z\" /> <path d=\"M2 9h20\" />",
  "flame": "<path d=\"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4\" />",
  "upload": "<path d=\"M12 3v12\" /> <path d=\"m17 8-5-5-5 5\" /> <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" />",
  "trash-2": "<path d=\"M10 11v6\" /> <path d=\"M14 11v6\" /> <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\" /> <path d=\"M3 6h18\" /> <path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\" />",
  "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" /> <path d=\"m9 12 2 2 4-4\" />",
  "camera": "<path d=\"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z\" /> <circle cx=\"12\" cy=\"13\" r=\"3\" />",
  "star": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />",
  "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /> <path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />",
  "paperclip": "<path d=\"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551\" />",
  "layout-grid": "<rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\" /> <rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\" /> <rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\" /> <rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\" />",
  "reply": "<path d=\"M20 18v-2a4 4 0 0 0-4-4H4\" /> <path d=\"m9 17-5-5 5-5\" />",
  "forward": "<path d=\"m15 17 5-5-5-5\" /> <path d=\"M4 18v-2a4 4 0 0 1 4-4h12\" />",
  "copy": "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" /> <path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" />",
  "image": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /> <circle cx=\"9\" cy=\"9\" r=\"2\" /> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" />",
  "file-text": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" /> <path d=\"M14 2v5a1 1 0 0 0 1 1h5\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" />",
  "pencil": "<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" /> <path d=\"m15 5 4 4\" />",
  "calendar": "<path d=\"M8 2v3\" /> <path d=\"M16 2v3\" /> <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" /> <path d=\"M3 9h18\" />",
  "zap": "<path d=\"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z\" />",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\" />",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\" />",
  "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" />",
  "filter": "<path d=\"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z\" />",
  "bell": "<path d=\"M10.268 21a2 2 0 0 0 3.464 0\" /> <path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\" />",
  "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m9 12 2 2 4-4\" />",
  "car": "<path d=\"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2\" /> <circle cx=\"7\" cy=\"17\" r=\"2\" /> <path d=\"M9 17h6\" /> <circle cx=\"17\" cy=\"17\" r=\"2\" />",
  "laptop": "<path d=\"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z\" /> <path d=\"M20.054 15.987H3.946\" />",
  "smartphone": "<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\" /> <path d=\"M12 18h.01\" />",
  "building-2": "<path d=\"M10 12h4\" /> <path d=\"M10 8h4\" /> <path d=\"M14 21v-3a2 2 0 0 0-4 0v3\" /> <path d=\"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2\" /> <path d=\"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16\" />",
  "briefcase": "<path d=\"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\" /> <rect width=\"20\" height=\"14\" x=\"2\" y=\"6\" rx=\"2\" />",
  "tv": "<path d=\"m17 2-5 5-5-5\" /> <rect width=\"20\" height=\"15\" x=\"2\" y=\"7\" rx=\"2\" />",
  "sofa": "<path d=\"M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3\" /> <path d=\"M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z\" /> <path d=\"M4 18v2\" /> <path d=\"M20 18v2\" /> <path d=\"M12 4v9\" />",
  "brick-wall": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" /> <path d=\"M12 9v6\" /> <path d=\"M16 15v6\" /> <path d=\"M16 3v6\" /> <path d=\"M3 15h18\" /> <path d=\"M3 9h18\" /> <path d=\"M8 15v6\" /> <path d=\"M8 3v6\" />",
  "guitar": "<path d=\"m11.9 12.1 4.514-4.514\" /> <path d=\"M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z\" /> <path d=\"m6 16 2 2\" /> <path d=\"M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z\" />",
  "shirt": "<path d=\"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z\" />",
  "blocks": "<path d=\"M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2\" /> <rect x=\"14\" y=\"2\" width=\"8\" height=\"8\" rx=\"1\" />",
  "paw-print": "<circle cx=\"11\" cy=\"4\" r=\"2\" /> <circle cx=\"18\" cy=\"8\" r=\"2\" /> <circle cx=\"20\" cy=\"16\" r=\"2\" /> <path d=\"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z\" />",
  "gift": "<path d=\"M12 7v14\" /> <path d=\"M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8\" /> <path d=\"M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5\" /> <rect x=\"3\" y=\"7\" width=\"18\" height=\"4\" rx=\"1\" />",
  "baby": "<path d=\"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5\" /> <path d=\"M15 12h.01\" /> <path d=\"M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1\" /> <path d=\"M9 12h.01\" />",
  "badge-check": "<path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\" /> <path d=\"m9 12 2 2 4-4\" />",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 16v-4\" /> <path d=\"M12 8h.01\" />",
  "circle-alert": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /> <line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" />",
  "store": "<path d=\"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5\" /> <path d=\"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244\" /> <path d=\"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05\" />",
  "key": "<path d=\"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4\" /> <path d=\"m21 2-9.6 9.6\" /> <circle cx=\"7.5\" cy=\"15.5\" r=\"5.5\" />",
  "sparkles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\" /> <path d=\"M20 2v4\" /> <path d=\"M22 4h-4\" /> <circle cx=\"4\" cy=\"20\" r=\"2\" />",
  "list": "<path d=\"M3 5h.01\" /> <path d=\"M3 12h.01\" /> <path d=\"M3 19h.01\" /> <path d=\"M8 5h13\" /> <path d=\"M8 12h13\" /> <path d=\"M8 19h13\" />",
  "eye-off": "<path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\" /> <path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\" /> <path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\" /> <path d=\"m2 2 20 20\" />",
  "log-out": "<path d=\"m16 17 5-5-5-5\" /> <path d=\"M21 12H9\" /> <path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\" />"
  };

  const ALIAS = {
    'heart-filled': 'heart', chat: 'message-circle', close: 'x', pin: 'map-pin',
    home: 'house', box: 'package', money: 'banknote', trash: 'trash-2',
    shield: 'shield-check', grid: 'layout-grid', file: 'file-text',
    edit: 'pencil', views: 'eye', sort: 'sliders-horizontal', share: 'upload',
    building: 'building-2', pet: 'paw-print', kids: 'blocks', service: 'wrench'
  };

  /* svg-и як иконка (24×24, stroke=currentColor, андоза аз font-size) */
  function svg(name) {
    let fill = 'none';
    if (name && name.slice(-5) === '-fill') { fill = 'currentColor'; name = name.slice(0, -5); }
    const key = P[name] ? name : (ALIAS[name] && P[ALIAS[name]] ? ALIAS[name] : null);
    if (!key) return '';
    return '<svg viewBox="0 0 24 24" fill="' + fill + '" stroke="currentColor" stroke-width="1.75"'
      + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
      + P[key] + '</svg>';
  }

  /* HTML барои template-ҳо: iconHTML('car', 'ico-lg') */
  function iconHTML(name, cls) {
    const body = svg(name);
    if (!body) return '';
    return '<span class="ico' + (cls ? ' ' + cls : '') + '" aria-hidden="true">' + body + '</span>';
  }

  /* Пур кардани ҳамаи <span data-icon="car"></span> */
  function renderIcons(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('[data-icon]:not([data-icon-ready])').forEach(el => {
      const body = svg(el.getAttribute('data-icon'));
      if (!body) return;
      el.innerHTML = body;
      el.setAttribute('data-icon-ready', '1');
      el.classList.add('ico');
      el.setAttribute('aria-hidden', 'true');
    });
  }

  function boot() {
    renderIcons(document);
    // Контенти динамикӣ низ худкор пур мешавад
    if (window.MutationObserver) {
      new MutationObserver(muts => {
        for (const m of muts) {
          for (const n of m.addedNodes) {
            if (n.nodeType !== 1) continue;
            if (n.hasAttribute && n.hasAttribute('data-icon')) renderIcons(n.parentNode || document);
            else renderIcons(n);
          }
        }
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  window.ICONS = { svg: svg, html: iconHTML, render: renderIcons, has: n => !!(P[n] || ALIAS[n]) };
  window.iconHTML = iconHTML;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
