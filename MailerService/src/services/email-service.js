const { TicketRepository } = require('../repositories/index');
const ticketRepo = new TicketRepository();
const { EmailConfig } = require('../config/index');
const AppError = require('../utils/errors/app-error');
async function sendEmail(from, to, subject, text) {
  try {
    const resp = await EmailConfig.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
    });
    return resp;
  } catch (err) {
    console.log(err);
    throw new AppError('Email not sent', 500);
  }
}
async function createTicket(data) {
  try {
    const newTicket = await ticketRepo.create(data);
    return newTicket;
  } catch (err) {
    console.log('ERROR IN SERVICE', err);
    throw new AppError('Ticket not created', 500);
  }
}
async function pendingEmails() {
  try {
    const pendingTickets = await ticketRepo.getPendingTickets();
    return pendingTickets;
  } catch (err) {
    console.log('In service', err);
    throw new AppError('Pending tickets not found', 500);
  }
}
module.exports = {
  sendEmail,
  createTicket,
  getPendingTickets: pendingEmails,
};
