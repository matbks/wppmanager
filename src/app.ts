import express, { Request, Response, Router } from "express"
import WppManager from "./wppsender"
import { appendFile } from "fs";
import SSE from "express-sse-ts";

const wppManager = new WppManager()
var port = process.env.PORT || 5000
var router = express.Router()

const app = express()
      app.use(express.json())
      app.use( express.urlencoded( { extended:false } ))

app.post('/send', (request, response) => {

    try { 
                        let { number, message } = request.body
                        number = number.toLowerCase();
                        console.log(number)
                        console.log(message)
                        wppManager.sendText(number, message)
                        return response.sendStatus(200).json();
                    }
                    catch (error) {
                        console.error(error);
                        response.send(500).json({ status: "error", message: error })
                    }
          
    response.send('Hello world!');

    
})

// const es = new EventSource('/events'); // Create EventSource

wppManager.client.onMessage( (message) => {

    console.log("chegou")

// Listen to event with name 'message'
// es.onmessage = event => {
//     // Do something width event.
// }

// // Listen to event with name 'eventName'
// es.addEventListener('eventName', event => {
//     // Do something width event.
});

// app.route('/events')
//   .all(function (req, res, next) {
//     // runs for all HTTP verbs first
//     // think of it as route specific middleware!
//   })
//   .get(function (req, res, next) {
//     res.json({})
//   })
//   .post(function (req, res, next) {
//     try { 
//                 const { number, message } = req.body.toLowerCase()
//                 console.log(number)
//                 console.log(message)
//                 wppManager.sendText(number, message)
//                 return res.send(200).json();
//             }
//             catch (error) {
//                 console.error(error);
//                 res.send(500).json({ status: "error", message: error })
//             }
//   })

router.post('/send', (req, res) => {
    try { 
                        const { number, message } = req.body.toLowerCase()
                        console.log(number)
                        console.log(message)
                        wppManager.sendText(number, message)
                        return res.sendStatus(200).json();
                    }
                    catch (error) {
                        console.error(error);
                        res.sendStatus(500).json({ status: "error", message: error })
                    }
          })
// })
// app.post('/send', (req, res) => {

//     console.log("/send");

//     try { 
//         const { number, message } = req.body.toLowerCase()
//         console.log(number)
//         console.log(message)
//         wppManager.sendText(number, message)
//         return res.send(200).json();
//     }
//     catch (error) {
//         console.error(error);
//         res.send(500).json({ status: "error", message: error })
//     }
// })

// app.listen(port, () => {
//     console.log(`App is listening at ${port}`)
// });
app.listen(port)