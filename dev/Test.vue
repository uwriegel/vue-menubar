<template>
    <div class="root">
        <main-menu :items="menuItems" @on-menu-item-clicked="onMenuItem" />
        <h1>Ein Test</h1>
    </div>
</template>

<script>
import MainMenu from '../MainMenu.vue'
export default {
    components: {
        MainMenu
    },
    data() {
        return {
            menuItems: [
                {
                    name: "_Datei",
                    subItems: [{ 
                            name: "_Umbenennen",
                            action: "rename",
                            accelerator: { 
                                name: "F2",
                                key: 113
                            }
                        }, { 
                            name: "Er_weitertes Umbenennen",
                            action: "extendedRename",
                            accelerator: { 
                                name: "Strg+F2",
                                ctrl: true,
                                key: 113
                            }
                        }, { 
                            name: "-"
                        }, { 
                            name: "_Kopieren",
                            action: "copy",
                            accelerator: { 
                                name: "F5",
                                key: 116
                            }
                        }, { 
                            name: "_Verschieben",
                            action: "move",
                            accelerator: { 
                                name: "F6",
                                key: 117
                            }
                        }, { 
                            name: "_Löschen",
                            accelerator: { name: "Entf"},
                            action: "delete"
                        }, { 
                            name: "-"
                        }, { 
                            name: "_Ordner anlegen",
                            accelerator: { 
                                name: "F7",
                                key: 118
                            },
                            action: "createFolder"
                        }, { 
                            name: "-"
                        }, { 
                            name: "_Eigenschaften",
                            action: "properties",
                            accelerator: { 
                                name: "Alt+Enter",
                                key: 13,
                                alt: true
                            }
                        }, { 
                            name: "Öffnen _mit",
                            action: "openAs",
                            accelerator: { 
                                name: "Strg+Enter",
                                key: 13,
                                ctrl: true
                            }
                        }, { 
                            name: "-"
                        }, { 
                            name: "_Beenden",
                            action: "close",
                            accelerator: { name: "Alt+F4"}
                        }
                    ]
                }, 
                {
                    name: "_Navigation",
                    subItems: [{ 
                            name: "_Favoriten",
                            accelerator: { name: "F1"}
                        }, { 
                            name: "_Gleichen Ordner öffnen",
                            action: "openSameFolder",
                            accelerator: { 
                                name: "F9",
                                key: 120,
                            }
                        }
                    ]
                }, 
                {
                    name: "_Selektion",
                    subItems: [{ 
                            name: "_Alles",
                            accelerator: { name: "Num +"}
                        }, { 
                            name: "Alle _deselektieren",
                            accelerator: { name: "Num -"}
                        }
                    ]
                }, 
                {
                    name: "_Ansicht",
                    subItems: [{ 
                            name: "_Versteckte Dateien",
                            action: "showHidden",
                            checkSelected: () => this.$store.state.showHidden,
                            accelerator: { 
                                name: "Strg+H",
                                key: 72,
                                ctrl: true
                            }
                        }, { 
                            name: "_Aktualisieren",
                            action: "refresh",
                            accelerator: { 
                                name: "Strg+R",
                                key: 82,
                                ctrl: true
                            }
                        }, { 
                            name: "-"
                        }, { 
                            name: "_Vorschau",
                            action: "showViewer",
                            checkSelected: () => this.$store.state.showViewer,
                            accelerator: { 
                                name: "F3",
                                key: 114,
                            }
                        }, { 
                            name: "-"
                        }, { 
                            name: "_Zoomlevel"
                        }, { 
                            name: "_Vollbild",
                            action: "fullscreen",
                            accelerator: { 
                                name: "F11",
                                key: 122
                            }
                        }, { 
                            name: "-"
                        }, { 
                            name: "_Entwicklerwerkzeuge",
                            action: "devtools",
                            accelerator: { 
                                name: "F12",
                                key: 123
                            }
                        }
                    ]
                }
            ],
            acceleratorMap: new Map()
        }
    }    
}
</script>

<style>
    :root {
        --vue-menu-color: black;
        --vue-menu-background-color: white;
        --vue-menu-hover-color: lightblue;
        --vue-menu-separator-color: #ddd;
        --vue-menu-border-color: lightgray;
        --vue-menu-shadow-color: rgba(0, 0, 0, 0.21);
        --vue-menu-selected-background-color: blue;
        --vue-menu-selected-color: white;
    }
    body {
        font-family: sans-serif;
        padding: 0px;
        margin: 0px;
    }
</style>
<style scoped>
    .root {
        display: flex;
        flex-direction: column;
    }
    main-menu {
        background-color: gray;
    }
</style>