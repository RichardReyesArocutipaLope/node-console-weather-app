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
        // TODO mostrar mensaje
        const term = await leerInput("Ciudad: ");
        const lugares = await busquedas.ciudad(term);
        const id = await listarLugares(lugares);
        const lugarSeleccionado = lugares.find((l) => l.id === id);
        const { nombre, lng, lat } = lugarSeleccionado;
        const clima = await busquedas.climaLugar(lat, lng);
        const { desc, min, max, temp } = clima;
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad: ", nombre);
        console.log("Lat: ", lat);
        console.log("Lng: ", lng);
        console.log("Temperatura: ", temp);
        console.log("Mínima: ", min);
        console.log("Máxima: ", max);
        console.log("Cómo esta el clima: ", desc);
        break;
      case 2:
        break;
      case 0:
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
