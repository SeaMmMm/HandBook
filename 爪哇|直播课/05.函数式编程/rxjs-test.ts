import { filter, flatMap, from, groupBy, map } from 'rxjs'

const origin = from([1, 2, 3, 4])

origin
  .pipe(
    map((i) => i + 1),
    filter((i) => i > 2),
    flatMap((i) => [i * 1, i * 2]),
    groupBy((i) => i % 2)
  )
  .subscribe((i) => {
    console.log(i)
  })
