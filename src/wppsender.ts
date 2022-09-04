import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js"
import { create, Whatsapp, Message } from "venom-bot"
import screens from './screens.json'
let lastChoice = ''

class WppManager {

    public client: Whatsapp
    private menu = screens.menu.menuButtons.toString()


    constructor() {
        this.initialize(this)
    }


    async sendText(to: string,

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


    private initialize(that: this) {

        create({ session: "WppManager", multidevice: true })
            .then((client) => start(client))
            .catch((error) => console.error(error))

        function start(client: Whatsapp) {          
            that.client = client
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
    }
}

export default WppManager