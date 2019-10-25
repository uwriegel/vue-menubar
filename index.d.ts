declare module 'vue-menubar' {
    import { PluginFunction } from "vue"
    export const install: PluginFunction<{}>

    interface MenuItem {
        isSelected: boolean
    }
}
