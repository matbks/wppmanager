import express, { Request, Response, Router } from "express"
import WppManager from "./wppsender"
import { appendFile } from "fs";

const wppManager = new WppManager()
var port = process.env.PORT || 5000
var router = express.Router()

const app = express()
      app.use(express.json())
//   app.use( express.urlencoded( { extended:false } ))

// app.get('/', (request, response) => {
//     response.send('Hello world!');
// });

app.post('/send', (req, res) => {

    console.log("/send");

    try {
        const { number, message } = req.body.toLowerCase()
        console.log(number)
        console.log(message)
        wppManager.sendText(number, message)
        return res.status(200).json();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error })
    }
})

app.listen(port, () => {
    console.log(`App is listening at ${port}`)
});
