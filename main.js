import { Profile } from "./scripts/profile.js"
import { drawPie, drawColors } from "./scripts/pie.js"
import { createFieldTypeForm } from "./scripts/misc.js"

// Element selection

const header = document.querySelector("h2")
const importFileElement = document.querySelector("#import")
const exportFileElement = document.querySelector("#export")
const importFileLabel = document.querySelector("#importLabel")
const exportFileLabel = document.querySelector("#exportLabel")

const canvas = document.querySelector("canvas")

// Instanciating

const profile = new Profile()

const ctx = canvas?.getContext("2d", {antialias: true})
canvas.height = 600
canvas.width = 400

// Event Listeners

if (importFileElement && importFileLabel && exportFileElement && exportFileLabel) {
    // @ts-ignore
    importFileLabel.onclick = () => importFileElement.click()
    // @ts-ignore
    exportFileLabel.onclick = () => exportFileElement.click()
    
    // @ts-ignore
    importFileElement.onchange = () => profile.handleFile(importFileElement.files[0])

}

// Other

setInterval(() => header.style.color = "#" + Math.floor(Math.random()*16777215).toString(16), 10000)

function main() {
    const data = {
        "B" : 2, 
        "A" : 10,
        "C" : 7,
        "D" : 12
    }
    const colors = {
        "A" : "#05299E",
        "B" : "#947BD3",
        "C" : "#F0A7A0",
        "D" : "#657ABC"
    }

    // const f = createFieldTypeForm(v => console.log(v), ["A", "B", "C"], [{"A" : 3, "B" : 2, "C" : 1}, {"A" : 3, "B" : 2, "C" : 1}, {"A" : 3, "B" : 2, "C" : 1}])
    // infopanel.firstElementChild.append(f)


    drawPie(ctx, data, colors, 210, 140, 130)
    drawColors(ctx, colors, 0, 0)
    drawPie(ctx, {SEEE: 20, Q: 12, G: 9}, {SEEE: "crimson", Q: "orange", G: "red"}, 210, 440, 130)
    drawColors(ctx, {SEEE: "crimson", Q: "orange", G: "red"}, 0, 300)
}


main()