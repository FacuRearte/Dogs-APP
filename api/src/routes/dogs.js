const router = require("express").Router();
const { Dog } = require("../db");
// const { Temperament } = require( '../db' );
const getAllDogs = require("../controllers/getAllDogs");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const allDogs = await getAllDogs();

    if (name) {
      const filtered = allDogs.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filtered.length) return res.status(200).send(filtered);
      return res.status(404).send("The breed of dog has not been found");
    }
    return res.status(200).send(allDogs);
  }
  catch(err) {
    console.log(err)
    return res.status(404).json(err)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const allDogs = await getAllDogs();
      const filtered = allDogs.filter((elem) => elem.id == id);
      if (filtered.length > 0) return res.status(200).send(filtered);
      return res.status(404).send("The ID was not found");
    }
  }
  catch(err) {
    console.log(err)
    return res.status(404).json(err)
  }
});

router.post("/", async (req, res) => {
  try{
    const { name, height, weight, lifeSpan, createdInDb, temperament } = req.body;
    if (!name || !height || !weight)
      return res.status(404).send("The name, height and weight are required");
    const createdDog = await Dog.create({
      name,
      height,
      weight,
      lifeSpan,
      /* temperament, */
      /* createdInDb, */
    });
    await createdDog.setTemperaments(temperament);
    return res.status(200).send("The dog has been successfully created");
  }

  catch(err){
    console.log(err)
    res.status(404).json(err)
  }

});

module.exports = router;
