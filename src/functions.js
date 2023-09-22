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

export function getCustomerName(customersArr, username) {
  const usernameNum = username.slice(8, 10);
  const validCustomer = customersArr.find((customerEl) => {
    return customerEl.id == parseInt(usernameNum);
  });
  return validCustomer.name.toUpperCase();
}

export function getCustomerObject(customersArr, username) {
  const usernameNum = username.slice(8, 10);
  const validCustomer = customersArr.find((customerEl) => {
    return customerEl.id == parseInt(usernameNum);
  });
  return validCustomer;
}

//CUSTOMER FUNCTIONS

export function getCustomer(customersArray, id) {
  const customer = customersArray.find((customerEl) => {
    return customerEl.id == id;
  });
  return customer;
}

export function customerBookingsAll(customerObj, bookingsArray, date) {
  const filteredBookings = bookingsArray
    .filter((bookingEl) => {
      if (bookingEl.userID === customerObj.id) {
        return bookingEl;
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  if (filteredBookings.length >= 1) {
    return filteredBookings;
  } else {
    return `It looks like you haven't made a booking!`;
  }
}

export function customerBookingsUpcoming(customerObj, bookingsArray, date) {
  const filteredBookings = bookingsArray
    .filter((bookingEl) => {
      if (bookingEl.userID === customerObj.id && bookingEl.date > date) {
        return bookingEl;
      }
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  if (filteredBookings.length >= 1) {
    return filteredBookings;
  } else {
    return `It looks like you have no upcoming bookings!`;
  }
}

export function customerBookingsPast(customerObj, bookingsArray, date) {
  const filteredBookings = bookingsArray
    .filter((bookingEl) => {
      if (bookingEl.userID === customerObj.id && bookingEl.date < date) {
        return bookingEl;
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
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
    return Math.round(acc);
  }, 0);
}

export function availableRooms(date, roomsArr, bookingsArr) {
  const bookedRoomNumbers = bookingsArr
    .filter((bookingEl) => bookingEl.date === date)
    .map((bookingEl) => bookingEl.roomNumber);

  if (bookedRoomNumbers.length === 0) {
    return roomsArr;
  } else {
    return roomsArr.filter(
      (roomEl) => !bookedRoomNumbers.includes(roomEl.number)
    );
  }
}

export function filterAvailRooms(availRoomsArr, roomType) {
  const filteredRooms = availRoomsArr.filter((availRoomsEl) => {
    return availRoomsEl.roomType === roomType;
  });
  if (!filteredRooms) {
    return [];
  }
  return filteredRooms;
}

//MANAGER FUNCTIONS

export function managerAvailableRoomsNum(date, roomsArr, bookingsArr) {
  const bookedRoomNumbers = bookingsArr
    .filter((bookingEl) => bookingEl.date === date)
    .map((bookingEl) => bookingEl.roomNumber);

  if (bookedRoomNumbers.length === 0) {
    return roomsArr;
  } else {
    const availRooms = roomsArr.filter(
      (roomEl) => !bookedRoomNumbers.includes(roomEl.number)
    );
    return availRooms;
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
    return (
      customerEl.name === customerName ||
      customerEl.name.toLowerCase() === customerName ||
      customerEl.name.toUpperCase() === customerName
    );
  }).id;
  const filteredBookings = bookingsArr
    .filter((bookingEl) => {
      return bookingEl.userID === customerID;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
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
    return Math.round(acc);
  }, 0);
}

export function checkCustomerValid(customerArr, customerName) {
  const validCustomer = customerArr.find((customerEl) => {
    return (
      customerEl.name === customerName ||
      customerEl.name.toLowerCase() === customerName ||
      customerEl.name.toUpperCase() === customerName
    );
  });
  if (validCustomer) {
    return validCustomer;
  } else {
    return undefined;
  }
}

export function retrieveRoomObject(roomsArr, id) {
  return roomsArr.find((roomEl) => {
    return roomEl.number === parseInt(id);
  });
}

export function retrieveBookingObject(bookingsArr, date, roomNum) {
  return bookingsArr.find((bookingEl) => {
    return bookingEl.date === date && bookingEl.roomNumber === roomNum;
  });
}
