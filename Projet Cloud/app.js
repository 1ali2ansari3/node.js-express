const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;
const dataFilePath = "data.json";

app.use(express.json());



app.use((req, res, next) => {
  if (fs.existsSync(dataFilePath)) {
    next();
  } else {
    res.status(500).send("Le fichier de données est introuvable.");
  }
});




app.get("/items", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  res.json(data);
});



app.get("/items/:name", (req, res) => {
  const name = req.params.name;
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  const item = data.find((item) => item.name === name);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("L'élément n'a pas été trouvé.");
  }
});



app.post("/items", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  const newItem = req.body;
  data.push(newItem);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  res.json(newItem);
});



app.put("/items/:name", (req, res) => {
  const name = req.params.name;
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  const itemIndex = data.findIndex((item) => item.name === name);

  if (itemIndex !== -1) {
    const updatedItem = { ...data[itemIndex], ...req.body };
    data[itemIndex] = updatedItem;
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.json(updatedItem);
  } else {
    res.status(404).send("L'élément n'a pas été trouvé.");
  }
});


app.delete("/items/:name", (req, res) => {
  const name = req.params.name;
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  const itemIndex = data.findIndex((item) => item.name === name);

  if (itemIndex !== -1) {
    const deletedItem = data.splice(itemIndex, 1)[0];
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.json(deletedItem);
  } else {
    res.status(404).send("L'élément n'a pas été trouvé.");
  }
});

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
