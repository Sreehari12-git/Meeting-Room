import { useEffect, useState } from "react"
import { getRooms } from "../../api/roomApi";
import { bookRoom } from "../../api/bookingApi";

function BookRoom() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      setError("Failed to load rooms. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (room: any) => {
    setSelectedRoom(room);
    setBookingError("");
    setBookingSuccess(false);
    setStartTime("");
    setEndTime("");
  };

  const handleBooking = async () => {
    if (!startTime || !endTime) {
      setBookingError("Please select both start and end time.");
      return;
    }
    if (new Date(endTime) <= new Date(startTime)) {
      setBookingError("End time must be after start time.");
      return;
    }

    setBookingLoading(true);
    setBookingError("");

    try {
      await bookRoom(selectedRoom.id, startTime, endTime);
      setBookingSuccess(true);
      setTimeout(() => {
        setSelectedRoom(null);
        setBookingSuccess(false);
      }, 2000);
    } catch (error: any) {
      const message = error.response?.data?.message || "This slot is already booked. Please choose a different time.";
      setBookingError(message);
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-800">Meeting Rooms</h1>
        <p className="text-sm text-gray-500 mt-1">Select a room to make a booking</p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm py-10 justify-center">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          Loading rooms...
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          <span>{error}</span>
          <button onClick={fetchRooms} className="text-red-600 underline hover:text-red-800 ml-4">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && rooms.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-3xl mb-3">🚪</p>
          <p className="text-sm">No rooms available at the moment.</p>
        </div>
      )}

      {!loading && !error && rooms.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">Room Name</th>
                <th className="px-6 py-3">Capacity</th>
                <th className="px-6 py-3">Amenities</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rooms.map((room) => (
                <tr key={room.id} className={`transition-colors ${room.status === "AVAILABLE" ? "hover:bg-gray-50" : "opacity-50"}`}>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {room.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {room.capacity ? `${room.capacity} people` : "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {room.Amenities && room.Amenities.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {room.Amenities.map((amenity: string, index: number) => (
                          <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    ) : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openModal(room)}
                      disabled={room.status !== "AVAILABLE"}
                      className="px-4 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRoom && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="mb-5 border-b border-gray-100 pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Book a Room</h2>
              <p className="text-sm text-gray-500 mt-0.5">{selectedRoom.name}</p>
            </div>

            <div className="flex gap-4 mb-5 text-xs text-gray-500">
              <span>👥 {selectedRoom.capacity} people</span>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Date & Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Date & End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                min={startTime || new Date().toISOString().slice(0, 16)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {bookingError && (
              <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
                ⚠️ {bookingError}
              </div>
            )}

            {bookingSuccess && (
              <div className="mb-4 px-3 py-2 bg-green-50 border border-green-200 text-green-600 text-xs rounded-lg">
                ✅ Room booked successfully! Closing...
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedRoom(null)}
                className="flex-1 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={bookingLoading || bookingSuccess}
                className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default BookRoom;
