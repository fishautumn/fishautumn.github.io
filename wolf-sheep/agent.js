class Agent {
  constructor(x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
  }

  position() {
    return {x:this.x, y: this.y}
  }

  distanceTo(that) {
    const dx = this.x - that.x
    const dy = this.y - that.y

    return Math.hypot(dx, dy)
  }

  moveInDir(dx, dy, dt) {
    const len = Math.hypot(dx, dy)
    const scale = this.speed * dt / len

    this.x += dx * scale
    this.y += dy * scale
  }
}