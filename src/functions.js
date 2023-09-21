//LOGIN FUNCTION//

export function checkLogin(customersArr, username, password) {
  if (username == "manager" && password == "overlook2021") {
    return `valid manager login`;
  } else {
    const usernameNum = username.slice(8, 10);
    const validCustomer = customersArr.find((customerEl) => {
      return customerEl.id == parseInt(usernameNum);
    });
    if (validCustomer && password === "overlook2021") {
      return `valid customer and valid password`;
    } else if (validCustomer && password !== "overlook2021") {
      return `Valid username, but incorrect password!`;
    } else if (!validCustomer) {
      return `Invalid username`;
    }
  }
}

//CUSTOMER FUNCTIONS

export function getCustomer(customersArray, id) {
  const customer = customersArray.find((customerEl) => {
    return customerEl.id == id;
  });
  return customer;
}

export function customerBookingsUpcoming(customerObj, bookingsArray, date) {
  const filteredBookings = bookingsArray.filter((bookingEl) => {
    if (bookingEl.userID === customerObj.id && bookingEl.date > date) {
      return bookingEl;
    }
  });
  if (filteredBookings.length >= 1) {
    return filteredBookings;
  } else {
    return `It looks like you have no upcoming bookings!`;
  }
}

export function customerBookingsPast(customerObj, bookingsArray, date) {
  const filteredBookings = bookingsArray.filter((bookingEl) => {
    if (bookingEl.userID === customerObj.id && bookingEl.date < date) {
      return bookingEl;
    }
  });
  if (filteredBookings.length >= 1) {
    return filteredBookings;
  } else {
    return `It looks like you haven't made a booking!`;
  }
}

export function customerTotalCost(customerObj, bookingsArr, roomsArr) {
  return bookingsArr.reduce((acc, curr) => {
    if (curr.userID == customerObj.id) {
      const roomMatch = roomsArr.find((roomEl) => {
        return roomEl.number == curr.roomNumber;
      });
      if (roomMatch) {
        acc += roomMatch.costPerNight;
      }
    }
    return acc;
  }, 0);
}

export function availableRooms(date, roomsArr, bookingsArr) {
  const availRoomNums = bookingsArr
    .filter((bookingEl) => {
      return bookingEl.date !== date;
    })
    .map((roomNumObjEl) => {
      return roomNumObjEl.roomNumber;
    });
  if (availRoomNums) {
    return roomsArr.filter((roomEl) => {
      const roomMatch = availRoomNums.find((roomNumEl) => {
        return roomNumEl == roomEl.number;
      });
      return roomMatch;
    });
  } else {
    return `Sorry, there are no available rooms for your selected dates`;
  }
}

export function filterAvailRooms(availRoomsArr, roomType) {
  const filteredRooms = availRoomsArr.filter((availRoomsEl) => {
    return availRoomsEl.roomType === roomType;
  });
  if (filteredRooms.length === 0) {
    return `Sorry there are no available rooms with your selected room type`;
  }
  return filteredRooms;
}

//MANAGER FUNCTIONS

export function managerAvailableRoomsNum(date, roomsArr, bookingsArr) {
  const availRoomNums = bookingsArr
    .filter((bookingEl) => {
      return bookingEl.date !== date;
    })
    .map((roomNumObjEl) => {
      return roomNumObjEl.roomNumber;
    });
  if (availRoomNums) {
    const availRoomsArr = roomsArr.filter((roomEl) => {
      const roomMatch = availRoomNums.find((roomNumEl) => {
        return roomNumEl == roomEl.number;
      });
      return roomMatch;
    });
    return availRoomsArr.length;
  } else {
    return 0;
  }
}

export function totalRevenueDay(date, roomsArr, bookingsArr) {
  const bookedRooms = bookingsArr
    .filter((bookingEl) => {
      return bookingEl.date === date;
    })
    .map((roomNumObjEl) => {
      return roomNumObjEl.roomNumber;
    });
  if (bookedRooms) {
    return bookedRooms.reduce((acc, curr) => {
      const roomMatch = roomsArr.find((roomEl) => {
        return roomEl.number === curr;
      });
      if (roomMatch) {
        acc += roomMatch.costPerNight;
      }
      return acc;
    }, 0);
  }
}

export function totalPercentOccupied(date, bookingsArr, roomsArr) {
  const bookedRooms = bookingsArr
    .filter((bookingEl) => {
      return bookingEl.date === date;
    })
    .map((roomNumObjEl) => {
      return roomNumObjEl.roomNumber;
    });
  if (bookedRooms) {
    return Math.round((bookedRooms.length / roomsArr.length) * 100);
  } else {
    return 0;
  }
}

export function viewUserBookings(customerName, customersArr, bookingsArr) {
  const customerID = customersArr.find((customerEl) => {
    return customerEl.name === customerName;
  }).id;
  const filteredBookings = bookingsArr.filter((bookingEl) => {
    return bookingEl.userID === customerID;
  });
  return filteredBookings;
}

export function viewUserBookingsDate(customerBookingsArr) {
  let bookingsArr = [];
  customerBookingsArr.forEach((bookingEl) => {
    bookingsArr.push({
      date: `${bookingEl.date}`,
      roomNumber: parseInt(bookingEl.roomNumber),
    });
  });
  return bookingsArr;
}

export function viewUserBookingSpent(customerBookingsArr, roomsArr) {
  return customerBookingsArr.reduce((acc, curr) => {
    const roomMatch = roomsArr.find((roomEl) => {
      return curr.roomNumber == roomEl.number;
    });

    if (roomMatch) {
      acc += roomMatch.costPerNight;
    }
    return acc;
  }, 0);
}
