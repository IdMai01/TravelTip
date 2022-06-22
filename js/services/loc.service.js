export const locService = {
    getLocs,
    saveCurrLoc,
    getFavorites,
    addToFavorite,
    setPlaceName
}

var gCurrLoc = {}

var locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: new Date },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: new Date }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

window.saveCurrLoc = saveCurrLoc
function saveCurrLoc(loc) {
    gCurrLoc.latLng = loc
}

function getFavorites() {
    return locs
}

function addToFavorite() {
    var newFavoriteLoc = { name: gCurrLoc.name, lat: gCurrLoc.latLng.lat, lng: gCurrLoc.latLng.lng, createdAt: new Date }
    locs.push(newFavoriteLoc)
}
function setPlaceName(name) {
    gCurrLoc.name = name
}