const express = require('express');
const amqlib = require('amqplib');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const app = express();
const { GMAIL_EMAIL, GMAIL_PASS } = require('./config/server-config');
const { EmailService } = require('../src/services/index');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);
async function connectToQueue() {
  try {
    const connection = await amqlib.connect(ServerConfig.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('email-queue');
    channel.consume('email-queue', (message) => {
      //Received message:  {"subject":"Booking Confirmed for Flight ","text":"Your booking for flight confirmed. Your booking id is undefined","recipientEmail":"suhaib.text@gmail.com"}
      //   EmailService.sendEmail(from,to,subject,text);
      const meg = JSON.parse(message.content.toString());
      EmailService.sendEmail(
        GMAIL_EMAIL,
        meg.recipientEmail,
        meg.subject,
        meg.text
      );
      console.log('Received message: ', message.content.toString());
      channel.ack(message);
    });
  } catch (err) {
    console.log('Error in connecting to the queue', err);
  }
}
app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  connectToQueue();
});
//sudo npx sequelize db:create
//sudo npx sequelize db:migrate
