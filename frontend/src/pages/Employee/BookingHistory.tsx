import { useEffect, useState } from "react";
import { cancelBooking, getBookingHistory } from "../../api/bookingApi";

function BookingHistory() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cancellingId,setCancellingId] = useState<number | null>(null);
  const[cancelError,setCancelError] = useState("");

  const fetchBookingHistory = async () => {
    setLoading(true);
    try {
      const response = await getBookingHistory();
      setBookings(response);
    } catch (error) {
      setError("Failed to load booking history.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const handleCancel = async(bookingId: number) => {
    setCancellingId(bookingId);
    try{
      await cancelBooking(bookingId);
      setBookings(prev =>prev.map(booking => booking.id === bookingId ? { ...booking, status: "CANCELED" }: booking));
    }
    catch(error) {
      setCancelError("Faield to cancel booking")
    }
    finally {
      setCancellingId(null)
    }
  }

  const statusStyle: Record<string, string> = {
    UPCOMING: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELED: "bg-red-100 text-red-600",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-800">Booking History</h1>
        <p className="text-sm text-gray-500 mt-1">Your past and upcoming room bookings</p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm py-10 justify-center">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          Loading booking history...
        </div>
      )}

      {error && !loading && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          <span>{error}</span>
          <button
            onClick={fetchBookingHistory}
            className="text-red-600 underline hover:text-red-800 ml-4"
          >
            Retry
          </button>
        </div>
      )}

      {cancelError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {cancelError}
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-3xl mb-3">📋</p>
          <p className="text-sm">No booking history found.</p>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">Room Name</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Start Time</th>
                <th className="px-6 py-3">End Time</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {booking.room?.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(booking.startTime).toLocaleDateString([], { weekday: "long", day: "numeric", month: "short" })}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(booking.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[booking.status] || "bg-gray-100 text-gray-600"}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                      {booking.status === "UPCOMING" ? (
                        <button onClick={() => handleCancel(booking.id)} disabled={cancellingId === booking.id} className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                          {cancellingId === booking.id ? "Cancelling..." : "Cancel"}
                        </button>
                      ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default BookingHistory;