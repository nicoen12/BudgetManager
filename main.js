const header = document.querySelector("h1")

setInterval(() => {
    if (!header) return;
    header.style.color = "#" + Math.floor(Math.random()*16777215).toString(16)
    },
    100)


function main() {

}
