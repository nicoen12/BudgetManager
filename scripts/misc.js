const randomColor = () => "#" + Math.floor(Math.random()*16777215).toString(16)

/**
 * @param {HTMLSelectElement} elem
 * @param {any[]} options
 * @param {Function} callback
 */
function createDropdownOn(elem, options, callback = () => {}) {
    elem.onchange = () => callback(elem.value)
    for (const opt of options) {
        const m = document.createElement("option")
        m.value = opt
        m.innerText = opt
        elem.append(m)    
    }
    return elem
}

class DynamicTable {
    /**
     * @param {HTMLTableElement} element
     * @param {any[] | null} headers
     */
    constructor(element, headers=null) {
        this.element = element
        if (headers !== null) {
            this.element.innerHTML = ""
        }

        this.colgroup = document.createElement("colgroup")
        this.element.prepend(this.colgroup)

        this.headers = headers
        this.columns = new Map()

        if (headers) {
            this.insertHeader(headers)
        }
    }
    
    toggleColumn(headerName) {
        this.columns.get(headerName).classList.toggle("hide-column")        
    }

    insertRow(n, data) {
        const tr = this.element.insertRow(n)
        data.forEach(node => {
            const td = tr.insertCell()
            td.append(node)
        })
    }

    appendRow(data) {
        this.insertRow(-1, data)
    }

    insertHeader(data, n=0) {
        this.columns = new Map()
        this.colgroup.innerHTML = ""

        data.forEach(header => {
            const col = document.createElement("col")
            this.columns.set(header, col)
            this.colgroup.appendChild(col)
        })

        const tr = this.element.insertRow(n)
        tr.innerHTML = data.map(entry => "<th>" + entry + "</th>").join("")
    }

    removeRow(n) {
        this.element.deleteRow(n)
    }

}

export { randomColor, createDropdownOn, DynamicTable }