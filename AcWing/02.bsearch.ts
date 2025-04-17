function check(x: any): boolean {
  // e.x.
  return false
}

// [l, r] => [l, mid] and [mid + 1, r] 找到最左边的
/**
 * 二分查找函数，用于在[l, r)区间内查找满足条件的最小值。
 *
 * @param l - 区间的左边界（包含）。
 * @param r - 区间的右边界（不包含）。
 * @returns 返回满足条件的最小值。
 */
function bsearch_l(l: number, r: number) {
  while (l < r) {
    const mid = (l + r) >> 1
    if (check(mid)) r = mid
    else l = mid + 1
  }

  return l
}
// [l, r] => [l, mid - 1] and [mid, r] 找到最右边的
/**
 * 二分查找函数，返回满足条件的最大值。
 *
 * @param l - 搜索范围的左边界。
 * @param r - 搜索范围的右边界。
 * @returns 满足条件的最大值。
 *
 * @remarks
 * 该函数使用二分查找算法，在[l, r]范围内查找满足`check`函数条件的最大值。
 * `check`函数需要在外部定义，用于判断某个值是否满足条件。
 */
function bsearch_r(l: number, r: number) {
  while (l < r) {
    const mid = (l + r + 1) >> 1
    if (check(mid)) l = mid
    else r = mid - 1
  }

  return l
}

// 如果在数组q中的区间上没有满足条件的，会返回最接近目标值(target)的下标x，且 q[x] < target

// 浮点数二分
/**
 * 二分查找函数，用于在给定区间 [l, r] 内查找满足条件的值。
 *
 * @param l - 区间的左端点
 * @param r - 区间的右端点
 * @returns 满足条件的值，精度为 1e-6
 *
 * @remarks
 * 该函数使用二分查找算法，在区间 [l, r] 内查找满足 `check` 函数条件的值。
 * `eps` 表示精度，取决于题目对精度的要求。
 *
 * @example
 * ```typescript
 * function check(x: number): boolean {
 *   // 检查条件的实现
 *   return x * x >= 2;
 * }
 *
 * const result = bserach_f(0, 2);
 * console.log(result); // 输出接近 sqrt(2) 的值
 * ```
 */
function bserach_f(l: number, r: number) {
  const eps = 1e-6 // eps 表示精度，取决于题目对精度的要求
  while (r - l > eps) {
    const mid = (l + r) / 2
    if (check(mid)) r = mid
    else l = mid
  }

  return l
}
