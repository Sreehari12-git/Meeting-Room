import { useState } from "react"
import { checkAvailability} from "../../api/bookingApi"
import { useNavigate } from "react-router-dom"

function Availability() {
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [rooms, setRooms] = useState<any[]>([])

  const combineDateTime = (date: string, time: string) => {
    return `${date}T${time}:00`
  }

  const navigate = useNavigate();

  const checkAvailabilityHandler = async () => {
    try {
      const combinedStart = combineDateTime(date, startTime)
      const combinedEnd = combineDateTime(date, endTime)
      const data = await checkAvailability(combinedStart, combinedEnd)
      setRooms(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center text-gray-800">Book Room</h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 h-11 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-300" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Start Time</label>
        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 h-11 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-300" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">End Time</label>
        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 h-11 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-300" />
      </div>

      <button onClick={checkAvailabilityHandler}
        className="mt-2 h-11 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition-colors duration-150">
        Check Availability
      </button>

      {rooms.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          <h3 className="text-sm font-semibold text-gray-700">Available Rooms</h3>
          {rooms.map((room: any) => (
            <div key={room.id} className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{room.name}</p>
                {room.capacity && <p className="text-xs text-gray-500">Capacity: {room.capacity}</p>}
              </div>
              <button onClick={() => navigate("/book-room")}
                className="text-xs bg-gray-900 hover:bg-gray-700 text-white font-medium rounded-lg px-3 py-1.5 transition-colors duration-150">
                Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Availability

