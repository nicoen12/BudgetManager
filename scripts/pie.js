/**
 * @param {CanvasRenderingContext2D} context
 * @param {string} string
 * @param {number} x
 * @param {number} y
 * @param {number} textSize
 */
function drawCenteredText(context, string, x, y, textSize) {
    context.font = `bold ${textSize}px "Trebuchet MS", sans-serif`
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillStyle = "black"
    context.fillText(string, x, y)
}

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
    let angle = 0
    context.translate(cx, cy)
    for (const key in data) {
        const d_theta = data[key] / sum * 2 * Math.PI
        context.fillStyle = colors[key]
        context.beginPath()
        // drawing sectors overlapping, will not affect areas
        context.arc(0, 0, r, angle, Math.min(Math.PI * 2, angle + d_theta + 1))
        context.lineTo(0, 0)
        context.closePath()
        context.fill()
        drawCenteredText(context, data[key], Math.cos(angle + d_theta / 2) * r / 2, Math.sin(angle + d_theta / 2) * r / 2, 20)
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
function drawColors(context, colors, x, y, textSize=20) {
    context.textBaseline = "middle"
    context.textAlign = "start"
    context.font = `bold ${textSize}px "Trebuchet MS", sans-serif`
    for (const key in colors) {
        context.fillStyle = colors[key]
        context.fillRect(x, y, textSize, textSize)
        context.fillText(key, x + 1.5 * textSize, y + textSize / 2)
        y += textSize;
    }
}

export { drawPie, drawColors }