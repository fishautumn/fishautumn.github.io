
function coord(x, y) {
  return {"x": x, "y": y}
}

class Game {
  constructor(canvas, strategy, dt) {
    this.wolf = new Agent(0.0, -1.0, 1.0)
    this.sheep1 = new Agent(0.0, 0.0, 0.5)
    this.sheep2 = new Agent(0.0, 0.0, 0.5)
    this.canvas = canvas
    this.strategy = strategy
    this.dt = dt
    this.done = false
  }

  run() {
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    var distance = 1
    var t1 = 0
    while (distance > 0) {
      var dir = this.strategy.stepSheep(this.wolf, this.sheep1, this.sheep2)

      var old = this.sheep1.position()
      this.sheep1.moveInDir(dir[0].x, dir[0].y, this.dt)
      this.line(ctx, old, this.sheep1, "red")

      old = this.sheep2.position()
      this.sheep2.moveInDir(dir[1].x, dir[1].y, this.dt)
      this.line(ctx, old, this.sheep2, "green")

      dir = this.strategy.stepWolf(this.wolf, this.sheep1, this.sheep2)
      old = this.wolf.position()
      distance = this.moveWolf(dir.x, dir.y, this.dt)
      this.line(ctx, old, this.wolf, "blue")

      //console.log("sheep1: " + JSON.stringify(this.sheep1) + "\nsheep2: " + JSON.stringify(this.sheep2) + "\nwolf: " + JSON.stringify(this.wolf))
      t1 += this.dt
    }
    console.log("sheep1: " + JSON.stringify(this.sheep1.position()) + "\nsheep2: " + JSON.stringify(this.sheep2.position()) + "\ndistance: " + this.sheep1.distanceTo(this.sheep2))
    const t2 = this.sheep1.distanceTo(this.sheep2) / (this.wolf.speed - this.sheep1.speed);
    console.log("it takes " + t1 + " to catch sheep1, total time: " + (t1 + t2));
  }

  line(ctx, old, agent, color) {
    ctx.strokeStyle = color
    ctx.beginPath()
    var c = this.mapCoord(old)
    ctx.moveTo(c.x, c.y)
    c = this.mapCoord(agent)
    ctx.lineTo(c.x, c.y)
    ctx.stroke()
  }

  mapCoord(pos) {
    return coord((pos.x + 1) * 0.5 * this.canvas.width, (1 - pos.y) * 0.5 * canvas.height);
  }

  moveWolf(dx, dy, dt) {
    const sheepList = [this.sheep1, this.sheep2]
    for (var idx in sheepList) {
      const sheep = sheepList[idx]
      if (dx * (sheep.y - this.wolf.y) == dy * (sheep.x - this.wolf.x)) {
        if (this.wolf.distanceTo(sheep) <= this.wolf.speed * dt) {
          this.wolf.x = sheep.x
          this.wolf.y = sheep.y
          return 0
        }
        break
      }
    }

    this.wolf.moveInDir(dx, dy, dt)
    const d1 = this.wolf.distanceTo(this.sheep1)
    const d2 = this.wolf.distanceTo(this.sheep2)
    return Math.min(d1, d2)
  }

}
