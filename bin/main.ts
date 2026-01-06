import express from "express"

import { devRouter } from "./routes/dev-api"

import { PORT } from "./utils/env-util"
import { publicRouter } from "./routes/public-api"
import { privateRouter } from "./routes/private-api"
import { errorMiddleware } from "./middlewares/error-middleware"

import cron from "node-cron"
import { StreakService } from "./services/streak-service"

// Reset streak flags setiap hari jam 00:00
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Reset daily streak flags (WIB)")
  await StreakService.resetDailyStreakFlags()
}, {
  timezone: "Asia/Jakarta"
})
// cron.schedule("0 0 * * *", async () => {
//   console.log("Running daily streak reset...")
//   await StreakService.resetDailyStreakFlags()
//   console.log("Streak flags reset complete!")
// })

// BAGIAN : SHARON
const app = express()
// BAGIAN : SHARON
app.use(express.json())

if (process.env.NODE_ENV !== "production") {
  app.use("/api/dev", devRouter)
}

// BAGIAN : SHARON
app.use("/api", publicRouter)
// BAGIAN : SHARON
app.use("/api/private", privateRouter) // Semua request /api/private diarahkan ke privateRouter

// BAGIAN : SHARON
app.use(errorMiddleware)

// BAGIAN : SHARON
app.listen(PORT || 3000, () => console.log(`Server running on port ${PORT || 3000}`))
