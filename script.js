document.getElementById("butn").addEventListener("click", function () {
    const h2Elements = document.querySelectorAll(".menu h2");
    const [kenglikEl, uzunlikEl, mamlakatEl, shaharEl, ipEl, ispEl] = h2Elements;
    const mapFrame = document.getElementById("map-frame");

    function updateMap(lat, lon) {
        mapFrame.src = `https://www.google.com/maps?q=${lat},${lon}&output=embed`;
    }

    async function showIPInfo(lat, lon) {
        try {
            const response = await fetch("https://ipinfo.io/json");
            const data = await response.json();

            mamlakatEl.textContent = "Mamlakat: " + data.country;
            shaharEl.textContent = "Shahar: " + data.city;
            ipEl.textContent = "IP manzil: " + data.ip;
            ispEl.textContent = "Internet provayder: " + data.org;

            if (!lat || !lon) {
                const latlon = data.loc.split(",");
                lat = latlon[0];
                lon = latlon[1];
            }

            kenglikEl.textContent = "Kenglik: " + lat;
            uzunlikEl.textContent = "Uzunlik: " + lon;
            updateMap(lat, lon);
        } catch (error) {
            alert("IP ma'lumotlarini olishda xatolik!");
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                kenglikEl.textContent = "Kenglik: " + lat;
                uzunlikEl.textContent = "Uzunlik: " + lon;
                updateMap(lat, lon);
                await showIPInfo(lat, lon);
            },
            async function (error) {
                alert("Geolokatsiya olishda xatolik: " + error.message);
                await showIPInfo(); // IP orqali joylashuv
            }
        );
    } else {
        alert("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi.");
    }
});
