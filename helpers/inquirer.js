import inquirer from "inquirer";
import colors from "colors";

const preguntas = [
  {
    type: "list",
    name: "option",
    message: "¿Que desea hacer",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log("============================".green);
  console.log("   Seleccione una opción".white);
  console.log("============================\n".green);

  const { option } = await inquirer.prompt(preguntas);
  return option;
};

export const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "option",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n");
  const { option } = await inquirer.prompt(question);
  return option;
};

export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

export const listadoTareaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

export const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

export const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};
