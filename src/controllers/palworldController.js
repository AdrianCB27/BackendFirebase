const e = require("express");
const palsService = require("../services/palsService");

const getAllPals = async (req, resp) => {
  try {
    const { type } = req.query;
    const allPals = await palsService.getAllPals({ type }); 

    resp.status(200).send(allPals); 
  } catch (error) {
    console.error("Error obteniendo los pals:", error);
    resp.status(500).send({ status: "ERROR", data: { error: "INTERNAL SERVER ERROR" } });
  }
};

const getOnePal = async (req, resp) => {
  try {
    const onePal = await palsService.getOnePal(req.params.palId);

    if (onePal) {
      resp.status(200).send(onePal);
    } else {
      resp.status(404).send({
        status: "FAILED",
        data: {
          error: "Pal not found, ID provided is not in the database",
        },
      });
    }
  } catch (error) {
    resp.status(500).send({
      status: "ERROR",
      data: {
        error: "Internal Server Error",
      },
    });
  }
};

const createNewPal = async (req, resp) => {
  const { body } = req;
  if (
    !body.name ||
    !body.type ||
    !body.abilities ||
    !body.trainerTips ||
    !body.image
  ) {
    resp.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: name,type,abilities,trainerTips,image",
      },
    });
  } else {
    try {
      const createdPal = await palsService.createNewPal(req.body);
      resp.status(201).send(createdPal);
    } catch (error) {
      resp.status(500).send({
        status: "ERROR",
        data: {
          error: "Internal Server Error",
        },
      });
    }
  }
};


const updateOnePal = async (req, resp) => {
  const palId = req.params.palId;
  const body = req.body;

  if (!body || !palId) {
    resp.status(400).send({
      status: "FAILED",
      data: {
        error: "Make sure you have sent the palId and the body request",
      },
    });
  } else {
    try {
      const updatedPal = await palsService.updateOnePal(palId, body);
      if (!updatedPal) {
        resp.status(404).send({
          status: "FAILED",
          data: {
            error: "Pal not found",
          },
        });
      } else {
        resp.status(200).send({
          status: "OK",
          data: updatedPal,
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: "ERROR",
        data: {
          error: "Internal Server Error",
        },
      });
    }
  }
};


const deleteOnePal = async (req, resp) => {
  const palId = req.params.palId;

  if (!palId) {
    resp.status(400).send({
      status: "FAILED",
      data: {
        error: "Pal ID is required",
      },
    });
    return;
  }

  try {
    const result = await palsService.deleteOnePal(palId);

    if (result) {
      resp.status(200).send({ status: "OK" });
    } else {
      resp.status(404).send({
        status: "FAILED",
        data: {
          error: `Pal with ID ${palId} not found`,
        },
      });
    }
  } catch (error) {
    resp.status(500).send({
      status: "ERROR",
      data: {
        error: "Internal Server Error",
      },
    });
  }
};

module.exports = {
  getAllPals,
  getOnePal,
  createNewPal,
  updateOnePal,
  deleteOnePal,
};
