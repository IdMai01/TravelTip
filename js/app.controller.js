import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onAddToFavorite = onAddToFavorite;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSetPlaceName = onSetPlaceName;
window.onDeleteFromFavorite = onDeleteFromFavorite;
window.renderFavorites = renderFavorites;
window.onOpenLoc = onOpenLoc

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
    renderFavorites()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onAddToFavorite() {
    locService.addToFavorite()
    renderFavorites()
}

function renderFavorites() {
    var favorites = locService.getFavorites()
    var strHtml =
        "<tr><th>Name</th><th>Coords</th><th>Last Updated</th></tr > "
    for (var i = 0; i < favorites.length; i++) {
        var currLoc = favorites[i]
        var currRowStr = `<tr>
                <td>${currLoc.name}</td>
                <td>lat:${currLoc.lat.toFixed(5)}
                lng:${currLoc.lng.toFixed(5)}</td>
                <td>${currLoc.createdAt.toLocaleDateString()}</td>
                <td class="table-btns"><button onclick="onDeleteFromFavorite(${currLoc.idx})">X</button><button onclick="onOpenLoc(${currLoc.idx})">Go</button></td>
                </td>
                </tr>`
        strHtml += currRowStr
    }
    document.querySelector('.locations table').innerHTML = strHtml
}
function onSetPlaceName(name) {
    locService.setPlaceName(name)
}
function onDeleteFromFavorite(idx) {
    locService.deleteFromFavorite(idx)
}
function onOpenLoc(idx) {
    mapService.panTo(...locService.getCoordsByIdx(idx))
}

