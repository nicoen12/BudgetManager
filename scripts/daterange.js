import { createDropdown } from "./misc.js"

const ONE_WEEK = 7

export class Daterange {
    /**
     * @param {Element} elem
     */
    constructor(elem, callback, classList = []) {
        this.element = elem
        classList.forEach(c => this.element.classList.add(c))
        this.callback = callback
        this.setElement()
    }
    setElement() {
        this.element.append("Pick a date range")

        this.start = document.createElement("input")
        this.start.type = "date"
        this.start.valueAsDate = new Date()
        
        this.end = document.createElement("input")
        this.end.type = "date"
        this.end.valueAsDate = new Date()

        this.shiftDate(-1, 0, "week")

        this.submit = document.createElement("button")
        this.submit.textContent = "Submit"
        this.submit.onclick = () => this.callback(...this.getRange())
        
        this.timeUnitSelector = createDropdown(["day", "week", "month"], [], "")

        const prev = document.createElement("button")
        prev.textContent = "⟵"
        prev.onclick = () => this.shiftDate(-1, -1, this.timeUnitSelector?.value)
        
        const next = document.createElement("button")
        next.textContent = "⟶"
        next.onclick = () => this.shiftDate(1, 1, this.timeUnitSelector?.value)
        
        this.element.append(this.start, this.end, this.submit)

        this.element.append(prev, this.timeUnitSelector, next)
    }

    shiftDate(dt0, dt1, unit) {
        const d0Copy = new Date(this.start.valueAsDate)
        const d1Copy = new Date(this.end.valueAsDate)

        switch (unit) {
            case "day":
                d0Copy.setDate(d0Copy.getDate() + dt0)
                d1Copy.setDate(d1Copy.getDate() + dt1)
                break;
            case "week":
                d0Copy.setDate(d0Copy.getDate() + dt0 * 7)
                d1Copy.setDate(d1Copy.getDate() + dt1 * 7)
                break;
            case "month":
                d0Copy.setMonth(d0Copy.getMonth() + dt0)
                d1Copy.setMonth(d1Copy.getMonth() + dt1)
                break;
            default:
                break;
        }

        this.start.valueAsDate = d0Copy
        this.end.valueAsDate = d1Copy
    }

    getRange() {
        return [this.start?.valueAsDate, this.end?.valueAsDate]
    }

}