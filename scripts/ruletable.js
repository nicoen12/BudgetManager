const RULE_TYPES = ["EQUALS", "REGEX", "PRED"]

export class Ruletable {

    constructor(parsefunc, table_id, field_selector_id, rule_type_id, rule_text_id, rule_category_id, rule_submit_id) {
        this.getParseFunction = parsefunc
        this.rules = []
        /** @type {HTMLTableElement} */
        this.table = document.getElementById(table_id)
        this.submit = document.getElementById(rule_submit_id)
        this.submit.onclick = () => {
            const field = document.getElementById(field_selector_id).value
            const type = document.getElementById(rule_type_id).value
            const text = document.getElementById(rule_text_id).value
            const category = document.getElementById(rule_category_id).value
            this.addRule(field, type, text, category)
            this.addRow(field, type, text, category)
        }
    }
    addRow(field, type, text, category) {
        const row = document.createElement("tr")
        row.innerHTML = [field, type, text, category].map(v => "<td>" + v + "</td>").join("")
        this.table.insertBefore(this.table.lastElementChild, row)
    }

    addRule(field, type, text, category) {
        let f;
        // TODO
        switch (type) {
            case "EQUALS":
                f = e => e == this.getParseFunction(field)(text);
                break;
            case "REGEX":
                const reg = RegExp(text)
                f = e => reg.test(e)
                break;
            case "PRED":
                break;        
            default:
                console.error("Invalid rule type");
                break;
        }
        this.rules.push(
            (record) => {
                if (!Object.hasOwn(record, field)) {
                    console.error("Error here");
                }
                return f(record[field]) ? category : null;                
            }
        )
    }

    categorise(fieldValueObj) {
        for (const f of this.rules) {
            const res = f(fieldValueObj)
            if (res !== null) return res;
        }
        return null;
    }
}