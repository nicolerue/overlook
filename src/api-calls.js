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

export const addNewBooking = function (roomObj, userObj, selectedDate) {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify({
      userID: userObj.id,
      date: selectedDate,
      roomNumber: roomObj.number,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
};

export const deleteBooking = function (id) {
  fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
};
