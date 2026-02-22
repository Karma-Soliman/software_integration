import express from "express"
import { client } from "./database.js"
const app = express()
app.use(express.json())

app.post("/items", async (req, res) => {
  const { name, description } = req.body

  try {
    const result = await client.query(
      "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
      [name, description],
    )
    res.status(201).json(result.rows[0])
  } catch (e) {
    console.error("Error creating item:", e)
    res.status(500).json({ error: "Error creating item" })
  }
})

app.get("/items", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM items")
    res.status(200).json(result.rows)
  } catch (e) {
    console.error("Error fetching items:", e)
    res.status(500).json({ error: "Error fetching items" })
  }
})

app.get("/items/:id", async (req, res) => {
  const { id } = req.params

  try {
    const result = await client.query("SELECT * FROM items WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" })
    }

    res.status(200).json(result.rows[0])
  } catch (e) {
    console.error("Error fetching item:", e)
    res.status(500).json({ error: "Error fetching item" })
  }
})