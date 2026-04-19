import { NextRequest, NextResponse } from "next/server"

// District coordinates for Bangladesh
const districtCoordinates: Record<string, { lat: number; lon: number }> = {
  "Dhaka": { lat: 23.8103, lon: 90.4125 },
  "Gazipur": { lat: 23.9999, lon: 90.4203 },
  "Narayanganj": { lat: 23.6238, lon: 90.5000 },
  "Tangail": { lat: 24.2513, lon: 89.9163 },
  "Chittagong": { lat: 22.3569, lon: 91.7832 },
  "Chattogram": { lat: 22.3569, lon: 91.7832 },
  "Cox's Bazar": { lat: 21.4272, lon: 92.0058 },
  "Rangamati": { lat: 22.6372, lon: 92.1988 },
  "Bandarban": { lat: 22.1953, lon: 92.2184 },
  "Khagrachhari": { lat: 23.1193, lon: 91.9847 },
  "Comilla": { lat: 23.4607, lon: 91.1809 },
  "Sylhet": { lat: 24.8949, lon: 91.8687 },
  "Moulvibazar": { lat: 24.4829, lon: 91.7774 },
  "Habiganj": { lat: 24.3749, lon: 91.4155 },
  "Sunamganj": { lat: 25.0658, lon: 91.3950 },
  "Rajshahi": { lat: 24.3745, lon: 88.6042 },
  "Bogra": { lat: 24.8465, lon: 89.3773 },
  "Khulna": { lat: 22.8456, lon: 89.5403 },
  "Bagerhat": { lat: 22.6602, lon: 89.7895 },
  "Jessore": { lat: 23.1634, lon: 89.2182 },
  "Barishal": { lat: 22.7010, lon: 90.3535 },
  "Barisal": { lat: 22.7010, lon: 90.3535 },
  "Rangpur": { lat: 25.7439, lon: 89.2752 },
  "Dinajpur": { lat: 25.6217, lon: 88.6354 },
  "Mymensingh": { lat: 24.7471, lon: 90.4203 },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const district = searchParams.get("district")

  if (!district) {
    return NextResponse.json({ error: "District is required" }, { status: 400 })
  }

  // Find coordinates for the district
  const coords = districtCoordinates[district] || districtCoordinates["Dhaka"]
  
  // Use Open-Meteo API (free, no API key required)
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=Asia%2FDhaka&forecast_days=7`

  try {
    const response = await fetch(weatherUrl)
    
    if (!response.ok) {
      throw new Error("Failed to fetch weather data")
    }

    const data = await response.json()

    // Map weather codes to conditions
    const getWeatherCondition = (code: number) => {
      if (code === 0) return { condition: "Clear Sky", icon: "sun" }
      if (code <= 3) return { condition: "Partly Cloudy", icon: "cloud" }
      if (code <= 49) return { condition: "Foggy", icon: "cloud" }
      if (code <= 59) return { condition: "Drizzle", icon: "cloud-rain" }
      if (code <= 69) return { condition: "Rain", icon: "cloud-rain" }
      if (code <= 79) return { condition: "Snow", icon: "cloud" }
      if (code <= 99) return { condition: "Thunderstorm", icon: "cloud-rain" }
      return { condition: "Unknown", icon: "cloud" }
    }

    const currentWeather = getWeatherCondition(data.current.weather_code)
    
    // Get travel safety suggestion based on weather
    const getSafetySuggestion = (code: number, temp: number) => {
      if (code >= 80) return "Thunderstorms expected. Consider postponing outdoor activities or have indoor backup plans."
      if (code >= 60) return "Rainy conditions. Bring waterproof gear and plan for possible delays."
      if (code >= 50) return "Light rain expected. Carry an umbrella and waterproof bag for electronics."
      if (temp > 35) return "Hot weather alert! Stay hydrated, wear light clothes, and avoid midday sun."
      if (temp < 15) return "Cool weather. Bring warm layers, especially for evening activities."
      return "Weather looks favorable for travel. Enjoy your trip!"
    }

    const forecast = data.daily.time.map((date: string, index: number) => ({
      date,
      tempMax: data.daily.temperature_2m_max[index],
      tempMin: data.daily.temperature_2m_min[index],
      rainProbability: data.daily.precipitation_probability_max[index],
      ...getWeatherCondition(data.daily.weather_code[index])
    }))

    return NextResponse.json({
      district,
      current: {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        ...currentWeather
      },
      forecast,
      safetySuggestion: getSafetySuggestion(data.current.weather_code, data.current.temperature_2m)
    })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
