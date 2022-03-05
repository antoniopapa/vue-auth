import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './interceptors/axios'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gAuth from 'vue3-google-auth'

const GAuth = gAuth.createGAuth({
    clientId: '982891557954-fo48o2bviitqohuhgfm0ihp1pk9ubkc6.apps.googleusercontent.com'
})

createApp(App).use(store).use(router).use(GAuth).mount('#app')
