import { config } from "dotenv"
config()
import pkg from "pg"
const { Client } = pkg

const client = new Client({
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
})
export { client }

async function connectDb() {
  try {
    await client.connect()
    console.log("Connected to the database")
  } catch (e) {
    console.error("Error connecting to the database:", e)
    throw new Error("Error connecting to the database")
  }
}

connectDb()
