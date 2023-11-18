const amqp = require("amqplib");
var connection, channel, channel2;
async function connect() {
    //Se connecter au serveur 
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    //Créer un nouveau canal
    channel = await connection.createChannel();
    var queue = 'file_attente1';
    await channel.assertQueue(queue);
    //Recevoir le message depuis la file d'attente
    await channel.consume(queue, (msg) => {
        console.log(" [x] Received %s", msg.content.toString());
        //The channel.ack(msg) function is responsible for acknowledging the message to RabbitMQ. Acknowledging a message in RabbitMQ means that the consumer (your code) has successfully received and processed the message. Once a message is acknowledged, RabbitMQ will remove it from the queue.
        //channel.ack(msg);
    });

    channel2 = await connection.createChannel();
    var queue2 = 'file_attente2';
    await channel2.assertQueue(queue2);
    //Recevoir le message depuis la file d'attente
    await channel2.consume(queue2, (msg) => {
        console.log(" [x] Received %s", msg.content.toString());
        //The channel.ack(msg) function is responsible for acknowledging the message to RabbitMQ. Acknowledging a message in RabbitMQ means that the consumer (your code) has successfully received and processed the message. Once a message is acknowledged, RabbitMQ will remove it from the queue.
        //channel.ack(msg);
    });
}
connect();