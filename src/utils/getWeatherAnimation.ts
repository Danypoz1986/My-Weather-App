import rain from "../assets/rain.json";
import clear from "../assets/clear.json";
import partly from "../assets/partly.json";
import fog from "../assets/fog.json";
import snow from "../assets/snow.json";
import cloud from "../assets/cloud.json";

export const getWeatherAnimation = (weatherCondition: string) => {
    if (
        weatherCondition.includes("clear") || 
        weatherCondition.includes("sun") || 
        weatherCondition.includes("sunny")
    ) {
        return clear;
    }

    if (
        weatherCondition.includes("rain") || 
        weatherCondition.includes("drizzle") || 
        weatherCondition.includes("thunderstorm") || 
        weatherCondition.includes("light rain") || 
        weatherCondition.includes("shower") ||
        weatherCondition.includes("heavy rain")
    ) {
        return rain;
    }

    if (
        weatherCondition.includes("snow") || 
        weatherCondition.includes("light snow") || 
        weatherCondition.includes("sleet") || 
        weatherCondition.includes("blizzard")
    ) {
        return snow;
    }

    if (
        weatherCondition.includes("partly") || 
        weatherCondition.includes("scattered") || 
        weatherCondition.includes("few clouds")
    ) {
        return partly;
    }

    if (
        weatherCondition.includes("cloud") || 
        weatherCondition.includes("broken") || 
        weatherCondition.includes("cloudy") || 
        weatherCondition.includes("overcast")
    ) {
        return cloud;
    }

    if (
        weatherCondition.includes("fog") || 
        weatherCondition.includes("foggy") || 
        weatherCondition.includes("haze") || 
        weatherCondition.includes("mist") || 
        weatherCondition.includes("smoke") ||
        weatherCondition.includes("dust")
    ) {
        return fog;
    }

    // ✅ Default return (if no condition matches)
    return clear;
};
