[TOC]

# 组件拆分

`React`项目组件拆分一般都有三种：

- **无状态组件** 这种组件一般都没有状态，只是简单地呈现内容或数据，一般都是非常小的组件（如`logo组件`等等），并且他们的可重用性非常高
- **有状态组件** 不能被高度重用，重点在于他的功能性强，可以满足一定需求，比如说搜索组件,可以在应用程序中随意使用输入的值.
- **结构组件** 可以吧结构组件看成是程序的 页面 布局 或者是屏幕,它通常是由许多较小的组件组成的,而且一般比较大,可重用性非常低(*一般*)



# 避免不必要的渲染

在 `react` 组件中一些不会改变的值不要写在函数内部,直接放在外面,避免重渲染造成资源浪费,比如:

<img src="./React HandBook.assets/image-20240106下午90946807.png" alt="image-20240106下午90946807" style="zoom:25%;" />

样式对象放在组件外部(可以理解成全局变量),其他类似情况也是这样做



# 注意适当的 props

<img src="./React HandBook.assets/image-20240107下午41620360.png" alt="image-20240107下午41620360" style="zoom:20%;" />



# 清理API请求

这点与 `React`本身无关,是属于`js`的知识

因为在软件中如果一直获取 api 请求而不及时清理,会造成资源浪费,甚至是影响到整个程序的流畅性,一般会使用`AbortController`

<img src="./React HandBook.assets/截屏2024-01-10 下午3.59.34.png" alt="截屏2024-01-10 下午3.59.34" style="zoom:40%;" />

与`fetch`连接起来,在`useEffect`勾子中调用清理函数:

```react
import 'useEffect' from 'React'

const controller = new AbortController();

useEffect(() => {
  // ... 

  return () => {
    controller.abort();
  }
}, [query])
```



# `useState`的总结

<img src="./React HandBook.assets/image-20240110下午103704457.png" alt="image-20240110下午103704457" style="zoom:30%;" />



# 自定义`hook`

<img src="./React HandBook.assets/image-20240110下午105659750.png" alt="image-20240110下午105659750" style="zoom:30%;" />



# `useState` vs. `useReducer`

<img src="./React HandBook.assets/image-20240112下午95401001.png" alt="image-20240112下午95401001" style="zoom:50%;" />



# `useContext`和`useReducer`结合使用实例

```js
import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from 'react'

const BASE_URL = 'http://localhost:9000'

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      }

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      throw new Error('Unknown action type')
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' })

      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        })
      }
    }

    fetchCities()
  }, [])

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return

      dispatch({ type: 'loading' })

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        dispatch({ type: 'city/loaded', payload: data })
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the city...',
        })
      }
    },
    [currentCity.id]
  )

  async function createCity(newCity) {
    dispatch({ type: 'loading' })

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      dispatch({ type: 'city/created', payload: data })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city...',
      })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' })

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })

      dispatch({ type: 'city/deleted', payload: id })
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city...',
      })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)

  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider')

  return context
}

export { CitiesProvider, useCities }

```

> 这段代码是一个使用 React 的 Context API 和 useReducer Hook 来管理城市数据的例子。
>
> 首先，我们创建了一个名为 `CitiesContext` 的上下文，这将允许我们在应用的任何地方访问和操作城市数据。
>
> 然后，我们定义了一个初始状态对象 `initialState`，它包含了我们需要管理的所有状态：城市列表 `cities`、加载状态 `isLoading`、当前选中的城市 `currentCity` 和任何可能出现的错误 `error`。
>
> 接下来，我们定义了一个名为 `reducer` 的函数，它接受当前的状态和一个动作，然后根据动作的类型来更新状态。这个函数包含了多个 case，每个 case 对应一个可能的动作类型。例如，`loading` 动作将 `isLoading` 设置为 `true`，`cities/loaded` 动作将城市列表设置为动作的负载，并将 `isLoading` 设置为 `false`，等等。
>
> 在 `CitiesProvider` 组件中，我们使用 `useReducer` Hook 来管理状态。我们传入了 `reducer` 函数和初始状态，`useReducer` 返回当前的状态和一个 `dispatch` 函数，我们可以用这个函数来发送动作。
>
> 在 `CitiesProvider` 组件的 `useEffect` Hook 中，我们定义了一个名为 `fetchCities` 的异步函数，用于从服务器获取城市列表。这个函数首先发送一个 `loading` 动作，然后尝试获取数据。如果成功，它将发送一个 `cities/loaded` 动作并附带获取到的数据。如果失败，它将发送一个 `rejected` 动作并附带错误信息。
>
> `CitiesProvider` 组件还定义了 `getCity`、`createCity` 和 `deleteCity` 函数，这些函数都是异步的，它们发送 `loading` 动作，然后尝试执行相应的操作（获取、创建或删除城市）。如果操作成功，它们将发送相应的动作并附带结果数据。如果操作失败，它们将发送 `rejected` 动作并附带错误信息。
>
> 最后，`CitiesProvider` 组件返回一个 `CitiesContext.Provider`，它的 `value` 包含了所有的状态和操作函数。这样，我们就可以在任何使用了 `CitiesContext` 的组件中访问和操作城市数据了。
>
> `useCities` 是一个自定义 Hook，它返回 `CitiesContext` 的值。如果这个 Hook 在 `CitiesProvider` 外部被调用，它将抛出一个错误。这是一个常见的模式，用于确保只有在正确的上下文中才能使用上下文的值。



# 路由保护

```jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/')
    },
    [isAuthenticated, navigate]
  )

  return isAuthenticated ? children : null
}

export default ProtectedRoute

```

> 这段代码是一个名为 `ProtectedRoute` 的 React 组件，它的作用是保护某些路由，只有当用户已经认证（即已经登录）时，才能访问这些路由。
>
> 首先，我们导入了 `useEffect` Hook，这是一个 React Hook，允许我们在组件渲染后执行副作用。我们还导入了 `useNavigate` Hook，这是 `react-router-dom` 提供的一个 Hook，允许我们在组件中进行导航。最后，我们导入了 `useAuth` Hook，这是一个自定义 Hook，用于获取认证状态。
>
> 在 `ProtectedRoute` 组件中，我们首先使用 `useAuth` 获取 `isAuthenticated`，这是一个布尔值，表示用户是否已经认证。然后，我们使用 `useNavigate` 获取 `navigate` 函数，这个函数可以用来导航到其他路由。
>
> 接下来，我们使用 `useEffect` 创建了一个副作用。这个副作用的函数会在 `isAuthenticated` 或 `navigate` 改变时执行。在这个函数中，我们检查 `isAuthenticated`，如果它是 `false`，我们就使用 `navigate` 导航到根路由（即登录页面）。
>
> 最后，`ProtectedRoute` 组件返回一个条件渲染。如果 `isAuthenticated` 是 `true`，我们就渲染 `children`，这是传递给 `ProtectedRoute` 的子元素。如果 `isAuthenticated` 是 `false`，我们就返回 `null`，这意味着不渲染任何东西。
>
> 总的来说，`ProtectedRoute` 组件的作用是：如果用户已经认证，就渲染子元素；如果用户未认证，就导航到登录页面，并不渲染任何东西。
