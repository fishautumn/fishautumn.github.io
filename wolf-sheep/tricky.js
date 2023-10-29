
class TrickyStrategy extends DefaultStrategy {

  constructor(dt) {
    super()
    this.final = {"x":-0.7203945444940342,"y":0.512766763598258}
    this.dt = dt
  }

  stepSheepImpl(wolf, sheep1, sheep2) {
    const dir1 = this.stepSheepNearWolf(wolf, sheep1, sheep2)
    var ns = new Agent(sheep1.x, sheep1.y, sheep1.speed)
    ns.moveInDir(dir1.x, dir1.y, this.dt)
    const d1 = wolf.distanceTo(ns)

    // keep distance(sheep2, wolf) >= d1, maximize distance(final, sheep2)
    ns = new Agent(sheep2.x, sheep2.y, sheep2.speed)
    var dir2 = coord(sheep2.x - this.final.x, sheep2.y - this.final.y)
    if (d1 <= ns.distanceTo(wolf)) {
      return [dir1, dir2]
    }
    const step = sheep2.speed * this.dt
    const d2 = sheep2.distanceTo(wolf)
    const costheta = (step * step + d2 * d2 - d1 * d1) * 0.5 / (step * d2)
    const sintheta = Math.sqrt(1 - costheta * costheta)
    var s2w = coord(wolf.x - sheep2.x, wolf.y - sheep2.y)
    const dir21 = coord(s2w.x * costheta + s2w.y * sintheta, s2w.y * costheta - s2w.x * sintheta)
    const dir22 = coord(s2w.x * costheta - s2w.y * sintheta, s2w.y * costheta + s2w.x * sintheta)
    ns = new Agent(sheep2.x, sheep2.y, sheep2.speed)
    ns.moveInDir(dir21.x, dir21.y, this.dt)
    const d21 = sheep1.distanceTo(ns)
    ns = new Agent(sheep2.x, sheep2.y, sheep2.speed)
    ns.moveInDir(dir22.x, dir22.y, this.dt)
    const d22 = sheep1.distanceTo(ns)
    if (d21 <= d22) {
      dir2 = dir22
    } else {
      dir2 = dir21
    }
    return [dir1, dir2]
  }
}
