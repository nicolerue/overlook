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
              required
            /><br />
          </div>
          <div class="text-input-container">
            <label for="password">PASSWORD:</label><br />
            <input
              class="input-login input-login-password"
              type="text"
              id="password"
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
      <button class="customer-view-bookings secondary-font">
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
    </nav>
  </section>`;
}

export function displayCustomerBookingsPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">MY BOOKINGS</h1>
  <section class="section-container">
    <h2>Total Spent: $500</h2>
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

export function displayCustomerBookNewRoomPage() {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = `<h1 class="header">BOOK A NEW ROOOM</h1>
  <section class="section-container">
    <div class="select-date-container">
      <label for="date">SELECT A DATE</label><br />
      <input class="date-input" type="date" min="2021/09/23" max="'2024/12/21" />
    </div>
    <div class="select-room-type-container">
      <label for="room-type">FILTER BY ROOM TYPE</label>
      <select name="room-type" id="room-type">
        <option value="view-all">view all</option>
        <option value="queen">queen</option>
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
