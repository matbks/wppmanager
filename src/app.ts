// Supports ES6
import { create, Whatsapp } from 'venom-bot'; 

 create({
    session: '2', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client:any) {

    console.log(start)

  client.onMessage((message:any) => {

    console.info("Incoming Message")

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