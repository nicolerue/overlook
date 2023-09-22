export function displayLoginPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header header-signin">OVERLOOK HOTEL</h1>
      <section class="section-container">
        <form class="home-login">
          <div class="text-input-container">
            <label for="username">USERNAME:</label><br />
            <input
              class="input-login input-login-username"
              type="text"
              id="username"
              name="username"
              placeholder="username** or manager"
              required
            /><br />
          </div>
          <div class="text-input-container">
            <label for="password">PASSWORD:</label><br />
            <input
              class="input-login input-login-password"
              type="text"
              id="password"
              placeholder = "overlook2021"
              name="password"
              required
            />
          </div>
          <input type = "submit" value="LOGIN" class="login-btn secondary-font">
        </form>
      <p class="login-message"></p>
      </section>`;
}

export function displayCustomerHomePage(name) {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">WELCOME ${name}</h1>
  <section class="section-container">
    <nav class="select-action">
      <button class="customer-view-bookings secondary-font">
        VIEW MY BOOKINGS
      </button>
      <button class="customer-book-room secondary-font">
        BOOK A NEW ROOM
      </button>
    </nav>
  </section>`;
}

export function displayManagerHomePage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">WELCOME MANAGER</h1>
  <section class="section-container">
    <nav class="select-action-manager">
    
    <div class="select-date-container">
      <label for="date">SELECT A DATE</label><br />
      <input class="date-input-manager" type="date" min="2021/09/23" max="'2024/12/21" />
    </div>
    

      <button class="hidden manager-view-bookings-btn secondary-font">
        VIEW STATS
      </button>
      <div class="search-label-input-container">
        <label for="searchcustomer">SEARCH CUSTOMER:</label><br />
        <input
          class="search-customer"
          type="text"
          id="search-customer"
          name="search-customer"
        /><br />
      </div>
      <p class="manager-customer-search-message"></p>
    </nav>
  </section>`;
}

export function displayCustomerBookingsPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">MY BOOKINGS</h1>
  <section class="section-container">
    <h2 class="customer-total-spent">Total Spent: $500</h2>
    <nav class="view-actions">
      <button class="customer-all-bookings secondary-font">
    ALL MY BOOKINGS
      </button>
      <button class="customer-past-bookings secondary-font">
        MY PAST BOOKINGS
      </button>
      <button class="customer-upcoming-bookings secondary-font">
    MY FUTURE BOOKINGS
    </button>
    </nav>
    <p class="bookings-message"></p>
    <div class="bookings-container">
     
      
    </div>
  </section>`;
}

export function displayCustomerBookNewRoomPage(customerName) {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">${customerName}: BOOK A NEW ROOM</h1>
  <section class="section-container">
    <div class="select-date-container">
      <label for="date">SELECT A DATE</label><br />
      <input class="date-input" type="date" min="2021/09/23" max="'2024/12/21" />
    </div>
    <div class="select-room-type-container">
      <label for="room-type">FILTER BY ROOM TYPE</label>
      <select name="room-type" id="room-type">
        <option value="view-all">view all</option>
        <option value="suite">suite</option>
        <option value="single-room">single room</option>
        <option value="junior-suite">junior suite</option>
        <option value="residential-suite">residential suite</option>
      </select>
    </div>
    <p class="customer-booking-message"></p>
    <div class="rooms-display"></div>
  </section>
  `;
}

export function displayCustomerAvailableRooms(arrayOfRoomObjs) {
  let roomsHTML = "";
  const roomContainer = document.querySelector(".rooms-display");

  arrayOfRoomObjs.forEach((roomObj) => {
    if (roomObj.bidet === true) {
      roomObj.bidet = "Yes";
    } else {
      roomObj.bidet = "No";
    }
    roomsHTML += `<div class="room-card" id=${roomObj.number}>
    <p>Room Number: ${roomObj.number}</p>
    <p>Room Type: ${roomObj.roomType}</p>
    <p>Bidet: ${roomObj.bidet}</p>
    <p>Bedsize: ${roomObj.bedSize}</p>
    <p>Number of Beds: ${roomObj.numBeds}</p>
    <p>Cost Per Night: ${roomObj.costPerNight}</p>
    <button class="book-btn" id=${roomObj.number}>Book This Room</button>
    </div>`;
  });
  roomContainer.innerHTML = roomsHTML;
}

export function displayCustomerBookings(arrayOfRoomObjs) {
  let bookingsHTML = "";
  const bookingsContainer = document.querySelector(".bookings-container");

  arrayOfRoomObjs.forEach((bookingEl) => {
    bookingsHTML += ` <div class="single-booking-container booking-card">
        <p>Booking ID: ${bookingEl.id}  </p>
        <p>Date: ${bookingEl.date} </p>
        <p>Room Number: ${bookingEl.roomNumber} </p>
      </div>`;
  });
  bookingsContainer.innerHTML = bookingsHTML;
}

export function displayManagerStatsPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header-manager-stats header">MANAGER STATS - 04/07/2022</h1>
    <section class="section-container">
      <div class="circle-label-container">
        <div class="base-timer">
          <svg
            class="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g class="base-timer__circle">
              <circle
                class="base-timer__path-elapsed1"
                cx="50"
                cy="50"
                r="45"
              />
            </g>
          </svg>
          <class id="base-timer-label" class="base-timer__label">
            <p class="occupied-percent">33%</p>
          </class>
        </div>
        <div class="percent-label">Percentage of Rooms Occupied Today</div>
      </div>
      <h2 class="manager-revenue">Today's Total Revenue: $1200</h2>
      <h2 class="avail-rooms">Today's Available Rooms: 14</h2>
    </section>
    <section class="rooms-display">
      <div class="room-card" id="1">
        <p>Room Number: 1</p>
        <p>Room Type: Residential Suite</p>
        <p>Bidet: True</p>
        <p>Bedsize: Queen</p>
        <p>Number of Beds: 1</p>
        <p>Cost Per Night: 358.4</p>
      </div>
    </section>`;
}

export function displayManagerRevenue(revenue, date) {
  const revenueContainer = document.querySelector(".manager-revenue");

  revenueContainer.innerText = `${date} - Total Revenue: $${Math.round(
    revenue
  )}`;
}

export function displayManagerAvailRooms(availRooms, date) {
  const availRoomsContainer = document.querySelector(".avail-rooms");

  availRoomsContainer.innerText = `${date} - Available Rooms: ${availRooms.length}`;
}

export function displayManagerAvailRoomCards(arrOfRooms) {
  let roomsHTML = "";
  const roomsDisplayContainer = document.querySelector(".rooms-display");

  arrOfRooms.forEach((roomObj) => {
    if (roomObj.bidet === true) {
      roomObj.bidet = "Yes";
    } else {
      roomObj.bidet = "No";
    }
    roomsHTML += `<div class="room-card" id=${roomObj.number}>
    <p>Room Number: ${roomObj.number}</p>
    <p>Room Type: ${roomObj.roomType}</p>
    <p>Bidet: ${roomObj.bidet}</p>
    <p>Bedsize: ${roomObj.bedSize}</p>
    <p>Number of Beds: ${roomObj.numBeds}</p>
    <p>Cost Per Night: ${roomObj.costPerNight}</p>
   
    </div>`;
  });
  roomsDisplayContainer.innerHTML = roomsHTML;
}

export function displayManageCustomerPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header header-customer">CUSTOMER: Leatha Ullrich</h1>
  <section class="section-container">
    <h2 class="customer-spending">Total Spent: $500</h2>
    <button class="manager-add-bookings secondary-font">
      ADD A BOOKING
    </button>
    <p class="manager-view-customer-message"></p>
    <section class="bookings-display">
      <div class="booking-card" id="5fwrgu4i7k55hl6sz">
        <p>id: 5fwrgu4i7k55hl6sz</p>
        <p>Date: 04/07/1992</p>
        <p>Room Number: 12</p>
        <button class="delete-btn" id="5fwrgu4i7k55hl6sz">
          Delete This Booking
        </button>
      </div>
    </section>
  </section>`;
}

export function displayManagerCustomerStats(name, totalSpent) {
  const headerCustomer = document.querySelector(".header-customer");

  const sortMessage = document.querySelector(".manager-view-customer-message");

  const customerSpending = document.querySelector(".customer-spending");
  headerCustomer.innerText = `CUSTOMER: ${name}`;

  customerSpending.innerText = `${name}'s total spending at Overlook: $${totalSpent}`;

  sortMessage.innerText = `${name}'s Bookings - sorted from most recent to least recent`;
}
export function displayManagerCustomerBookings(customerBookingsArr) {
  let bookingsHTML = "";

  const bookingsDisplay = document.querySelector(".bookings-display");

  customerBookingsArr.forEach((bookingEl) => {
    bookingsHTML += `<div class="booking-card" id=${bookingEl.id}>
    <p>id: ${bookingEl.id}</p>
    <p>User ID: ${bookingEl.userID}</p>
    <p>Date: ${bookingEl.date}</p>
    <p>Room Number: ${bookingEl.roomNumber}</p>
    <button class="delete-btn" id=${bookingEl.id}>
      Delete This Booking
    </button>
  </div>`;
  });

  bookingsDisplay.innerHTML = bookingsHTML;
}
