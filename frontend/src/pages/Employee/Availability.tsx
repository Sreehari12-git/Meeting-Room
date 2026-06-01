import { useState } from "react"
import { checkAvailability } from "../../api/bookingApi"

function Availability() {
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [rooms, setRooms] = useState([])

  const availability = async () => {
    try {
      const data = await checkAvailability(startTime, endTime)
      setRooms(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center text-gray-800">Check Availability</h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 h-11 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 h-11 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 h-11 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <button
        onClick={availability}
        className="mt-2 h-11 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition-colors duration-150"
      >
        Check Availability
      </button>
    </div>
  )
}

export default Availability