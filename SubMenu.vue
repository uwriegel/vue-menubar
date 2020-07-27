<template>
    <div class="submenu">
        <menu-item class="submenuitem" v-for="(item, index) in menuItems" @on-item="onAction"
            :key="index" :item='item' 
            :menuState='menuState' :index='index' :subMenuState='subMenuState' />
    </div>    
</template>

<script>
import MenuItem from './MenuItem.vue'
import { getShortcuts, parseShortcuts } from './shortcuts'

export default {
    name: 'sub-menu',
    data() {
        return {
            subMenuState: {
                selectedIndex: -1
            },
            subMenuItems: null
        }
    },
    components: {
        MenuItem
    },
    props: [
        'items',
        'menuState', 
        'keyDown'
    ],
    computed: {
        menuItems() {
            return this.subMenuItems || this.items
        }
    },
    watch: {
        keyDown: function (newVal) {
            this.onKeyDown(newVal)            
        }
    },
    methods: {
        onKeyDown: function (evt) {
            switch (evt.which) {
                case 40: //  |d
                    this.subMenuState.selectedIndex++
                    if (this.menuItems.length == this.subMenuState.selectedIndex)
                        this.subMenuState.selectedIndex = 0
                    if (this.menuItems[this.subMenuState.selectedIndex].name == '-')
                        this.subMenuState.selectedIndex++
                    break
                case 38: //  |^
                    this.subMenuState.selectedIndex--
                    if (this.subMenuState.selectedIndex < 0)
                        this.subMenuState.selectedIndex = this.menuItems.length - 1
                    if (this.menuItems[this.subMenuState.selectedIndex].name == '-')
                        this.subMenuState.selectedIndex--
                    break
                case 13: // Enter
                case 32: // Space
                    this.onAction(this.menuItems[this.subMenuState.selectedIndex])
                    evt.preventDefault()
                    evt.stopPropagation()
                    break
                default: {
                        const hits = parseShortcuts(this.shortcuts, evt.key)

                        if (this.shortcutHits) {
                            if (this.shortcutHits.key == evt.key) {
                                this.shortcutHits.index++
                                if (this.shortcutHits.index >= this.shortcutHits.hits.length)
                                    this.shortcutHits.index = 0
                                this.subMenuState.selectedIndex = hits[this.shortcutHits.index]
                                return
                            }
                            this.shortcutHits = null
                        }
                        if (hits.length == 1) {
                            this.onAction(this.menuItems[hits[0]])
                            evt.preventDefault()
                            evt.stopPropagation()
                            return
                        }
                        if (hits.length > 1) {
                            this.shortcutHits = { key: evt.key, hits: hits, index: 0 }
                            this.subMenuState.selectedIndex = hits[0]
                        }
                    }
                    break
            }
        },
        onAction(item) {
            if (item.subMenu)
                this.onSubmenu(item.subMenu)
            else if (item.back) 
                this.onSubmenu(null)
            else {
                item.action()
                this.$emit('on-closing')
            }
        },
        onSubmenu(subMenu) {
            this.subMenuItems = []
            setTimeout(() => {
                this.subMenuItems = subMenu
                this.subMenuState.selectedIndex = 0
            })
        }
    },
    mounted: function () {
        this.shortcuts = getShortcuts(this.items)
    }
}
</script>

<style>
    .submenu {
        color: var(--vue-menu-color);
        background-color: var(--vue-menu-background-color); 
        position: absolute;
        z-index: 10000;
        top: var(--vue-menu-submenu-top);
        border-color: var(--vue-menu-border-color);
        border-style: solid;
        border-width: 1px;
        white-space: nowrap;
        box-shadow: 3px 3px 3px var(--vue-menu-shadow-color);
    }
</style>
