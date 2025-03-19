document.addEventListener("DOMContentLoaded", () => {
    const carList = document.getElementById("car-list");
    const searchBar = document.getElementById("searchBar");
    const priceFilter = document.getElementById("priceFilter");

    fetch("cars.json")
        .then(response => response.json())
        .then(data => {
            let cars = data;
            displayCars(cars);

            searchBar.addEventListener("input", () => filterCars(cars));
            priceFilter.addEventListener("change", () => filterCars(cars));
        });

    function displayCars(cars) {
        carList.innerHTML = "";
        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h2>${car.name}</h2>
                <p>$${car.price.toLocaleString()}</p>
            `;
            carList.appendChild(carCard);
        });
    }

    function filterCars(cars) {
        const searchText = searchBar.value.toLowerCase();
        const priceValue = priceFilter.value;

        let filteredCars = cars.filter(car =>
            car.name.toLowerCase().includes(searchText)
        );

        if (priceValue === "low") {
            filteredCars = filteredCars.filter(car => car.price < 1000000);
        } else if (priceValue === "high") {
            filteredCars = filteredCars.filter(car => car.price >= 1000000);
        }

        displayCars(filteredCars);
    }
});
