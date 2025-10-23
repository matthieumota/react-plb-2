import { useState } from 'react'

type CounterProps = {
  initialValue?: number
  maxValue?: number
}

function Counter({
  initialValue = 0,
  maxValue = Infinity,
}: CounterProps) {
  const [value, setValue] = useState(initialValue)

  const handleIncrement = (step: number = 1) => {
    setValue(Math.max(value + step, 0))
  }

  return (
    <div className="flex items-center">
      <button
        className="px-2 text-xl font-semibold rounded-md cursor-pointer bg-green-700 hover:bg-green-800 text-white shadow disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handleIncrement(-1)}
        disabled={value <= 0}
      >
        -
      </button>
      <span className="px-2 text-2xl font-bold text-gray-800">
        {value}
      </span>
      {value < maxValue && (
        <button
          className="px-2 text-xl font-semibold rounded-md cursor-pointer bg-green-700 hover:bg-green-800 text-white shadow"
          onClick={() => handleIncrement()}
        >
          +
        </button>
      )}
    </div>
  )
}

export default Counter
