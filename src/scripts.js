//IMPORTS
import "./css/styles.scss";

import flatpickr from "flatpickr";

import {
  fetchAllCustomers,
  fetchAllRooms,
  fetchAllBookings,
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
} from "./domUpdates";

import {
  checkLogin,
  getCustomerName,
  availableRooms,
  getCustomerObject,
  customerBookingsAll,
  customerBookingsPast,
  customerBookingsUpcoming,
} from "./functions";

import "./images/turing-logo.png";

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
// PAGE LOAD

Promise.all([fetchAllCustomers, fetchAllRooms, fetchAllBookings]).then(
  ([fetchAllCustomersResult, fetchAllRoomsResult, fetchAllBookingsResult]) => {
    dataAllCustomers = fetchAllCustomersResult;
    dataAllRooms = fetchAllRoomsResult;
    dataAllBookings = fetchAllBookingsResult;

    console.log(dataAllCustomers);
    console.log(dataAllRooms);
    console.log(dataAllBookings);

    displayLoginPage();
    removeNavButtons();
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
  const header = document.querySelector(".header");
  if (
    header.innerText.includes("BOOKINGS") ||
    header.innerText.includes("BOOK")
  ) {
    displayCustomerHomePage(currentCustomer.name.toUpperCase());
  }
}

function signout() {
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
      displayManagerHomePage();
      viewNavButtons();
    } else if (loginCheck === `valid customer and valid password`) {
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
  }
}

function customerBookNewRoom(e) {
  if (e.target.classList.contains("customer-book-room")) {
    displayCustomerBookNewRoomPage();
  }
}

function customerAvailableRooms(e) {
  if (e.target.classList.contains("date-input")) {
    const value = document.querySelector(".date-input");

    value.addEventListener("change", function () {
      const selectedDate = this.value;
      const formattedDate = selectedDate.replaceAll("-", "/");
      const availableRoomsArr = availableRooms(
        formattedDate,
        dataAllRooms,
        dataAllBookings
      );
      displayCustomerAvailableRooms(availableRoomsArr);
    });
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

// if (availableRoomsArr.length === 0) {
//   const message = document.querySelector(".customer-booking-message");
//   message.innerText = `Sorry, there are no available rooms for your selected dates`;
// }
