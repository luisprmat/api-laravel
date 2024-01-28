import './bootstrap';
import '../css/app.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './routes'

createApp({})
    .use(createPinia())
    .use(router)
    .mount('#app')
