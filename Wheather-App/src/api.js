const API_KEY = "GQ6EADEKRCGYGJESH785LDMDL";

async function getWeather(location) {
    const url =
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${API_KEY}&unitGroup=us`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Location not found");
    }

    const data = await response.json();

    return data;
}

export { getWeather };