
function coord(x, y) {
  return {"x": x, "y": y}
}

class Agent {
  constructor(x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
  }

  position() {
    return coord(this.x, this.y)
  }

  distanceTo(that) {
    const dx = this.x - that.x
    const dy = this.y - that.y

    return Math.hypot(dx, dy)
  }

  moveInDir(dx, dy, dt) {
    const len = Math.hypot(dx, dy)

    this.x += this.speed * dt * dx / len
    this.y += this.speed * dt * dy / len
  }
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
      var dir = this.strategy.stepSheep1(this.wolf, this.sheep1, this.sheep2)
      var old = this.sheep1.position()
      this.sheep1.moveInDir(dir.x, dir.y, this.dt)
      this.line(ctx, old, this.sheep1, "red")

      dir = this.strategy.stepSheep2(this.wolf, this.sheep1, this.sheep2)
      old = this.sheep2.position()
      this.sheep2.moveInDir(dir.x, dir.y, this.dt)
      this.line(ctx, old, this.sheep2, "green")

      dir = this.strategy.stepWolf(this.wolf, this.sheep1, this.sheep2)
      old = this.wolf.position()
      distance = this.moveWolf(dir.x, dir.y, this.dt)
      this.line(ctx, old, this.wolf, "blue")

      //console.log("sheep1: " + JSON.stringify(this.sheep1) + "\nsheep2: " + JSON.stringify(this.sheep2) + "\nwolf: " + JSON.stringify(this.wolf))
      t1 += this.dt
    }
    const t2 = this.sheep1.distanceTo(this.sheep2) / (this.wolf.speed - this.sheep1.speed);
    console.log("it takes " + t1 + " to catch sheep-1 at " + JSON.stringify(this.sheep1.position()) + ", total time: " + (t1 + t2));
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
    for (var idx in [this.sheep1, this.sheep2]) {
      const sheep = [this.sheep1, this.sheep2][idx]
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

class DefaultStrategy {
  stepSheep1(wolf, sheep1, sheep2) {
    if (sheep1.x == 0 && sheep1.y == 0) {
      return coord(-1, 1)
    }

    const d1 = wolf.distanceTo(sheep1)
    const d2 = wolf.distanceTo(sheep2)
    if (d1 <= d2) {
      return this.stepSheepNearToWolf(wolf, sheep1, sheep2)
    } else {
      return this.stepSheepFarToWolf(wolf, sheep1, sheep2)
    }
  }

  stepSheepNearToWolf(wolf, sheep1, sheep2) {
    // assume distance(wolf, sheep1) <= distance(wolf, sheep2).
    // maximize distance(wolf, sheep1) + distance(sheep1, sheep2).

    // find X on sheep1->wolf and distance(sheep1, X)=distance(sheep1, sheep2)
    const dw = sheep1.distanceTo(wolf)
    const ds = sheep1.distanceTo(sheep2)
    const x = sheep1.x + ds * (wolf.x - sheep1.x) / dw
    const y = sheep1.y + ds * (wolf.y - sheep1.y) / dw

    // sheep1 runs away from the median of X and sheep2
    return coord(sheep1.x - (x + sheep2.x) / 2, sheep1.y -(y + sheep2.y) / 2)
  }

  stepSheepFarToWolf(wolf, sheep1, sheep2) {
    // assume distance(wolf, sheep1) >= distance(wolf, sheep2).
    // maximize distance(sheep1, sheep2).
    return coord(sheep1.x - sheep2.x, sheep1.y - sheep2.y)
  }

  stepSheep2(wolf, sheep1, sheep2) {
    if (sheep2.x == 0 && sheep2.y == 0) {
      return coord(1, 1)
    }

    return this.stepSheep1(wolf, sheep2, sheep1)
  }

  stepWolf(wolf, sheep1, sheep2) {
    const d1 = wolf.distanceTo(sheep1)
    const d2 = wolf.distanceTo(sheep2)
    const sheep = (d1 <= d2 ? sheep1 : sheep2)
    return coord(sheep.x - wolf.x, sheep.y - wolf.y)
  }
}

class TrickyStrategy extends DefaultStrategy {

  constructor() {
    super()
    this.final = coord(-0.6860422831078866, 0.5534774904237494)
  }

  stepSheepFarToWolf(wolf, sheep1, sheep2) {
    return coord(sheep1.x - this.final.x, sheep1.y - this.final.y)
  }
}