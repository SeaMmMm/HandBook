/**
 * 对数组进行快速排序的函数。
 *
 * @param q - 需要排序的数组。
 * @param l - 数组的左边界索引。
 * @param r - 数组的右边界索引。
 *
 * @remarks
 * 快速排序是一种高效的排序算法，采用分治法策略。该函数通过递归调用自身来对数组进行排序。
 *
 * @example
 * ```typescript
 * const arr = [3, 6, 8, 10, 1, 2, 1];
 * quick_sort(arr, 0, arr.length - 1);
 * console.log(arr); // 输出: [1, 1, 2, 3, 6, 8, 10]
 * ```
 */
function quick_sort(q: number[], l: number, r: number) {
  if (l >= r) return

  let i = l - 1,
    j = r + 1,
    x = q[(l + r) >> 1]

  while (i < j) {
    do i++
    while (q[i] < x)
    do j--
    while (q[j] > x)

    if (i < j) [q[i], q[j]] = [q[j], q[i]]
  }

  quick_sort(q, l, j), quick_sort(q, j + 1, r)
}

/**
 * 归并排序算法
 *
 * @param q - 待排序的数组
 * @param l - 数组的左边界
 * @param r - 数组的右边界
 *
 * 该函数使用递归的方式对数组进行排序。首先将数组分成两部分，分别对两部分进行排序，
 * 然后将排序好的两部分合并成一个有序的数组。
 */
function merge_sort(q: number[], l: number, r: number) {
  if (l >= r) return
  const mid = (l + r) >> 1
  merge_sort(q, l, mid), merge_sort(q, mid + 1, r)

  let k = 0,
    i = l,
    j = mid + 1
  const tmp = []

  while (i <= mid && j <= r) {
    if (q[i] <= q[j]) tmp[k++] = q[i++]
    else tmp[k++] = q[j++]
  }
  while (i <= mid) tmp[k++] = q[i++]
  while (j <= r) tmp[k++] = q[j++]

  for (let i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j]
}
