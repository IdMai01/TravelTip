export const locService = {
    getLocs,
    saveCurrLoc,
    getFavorites,
    addToFavorite,
    setPlaceName,
    deleteFromFavorite,
    getLocByIdx,
    getCoordsByIdx
}

var gCurrIdx = 7002
var gCurrLoc = {}

var locs = [
    { idx: gCurrIdx - 1, name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: new Date },
    { idx: gCurrIdx, name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: new Date }
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
    ++gCurrIdx
    var newFavoriteLoc = { idx: gCurrIdx, name: gCurrLoc.name, lat: gCurrLoc.latLng.lat, lng: gCurrLoc.latLng.lng, createdAt: new Date }
    locs.push(newFavoriteLoc)
}
function setPlaceName(name) {
    gCurrLoc.name = name
}
function deleteFromFavorite(idx) {
    var selectedLocIdx = getLocByIdx(idx)
    locs.splice(selectedLocIdx, 1)
    window.renderFavorites()
}
function getLocByIdx(idx) {
    for (var i = 0; i < locs.length; i++) {
        if (locs[i].idx === idx) return i
    }
}
function getCoordsByIdx(idx) {
    var selectedLocIdx = getLocByIdx(idx)
    return [locs[selectedLocIdx].lat.toFixed(4), locs[selectedLocIdx].lng.toFixed(4)]
}