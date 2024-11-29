// Element selection
const header = document.querySelector("h2")
const importFileElement = document.querySelector("#import")
const exportFileElement = document.querySelector("#export")
const importFileLabel = document.querySelector("#importLabel")
const exportFileLabel = document.querySelector("#exportLabel")

// Event Listeners

// @ts-ignore
importFileLabel.onclick = () => importFileElement.click()
// @ts-ignore
exportFileLabel.onclick = () => exportFileElement.click()

// 
setInterval(() => {
    if (!header) return;
    header.style.color = "#" + Math.floor(Math.random()*16777215).toString(16)
}, 10000)

function main() {

}
