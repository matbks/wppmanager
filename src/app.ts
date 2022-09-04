import { create, Whatsapp } from 'venom-bot';
import express, { Request, Response, Router } from "express"
import WppManager from "./wppsender"

// import SSE from "express-sse-ts";

const wppManager = new WppManager()

create({ session: "WppManager", multidevice: true })
            .then((client) => start(client))
            .catch((error) => console.error(error))

        function start(client: Whatsapp) {          
            client = client
            client.onMessage((message: any) => {

                if (message.body === 'Hi' && message.isGroupMsg === false) {
                    client
                        .sendText(message.from, 'Welcome Venom 🕷')
                        .then((result: any) => {
                            console.log('Result: ', result); //return object success
                        })
                        .catch((erro: any) => {
                            console.error('Error when sending: ', erro); //return object error
                        });
                }

            });
        }
// const app = express()
    //   app.use(express.json())
    //   app.use( express.urlencoded( { extended:false } ))

// function start(client:Whatsapp) {
    
//   client.onMessage((message:any) => {
    
//     if (message.body === 'Hi' && message.isGroupMsg === false) {
//       client
//         .sendText(message.from, 'Welcome Venom 🕷')
//         .then((result:any) => {
//           console.log('Result: ', result); //return object success
//         })
//         .catch((erro:any) => {
//           console.error('Error when sending: ', erro); //return object error
//         });
//     }
            //  let newMessage = message.body.toLowerCase()

            //         // if (trigger.words.includes(message.body) && message.isGroupMsg === this.allowMessageGroup) {             
            //         // let triggerIndex = trigger.words.indexOf( newMessage )
            //         // let triggerAction = trigger.actions[ triggerIndex ] as keyof typeof screens
            //         console.log("newmessage")
            //         console.log(newMessage)
            //         switch (newMessage) {

            //             case "menu":

            //                 console.log("menu")
            //                 // let screen = screens.menu.menuButtons.toString()
            //                 this.sendButtons(message.from, this.menu)

            //                     .then((result) => {
            //                         console.log('Result: ', result)
            //                     })

            //                     .catch((erro) => {
            //                         console.error('Error when sending: ', erro)
            //                     });

            //                 lastChoice = "menu"

            //                 break;

            //             case "alterar minha senha":

            //                 console.log("alterar minha senha")

            //                 this.sendText(message.from, "Digite sua nova senha:")

            //                 lastChoice = "alterar minha senha"

            //                 break;

            //             case "outro usuário deseja alterar sua senha":

            //                 console.log("outro usuário deseja alterar sua senha")

            //                 this.sendText(message.from, "Digite o número de telefone do usuário")

            //                 lastChoice = "numero de telefone do usuario"
            //                 break;

            //             default:

            //                 console.log("default")
            //                 console.log(newMessage)

            //                 if (lastChoice == "alterar minha senha") {

            //                     this.sendButtons("5511932735086@c.us", this.menu)
            //                         .then((result) => {
            //                             this.sendText(message.from, "Menu de ajuda enviado ao usuário.")
            //                             console.log('Result: ', result)
            //                             lastChoice = ''
            //                         })
            //                         .catch((erro) => {
            //                             this.sendText(message.from, erro)
            //                             console.error('Error when sending: ', erro)
            //                             lastChoice = ''
            //                         });

            //                     // validNewPass()
            //                     // changePass()
            //                     this.sendText(message.from, "Senha alterada com sucesso!")

            //                     lastChoice = ''

            //                 }

            //                 if (lastChoice == "numero de telefone do usuario") {

            //                     // validNewPass()
            //                     // changePass()

            //                     console.log("outro usu")

            //                     // let userNumber = this.validNumber(newMessage)

            //                     // this.sendButtons("5511932735086@c.us", this.menu)
            //                     this.sendButtons(message.from, this.menu)
            //                         .then((result) => {
            //                             this.sendText(message.from, "Menu de ajuda enviado ao usuário.")
            //                             console.log('Result: ', result)
            //                             lastChoice = ''
            //                         })
            //                         .catch((erro) => {
            //                             this.sendText(message.from, erro)
            //                             console.error('Error when sending: ', erro)
            //                             lastChoice = ''
            //                         });


            //                 }

            //                 break;
            //         }
            //     })

//   });
// }