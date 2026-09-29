function processWeatherData(data) {
    const current = data.currentConditions;
    const today = data.days[0];

    return {
        location: data.resolvedAddress,
        conditions: current.conditions,
        temperature: current.temp,
        feelsLike: current.feelslike,
        humidity: current.humidity,
        windSpeed: current.windspeed,
        high: today.tempmax,
        low: today.tempmin
    };
}

export { processWeatherData };