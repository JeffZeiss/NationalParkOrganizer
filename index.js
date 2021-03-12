
//NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE
//THIS is updated from the DOMcentric index using the data.js and rendering
//into the dom as opposed to manipulating in situ DOM
//the method is much easier to scale and alter
//JEFF ZEISS 3/3/21

const submitHandler = (event) => {
  event.preventDefault();

  const form = document.querySelector("#parkForm");
  const formData = new FormData(form);

  // Keep track of if any errors are found
  let hasErrors = false;

  formData.forEach((value, key) => {
    let errorId = `#${key.slice(4).toLowerCase()}Error`;
    if (value.trim() === "") {
      document.querySelector(errorId).style.display = "block";
      hasErrors = true;
    } else {
      document.querySelector(errorId).style.display = "none";
    }
  });

  // if there are no errors
  if (!hasErrors) {
    //create a new object
    const parkFromForm = {
      name: formData.get("parkName"),
      location: formData.get("parkLocation"),
      description: formData.get("parkDescription"),
      established: formData.get("parkEstablished"),
      area: formData.get("parkArea"),
      rating: formData.get("parkRating"),
    };

    parks.push(parkFromForm);

    render();
  }
};

// function to handler favorite button clicks
const favoriteButtonClickHandler = (event) => {
  const park = event.target.parentNode;
  park.style.backgroundColor = "#c8e6c9";
};

// function for sorting by name
const sortByName = (parkA, parkB) => {
  const parkAName = parkA.name;
  const parkBName = parkB.name;
  if (parkAName < parkBName) {
    return -1;
  } else if (parkAName > parkBName) {
    return 1;
  } else {
    return 0;
  }
};

// function for sorting by rating
const sortByRating = (parkA, parkB) => {
  const parkARating = parkA.rating;
  const parkBRating = parkB.rating;
  if (parkARating < parkBRating) {
    return -1;
  } else if (parkARating > parkBRating) {
    return 1;
  } else {
    return 0;
  }
};

// function for handling the nameSorter click
const nameSorterClickHandler = (event) => {
  event.preventDefault();
parks.sort(sortByName)
render()
};

// function to handle the ratingSorter click
const ratingSorterClickHandler = (event) => {
  event.preventDefault();

  parks.sort(sortByRating)
};

const render = () => {
  // Get the parent element
  const main = document.querySelector("main");

  // Empty the parent element
  main.innerHTML = "";

  // Get the parks HTML
  const content = parks.map(renderOnePark).join("");

  // Set the `innerHTML` of parent element
  main.innerHTML = content;
};

const renderOnePark = (park) => {
  // Get the individual properties of the park
  const { name, location, description, established, area, rating } = park;

  const content = `
      <section class="park">
        <h2>${name}</h2>
        <div class="location">${location}</div>
        <div class="description">${description}</div>
        <button class="rateBtn" title="Add to Favourites">&#9734;</button>
        <div class="stats">
          <div class="established stat">
            <h3>Established</h3>
            <div class="value">${established}</div>
          </div>
          <div class="area stat">
            <h3>Area</h3>
            <div class="value">${area}</div>
          </div>
          <div class="rating stat">
            <h3>Rating</h3>
            <div class="value">${rating}</div>
          </div>
        </div>
      </section>
  `;
  return content;
};

// the point where all the code starts
const main = () => {
  // select the nameSorter link
  const nameSorter = document.querySelector("#nameSorter");

  // add an event listener
  nameSorter.addEventListener("click", nameSorterClickHandler);

  // select the ratingSorter link
  const ratingSorter = document.querySelector("#ratingSorter");

  // add an event listener
  ratingSorter.addEventListener("click", ratingSorterClickHandler);

  // select all the buttons for all the parks
  const allBtns = document.querySelectorAll(".rateBtn");

  // iterate the list of buttons and add an event handler to each
  allBtns.forEach((btn) => {
    btn.addEventListener("click", favoriteButtonClickHandler);
  });

  // get the form element
  const form = document.querySelector("#parkForm");

  // attach the submit handler
  form.addEventListener("submit", submitHandler);

  render();
};

// Add event listener for DOMContentLoaded
window.addEventListener("DOMContentLoaded", main);
