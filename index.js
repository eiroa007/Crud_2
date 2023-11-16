//https://www.mongodb.com/docs/manual/reference/method/js-collection/

//Importaciones
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./utils/db");
const Model = require("./models/modelo.model");
const Usar = require("./models/usar.model");

//Server
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//Connect DB
connect();

//Router
const router = express.Router();

//Routes
router.get("/model", async (req, res) => {
  try {
    const model = await Model.find();
    return res.status(200).json(model);
  } catch (error) {
    return res.status(404).json("Model not found", error);
  }
});

router.get("/usar", async (req, res) => {
  try {
    //Con populate, populamos la propiedad products para que transforme los id's de productos en los productos enteros
    const usar = await Usar.find().populate("model");
    return res.status(200).json(usar);
  } catch (error) {
    return res.status(404).json("Usar not found", error);
  }
});

router.post("/model", async (req, res) => {
  try {
    const newModel = new Model(req.body);
    await newModel.save();
    return res.status(201).json(newModel);
  } catch (error) {
    return res.status(500).json("Failed creating model", error);
  }
});

router.post("/usar", async (req, res) => {
  try {
    const newUsar = new Usar(req.body);
    await newUsar.save();
    return res.status(201).json(newUsar);
  } catch (error) {
    return res.status(500).json("Failed creating usar", error);
  }
});
//FIND BY NAME
router.get("/videogames", async (req, res) => {
  try {
    const usar = await Usar.findOne({ name: "Videojuegos" }).populate("model");
    return res.status(200).json(usar);
  } catch (error) {
    return res.status(404).json("Usar not found", error);
  }
});
//FIND BY NAME QUERY
router.get("/search/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const usar = await Usar.findOne({ name: name }).populate("model");
    return res.status(200).json(usar);
  } catch (error) {
    return res.status(404).json("Usar not found", error);
  }
});
//MAS DE 20
router.get("/model/optimum", async (req, res) => {
  try {
    const model = await Model.find({ quality: { $gt: 3 } });
    return res.status(200).json(model);
  } catch (error) {
    return res.status(404).json("Model not found");
  }
});
//ORDENADO POR CALIDAD
router.get("/model/ordered", async (req, res) => {
  try {
    const model = await Model.find().sort({ quality: -1 });
    return res.status(200).json(model);
  } catch (error) {
    return res.status(404).json("Model not found");
  }
});

//Usamos las rutas
server.use("/", router);

//Recuperamos el puerto
const PORT = process.env.PORT;

//Listen
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
