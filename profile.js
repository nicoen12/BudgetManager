class Profile {
    #categoryNames = []
    #fieldNames = []

    constructor(fields, categories=null) {
        this.#fieldNames = fields
        this.#categoryNames = categories ? categories : ["Groceries", "Clothes", "Recurring", "Salary", "Misc.", "Hidden"]
    }

    addFieldName(field) {
        this.#fieldNames.push(field)
    }

    addCategory(category) {
        if (this.#categoryNames.includes(category)) throw new Error("Category already exists!")
        this.#categoryNames.push(category)
    }


}