// @ts-nocheck
import { drawColors, drawPie } from "./pie.js"
import { Profile } from "./profile.js"


export class ChartManager {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Profile} profile
     */
    constructor(canvas, profile) {
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        this.profile = profile

        this.width = canvas.width
        this.height = canvas.height

        this.resizeObserver = new ResizeObserver(() => {
            this.width = canvas.offsetWidth
            this.height = canvas.offsetHeight
            this.draw()
        })
        this.resizeObserver.observe(this.canvas.parentElement)
    }

    draw() {
        this.canvas.width = this.width
        this.canvas.height = this.height

        
        const w = this.width, h = this.height
        const r = Math.min(w / 2, h / 4) * 0.75

        const {expenses, income, ratio} = this.profile.queryData()

        console.log(expenses, income, ratio);
        
        this.context?.clearRect(0, 0, w, h)        
        drawPie(this.context, expenses, this.profile.categoryPanel.categoryColors, w / 2, h / 4, ratio < 1 ? r * ratio**0.5 : r)
        drawPie(this.context, income, this.profile.categoryPanel.categoryColors, w / 2, h - h / 4, ratio < 1 ? r : r * ratio**0.5)
        drawColors(this.context, this.profile.categoryPanel.categoryColors, 0, 0)

        this.context.textAlign = "center"
        this.context.fillText("Usage", w / 2, h / 2 - 25)
        this.context.fillText("Income", w / 2, h - 25)
    }
}
