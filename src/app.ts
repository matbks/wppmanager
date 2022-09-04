import express, { Request, response, Response} from "express"
import WppManager from "./wppsender"
import { appendFile } from "fs";

const wppManager = new WppManager()

const app = express()
      app.use(express.json())
      app.use( express.urlencoded( { extended:false } ))

console.log("vou dar app get")

app.get( '/' , (req: Request, res: Response) => {
    console.log("vou dar app get")
    return response.json({message:'Server is up!'})
})

app.post( '/send' , async (req: Request, res: Response) => {

    console.log("vou dar send")
    let dateTime = new Date()
    let dateTimeStr = dateTime.toString()

    try {
        const { number, message } = req.body
        await wppManager.sendText( number, message )
    return res.status(200).json()
    }
    catch(error){
        console.error(error)
        res.status(500).json({ status: "error", message: error })
     }
})

app.listen(5000)