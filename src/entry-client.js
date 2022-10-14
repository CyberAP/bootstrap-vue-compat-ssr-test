import { createApp } from './main';

import 'bootstrap/dist/css/bootstrap.css';
import '@ankurk91/bootstrap-vue/dist/bootstrap-vue.css';

const { url } = JSON.parse(document.querySelector('[data-app-state]').innerText);
const { app } = createApp(url);

app.mount('#app');

window.app = app;