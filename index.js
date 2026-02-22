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
