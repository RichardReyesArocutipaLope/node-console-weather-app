import axios from "axios";

export class Busquedas {
  historial = ["lima", "Tacna", "Arequipa"];
  constructor() {
    // TODO: leer db si existe
  }

  get paramsMapbox() {
    console.log(process.env.MAPBOX_KEY);
    return {
      limit: 8,
      proximity: "ip",
      language: "es",
      access_token: process.env.MAPBOX_KEY || "",
    };
  }

  async ciudad(lugar = "") {
    // TODO: peticion http
    try {
      const api = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const { data } = await api.get();
      console.log(data);
      return []; // retornar lugares
    } catch (error) {
      return [];
    }
  }
}
