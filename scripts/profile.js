import { Parser } from "./parse.js"

class Profile {
    #categoryNames = []
    #fieldNames = []

    constructor(fields, categories=null) {
        this.#fieldNames = fields
        this.#categoryNames = categories ? categories : ["Groceries", "Clothes", "Recurring", "Salary", "Misc.", "Hidden"]
        this.parser = new Parser()
    }

    addFieldName(field) {
        this.#fieldNames.push(field)
    }

    addCategory(category) {
        if (this.#categoryNames.includes(category)) throw new Error("Category already exists!")
        this.#categoryNames.push(category)
    }


}

export { Profile }