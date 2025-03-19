document.addEventListener("DOMContentLoaded", () => {
    const carList = document.getElementById("car-list");
    const searchBar = document.getElementById("searchBar");
    const priceFilter = document.getElementById("priceFilter");
    const mainNav = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link");

    // Interactive navigation
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            mainNav.classList.add("scrolled");
        } else {
            mainNav.classList.remove("scrolled");
        }
    });

    // Add hover effect to nav links
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            link.style.color = "#ffd700";
        });
        
        link.addEventListener("mouseleave", () => {
            link.style.color = "white";
        });
    });

    // Fetch car data
    fetch("cars.json")
        .then(response => response.json())
        .then(data => {
            let cars = data;
            displayCars(cars);

            searchBar.addEventListener("input", () => filterCars(cars));
            priceFilter.addEventListener("change", () => filterCars(cars));
        })
        .catch(error => {
            console.error("Error fetching car data:", error);
            carList.innerHTML = `<p class="error-message">Failed to load car data. Please try again later.</p>`;
        });

    function displayCars(cars) {
        carList.innerHTML = "";
        
        if (cars.length === 0) {
            carList.innerHTML = `<p class="no-results">No cars match your search criteria.</p>`;
            return;
        }
        
        cars.forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");
            
            carCard.innerHTML = `
                <div class="car-image-container">
                    <img src="${car.image}" alt="${car.name}" loading="lazy">
                </div>
                <div class="car-details">
                    <h2>${car.name}</h2>
                    <p>$${car.price.toLocaleString()}</p>
                </div>
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