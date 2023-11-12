考虑 A, B 两羊与狼 W 等距情况下, 羊的策略.

目标: 最大化 $min(||WA||, ||WB||)+||AB||$.

如果两羊采取相同策略, 即选择关于 y 轴对称的方向, 则有 $min(||WA||, ||WB||)=||WA||=||WB||$.
假定 WB 与 y 轴夹角为 $\alpha$, B 选择方向与 y 轴夹角为 $\beta$, A, B 两羊前进距离为 $a \ll ||WB||$,
则有 $||A'B'||=||AB||+2 a sin\beta$, $||WB'||\approx||WB||+a cos(\beta - \alpha)$.
目标等价 最大化 $2 a sin\beta + a cos(\beta - \alpha) \sim 2 sin\beta + cos(\beta - \alpha)$

求导
$
\begin{equation}
\frac {d(2 sin\beta + cos(\beta - \alpha))} {d\beta} \\
=2 cos\beta - sin(\beta - \alpha)
\end{equation}
$

倒数为0时取极值
$
\begin{equation}
2 cos\beta - sin(\beta - \alpha) = 0 \\
=> 2 cos\beta = sin(\beta - \alpha) \\
=> 2 cos\beta = sin\beta cost\alpha - cos\beta sin\alpha \\
=> 2 = tan\beta cos\alpha - sin\alpha \\
=> tan\beta = \frac{2+sin\alpha}{cos\alpha}
\end{equation}
$

