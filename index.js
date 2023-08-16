import "dotenv/config";
import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";

const main = async () => {
  let opt;

  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // TODO mostrar mensaje
        const lugar = await leerInput("Ciudad: ");
        await busquedas.ciudad(lugar);
        console.log(lugar);
        // TODO buscar los lugares
        // TODO seleccionarl el lugar
        // TODO clima
        // TODO mostrar resultados
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad: ");
        console.log("Lat: ");
        console.log("Lng: ");
        console.log("Temperatura: ");
        console.log("Mínima: ");
        console.log("Máxima: ");
        break;
      case 2:
        break;
      case 0:
        break;
    }
    console.log(opt);
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
