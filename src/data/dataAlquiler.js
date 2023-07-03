import { dataFunction } from "./database";
let db = dataFunction.getConnection();
const createAlquilerSQL = `
  CREATE TABLE IF NOT EXISTS alquiler(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    matricula VARCHAR(10),
    cliente VARCHAR(50), 
    fecha VARCHAR(50), 
    dias INTEGER,
    precio INTEGER
    );`;
const insertAlquilerSQL =
  "INSERT INTO alquiler (matricula, cliente, fecha,dias,precio) VALUES (?,?,?,?,?)";
const updateAlquilerSQL =
  "UPDATE alquiler SET matricula = (?), cliente = (?), fecha = (?), dias = (?), precio = (?) WHERE id = (?)";
const deletetAlquilerSQL = "DELETE FROM alquiler WHERE id = (?)";

//#region //! Operaciones de Usuarios
const getAAlquiler = async (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM alquiler WHERE id=${id}`,
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          console.log("error get a alquiler", error);
          reject(error);
        },
        (_, succes) => {
          console.log("succes get a alquiler", succes);
          resolve(succes);
        }
      );
    });
  });
};

const getAlquiler = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(createAlquilerSQL, [], () => {
        tx.executeSql(
          "SELECT * FROM alquiler",
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (_, error) => {
            console.log("error get alquiler", error);
            reject(error);
          },
          (_, succes) => {
            console.log("succes get alquiler", succes);
            resolve(succes);
          }
        );
      });
    });
  });
};

const insertAlquiler = async (Alquiler) => {
  const { matricula, cliente, fecha, dias, precio } = Alquiler;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        insertAlquilerSQL,
        [matricula, cliente, fecha, dias, precio],
        (_, succes) => {
          console.log("succes insert Alquiler", succes);
          resolve(succes.insertId);
        },
        (_, error) => {
          console.log("error insert Alquiler", error);
          reject(error);
        }
      );
    });
  });
};

const editAlquiler = (Alquiler) => {
  const { id, matricula, cliente, fecha, dias, precio } = Alquiler;
  console.log("### id ###", id);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        updateAlquilerSQL,
        [matricula, cliente, fecha, dias, precio, id],
        (_, succes) => {
          console.log("succes update Alquiler", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error update Alquiler", error);
          reject(error);
        }
      );
    });
  });
};

const deleteAlquiler = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        deletetAlquilerSQL,
        [id],
        (_, succes) => {
          console.log("succes update Alquiler", succes);
          resolve(succes);
        },
        (_, error) => {
          console.log("error delete Alquiler", error);
          reject(error);
        }
      );
    });
  });
};

//#endregion
export const dataAlquiler = {
  // crud
  getAAlquiler,
  getAlquiler,
  insertAlquiler,
  editAlquiler,
  deleteAlquiler,
};
