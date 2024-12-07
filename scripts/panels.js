import currency from "../libs/currency.js";
import { createDropdownOn, DynamicTable, randomColor } from "./misc.js";

const INCOME_FIELD = "Income"
const EXPENSE_FIELD = "Expense"
const TRANSACTION_DATE_FIELD = "Date"

const DTYPES = {
    "Text" : e => e,
    [INCOME_FIELD] : x => currency(x, {decimal: ","}),
    [EXPENSE_FIELD] : x => currency(x, {decimal: ","}),
    [TRANSACTION_DATE_FIELD] : str => {
        const [d, m, y] = str.split(".").map(v => Number.parseInt(v))
        return new Date(Date.UTC(y, m - 1, d))          
    }
}


export class SettingsPanel {

    constructor(tableId, fields, onchange) {
        this.element = document.getElementById(tableId)
        // @ts-ignore
        this.panel = new DynamicTable(this.element)

        this.selectors = new Map()

        this.incomeField = ""
        this.expenseField = ""
        this.dateField = ""

        fields.forEach(e => {
            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.checked = true
            checkbox.onchange = () => onchange(e)

            const typeSelector = document.createElement("select")
            createDropdownOn(typeSelector, Object.keys(DTYPES), v => {
                localStorage.setItem(e, v)
                if (v === INCOME_FIELD) this.incomeField = e
                if (v === EXPENSE_FIELD) this.expenseField = e
                if (v === TRANSACTION_DATE_FIELD) this.dateField = e
            })

            typeSelector.value = localStorage.getItem(e) || "Text"
            typeSelector.dispatchEvent(new Event("change"))

            this.selectors.set(e, typeSelector)

            this.panel.appendRow([e, typeSelector, checkbox])
        })
        
    }

    getTypeOf(field) {
        return this.selectors.get(field).value
    }

    getParseFunction(field) {
        return DTYPES[this.getTypeOf(field)]
    }
}

const defaultCategories = [
    "Salary",
    "Food",
    "Clothes",
    "Recurring",
]

export class CategoryPanel {

    constructor(tableId, inputId, buttonId, onclick) {
        this.categories = {}
        this.categoryColors = {}

        this.element = document.getElementById(tableId)
        this.inputText = document.getElementById(inputId)
        this.button = document.getElementById(buttonId)        
        this.onclick = onclick

        // @ts-ignore
        this.table = new DynamicTable(this.element, ["Category", "Show"])

        defaultCategories.forEach(c => this.addCategory(c))

        // @ts-ignore
        this.button.onclick = () => this.addCategory(this.inputText.value)

    }

    addCategory(e) {
        this.categories[e] = true
        this.categoryColors[e] = randomColor()

        const row = document.createElement("div")
        row.textContent = e
        row.onclick = () => this.onclick(e)

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = true
        checkbox.onchange = () => this.categories[e] = !this.categories[e]

        this.table.appendRow([row, checkbox])
    }
}

const SHOWN_ROWS = 5

export class TransactionTable {
    getInInterval(t0, t1) {
        const dateField = this.getDateField()
        const res = new Map()
        
        this.categorised.forEach((v, k) => {
            res.set(
                k,
                v.filter(e => e[dateField] <= t1 && e[dateField] >= t0)
            )
        })
        return res
    }

    categorised = new Map()
    headers = []
    rows = [[]]

    constructor(tableId, headers, rows, onUpdateCallback) {
        this.element = document.getElementById(tableId) 
        // @ts-ignore
        this.table = new DynamicTable(this.element, headers)
        this.headers = headers
        this.rows = rows

        this.getParseFunction = null;
        this.getDateField = null;

        this.onUpdate = onUpdateCallback
        this.categorise = null;
        
        this.current = 0
        this.nextTableRow = SHOWN_ROWS
        rows.slice(0, SHOWN_ROWS).forEach(r => this.table.appendRow(r))
    }

    shiftQueue() {
        this.table.removeRow(1)
        this.current++
        this.table.appendRow(this.rows[this.nextTableRow++])
    }

    categoriseCurrent(category) {
        const categoryList = (this.categorised.get(category) || [])

        categoryList.push(this.parseRecord(this.rows[this.current]))
        this.categorised.set(category, categoryList)

        this.shiftQueue()
        this.onUpdate()
        this.attemptCategoriseCurrent()
    }

    parseRecord(row) {
        const record = {}
        for (const [i, v] of this.headers.entries()) {
            record[v] = this.getParseFunction(v)(row[i])
        }
        return record
    }

    attemptCategoriseCurrent() {
        const res = this.categorise(this.rows[this.current])
        if (res !== null) {
            this.categoriseCurrent(res)
        }
    }
}