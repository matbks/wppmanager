
import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js"
import { DEFAULT_ECDH_CURVE } from "tls"
import { create, Whatsapp, Message, SocketState } from "venom-bot"
import screens from './screens.json'
import trigger from './triggers.json'
let lastChoice = ''
// let trigger = require('./triggers.json')

// export type QRCode = { base64Qr: string }

class WppManager {

    // CONSTRUCTOR ----------+---------+-----------

    constructor() {
        this.initialize()
    }


    // PUBLIC SECTION ---------+--------+----------

    public async sendText(to: string,
        body: string) {

        let number = this.validNumber(to)

        await this.client.sendText(number, body)

    }

    async sendButtons(to: string,
        body: string) {

        let number = this.validNumber(to)

        console.log("phoneNumber", number)

        await this.client.sendButtons(number, screens.menu.menuTitle, screens.menu.menuButtons, screens.menu.menuDescription)
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
    }


    // PRIVATE SECTION ----------+---------+-----------

    private client: Whatsapp
    private connected: boolean
    private allowMessageGroup: boolean = false
    private testing: boolean = true
    private menu = screens.menu.menuButtons.toString()
    // private qr: QRCode

    private async setup_answers(client: Whatsapp) {   

        console.log("setup_anw")

         client.onMessage((message) => {                       
            
            console.log("client.onmessage")

            let newMessage = message.body.toLowerCase()

            // if (trigger.words.includes(message.body) && message.isGroupMsg === this.allowMessageGroup) {             
            // let triggerIndex = trigger.words.indexOf( newMessage )
            // let triggerAction = trigger.actions[ triggerIndex ] as keyof typeof screens
            console.log("newmessage")
            console.log(newMessage)
            switch (newMessage) {

                case "menu":

                    console.log("menu")
                    // let screen = screens.menu.menuButtons.toString()
                    this.sendButtons(message.from, this.menu)

                        .then((result) => {
                            console.log('Result: ', result)
                        })

                        .catch((erro) => {
                            console.error('Error when sending: ', erro)
                        });

                    lastChoice = "menu"

                break;

                case "alterar minha senha":

                    console.log("alterar minha senha")

                    this.sendText(message.from, "Digite sua nova senha:")

                    lastChoice = "alterar minha senha"

                break;

                case "outro usuário deseja alterar sua senha":

                    console.log("outro usuário deseja alterar sua senha")

                    this.sendText(message.from, "Digite o número de telefone do usuário")

                    lastChoice = "numero de telefone do usuario"
                break;

                default:

                    console.log("default")
                    console.log(newMessage)

                    if (lastChoice == "alterar minha senha") {

                        this.sendButtons("5511932735086@c.us", this.menu)
                            .then((result) => {
                                this.sendText(message.from, "Menu de ajuda enviado ao usuário.")
                                console.log('Result: ', result)
                                lastChoice = ''
                            })
                            .catch((erro) => {
                                this.sendText(message.from, erro)
                                console.error('Error when sending: ', erro)
                                lastChoice = ''
                            });

                        // validNewPass()
                        // changePass()
                        this.sendText(message.from, "Senha alterada com sucesso!")

                        lastChoice = ''

                    }

                    if (lastChoice == "numero de telefone do usuario") {

                        // validNewPass()
                        // changePass()

                        console.log("outro usu")

                        // let userNumber = this.validNumber(newMessage)

                        // this.sendButtons("5511932735086@c.us", this.menu)
                        this.sendButtons(message.from, this.menu)
                            .then((result) => {
                                this.sendText(message.from, "Menu de ajuda enviado ao usuário.")
                                console.log('Result: ', result)
                                lastChoice = '' 
                            })
                            .catch((erro) => {
                                this.sendText(message.from, erro)
                                console.error('Error when sending: ', erro)
                                lastChoice = '' 
                            });

                          
                    }

                    break;
            }
        });

    } 

    private validNumber(phoneNumber: string) {

        phoneNumber = parsePhoneNumber(phoneNumber, "BR")
            ?.format("E.164")
            ?.replace("+", "") as string

        phoneNumber = phoneNumber.includes("55")
            ? phoneNumber
            : `55${phoneNumber}`

        phoneNumber = phoneNumber.includes("@c.us")
            ? phoneNumber
            : `${phoneNumber}@c.us`

        return phoneNumber

    }

    private initialize() {

        // const qr = (base64Qr: string) => {
        //     this.qr = { base64Qr }
        // }

        const status = (statusSession: string) => {

            this.connected = ["isLogged",
                "qrReadSucess",
                "chatIsAvailable"].includes(statusSession)
        }

        // const start = async (client: Whatsapp) => {

        //     this.client = client

        //      await this.setup_answers(client)

        //     if (this.testing) {

        //         console.info("Starting conversation for testing ...")

        //         this.sendText("5511932735086", "Cardápio")

        //     }

        // }

        function start(client:Whatsapp) {
            client.onMessage((message) => {
              if (message.body === 'menu' && message.isGroupMsg === false) {
                client
                  .sendText(message.from, 'Welcome Venom 🕷')
                  .then((result) => {
                    console.log('Result: ', result); //return object success
                  })
                  .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                  });
              }
            });
        }

        create({ session: "ws-sender-dev", multidevice: true })
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }

}

export default WppManager