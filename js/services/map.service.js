
export const mapService = {
    initMap,
    // addMarker,
    panTo,
    displayCurrLocation,
    openLoc
}

var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            renderInfoWindow()
            console.log('Map!', gMap);
        })
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng)
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyApjUyx0ikCC8GP9xj-8PFBfPpYASx2Rds'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function renderInfoWindow() {
    const myLatlng = { lat: 32.0749831, lng: 34.9120554 }

    const map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 15,
        center: myLatlng,
    })

    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
    })

    infoWindow.open(map)

    map.addListener("click", (mapsMouseEvent) => {
        displayCurrLocation(JSON.parse(JSON.stringify(mapsMouseEvent.latLng)))
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        })
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        )
        infoWindow.open(map)
    })
}

window.displayCurrLocation = displayCurrLocation

function displayCurrLocation(location) {
    document.querySelector('.curr-location button').style.display = 'block'
    document.querySelector('.curr-location p').style.display = 'block'
    document.querySelector('.curr-location input').style.display = 'block'
    document.querySelector('.user-pos').innerText =
        `Latitude: ${(location.lat.toFixed(5))} - Longitude: ${location.lng.toFixed(5)}`
    saveCurrLoc(location)
}
function openLoc(idx){

}