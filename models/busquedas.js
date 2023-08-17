import axios from "axios";

export class Busquedas {
  historial = ["lima", "Tacna", "Arequipa"];
  constructor() {
    // TODO: leer db si existe
  }

  get paramsMapbox() {
    return {
      limit: 8,
      proximity: "ip",
      language: "es",
      access_token: process.env.MAPBOX_KEY || "",
    };
  }

  async ciudad(lugar = "") {
    try {
      const api = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const { data } = await api.get();
      return data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  paramsOpenweather(lat, lon) {
    return {
      lat,
      lon,
      appid: process.env.OPENWEATHER_KEY || "",
      units: "metric",
      lang: "es",
    };
  }

  async climaLugar(lat, lon) {
    try {
      const api = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: this.paramsOpenweather(lat, lon),
      });

      const { data } = await api.get();
      const { weather, main } = data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
