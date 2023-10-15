// Créez une carte et définissez les coordonnées du centre et le niveau de zoom
const map = L.map('map').setView([40, -100], 3.4);

// Ajoutez une couche de carte de base (par exemple, Carte OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ajoutez des marqueurs pour les pays
const countries = [
    { name: 'Alabama', latlng: [32.806671, -86.791130] },
    { name: 'Alaska', latlng: [61.370716, -152.404419] },
    { name: 'Arizona', latlng: [33.729759, -111.431221] },
    { name: 'Arkansas', latlng: [34.969704, -92.373123] },
    { name: 'Californie', latlng: [36.116203, -119.681564] },
    { name: 'Colorado', latlng: [39.059811, -105.311104] },
    { name: 'Connecticut', latlng: [41.597782, -72.755371] },
    { name: 'Delaware', latlng: [39.318523, -75.507141] },
    { name: 'Floride', latlng: [27.766279, -81.686783] },
    { name: 'Géorgie', latlng: [33.040619, -83.643074] },
    { name: 'Hawaï', latlng: [21.094318, -157.498337] },
    { name: 'Idaho', latlng: [44.240459, -114.478828] },
    { name: 'Illinois', latlng: [40.349457, -88.986137] },
    { name: 'Indiana', latlng: [39.849426, -86.258278] },
    { name: 'Iowa', latlng: [42.011539, -93.210526] },
    { name: 'Kansas', latlng: [38.526600, -96.726486] },
    { name: 'Kentucky', latlng: [37.668140, -84.670067] },
    { name: 'Louisiane', latlng: [31.169546, -91.867805] },
    { name: 'Maine', latlng: [44.693947, -69.381927] },
    { name: 'Maryland', latlng: [39.063946, -76.802101] },
    { name: 'Massachusetts', latlng: [42.230171, -71.530106] },
    { name: 'Michigan', latlng: [43.326618, -84.536095] },
    { name: 'Minnesota', latlng: [45.694454, -93.900192] },
    { name: 'Mississippi', latlng: [32.741646, -89.678696] },
    { name: 'Missouri', latlng: [38.456085, -92.288368] },
    { name: 'Montana', latlng: [46.921925, -110.454353] },
    { name: 'Nebraska', latlng: [41.125370, -98.268082] },
    { name: 'Nevada', latlng: [38.313515, -117.055374] },
    { name: 'New Hampshire', latlng: [43.452492, -71.563896] },
    { name: 'New Jersey', latlng: [40.298904, -74.521011] },
    { name: 'Nouveau-Mexique', latlng: [34.840515, -106.248482] },
    { name: 'New York', latlng: [42.165726, -74.948051] },
    { name: 'Caroline du Nord', latlng: [35.630066, -79.806419] },
    { name: 'Dakota du Nord', latlng: [47.528912, -99.784012] },
    { name: 'Ohio', latlng: [40.388783, -82.764915] },
    { name: 'Oklahoma', latlng: [35.565342, -96.928917] },
    { name: 'Oregon', latlng: [44.572021, -122.070938] },
    { name: 'Pennsylvanie', latlng: [40.590752, -77.209755] },
    { name: 'Rhode Island', latlng: [41.680893, -71.511780] },
    { name: 'Caroline du Sud', latlng: [33.856892, -80.945007] },
    { name: 'Dakota du Sud', latlng: [44.299782, -99.438828] },
    { name: 'Tennessee', latlng: [35.747845, -86.692345] },
    { name: 'Texas', latlng: [31.054487, -97.563461] },
    { name: 'Utah', latlng: [40.150032, -111.862434] },
    { name: 'Vermont', latlng: [44.045876, -72.710686] },
    { name: 'Virginie', latlng: [37.769337, -78.169968] },
    { name: 'Washington', latlng: [47.400902, -121.490494] },
    { name: 'Virginie-Occidentale', latlng: [38.491226, -80.954351] },
    { name: 'Wisconsin', latlng: [44.268543, -89.616508] },
    { name: 'Wyoming', latlng: [42.755966, -107.302490] }
];


countries.forEach(country => {
    const marker = L.marker(country.latlng).addTo(map);
    marker.bindPopup(country.name);
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
    marker.on('mouseout', function (e) {
        this.closePopup();
    });
});



jQuery(document).ready(function () {
    let currentDate = moment();

    function displayCalendar() {
        let currentMonth = currentDate.clone();
        let calendarBody = document.getElementById("calendar-body");
        calendarBody.innerHTML = "";
        let firstDay = currentMonth.startOf('month').day();
        let daysInMonth = currentMonth.daysInMonth();

        $("#current-month").text(currentMonth.format('MMMM YYYY'));

        let date = 1;

        for (let i = 0; i < 6; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = document.createElement("td");
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = document.createElement("td");
                    cell.style.border = "none"
                    cell.style.padding = "0px"
                    cell.textContent = date;
                    row.appendChild(cell);

                    if (currentDate.isSame(currentMonth, 'year') &&
                        currentDate.isSame(currentMonth, 'month') &&
                        date === currentDate.date()) {
                        cell.classList.add("today");
                        cell.style.backgroundColor = "green"
                    }

                    date++;
                }
            }

            calendarBody.appendChild(row);
        }
    }

    function prevMonth() {
        currentDate.subtract(1, 'month');
        displayCalendar();
    }

    function nextMonth() {
        currentDate.add(1, 'month');
        displayCalendar();
    }

    $("#prev-month").click(prevMonth);
    $("#next-month").click(nextMonth);

    displayCalendar();
});


const taskList = document.getElementById("task-list");
        new Sortable(taskList, {
            animation: 150,
        });

        taskList.addEventListener("change", function(event) {
            if (event.target.type === "checkbox") {
                const taskLabel = event.target.closest("li").querySelector(".custom-control-label");
                const badge = event.target.closest("li").querySelector(".badge");
                if (event.target.checked) {
                    taskLabel.classList.add("completed");
                    badge.classList.remove("badge-primary");
                    badge.classList.add("gray-badge");
                } else {
                    taskLabel.classList.remove("completed");
                    badge.classList.remove("gray-badge");
                    badge.classList.add("badge-primary");
                }
            }
        });


const btnToggle = document.querySelector('.btn-toggle')
btnToggle.addEventListener('click',()=>{
    const sidebar = document.querySelector('.sidenav')
    const enteteSidebar = document.querySelector('.entetesidebar')
    sidebar.classList.toggle("cachernav")
    enteteSidebar.classList.toggle("cachernav")
})

const fullscreenButton = document.getElementById("fullscreen-button");

// Vérifie si le navigateur prend en charge le mode plein écran
if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
    fullscreenButton.style.display = "block"; // Affiche le bouton si le mode plein écran est pris en charge
}

fullscreenButton.addEventListener("click", () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
});
