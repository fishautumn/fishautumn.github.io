function run_static(draw) {
  // wolf at (0, -1), 2 sheep at (0, 0)
  const wolf = new Agent(0.0, -1.0, 1)
  const sheep1 = new Agent(0.0, 0.0, 0.5)
  const sheep2 = new Agent(0.0, 0.0, 0.5)

  // sheep runs at step
  const dt = 0.001

  var old = sheep1.position()
  sheep1.moveInDir(-2, 1, dt)
  draw.line(old, sheep1, "green")
  sheep2.moveInDir(2, 1, dt)
  draw.line(old, sheep2, "blue")

  var t1 = 0
  while (sheep1.x > -1 && wolf.y < sheep1.y) {
    // wolf runs upward
    old = wolf.position()
    wolf.moveInDir(0, 1, dt)
    draw.line(old, wolf, "red")

    t1 += dt

    // let \alpha = 0.5 * \angle {S1 W O}, O=(0, 0)
    // tan \theta = \frac {2 + sin \alpha} { cos \alpha }
    //            = \frac { 2 |S1-W| - x(S1)} {y(S1) - y(W)}
    const dx = 2 * sheep1.distanceTo(wolf) - sheep1.x
    const dy = sheep1.y - wolf.y

    old = sheep1.position()
    sheep1.moveInDir(-dx, dy, dt)
    draw.line(old, sheep1, "green")

    old = sheep2.position()
    sheep2.moveInDir(dx, dy, dt)
    draw.line(old, sheep2, "blue")
  }
  console.log("t1=" + t1)
}
