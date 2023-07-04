import React, { useState, createContext, useReducer } from "react";
import { dataAlquiler } from "../data/dataAlquiler";
//! Traemos los datos que hayan
const getAlquiler = async () => {
  const Alq = await dataAlquiler.getAlquiler();
  return Alq;
};

let Alquileres = [];

getAlquiler().then((alquiler) => {
  alquiler.map((alquilerito) => {
    Alquileres.push({
      id: alquilerito.id,
      matricula: alquilerito.matricula,
      cliente: alquilerito.cliente,
      fecha: alquilerito.fecha,
      dias: alquilerito.dias,
      precio: alquilerito.precio,
    });
  });
});

const actions = {
  createAlquiler(state, action) {
    const elAlquiler = action.payload;
    console.log("elEstado de Alquiler", state);
    // guardar el usuario en la db

    dataAlquiler.insertAlquiler(elAlquiler).then((insertedId) => {
      elAlquiler.id = insertedId;
    });
    return [...state, elAlquiler];
  },
  updateAlquiler(state, action) {
    const AlquilerUpdated = action.payload;
    // update del usuario en la db

    dataAlquiler.editAlquiler(AlquilerUpdated);
    return [
      ...state.map((alquilerito) =>
        alquilerito.id === AlquilerUpdated.id ? AlquilerUpdated : alquilerito
      ),
    ];
  },
  deleteAlquiler(state, action) {
    const AlquilerDelete = action.payload;
    // Borrar el usuario de la db
    dataAlquiler.deleteAlquiler(AlquilerDelete.id);
    return [...state.filter((user) => user.id !== AlquilerDelete.id)];
  },
  deleteAllState(state, action) {
    dataAlquiler.deleteAllAlquiler();
    return [];
  },
};

const AlquilerContext = createContext();
export const AlquilerProvider = (props) => {
  const reducer = (state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  };

  const [state, dispatch] = useReducer(reducer, Alquileres);

  return (
    <AlquilerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AlquilerContext.Provider>
  );
};
export default AlquilerContext;
