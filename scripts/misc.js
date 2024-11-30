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

export { createFieldTypeForm }