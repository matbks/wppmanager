// Supports ES6
import { create, Whatsapp } from 'venom-bot'; 

 create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client: Whatsapp) => start(client))
  .catch((erro: any) => {
    console.log(erro);
  });

function start(client:any) {
  client.onMessage((message:any) => {
    console.log("onmessageReceived")
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result:any) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro:any) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}