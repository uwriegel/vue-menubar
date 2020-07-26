<template>
    <div class="submenu">
        <menu-item class="submenuitem" v-for="(item, index) in items" @on-menu-item-clicked="onMenuItem"
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
            }
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
                    if (this.items.length == this.subMenuState.selectedIndex)
                        this.subMenuState.selectedIndex = 0
                    if (this.items[this.subMenuState.selectedIndex].name == '-')
                        this.subMenuState.selectedIndex++
                    break
                case 38: //  |^
                    this.subMenuState.selectedIndex--
                    if (this.subMenuState.selectedIndex < 0)
                        this.subMenuState.selectedIndex = this.items.length - 1
                    if (this.items[this.subMenuState.selectedIndex].name == '-')
                        this.subMenuState.selectedIndex--
                    break
                case 13: // Enter
                case 32: // Space
                    this.$emit('on-menu-item-clicked', this.items[this.subMenuState.selectedIndex].action)
                    this.$emit('on-closing')
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
                            this.$emit('on-menu-item-clicked', this.items[hits[0]].action)
                            this.$emit('on-closing')
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
        onMenuItem: function (param, item) {
            this.$emit('on-menu-item-clicked', param, item)
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
