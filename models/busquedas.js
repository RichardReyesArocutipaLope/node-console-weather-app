import axios from "axios";
import fs from "fs";
export class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.leerDB();
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));
      return palabras.join(" ");
    });
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

  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLowerCase())) return;
    this.historial.unshift(lugar.toLowerCase());
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) return;
    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);
    this.historial = data.historial;
  }
}
