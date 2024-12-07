import { parse } from "./node_modules/csv-parse/dist/esm/sync.js"
import { Profile } from "./scripts/profile.js"

const importFileElement = document.querySelector("#import-file")
const exportFileElement = document.querySelector("#export-file")

const canvas = document.querySelector("canvas")

importFileElement.onchange = () => new Main(importFileElement.files[0])

class Main {
    constructor(file) {
        const reader = new FileReader()        
        reader.readAsText(file, "ISO-8859-1")
        reader.onload = () => this.onLoad(reader.result)
    }

    onLoad(fileString) {
        const parsed = parse(fileString, {delimiter: ";", encoding: "utf-8"})
        this.profile = new Profile(parsed, canvas)
    }
}
