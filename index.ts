import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import OpenAI  from 'openai'
const PORT: number = 5000

const app: Application = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.API_KEY
})

app.post("/completions", async ( req: Request, res: Response ) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: 
                [{"role": "user", 
                "content": "Create a SQL request to " + req.body.message
                }]       
        })
        res.send(completion.choices[0].message)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT 3000'))