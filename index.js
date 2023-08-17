import "dotenv/config";
import {
  inquirerMenu,
  leerInput,
  listarLugares,
  pausa,
} from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";

const main = async () => {
  let opt;

  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const term = await leerInput("Ciudad: ");
        const lugares = await busquedas.ciudad(term);
        const id = await listarLugares(lugares);
        if (id === "0") continue;
        const lugarSeleccionado = lugares.find((l) => l.id === id);
        busquedas.agregarHistorial(lugarSeleccionado.nombre);
        const { nombre, lng, lat } = lugarSeleccionado;
        const clima = await busquedas.climaLugar(lat, lng);
        const { desc, min, max, temp } = clima;
        console.clear();
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad: ", nombre.green);
        console.log("Lat: ", lat);
        console.log("Lng: ", lng);
        console.log("Temperatura: ", temp);
        console.log("Mínima: ", min);
        console.log("Máxima: ", max);
        console.log("Cómo esta el clima: ", desc.green);
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, index) => {
          const idx = `${index + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
      case 0:
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
