import chai from "chai";

const expect = chai.expect;
import { bookings } from "./sample-datasets.js/bookings";
import { customers } from "./sample-datasets.js/customers";
import { rooms } from "./sample-datasets.js/rooms";
import {
  getCustomer,
  customerBookingsUpcoming,
  customerBookingsPast,
  customerTotalCost,
  availableRooms,
  filterAvailRooms,
  checkLogin,
  managerAvailableRoomsNum,
  totalRevenueDay,
  totalPercentOccupied,
  viewUserBookings,
  viewUserBookingsDate,
  viewUserBookingSpent,
  getCustomerName,
} from "../src/functions";

describe("See if the tests are running", function () {
  it("should return true", function () {
    expect(true).to.equal(true);
  });
});

describe("get a random user", function () {
  it("should return a user object", function () {
    const result = getCustomer(customers, 1);
    expect(result.id).to.equal(1);
    expect(result.name).to.equal("Leatha Ullrich");
  });
});

describe("return future bookings for a customer", function () {
  it("should return a message if not matches are found", function () {
    const customerObj = { id: 1, name: "Leatha Ullrich" };
    const result = customerBookingsUpcoming(
      customerObj,
      bookings,
      "1992-04-07"
    );
    expect(result).to.equal(`It looks like you have no upcoming bookings!`);
  });
  it("should return an array of future bookings, if matches are found", function () {
    const customerObj = { id: 9, name: "Nicole Rue" };
    const result = customerBookingsUpcoming(customerObj, bookings, "1992-04-7");
    expect(result.length).to.equal(1);
  });
});

describe("return future bookings for a customer", function () {
  it("should return a message if not matches are found", function () {
    const customerObj = { id: 1, name: "Leatha Ullrich" };
    const result = customerBookingsPast(customerObj, bookings, "2080-04-07");
    expect(result).to.equal(`It looks like you haven't made a booking!`);
  });
  it("should return an array of future bookings, if matches are found", function () {
    const customerObj = { id: 9, name: "Nicole Rue" };
    const result = customerBookingsPast(customerObj, bookings, "2080-04-07");
    expect(result.length).to.equal(1);
  });
});

describe("return the total cost a customer has spent", function () {
  it("It should return 0 if the user has not booked anything", function () {
    const customerObj = { id: 1, name: "Leatha Ullrich" };
    const result = customerTotalCost(customerObj, bookings, rooms);
    expect(result).to.equal(0);
  });
  it("should return a total cost", function () {
    const customerObj = { id: 9, name: "Nicole Rue" };
    const result = customerTotalCost(customerObj, bookings, rooms);

    expect(result).to.equal(491.14);
  });
});

describe("Return available rooms based on a date", function () {
  it("should return an array of available rooms that match a given date", function () {
    const result = availableRooms("2022/04/22", rooms, bookings);
    console.log("result", result);
    console.log("rooms", rooms);
    expect(result.length).to.equal(3);
  });
});

describe("Return available rooms based on the room type chosen by the customer", function () {
  it("should return an array of available rooms with the room type specified by the customer", function () {
    const availableRooms = [
      {
        number: 12,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4,
      },
      {
        number: 24,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38,
      },
    ];
    const result = filterAvailRooms(availableRooms, "suite");
    expect(result.length).to.equal(1);
  });
  it("should return an empty array if no rooms match the condition", function () {
    const availableRooms = [
      {
        number: 12,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4,
      },
      {
        number: 24,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38,
      },
    ];
    const result = filterAvailRooms(availableRooms, "single room");
    expect(result).to.equal(
      `Sorry there are no available rooms with your selected room type`
    );
  });
});

describe("Validate Login Credentials", function () {
  it("should return a message if the username and password match the existing record of customers with the correct password", function () {
    const result = checkLogin(customers, "customer1", "overlook2021");
    expect(result).to.equal(`valid customer and valid password`);
  });
  it("should return a message letting the user know the username is valid but the password is incorrect", function () {
    const result = checkLogin(customers, "customer1", "overlook2024");
    expect(result).to.equal(`Valid username, but incorrect password!`);
  });
  it("should return a message letting the user know the username is invalid", function () {
    const result = checkLogin(customers, "customer48", "overlook2021");
    expect(result).to.equal(`Invalid username`);
  });
  it("should return a successful login for the manager if the username and password match the records", function () {
    const result = checkLogin(customers, "manager", "overlook2021");
    expect(result).to.equal(`valid manager login`);
  });
});

describe("Manager: Total Rooms available for selected date", function () {
  it("should return the number of available rooms for a given date", function () {
    const result = managerAvailableRoomsNum("2022/04/22", rooms, bookings);
    expect(result).to.equal(3);
  });
});

describe("Total Revenue for a selected date ", function () {
  it("should return a dollar amount for the total revenue for a given day", function () {
    const result = totalRevenueDay("2022/04/22", rooms, bookings);
    expect(result).to.equal(491.14);
  });
  it("should return 0 if there are no bookings for that date", function () {
    const result = totalRevenueDay("2030/04/22", rooms, bookings);
    expect(result).to.equal(0);
  });
});

describe("Percent Occupied", function () {
  it("should return a percentage of rooms occupied for a day", function () {
    const result = totalPercentOccupied("2022/04/22", bookings, rooms);
    expect(result).to.equal(25);
  });
  it("should return 0 if no rooms were occupied that day", function () {
    const result = totalPercentOccupied("2030/04/22", bookings, rooms);
    expect(result).to.equal(0);
  });
});

describe("View Customer Bookings", function () {
  it("should return an array with the customer's bookings", function () {
    const result = viewUserBookings("Kelvin Schiller", customers, bookings);
    expect(result[0].userID).to.equal(3);
    expect(result[0].roomNumber).to.equal(8);
  });
});

describe("View Customer Bookings - Dates and Room Numbers", function () {
  it("should return an array of Objects with the room Numbers customer's bookings", function () {
    const bookingsArr = [
      {
        id: "5fwrgu4i7k55hl6tl",
        userID: 3,
        date: "2022/01/10",
        roomNumber: 8,
      },
    ];
    const result = viewUserBookingsDate(bookingsArr);
    expect(result).to.deep.equal([{ date: "2022/01/10", roomNumber: 8 }]);
  });
});

describe("View Total Amount the User has Spent", function () {
  it("should return the total dollar amount the specified user has spent", function () {
    const bookingsArr = [
      {
        id: "5fwrgu4i7k55hl6tl",
        userID: 3,
        date: "2022/01/10",
        roomNumber: 8,
      },
    ];
    const result = viewUserBookingSpent(bookingsArr, rooms);
    expect(result).to.equal(261.26);
  });
});

describe("Get Customer Name", function () {
  it("should return the customers name", function () {
    const result = getCustomerName(customers, "customer2");
    expect(result).to.equal(`ROCIO SCHUSTER`);
  });
  it("should return another customers name", function () {
    const result = getCustomerName(customers, "customer1");
    expect(result).to.equal(`LEATHA ULLRICH`);
  });
});
