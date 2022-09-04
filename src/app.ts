// Supports ES6
import venom, { create, Whatsapp } from 'venom-bot'; 

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client: any) => start(client))
  .catch((erro: any) => {
    console.log(erro);
  });

function start(client:any) {
  client.onMessage((message:any) => {
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