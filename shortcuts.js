export function getShortcuts(items) {
    const getShortcut = function (item, index) {
        const pos = item.indexOf('_')
        if (pos == -1)
            return null
        return {
            key: item[pos + 1].toLowerCase(),
            index: index
        }
    }
    
    return items.map((n, i) => getShortcut(n.name, i)).filter(n => n ? true : false)
}

export function parseShortcuts(shortcuts, key) {
    return shortcuts.filter(element => element.key == key).map(n => n.index)
}

