
class DefaultStrategy {
  stepSheep(wolf, sheep1, sheep2) {
    if (sheep1.x == 0 && sheep1.y == 0) {
      return [coord(-1, 1), coord(1, 1)]
    }

    const d1 = wolf.distanceTo(sheep1)
    const d2 = wolf.distanceTo(sheep2)
    if (d1 <= d2) {
      return this.stepSheepImpl(wolf, sheep1, sheep2)
    } else {
      return this.swap(this.stepSheepImpl(wolf, sheep2, sheep1))
    }
  }

  swap(dirs) {
    const t = dirs[0]
    dirs[0] = dirs[1]
    dirs[1] = t
    return dirs
  }

  stepSheepImpl(wolf, sheep1, sheep2) {
    // assume distance(wolf, sheep1) <= distance(wolf, sheep2).
    // maximize distance(wolf, sheep1) + distance(sheep1, sheep2).

    const dir1 = this.stepSheepNearWolf(wolf, sheep1, sheep2)
    const dir2 = this.stepSheepFarFromWolf(wolf, sheep1, sheep2)
    return [dir1, dir2]
  }

  stepSheepNearWolf(wolf, sheep1, sheep2) {
    // find X on sheep1->wolf and distance(sheep1, X)=distance(sheep1, sheep2)
    const scale = sheep1.distanceTo(sheep2) / sheep1.distanceTo(wolf)
    const x = sheep1.x + (wolf.x - sheep1.x) * scale
    const y = sheep1.y + (wolf.y - sheep1.y) * scale

    // sheep1 runs away from the median of X and sheep2, while X->sheep1 splits \angle sheep2,sheep1,wolf.
    return coord(sheep1.x - (x + sheep2.x) * 0.5, sheep1.y -(y + sheep2.y) * 0.5)
  }

  stepSheepFarFromWolf(wolf, sheep1, sheep2) {
    // assume distance(wolf, sheep1) <= distance(wolf, sheep2).
    // maximize distance(sheep1, sheep2).
    return coord(sheep2.x - sheep1.x, sheep2.y - sheep1.y)
  }

  stepWolf(wolf, sheep1, sheep2) {
    const d1 = wolf.distanceTo(sheep1)
    const d2 = wolf.distanceTo(sheep2)
    const sheep = (d1 <= d2 ? sheep1 : sheep2)
    return coord(sheep.x - wolf.x, sheep.y - wolf.y)
  }
}
