// @ts-nocheck
import { createDropdownOn } from "./misc.js"

const ONE_WEEK = 7

export class Daterange {

    constructor(from_id, to_id, prev_id, next_id, selector_id, callback) {
        this.start = document.getElementById(from_id)
        this.end = document.getElementById(to_id)
        this.unitSelector = document.getElementById(selector_id)

        this.start.valueAsDate = new Date()
        this.end.valueAsDate = new Date()
        this.shiftDate(-1, 0, "week")

        createDropdownOn(this.unitSelector, ["day", "week", "month"], () => {})

        this.start.onchange = callback
        this.end.onchange = callback
        
        document.getElementById(prev_id).onclick = () => this.shiftDate(-1, -1, this.unitSelector.value)
        document.getElementById(next_id).onclick = () => this.shiftDate(1, 1, this.unitSelector.value)
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
                d0Copy.setDate(d0Copy.getDate() + dt0 * ONE_WEEK)
                d1Copy.setDate(d1Copy.getDate() + dt1 * ONE_WEEK)
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