const DTYPES = ["Text", "Currency", "Date"]

function createDropdown(options, classList, name) {
    const elem = document.createElement("select")    
    elem.name = name
    classList.forEach(cls => elem.classList.add(cls))

    for (const opt of options) {
        const m = document.createElement("option")
        m.value = opt
        m.innerText = opt
        elem.append(m)    
    }
    return elem
}

function createFieldTypeForm(callback, fields, sampleRows) {
    const form = document.createElement("form")
    form.onsubmit = e => {
        e.preventDefault()
        const data = new FormData(form)
        callback(data)
    }
    const dropDownInputs = fields.map(v => createDropdown(DTYPES, [], v))
    const table = createTable(fields, sampleRows)
    const dropDownRow = document.createElement("tr")
    dropDownInputs.forEach(element => {
        const td = document.createElement("td")
        td.appendChild(element)
        dropDownRow.appendChild(td)
    });
    table.appendChild(dropDownRow)
    form.appendChild(table)
    const submit = document.createElement("input")
    submit.type = "submit"
    form.appendChild(submit)
    return form
}

function createTable(headers, rows) {
    const table = document.createElement("table")
    table.classList.add("datatable")
    const header = document.createElement("tr")
    header.innerHTML = headers.map(v => "<th>" + v + "</th>").join("")
    table.appendChild(header)
    for (const row of rows) {        
        const tableRow = document.createElement("tr")
        tableRow.innerHTML = headers.map(k => "<td>" + row[k] + "</td>").join("")
        table.appendChild(tableRow)
    }
    return table
}

class DynamicTable {
    constructor(classList, headers) {
        this.element = document.createElement("table")
        this.element.classList.add(...classList)
        this.colgroup = document.createElement("colgroup")
        this.element.appendChild(this.colgroup)

        this.headers = headers
        this.columns = new Map()
        
        const tr = document.createElement("tr")
        headers.forEach(header => {
            const col = document.createElement("col")
            this.columns.set(header, col)
            this.colgroup.appendChild(col)
        })
        tr.innerHTML = headers.map(header => "<th>" + header + "</th>").join("")        

        this.element.appendChild(tr)
    }
    
    // hideColumn(headerName) {
    //     this.columns.get(headerName).style.visibility = "collapsed"
    // }

    // showColumn(headerName) {
    //     this.columns.get(headerName).style.visibility = "unset"
    // }

    toggleColumn(headerName) {
        this.columns.get(headerName).classList.toggle("hideColumn")        
    }

    appendRow(...data) {
        for (const row of data) {
            const tr = document.createElement("tr")
            tr.innerHTML = row.map(entry => "<td>" + entry + "</td>").join("")
            this.element.appendChild(tr)
        }
    }

    removeRow(n) {
        const i = n < 0 ? this.element.rows.length + n : n + 1;
        if (i < 1 || i >= this.element.rows.length) console.error("Row out of bounds!")
        this.element.deleteRow(i)
    }

}

class OptionToggler {
    constructor(options, callback) {
        this.element = document.createElement("div")
        for (const opt of options) {
            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.checked = true
            checkbox.onchange = () => callback(opt)
            this.element.append(opt, checkbox, document.createElement("br"))
        }
    }
}

export { createFieldTypeForm, createDropdown, DynamicTable, OptionToggler }