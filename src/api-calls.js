export const fetchAllCustomers = fetch("http://localhost:3001/api/v1/customers")
  .then((res) => res.json())
  .then((data) => {
    return data.customers;
  });

export const fetchAllRooms = fetch(`http://localhost:3001/api/v1/rooms`)
  .then((res) => res.json())
  .then((data) => {
    return data.rooms;
  });

export const fetchAllBookings = fetch(`http://localhost:3001/api/v1/bookings`)
  .then((res) => res.json())
  .then((data) => {
    return data.bookings;
  });

// export const fetchSingleCustomer = fetch(
//   `http://localhost:3001/api/v1/customers/${id}`
// )
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });
