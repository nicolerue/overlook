export const fetchAllCustomers = fetch("http://localhost:3001/api/v1/customers")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    return data.customers;
  })
  .catch((error) => {
    console.log("Error fetching customers", error);
    throw error;
  });

export const fetchAllRooms = fetch(`http://localhost:3001/api/v1/rooms`)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    return data.rooms;
  })
  .catch((error) => {
    console.log("Error fetching customers", error);
    throw error;
  });

export const fetchAllBookings = fetch(`http://localhost:3001/api/v1/bookings`)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    return data.bookings;
  })
  .catch((error) => {
    console.log("Error fetching customers", error);
    throw error;
  });

export const addNewBooking = function (roomObj, userObj, selectedDate) {
  return fetch("http://localhost:3001/api/v1/bookings", {
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
    .then((data) => {
      console.log("Response from POST request:", data);

      return fetch(`http://localhost:3001/api/v1/bookings`)
        .then((res) => res.json())
        .then((updatedData) => {
          console.log("Updated data after adding a new booking:", updatedData);
          return updatedData;
        });
    })
    .catch((err) => {
      console.error("Error adding a new booking:", err);
      throw err;
    });
};

export const deleteBooking = function (id) {
  fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => console.log("Response from DELETE request:", json))
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
