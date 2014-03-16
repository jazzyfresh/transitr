var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://b.tile.cloudmade.com/65a2839adb9b402280f397709561f9f0/122520/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

// still trying to figure out wtf is with the URL tile layout

