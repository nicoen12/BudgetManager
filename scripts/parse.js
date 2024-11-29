import currency from "../libs/currency.js"
import * as CSV from "../libs/csv-parser.js"

const fromCurrency = currency

const fromDate = (/** @type {String} */ str) => {
    const [d, m, y] = str.split(".").map(Number.parseInt)
    return Date.UTC(y, m, d)
}

class Parser {
    constructor() {
        
    }

}

export { Parser }