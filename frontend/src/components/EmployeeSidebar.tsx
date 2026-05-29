import { NavLink } from "react-router-dom"

function EmployeeSidebar() {
  return (
    <>
      <NavLink to= "/select">Select Room</NavLink>
      <NavLink to= "/availability">Check availability</NavLink>
      <NavLink to="/bookings">My Bookings</NavLink>
      <button>Logout</button>
    </>
  )
}

export default EmployeeSidebar
