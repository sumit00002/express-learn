import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json())
let data = [];
let id = 1;

// add items here
app.post("/items", (req,res) => {
    const {name , price} = req.body
    const newItem = {id: id++, name, price}
    data.push(newItem)
    res.status(201).json(newItem)
})

// get all items by id
app.get("/items", (req,res) => {
    res.status(200).send(data)
})
// get item by id 
app.get("/items/:id", (req,res) => {
    const item =data.find(item => item.id === parseInt(req.params.id))
    if(!item) return res.status(404).send({message: "Item not found"})
        res.status(200).send(item)
})

// updat item
app.put("/items/:id", (req,res) => {
    const item =data.find(item => item.id === parseInt(req.params.id))
    if(!item) return res.status(404).send({message: "Item not found"})
    const {name, price} = req.body
    item.name = name
    item.price = price
    res.status(200).send(item)

})

//delete item
app.delete("/items/:id", (req,res) => {
    const itemIndex = data.findIndex(item => item.id === parseInt(req.params.id))
    if(itemIndex === -1) return res.status(404).send({message: "Yem not found"})
        data.splice(itemIndex, 1)
        return res.status(204).send('item deleted')
})

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}...`);
});
