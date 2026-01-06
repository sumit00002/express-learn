import express from "express";
import "dotenv/config";
// require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let data = [];
let id = 1;

// CREATE
app.post("/items", (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const newItem = { id: id++, name, price };
  data.push(newItem);

  res.status(201).json(newItem);
});

// READ ALL
app.get("/items", (req, res) => {
  res.status(200).json(data);
});

// READ ONE
app.get("/items/:id", (req, res) => {
  const item = data.find((i) => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.status(200).json(item);
});

// UPDATE
app.put("/items/:id", (req, res) => {
  const item = data.find((i) => i.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const { name, price } = req.body;

  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = price;

  res.status(200).json(item);
});

// DELETE
app.delete("/items/:id", (req, res) => {
  const index = data.findIndex((i) => i.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  data.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
