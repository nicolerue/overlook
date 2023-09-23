//IMPORTS
import "./css/styles.scss";

import {
  fetchAllCustomers,
  fetchAllRooms,
  fetchAllBookings,
  addNewBooking,
  deleteBooking,
} from "./api-calls";
("./api-calls");

import {
  displayLoginPage,
  displayManagerHomePage,
  displayCustomerHomePage,
  displayCustomerBookingsPage,
  displayCustomerBookNewRoomPage,
  displayCustomerAvailableRooms,
  displayCustomerBookings,
  displayManagerStatsPage,
  displayManagerRevenue,
  displayManagerAvailRooms,
  displayManagerAvailRoomCards,
  displayManageCustomerPage,
  displayManagerCustomerStats,
  displayManagerCustomerBookings,
} from "./domUpdates";

import {
  checkLogin,
  getCustomerName,
  availableRooms,
  getCustomerObject,
  customerBookingsAll,
  customerBookingsPast,
  customerBookingsUpcoming,
  customerTotalCost,
  totalPercentOccupied,
  totalRevenueDay,
  managerAvailableRoomsNum,
  checkCustomerValid,
  viewUserBookings,
  viewUserBookingSpent,
  filterAvailRooms,
  retrieveRoomObject,
  retrieveBookingObject,
} from "./functions";

import "./images/hotel.jpg";

//QUERY SELECTORS
const homeBtn = document.querySelector(".home-btn");
const signoutBtn = document.querySelector(".signout-btn");

// GLOBAL VARIABLES
let dataAllCustomers = null;
let dataSingleCustomer = null;
let dataAllRooms = null;
let dataAllBookings = null;
let currentCustomer = {};
let todayDate = getCurrentDate();
let todayPercentage = null;
let managerDate = null;
let currentUser = null;
let customerDate = null;
// PAGE LOAD

Promise.all([fetchAllCustomers, fetchAllRooms, fetchAllBookings]).then(
  ([fetchAllCustomersResult, fetchAllRoomsResult, fetchAllBookingsResult]) => {
    dataAllCustomers = fetchAllCustomersResult;
    dataAllRooms = fetchAllRoomsResult;
    dataAllBookings = fetchAllBookingsResult;
    displayLoginPage();
    removeNavButtons();

    const pageContainer = document.querySelector("body");
    pageContainer.style.backgroundImage = `linear-gradient(
      rgba(249, 249, 249, 0.4),
      rgba(249, 249, 249, 0.4)
    ), url(./images/hotel.jpg)`;
    pageContainer.style.backgroundSize = "cover";
    pageContainer.style.height = "100vh";
    pageContainer.style.overflow = "scroll";
    pageContainer.style.backgroundRepeat = "no-repeat";
  }
);

//EVENT LISTENERS
window.addEventListener("click", login);
window.addEventListener("click", customerViewBookings);
window.addEventListener("click", customerBookNewRoom);
window.addEventListener("click", customerAvailableRooms);
homeBtn.addEventListener("click", navigateHome);
signoutBtn.addEventListener("click", signout);
window.addEventListener("click", customerViewAllBookings);
window.addEventListener("click", customerViewPastBookings);
window.addEventListener("click", customerViewFutureBookings);
window.addEventListener("click", managerViewStats);
window.addEventListener("keypress", managerViewCustomer);
window.addEventListener("click", managerBookRoomForCustomer);
window.addEventListener("change", filterByRoomType);
window.addEventListener("click", customerBookRoom);
window.addEventListener("click", managerDeleteBooking);

//FUNCTIONS

function viewNavButtons() {
  homeBtn.classList.remove("hidden");
  signoutBtn.classList.remove("hidden");
}

function removeNavButtons() {
  homeBtn.classList.add("hidden");
  signoutBtn.classList.add("hidden");
}

function navigateHome() {
  if (currentUser === "customer") {
    displayCustomerHomePage(currentCustomer.name.toUpperCase());
  } else if (currentUser === "manager") {
    displayManagerHomePage();
  }
}

function signout() {
  currentUser = "";
  currentCustomer = {};
  displayLoginPage();
  removeNavButtons();
}
function login(e) {
  const loginMessage = document.querySelector(".login-message");
  const usernameInput = document.querySelector(".input-login-username");
  const passwordInput = document.querySelector(".input-login-password");

  if (e.target.classList.contains("login-btn")) {
    const loginCheck = checkLogin(
      dataAllCustomers,
      usernameInput.value,
      passwordInput.value
    );
    if (loginCheck === `Valid username, but incorrect password!`) {
      loginMessage.innerText = loginCheck;
      usernameInput.value = "";
      passwordInput.value = "";
    } else if (loginCheck === `Invalid username`) {
      loginMessage.innerText = loginCheck;
      usernameInput.value = "";
      passwordInput.value = "";
    } else if (loginCheck === `valid manager login`) {
      currentUser = "manager";
      displayManagerHomePage();
      viewNavButtons();
    } else if (loginCheck === `valid customer and valid password`) {
      currentUser = "customer";
      const customerName = getCustomerName(
        dataAllCustomers,
        usernameInput.value
      );
      displayCustomerHomePage(customerName);
      currentCustomer = getCustomerObject(
        dataAllCustomers,
        usernameInput.value
      );
      viewNavButtons();
    }
  }
}

function customerViewBookings(e) {
  if (e.target.classList.contains("customer-view-bookings")) {
    displayCustomerBookingsPage();
    updateCustomerSpending();
  }
}

function customerBookNewRoom(e) {
  if (e.target.classList.contains("customer-book-room")) {
    console.log(currentCustomer);
    const customerName = currentCustomer.name;
    displayCustomerBookNewRoomPage(customerName);
  }
}

function customerAvailableRooms(e) {
  if (e.target.classList.contains("date-input")) {
    const value = document.querySelector(".date-input");

    value.addEventListener("change", function () {
      const selectedDate = this.value;
      const formattedDate = selectedDate.replaceAll("-", "/");
      customerDate = formattedDate;
      const availableRoomsArr = availableRooms(
        customerDate,
        dataAllRooms,
        dataAllBookings
      );
      if (availableRoomsArr.length === 0) {
        const message = document.querySelector(".customer-booking-message");
        message.innerText = `Sorry, there are no available rooms for your selected dates`;
      } else {
        displayCustomerAvailableRooms(availableRoomsArr);
      }
    });
  }
}

function filterByRoomType(e) {
  if (e.target.id === "room-type") {
    const bookingMessage = document.querySelector(".customer-booking-message");
    const value = e.target.value;
    const availableRoomsArr = availableRooms(
      customerDate,
      dataAllRooms,
      dataAllBookings
    );

    if (value === "view-all") {
      displayCustomerAvailableRooms(availableRoomsArr);
    } else if (value === "suite") {
      let filteredRooms = filterAvailRooms(availableRoomsArr, "suite");
      displayCustomerAvailableRooms(filteredRooms);
    } else if (value === "single-room") {
      let filteredRooms = filterAvailRooms(availableRoomsArr, "single room");
      displayCustomerAvailableRooms(filteredRooms);
    } else if (value === "junior-suite") {
      let filteredRooms = filterAvailRooms(availableRoomsArr, "junior suite");
      displayCustomerAvailableRooms(filteredRooms);
    } else if (value === "residential-suite") {
      let filteredRooms = filterAvailRooms(
        availableRoomsArr,
        "residential suite"
      );

      displayCustomerAvailableRooms(filteredRooms);
    }
  }
}
function customerViewAllBookings(e) {
  if (e.target.classList.contains("customer-all-bookings")) {
    const bookingsMessage = document.querySelector(".bookings-message");

    const allBookingsArr = customerBookingsAll(
      currentCustomer,
      dataAllBookings
    );

    if (allBookingsArr === `It looks like you haven't made a booking!`) {
      bookingsMessage.innerText = allBookingsArr;
    } else {
      displayCustomerBookings(allBookingsArr);
      bookingsMessage.innerText = `ALL ${currentCustomer.name.toUpperCase()}'S BOOKINGS: SORTED CHRONOLOGICALLY, STARTING WITH THE MOST RECENT DATES`;
    }
  }
}

function customerViewPastBookings(e) {
  if (e.target.classList.contains("customer-past-bookings")) {
    const bookingsMessage = document.querySelector(".bookings-message");
    const pastBookingsArr = customerBookingsPast(
      currentCustomer,
      dataAllBookings,
      todayDate
    );

    if (pastBookingsArr === `It looks like you haven't made a booking!`) {
      bookingsMessage.innerText = pastBookingsArr;
    } else {
      displayCustomerBookings(pastBookingsArr);
      bookingsMessage.innerText = `${currentCustomer.name.toUpperCase()}'S PAST BOOKINGS: SORTED CHRONOLOGICALLY, STARTING WITH THE MOST RECENT DATES`;
    }
  }
}

function customerViewFutureBookings(e) {
  if (e.target.classList.contains("customer-upcoming-bookings")) {
    const bookingsMessage = document.querySelector(".bookings-message");
    const upcomingBookingsArr = customerBookingsUpcoming(
      currentCustomer,
      dataAllBookings,
      todayDate
    );

    if (upcomingBookingsArr === `It looks like you haven't made a booking!`) {
      bookingsMessage.innerText = pastBookingsArr;
    } else {
      displayCustomerBookings(upcomingBookingsArr);
      bookingsMessage.innerText = `${currentCustomer.name.toUpperCase()}'S UPCOMING BOOKINGS: SORTED CHRONOLOGICALLY, STARTING WITH THE CLOSEST UPCOMING DATES`;
    }
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

function updateCustomerSpending() {
  const totalSpentContainer = document.querySelector(".customer-total-spent");
  const total = customerTotalCost(
    currentCustomer,
    dataAllBookings,
    dataAllRooms
  );

  totalSpentContainer.innerText = `TOTAL SPENT: $${total}`;
}

function managerViewStats(e) {
  if (e.target.classList.contains("date-input-manager")) {
    const value = document.querySelector(".date-input-manager");
    const viewStatsBtn = document.querySelector(".manager-view-bookings-btn");
    value.addEventListener("change", function () {
      const selectedDate = this.value;
      viewStatsBtn.classList.remove("hidden");
      managerDate = selectedDate.replaceAll("-", "/");
      todayPercentage = totalPercentOccupied(
        managerDate,
        dataAllBookings,
        dataAllRooms
      );
    });
  }

  if (
    e.target.classList.contains("manager-view-bookings-btn") &&
    managerDate !== null
  ) {
    displayManagerStatsPage();
    updateManagerStats();
    updateManagerRevenue();
    updateManagerAvailRooms();
  }
}

function updateManagerStats() {
  const managerHeader = document.querySelector(".header-manager-stats");

  const percentageCircle = document.querySelector(".occupied-percent");

  percentageCircle.innerText = `${todayPercentage}%`;
  managerHeader.innerText = `MANAGER STATS - ${managerDate}`;

  updatePercentage(todayPercentage / 100);
}

function updatePercentage(newPercentage) {
  const circumference = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--circumference"
    )
  );
  const dashLength = newPercentage * circumference;
  const gapLength = (1 - newPercentage) * circumference;
  document.documentElement.style.setProperty("--percent", newPercentage);
  const elapsedPath = document.querySelector(".base-timer__path-elapsed1");
  elapsedPath.style.strokeDasharray = `${dashLength}px ${gapLength}px`;
}

function updateManagerRevenue() {
  const revenue = totalRevenueDay(managerDate, dataAllRooms, dataAllBookings);
  displayManagerRevenue(revenue, managerDate);
}
function updateManagerAvailRooms() {
  const availRooms = managerAvailableRoomsNum(
    managerDate,
    dataAllRooms,
    dataAllBookings
  );
  displayManagerAvailRooms(availRooms, managerDate);
  displayManagerAvailRoomCards(availRooms);
}

function managerViewCustomer(e) {
  if (e.target.classList.contains("search-customer") && e.key === "Enter") {
    const managerSearchMessageContainer = document.querySelector(
      ".manager-customer-search-message"
    );
    const customerName = e.target.value;
    const validCustomer = checkCustomerValid(dataAllCustomers, customerName);
    if (validCustomer) {
      currentCustomer = validCustomer;
      displayManageCustomerPage();
      const customerBookings = viewUserBookings(
        customerName,
        dataAllCustomers,
        dataAllBookings
      );
      const customerSpending = viewUserBookingSpent(
        customerBookings,
        dataAllRooms
      );
      displayManagerCustomerStats(customerName, customerSpending);
      displayManagerCustomerBookings(customerBookings);
    } else {
      managerSearchMessageContainer.innerText = `${customerName} is not found.`;
      setTimeout(() => {
        managerSearchMessageContainer.innerText = "";
      }, 2500);
    }
  }
}

function managerBookRoomForCustomer(e) {
  if (e.target.classList.contains("manager-add-bookings")) {
    displayCustomerBookNewRoomPage(currentCustomer.name);
  }
}

function customerBookRoom(e) {
  if (e.target.classList.contains("book-btn")) {
    const room = retrieveRoomObject(dataAllRooms, e.target.id);
    addNewBooking(room, currentCustomer, customerDate);
    e.target.innerText = `✓ Booked`;
    e.target.style.backgroundColor = "#ce7e00";
    e.target.style.color = "#FFFFFF";

    fetch(`http://localhost:3001/api/v1/bookings`)
      .then((res) => res.json())
      .then((data) => {
        dataAllBookings = data.bookings;
      });
  }
}

function managerDeleteBooking(e) {
  if (e.target.classList.contains("delete-btn")) {
    deleteBooking(e.target.id);
    e.target.innerText = `DELETED`;
    e.target.style.backgroundColor = "#ce7e00";
    e.target.style.color = "#FFFFFF";
  }
}
