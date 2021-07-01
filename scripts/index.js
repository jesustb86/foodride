///////////////////////////////////////////

const foodImg = document.getElementById("foodImg");
const container = document.getElementById("container");
const containerTwo = document.getElementById("containerTwo");
const submit = document.getElementById("submit");

// const city = document.getElementById("city");
// const selectedCity = city.value;
// console.log(selectedCity);

// Select an HTML Element
// Give HTML Element an ID
// Select that ID and assign to a var
// DOCUMENT - HTML Document
// getElementById - Telling HTML to look for this ID

const hide = document.getElementById("hide");
const show = document.getElementById("show");

hide.addEventListener("click", function () {
	foodImg.classList.add("hide");
});

show.addEventListener("click", function () {
	foodImg.classList.remove("hide");
});

const cardDiv = document.getElementById("cardDiv");

function getRestaurants() {
	// let lat;
	// let lon;

	// const fetchRestaurants = await selectedCity;

	// switch (fetchRestaurants) {
	// 	case "Los Angeles":
	// 		lat = "34.0522";
	// 		lon = "118.2437";
	// 		break;
	// 	case "Long Beach":
	// 		lat = "33.7701";
	// 		lon = "118.1937";
	// 		break;
	// 	case "Anaheim":
	// 		lat = "33.8366";
	// 		lon = " 117.9143";
	// }

	// if (fetchRestaurants) {
	// 	console.log(fetchRestaurants);

	navigator.geolocation.getCurrentPosition(
		function (location) {
			const lat = location.coords.latitude;
			const lon = location.coords.longitude;

			fetch(
				`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${lon}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`,
				{
					"method": "GET",
					"headers": {
						"x-rapidapi-key":
							"e0aa64f616msh3765b3426b000dbp1f3c46jsna12a524ad1d9",
						"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
					},
				}
			)
				.then((response) => {
					console.log(response);
					return response.json();
				})
				.then(function (data) {
					const restaurants = data.data;

					console.log(restaurants);

					restaurants.forEach(function (place, index) {
						// console.log(index);

						var number = index + 1;

						console.log(number);

						let p = document.createElement("p");

						var placeholder = "./images/product-placeholder.jpg";

						if (!place.name) {
							return;
						} else {
							p.innerHTML = `			
								<div class="col s4 m4 restaurantCard">
								  <div class="card">
									<div class="card-image">
									  <img src=${!place.photo ? placeholder : place.photo.images.medium.url}>
									  <span class="card-title">${place.name}</span>
									</div>
									<div class="card-content restaurantText">
									  <p>${place.description}</p>
									</div>
									<div class="card-action">
									  <a href=${place.web_url}>TripAdvisor</a>
									  <a href=${place.website}>Site</a>
									  <br>
									  <a href="#">Add To Ride</a>
									</div>
								  </div>
								</div>
							`;

							cardDiv.append(p);
						}
					});
				})
				.catch((err) => {
					console.error(err);
				});
		},
		function (error) {
			console.log(error);
		}
	);
}

window.onload = getRestaurants;
