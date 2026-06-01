import { useState } from "react"
import { createRoom } from "../../api/roomApi"

const AMENITY_OPTIONS = ["Projector", "Whiteboard", "TV Screen", "Video Conferencing", "Sound System", "Air Conditioning", "Microphone"]

function AddRoom() {
  const [name, setName] = useState("")
  const [status, setStatus] = useState("AVAILABLE")
  const [capacity, setCapacity] = useState(0)
  const [amenities, setAmenities] = useState<string[]>([])
  const[message,setMessage] = useState("");
  const[isError,setError] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  const addRoom = async () => {
    try {
      await createRoom(name, status, capacity, amenities)
      setMessage("Room added successfully!")
      setError(false);
      setName("");
      setStatus("");
      setCapacity(0);
      setAmenities([]);
      setTimeout(() => setMessage(""),3000);
    } catch (error) {
      console.log(error)
      setMessage("Failed to add room.")
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">Add Meeting Room</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Boardroom A"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              type="number"
              value={capacity}
              min={0}
              onChange={e => setCapacity(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="AVAILABLE">Available</option>
              <option value="MAINTANENCE">Maintenance</option>
              <option value="OCCUPIED">Occupied</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map(amenity => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    amenities.includes(amenity)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={addRoom}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded px-4 py-2"
        >
          Add Room
        </button>
        {message && <p className={`${isError? "text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mt-4" : "text-sm text-green-600 bg-green-50 border border-green-200 rounded px-3 py-2 mt-4 "}`}>{message}</p>}
      </div>
    </div>
  )
}

export default AddRoom