import express from 'express'
import router from "./routes"

const app = express();
app.use(express.json())

app.use(router)

const server = app.listen(3000, () => 'Api online on port 3000')

export default { app, server }