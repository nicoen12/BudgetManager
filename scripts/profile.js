import { parse } from "../node_modules/csv-parse/dist/esm/sync.js"
import currency from "../libs/currency.js"
import { createFieldTypeForm, DynamicTable, OptionToggler } from "./misc.js"
import { drawColors, drawPie } from "./pie.js"

const fromCurrency = currency

const fromDate = (/** @type {String} */ str) => {
    const [d, m, y] = str.split(".").map(Number.parseInt)
    return Date.UTC(y, m, d)
}

const defaultCategories = ["Groceries", "Clothes", "Recurring", "Salary", "Misc", "Hidden"]

class ChartManager {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Profile} profile
     */
    constructor(canvas, profile) {
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        this.profile = profile
        window.addEventListener("resize", this.onResize)
    }
    onResize(event) {
        if (this.canvas.parentElement?.width != this.canvas.width) {
            this.canvas.width = this.canvas.parentElement?.width
        }
        if (this.canvas.parentElement?.height != this.canvas.height) {
            this.canvas.height = this.canvas.parentElement?.height
        }
        this.draw()
    }

    draw() {
        const w = this.canvas.width, h = this.canvas.height
        const r = Math.min(w / 2, h / 4) * 0.75
        const {expenses, income, ratio} = this.profile.queryData()
        // A * ratio = pi * r^2
        // r = sqrt(ratio * r^2)
        drawPie(this.context, expenses, this.profile.categoryColors, w / 2, h / 4, ratio < 1 ? r * ratio**0.5 : r)
        drawPie(this.context, income, this.profile.categoryColors, w / 2, h - h / 4, ratio < 1 ? r : r * ratio**0.5)
        drawColors(this.context, this.profile.categoryColors, 0, 0)
        drawColors(this.context, this.profile.categoryColors, 0, h / 2)
    }
}

class Categoriser {
    constructor(parent, categories) {

    }
    categorise(fieldValueObj) {

    }
}

class Profile {
    queryData() {
        throw new Error("Method not implemented.")
    }
    #categoryNames = []
    #fieldNames = []
    #dataEntries = []

    constructor(fields, categories=defaultCategories) {
        this.#fieldNames = fields
        this.#categoryNames = categories
        this.categoryColors = undefined
    }

    addFieldName(field) {
        this.#fieldNames.push(field)
    }

    addCategory(category) {
        if (this.#categoryNames.includes(category)) throw new Error("Category already exists!")
        this.#categoryNames.push(category)
    }

    handleFile(file) {
        const reader = new FileReader()        
        reader.readAsText(file, "ISO-8859-1")
        reader.onload = () => this.onLoad(reader.result)
    }

    onLoad(str) {
        this.data = parse(str, {delimiter: ";", encoding: "utf-8"})
        this.table = new DynamicTable(["datatable"], this.data[0])
        this.table.appendRow(...this.data.slice(1, 5))
        // this.requestFieldDataTypes(Object.keys(this.data[0]), this.data.slice(0, 5))
        document.getElementById("infopanel").firstElementChild.append(this.table.element)
        this.options = new OptionToggler(this.data[0], header => {
            this.table.toggleColumn(header);
            console.log(header);
        })
        document.getElementById("settings").append(this.options.element)
    }

    requestFieldDataTypes(fields, sampleRows) {
        const f = createFieldTypeForm(v => console.log(v), fields, sampleRows)
        const infopanel = document.getElementById("infopanel")
        infopanel?.firstElementChild?.append(f)
    }
}

export { Profile }