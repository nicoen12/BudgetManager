import currency from "../libs/currency.js"
import { ChartManager } from "./chartmanager.js"
import { Daterange } from "./daterange.js"
import { CategoryPanel, SettingsPanel, TransactionTable } from "./panels.js"
import { Ruletable } from "./ruletable.js"


export class Profile {
    queryData() {
        const [t0, t1] = this.dateSelector.getRange()        

        const transactionsByCategory = this.transactionTable.getInInterval(t0, t1)        
        const expenses = {}
        const income = {}
        
        transactionsByCategory.forEach((v, k) => {
            income[k] = v.reduce((acc, record) => acc.add(record[this.settingsPanel.incomeField]), currency(0)).value
            expenses[k] = v.reduce((acc, record) => acc.subtract(record[this.settingsPanel.expenseField]), currency(0)).value
        })

        const ratio = Object.values(expenses).reduce((acc, e) => acc + e, 0) / Object.values(income).reduce((acc, e) => acc + e, 0)

        return {expenses, income, ratio: (ratio == Infinity ? 1 : ratio)}
    }

    constructor(csvRows, canvas) {
        const [header, ...rows] = csvRows
        
        this.graphic = new ChartManager(canvas, this)
        
        this.dateSelector = new Daterange("date-input-start", "date-input-end", "shift-date-prev", "shift-date-next", "time-unit-shift-selector", () => this.graphic.draw())
        
        this.transactionTable = new TransactionTable("transaction-table", header, rows, () => this.graphic.draw())

        this.settingsPanel = new SettingsPanel("settings-table", header, x => this.transactionTable.table.toggleColumn(x))

        this.categoryPanel = new CategoryPanel("category-table", "create-category", "add-category", x => this.transactionTable.categoriseCurrent(x))

        this.ruleTable = new Ruletable(
            x => this.settingsPanel.getParseFunction(x), 
            "rules-table",
            "rules-field",
            "rules-type",
            "rules-text",
            "rules-category",
            "rules-submit"
        )

        this.transactionTable.categorise = x => this.ruleTable.categorise(x)
        this.transactionTable.getParseFunction = x => this.settingsPanel.getParseFunction(x)
        this.transactionTable.getDateField = () => this.settingsPanel.dateField
    }

}
