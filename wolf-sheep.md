# The Problem

In a two-dimensional plane, all living beings are considered as points.
Two sheep are at the same point, which is 1 unit away from the wolf.
The wolf's speed is 1, and the sheep's speed is 0.5.
All creatures move simultaneously and continuously with instantaneous reactions.
When the distance between the sheep and the wolf is 0, the sheep will be eaten.
The wolf wants to minimize the time it takes to eat both sheep, while the sheep want to maximize this time.
How should they move? And how much time does the wolf need to eat both sheep?

Translated from https://mp.weixin.qq.com/s/qysNm-VDBbPCL6l3WdtnKA

# Wolf Strategy

The wolf wants to catch the two sheep with minimum time cost.
It runs toward the nearest sheep.
After catching the first, It runs to the other sheep.

# Sheep Strategy: Greedy

Let sheep A be closer to the wolf W than sheep B.

sheep A runs in the direction that maximizes $||WA||+||AB||$.
The direction splits $\angle WAB$ evenly.

sheep B runs away from sheep A.

Result from page [racing.html](./wolf-sheep/racing.html) greedy strategy:
![greedy.png](./wolf-sheep/greedy.png)

total time: 5.003527201219288.

source code: [wolf-sheep.js](./wolf-sheep/greedy.js)

# Sheep Strategy: Tricky

If we know location F where sheep A is caught, then sheep B should run away from F,
while keeping $||WB||\ge||WA||$.

Result from page [racing.html](./wolf-sheep/racing.html) tricky strategy:
![tricky.png](./wolf-sheep/tricky.png)

total time: 5.024353154190957.

source code: [wolf-sheep.js](./wolf-sheep/tricky.js)