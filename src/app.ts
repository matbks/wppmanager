import express, { Request, response, Response} from "express"
import WppManager from "./wppsender"
import { appendFile } from "fs";

const wppManager = new WppManager()
var port = process.env.PORT || 5000
var router = express.Router()

const app = express()
      app.use(express.json())
      app.use( express.urlencoded( { extended:false } ))


router.use(function(req,res,next){
    console.log('something is happening.')
    next()
})

router.route('/send')
    .post( async (req: Request, res: Response) => {

        console.log("vou dar send")

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


// app.post( '/send' , async (req: Request, res: Response) => {

//     console.log("vou dar send")
//     let dateTime = new Date()
//     let dateTimeStr = dateTime.toString()

//     try {
//         const { number, message } = req.body
//         await wppManager.sendText( number, message )
//     return res.status(200).json()
//     }
//     catch(error){
//         console.error(error)
//         res.status(500).json({ status: "error", message: error })
//      }
// })

app.listen(5000)
// app.listen(0, () => console.log('Application is running'));