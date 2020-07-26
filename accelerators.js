var acceleratorMap = new Map();

export function installAccelerators(items) {
    const menuitems= items.map(n => n.subItems).flat(2)

    menuitems.forEach(n => {
        if (n.accelerator) {
            const key = n.accelerator.key
            if (key) {
                if (acceleratorMap.has(key)) {
                    const v = acceleratorMap.get(key)
                    v.push(n)
                    acceleratorMap.set(key, v)
                }
                else
                    acceleratorMap.set(key, [n])
            }
        }
    })

    function isItem(evt, accelerator) {
        return ((evt.shiftKey && accelerator.shift || !evt.shiftKey && !accelerator.shift)
        && (evt.altKey && accelerator.alt || !evt.altKey && !accelerator.alt)
        && (evt.ctrlKey && accelerator.ctrl || !evt.ctrlKey && !accelerator.ctrl)) 
    }

    document.addEventListener("keydown", evt => {
        if (acceleratorMap.has(evt.keyCode)) {
            const v = acceleratorMap.get(evt.keyCode)
            if (v.find(n => isItem(evt, n.accelerator))) {
                console.log("hat ihn", v[0].action)
                v[0].action()
                evt.preventDefault()
                evt.stopPropagation()
            }
        }
    }, true)
}