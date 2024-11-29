import { Profile } from "./scripts/profile.js"
import { drawPie, drawColors } from "./scripts/pie.js"

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
canvas.height = 200
canvas.width = 300

// Event Listeners

if (importFileElement && importFileLabel && exportFileElement && exportFileLabel) {
    // @ts-ignore
    importFileLabel.onclick = () => importFileElement.click()
    // @ts-ignore
    exportFileLabel.onclick = () => exportFileElement.click()
    
    // @ts-ignore
    importFileElement.onclick = () => importFileElement.files[0]

}

// Other

setInterval(() => {
    if (!header) return;
    header.style.color = "#" + Math.floor(Math.random()*16777215).toString(16)
}, 10000)

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
    drawPie(ctx, data, colors, 140, 100, 80)
    drawColors(ctx, colors, 0, 0)
}


main()