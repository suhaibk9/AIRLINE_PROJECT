const { EmailService } = require('../services/index');
async function create(req, res) {
  console.log('Body: ', req.body);
  try {
    const newTicket = await EmailService.createTicket({
      recipientEmail: req.body.recipientEmail,
      subject: req.body.subject,
      content: req.body.content,
    });
    res.status(201).json(newTicket);
  } catch (err) {
    console.log('In controller', err);
    res.status(500).json({ message: err.message });
  }
}
module.exports = {
  create,
};
