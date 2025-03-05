import fs from "fs";
import { v4 as uuid } from "uuid";
import { db } from "../database/firebase.js";


const getAllPals = async (filterParams) => {
  try {
    let query = db.collection("pals");

    if (filterParams.type) {
      query = query.where("type", "==", filterParams.type);
    }

    const querySnapshot = await query.get();
    const pals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return pals;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};


const getOnePal = async (id) => {
  try {
    const doc = await db.collection("pals").doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error al obtener el pal:", error);
    throw error;
  }
};


const createNewPal = async (newPal) => {
  try {
    const palToInsert = {
      ...newPal,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("pals").add(palToInsert);
    return { id: docRef.id, ...palToInsert };
  } catch (error) {
    console.error("Error al crear el pal:", error);
    throw error;
  }
};


const updateOnePal = async (palId, body) => {
  try {
    const docRef = db.collection("pals").doc(palId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    const updatedPal = {
      ...doc.data(),
      ...body,
    };

    await docRef.update(updatedPal);
    return { id: doc.id, ...updatedPal };
  } catch (error) {
    console.error("Error al actualizar el pal:", error);
    throw error;
  }
};


const deleteOnePal = async (palId) => {
  try {
    const docRef = db.collection("pals").doc(palId);
    const doc = await docRef.get();
    if (!doc.exists) {
      return false;
    }
    await docRef.delete();
    return true;
  } catch (error) {
    console.error("Error al eliminar el pal:", error);
    throw error;
  }
};


function existePal(arrayPals, palId) {
    return arrayPals.some(pal => pal.id === palId);
}

export { getAllPals, getOnePal, createNewPal, updateOnePal, deleteOnePal };
