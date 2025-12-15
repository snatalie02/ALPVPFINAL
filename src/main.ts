import express from "express"
import { PORT } from "./utils/env-util"
import { publicRouter } from "./routes/public-api"

import { errorMiddleware } from "./middlewares/error-middleware"

// BAGIAN : SHARON
const app = express()
// BAGIAN : SHARON
app.use(express.json())

// BAGIAN : SHARON
app.use("/api", publicRouter)
// BAGIAN : SHARON


// BAGIAN : SHARON
app.use(errorMiddleware)

// BAGIAN : SHARON
app.listen(PORT || 3000, () => console.log(`Server running on port ${PORT || 3000}`))

