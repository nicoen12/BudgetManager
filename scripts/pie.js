/**
 * @param {CanvasRenderingContext2D} context
 * @param {{}} data
 * @param {{}} colors
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 */
function drawPie(context, data, colors, cx, cy, r) {
    let sum = 0
    for (const key in data) sum += data[key]
    let angle = Math.random() * 2 * Math.PI
    context.translate(cx, cy)
    for (const key in data) {
        const d_theta = data[key] / sum * 2 * Math.PI
        context.fillStyle = colors[key]
        context.beginPath()
        context.arc(0, 0, r, angle, angle + d_theta)
        context.lineTo(0, 0)
        context.closePath()
        context.fill()
        angle += d_theta;
    }
    context.resetTransform()
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {{}} colors
 * @param {number} x
 * @param {number} y
 */
function drawColors(context, colors, x, y, textSize=15) {
    context.textBaseline = "middle"
    for (const key in colors) {
        context.fillStyle = colors[key]
        context.fillRect(x, y, textSize, textSize)
        context.fillText(key, x + 1.5 * textSize, y + textSize / 2)
        y += textSize;
    }
}

export { drawPie, drawColors }