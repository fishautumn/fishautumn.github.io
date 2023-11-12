


class Draw {

  constructor(canvas, width, height) {
    this.ctx = canvas.getContext("2d")
    this.x_delta = width * 0.5
    this.y_delta = height * 0.5
    this.x_ratio = canvas.width / width
    this.y_ratio = canvas.height / height
  }

  map(pos) {
    const x = (pos.x + this.x_delta) * this.x_ratio
    const y = (this.y_delta - pos.y) * this.y_ratio
    return {x: x, y: y};
  }

  line(from, to, color) {
    const path = new Path2D()

    var p = this.map(from)
    path.moveTo(p.x, p.y)
    p = this.map(to)
    path.lineTo(p.x, p.y)

    this.ctx.strokeStyle = color
    this.ctx.stroke(path)
  }

}