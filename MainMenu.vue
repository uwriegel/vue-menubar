<template>
    <ul @keydown="onKeyDown" :class="{'hidden': !visible}">
        <main-menu-item v-for="(item, index) in items" 
            @keyboard-activated-stopped="stopKeyboardActivated" @on-closing="closeMenu"
            :key="index" :item='item' :menuState='menuState' :index='index' :subItems='item.subItems' />
    </ul>
</template>

<script>
import MainMenuItem from './MainMenuItem.vue'
import { installAccelerators } from './accelerators'
import { getShortcuts, parseShortcuts } from './shortcuts'

export default {
    name: 'main-menu',
    components: {
        MainMenuItem
    },
    props: [
        'items',
        'autoMode'
    ],
    data() {
        return {
            menuState: {
                selectedIndex: -1,
                lastActive: null,
                menubar: null,
                accelerated: false,
                isKeyboardActivated: false
            },
            visible: false    
        }
    },
    methods: {
        stopKeyboardActivated: function () {
            this.menuState.isKeyboardActivated = false
            this.menuState.accelerated = false
        },
        onKeyDown: function (evt) {
            if (this.menuState.selectedIndex != -1) {
                switch (evt.which) {
                    case 37: // <-
                        this.menuState.selectedIndex--
                        if (this.menuState.selectedIndex == -1)
                            this.menuState.selectedIndex = 3 
                        break;
                    case  39:// ->
                        this.menuState.selectedIndex++
                        if (this.menuState.selectedIndex == 4)
                            this.menuState.selectedIndex = 0 
                        break
                }
            }
        },
        closeMenu: function () {
            this.stopKeyboardActivated()
            this.menuState.selectedIndex = -1
            if (this.menuState.lastActive)
                this.menuState.lastActive.focus()
            if (this.visible) {
                this.visible = !this.autoMode
                setTimeout(() => this.$emit('resize'))
            }        
        },
    },
    mounted: function () {
        this.visible = !this.autoMode
        this.menuState.menubar = this.$el
        document.addEventListener("keydown", evt => {
            if (this.autoMode && evt.keyCode == 18) {
                this.visible = !this.visible
                setTimeout(() => {
                    this.$el.style.setProperty('--vue-menu-submenu-top', `${this.$el.children[0].clientHeight}px`)
                    this.$emit('resize')
                })
                evt.preventDefault()
                evt.stopPropagation()
            }            
            if (this.menuState.isKeyboardActivated) {
                const hits = parseShortcuts(this.shortcuts, evt.key)
                if (hits.length > 0) {
                    this.menuState.selectedIndex = hits[0]
                    this.menuState.isKeyboardActivated = false
                    evt.preventDefault()
                    evt.stopPropagation()
                }
            }

            if (evt.which == 18 && !evt.repeat && evt.code == "AltLeft") { // Alt 
                if (this.menuState.accelerated) {
                    this.closeMenu()
                    return
                }
                if (!this.menuState.isKeyboardActivated) {
                    if (this.menuState.selectedIndex == -1)
                        this.menuState.isKeyboardActivated = true
                    this.menuState.accelerated = true
                    this.menuState.lastActive = document.activeElement
                } 
                evt.preventDefault()
                evt.stopPropagation()
            }
            else if (evt.which == 27) // ESC
                this.closeMenu()
        }, true)
        document.addEventListener("keyup", evt => {
            if (evt.which == 18) { // Alt 
                if (this.menuState.isKeyboardActivated && this.menuState.selectedIndex == -1) 
                    this.menuState.selectedIndex = 0
                evt.preventDefault()
                evt.stopPropagation()
            }
        }, true)
        this.shortcuts = getShortcuts(this.items)
        installAccelerators(this.items)
        setTimeout(() => this.$el.style.setProperty('--vue-menu-submenu-top', `${this.$el.children[0].clientHeight}px`))
    }
}
</script>

<style scoped>
    ul {
        user-select: none;
        cursor:default;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    ul.hidden {
        display: none; 
    }    
    ul > li {
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>

