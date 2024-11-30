import { parse } from "../node_modules/csv-parse/dist/esm/sync.js"
import currency from "../libs/currency.js"
import { createFieldTypeForm } from "./misc.js"

const fromCurrency = currency

const fromDate = (/** @type {String} */ str) => {
    const [d, m, y] = str.split(".").map(Number.parseInt)
    return Date.UTC(y, m, d)
}

class Parser {
    
    
    handleFile(file) {
        const reader = new FileReader()        
        reader.readAsText(file, "ISO-8859-1")
        reader.onload = e => this.onLoad(reader.result)
    }

    onLoad(str) {
        this.data = parse(str, {delimiter: ";", encoding: "utf-8", columns: true})
        this.requestFieldDataTypes(Object.keys(this.data[0]), this.data.slice(0, 5))                
    }

    requestFieldDataTypes(fields, sampleRows) {
        const f = createFieldTypeForm(v => console.log(v), fields, sampleRows)
        const infopanel = document.getElementById("infopanel")
        infopanel?.firstElementChild?.append(f)
    }

}

export { Parser }