import { useEffect, useState } from "react"
import { createRoom, deleteRoom, getRooms, updateRoom } from "../../api/roomApi"

const AMENITY_OPTIONS = ["Projector", "Whiteboard", "TV Screen", "Video Conferencing", "Sound System", "Air Conditioning", "Microphone"]

function AddRoom() {
  const [name, setName] = useState("")
  const [status, setStatus] = useState("AVAILABLE")
  const [capacity, setCapacity] = useState(0)
  const [amenities, setAmenities] = useState<string[]>([])
  const[rooms,setRooms] = useState<any[]>([]);
  const[selectedRoom,setSelectedRoom] = useState<any>(null); 
  const [editName, setEditName] = useState("")
  const [editCapacity, setEditCapacity] = useState(0)
  const [editStatus, setEditStatus] = useState("")
  const [editAmenities, setEditAmenities] = useState<string[]>([])
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

  const fetchRooms = async() => {
      try {
        const response = await getRooms();
        setRooms(response.data);
      }
      catch(error) {
        console.log(error);
      }
    }

  useEffect(() => {
    fetchRooms();
  },[])

  const delRoom = async(name:string) => {
    try {
      await deleteRoom(name);
      fetchRooms();
    }
    catch(error) {
      console.log(error);
    }
  }

  const updRoom = async(name:string, data: any) => {
    try {
      await updateRoom(name,data);
      fetchRooms();
      setSelectedRoom(null);
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
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

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">All Rooms</h2>
          <div className="space-y-3">
            {rooms.map((room:any) => (
              <div key={room.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-800">{room.name}</p>
                  {room.capacity ? <p className="text-xs text-gray-500">Capacity: {room.capacity}</p> : null}
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                    room.status === "AVAILABLE" ? "bg-green-100 text-green-700" :
                    room.status === "OCCUPIED" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>{room.status}</span>
                  {room.Amenities?.length > 0 && (
                    <p className="text-xs text-gray-400">{room.Amenities?.join(", ")}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => delRoom(room.name)} className="text-xs text-red-600 border border-red-200 rounded px-3 py-1 hover:bg-red-50">Delete</button>
                  <button onClick={() => {setSelectedRoom(room); setEditName(room.name); setEditCapacity(room.capacity); setEditStatus(room.status); setEditAmenities(room.Amenities)}} className="text-xs text-blue-600 border border-blue-200 rounded px-3 py-1 hover:bg-blue-50">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Edit Room</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input type="number" value={editCapacity} onChange={e => setEditCapacity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="AVAILABLE">Available</option>
                  <option value="MAINTANENCE">Maintenance</option>
                  <option value="OCCUPIED">Occupied</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map(amenity => (
                    <button key={amenity} type="button"
                      onClick={() => setEditAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity])}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        editAmenities.includes(amenity) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                      }`}>
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSelectedRoom(null)}
                className="flex-1 border border-gray-300 text-gray-600 text-sm font-medium rounded px-4 py-2 hover:bg-gray-50">Cancel</button>
              <button onClick={() => updRoom(selectedRoom.name, { name: editName, capacity: editCapacity, status: editStatus, amenities: editAmenities })}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded px-4 py-2">Update Room</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddRoom