import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import OpenAI  from 'openai'
const PORT: number = 8000

const app: Application = express()
app.use(cors())
app.use(express.json())

const API_KEY: string = 'sk-None-uZlo9uvu1GFY7DX5XR4gT3BlbkFJrpVTDvJXSbLxK2a7fOwY'

const openai = new OpenAI({
    apiKey: API_KEY
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