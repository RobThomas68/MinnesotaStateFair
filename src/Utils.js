export function distance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
) {
    const p = 0.017453292519943295; // Math.PI / 180
    const km_to_mi = 0.621371;
    const c = Math.cos;
    const a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return km_to_mi * 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
