import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import { createAbula } from "../../Abula.js/index"

const app = createAbula(new Hono());

app.get('/', (c: Context) => {
  return c.text('Hello Hono!')
})

app.gets(['/en', '/ja'], (c: Context) => {
  return c.text((1 + 2).toString())
})

const port = 3000
console.log(`Server is running on port ${port}`)
app.showRoutes()

serve({
  fetch: app.fetch,
  port
})
