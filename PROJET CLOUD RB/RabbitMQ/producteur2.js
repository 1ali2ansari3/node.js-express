const amqp = require("amqplib");
var connection, channel;
async function connect() {
    //Se connecter au serveur; 5672 : port par defaut du serveur
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    //Créer un nouveau canal
    channel = await connection.createChannel();
    var queue = 'file_attente2';
    var msg = 'Re-Bonjour tout le monde';
    //assertQueue() => ensures a queue exists on the server. If the queue specified by the queue variable already exists, it does nothing. If it doesn't exist, it creates the queue.
    await channel.assertQueue(queue);
    //Envoyer le message au file d'attente
    //Buffer in Node.js represents binary data
    await channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Message Envoyé : %s", msg);
}
connect();

setTimeout(function () {
    connection.close();
    process.exit(0)
}, 2000);