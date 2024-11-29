
function createDropdown(options, classList) {
    const elem = document.createElement("select")
    classList.forEach(cls => elem.classList.add(cls))
    for (const opt of options) {
        const m = document.createElement("option")
        m.value = opt
        m.innerText = opt
        elem.appendChild(opt)    
    }
    return elem
}