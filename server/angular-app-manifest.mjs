
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/clicauto/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/clicauto/auth",
    "route": "/clicauto"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6WNEI2AU.js"
    ],
    "route": "/clicauto/gerant"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6WNEI2AU.js",
      "chunk-MHLVWIJM.js",
      "chunk-NL35SZWT.js"
    ],
    "route": "/clicauto/gerant/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6WNEI2AU.js",
      "chunk-HWDATTSU.js",
      "chunk-NL35SZWT.js",
      "chunk-HUJHNFRA.js"
    ],
    "route": "/clicauto/gerant/location"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZTFVF3EO.js",
      "chunk-HUJHNFRA.js"
    ],
    "redirectTo": "/clicauto/auth/login",
    "route": "/clicauto/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZTFVF3EO.js",
      "chunk-HUJHNFRA.js"
    ],
    "route": "/clicauto/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZTFVF3EO.js",
      "chunk-HUJHNFRA.js"
    ],
    "route": "/clicauto/auth/reset-password"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ZTFVF3EO.js",
      "chunk-HUJHNFRA.js"
    ],
    "route": "/clicauto/auth/mot-de-passe-oublie"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 22457, hash: '7327a7e2a56170d2b8044ea8b6bdc4ce92a77948382c33f46f4c85347d0e45c0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13069, hash: '88de402b7adc8f30691fcc454c1d933c3864f2d46c60417dd24fdda77d378f53', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'gerant/index.html': {size: 300, hash: 'f4d18fa243ba59e6b0ee7039ae5c6821b9d9721a6f9c043f628beb3faa7c35a0', text: () => import('./assets-chunks/gerant_index_html.mjs').then(m => m.default)},
    'gerant/dashboard/index.html': {size: 53890, hash: 'e23ccad7598bee2712b54decbd77e65de2d46346393e31745d8a8a22cf8e8383', text: () => import('./assets-chunks/gerant_dashboard_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 43599, hash: 'b0c7eae58711cfc074d1d01f95b6c456220bc0d130f9fa31add3c7167dd74c4c', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'auth/reset-password/index.html': {size: 22903, hash: '9f6d0fabb5dd95dc8a4d68646a70a4e2df7c4ada6bf7cc554da81bd66e945c51', text: () => import('./assets-chunks/auth_reset-password_index_html.mjs').then(m => m.default)},
    'gerant/location/index.html': {size: 55422, hash: '0b1a7a7df10c1758f93b6f1ad1e1ae59e782ec211c0fd8a54ddd09504be57aa3', text: () => import('./assets-chunks/gerant_location_index_html.mjs').then(m => m.default)},
    'auth/mot-de-passe-oublie/index.html': {size: 22906, hash: '5cdc1a45a605c6d834e0d423b357c9e1a6fb3381c4a162529d8462c4ec856b16', text: () => import('./assets-chunks/auth_mot-de-passe-oublie_index_html.mjs').then(m => m.default)},
    'styles-RSATZZ56.css': {size: 11735, hash: '+SDxU00lTkE', text: () => import('./assets-chunks/styles-RSATZZ56_css.mjs').then(m => m.default)}
  },
};
