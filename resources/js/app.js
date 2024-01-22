import './bootstrap';
import '../css/app.css';

import { createApp } from 'vue';
import Home from '@/Components/Home.vue';

createApp({})
    .component('Home', Home)
    .mount('#app')
