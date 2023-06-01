import { createApp } from 'vue'
import App from './App.vue'
import test from './test.vue'
// q: what does createApp(App).mount('#app') do?
// a: createApp(App) creates an instance of the App component
//    and then mounts it to the element with the id of app
createApp(test).mount('#app')
