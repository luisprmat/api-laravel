import './bootstrap';
import '../css/app.css';

import { createApp } from 'vue';

import router from './routes'

createApp({})
    .use(router)
    .mount('#app')
