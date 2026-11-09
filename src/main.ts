import '@/styles/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { settleInitialHash } from '@/router/anchors'

const app = createApp(App)

app.use(createPinia())
app.use(router)

await router.isReady()
app.mount('#app')
settleInitialHash()
