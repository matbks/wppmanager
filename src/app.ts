import { create, Whatsapp, Message } from 'venom-bot';

  create({
    session: 'WppManager', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client:Whatsapp) {
  client.onMessage((message:any) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result:any) => {
          console.log('Result: ', result); 
        })
        .catch((erro:any) => {
          console.error('Error when sending: ', erro); 
        });
    }
  });
}