document.addEventListener('DOMContentLoaded', () => {
    const weather = {
        apiKey: "694f138d2ee0095bbedcbe8dd394db50",
        fetchWeather: function (city) {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q="
                + city
                + "&units=metric&appid="
                + this.apiKey
            )
                .then((response) => response.json())
                .then((data) => this.displayWeather(data));
        },
        displayWeather: function (data) {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            document.getElementById("city").innerText = "Weather in " + name;
            document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.getElementById("description").innerText = description;
            document.getElementById("temp").innerText = temp + "°C";
            document.getElementById("humidity").innerText = "Humidity: " + humidity + "%";
            document.getElementById("wind").innerText = "Wind speed: " + speed + " km/h";
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        },
        search: function () {
            this.fetchWeather(document.getElementById("search-bar").value);
        }
    };

    document.getElementById("search-button").addEventListener("click", function () {
        weather.search();
    });

    document.getElementById("search-bar").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            weather.search();
        }
    });

    weather.fetchWeather("Delhi");

    // Shepherd.js tour setup
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            scrollTo: true,
            classes: 'shepherd-theme-arrows',
            cancelIcon: {
                enabled: true
            },
            tippyOptions: {
                maxWidth: 500
            }
        }
    });

    tour.addStep({
        id: 'welcome',
        text: 'Welcome to the Weather Forecasting App!',
        attachTo: {
            element: '#card',
            on: 'bottom'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        id: 'search',
        text: 'Use this search bar to look up the weather in any city.',
        attachTo: {
            element: '#search',
            on: 'bottom'
        },
        buttons: [
            {
                text: 'Back',
                action: tour.back
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep({
        id: 'weather-info',
        text: 'Here you can see the weather information for the selected city.',
        attachTo: {
            element: '#weather',
            on: 'top'
        },
        buttons: [
            {
                text: 'Back',
                action: tour.back
            },
            {
                text: 'Finish',
                action: tour.complete
            }
        ]
    });

    // Start the tour
    tour.start();
});
