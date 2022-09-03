import express, { Request, Response} from "express"
import WppManager from "./wppsender"
import { appendFile } from "fs";

const wppManager = new WppManager()

const app = express()
      app.use(express.json())
      app.use( express.urlencoded( { extended:false } ))


app.get( '/status' , (req: Request, res: Response) => {

})

app.post( '/send' , async (req: Request, res: Response) => {

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