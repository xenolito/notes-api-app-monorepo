// ! Example compoenent for creating "custom hooks"
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue)

  const increase = () => setCounter(counter + 1)
  const decrease = () => setCounter(counter - 1)
  const reset = () => setCounter(0)

  return {
    counter,
    increase,
    decrease,
    reset

  }
}

const Users = () => {
  // const { counter, increase, decrease, reset } = useCounter()

  const counterLeft = useCounter()
  const counterRight = useCounter(34)

  return (
    <>
      <div style={{
        padding: '2rem'
      }}
      >
        <div>{counterLeft.counter}</div>
        <button onClick={counterLeft.increase}>+</button>
        <button onClick={counterLeft.decrease}>-</button>
        <button onClick={counterLeft.reset}>reset</button>
      </div>
      <div style={{
        padding: '2rem'
      }}
      >
        <div>{counterRight.counter}</div>
        <button onClick={counterRight.increase}>+</button>
        <button onClick={counterRight.decrease}>-</button>
        <button onClick={counterRight.reset}>reset</button>
      </div>
      <Outlet />
    </>
  )
}
export default Users
