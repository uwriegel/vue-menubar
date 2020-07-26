var acceleratorMap = new Map();

export function installAccelerators(items) {
    const menuitems= items.map(n => n.subItems).flat(2)

    menuitems.forEach(n => {
        if (n.accelerator) {
            const key = n.accelerator.key
            if (key) {
                if (acceleratorMap.has(key)) {
                    const v = acceleratorMap.get(key)
                    v.push(n.accelerator)
                    acceleratorMap.set(key, v)
                }
                else
                    acceleratorMap.set(key, [n.accelerator])
            }
        }
    })

    // document.addEventHandler
}