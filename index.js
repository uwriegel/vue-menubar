import MainMenu from "./MainMenu.vue"
import { makeKey } from './accelerators'

export default {
    install(Vue, options) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("vue-menu-bar", MainMenu)
        Vue.menuMakeKey = makeKey
    }
}