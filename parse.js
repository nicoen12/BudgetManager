import currency from "./libs/currency.js"

const fromCurrency = currency

const fromDate = (/** @type {String} */ str) => {
    const [d, m, y] = str.split(".").map(Number.parseInt)
    return Date.UTC(y, m, d)
}

