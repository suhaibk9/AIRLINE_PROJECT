const CrudRepository = require('./crud-repository');
const { Ticket } = require('../models');
class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }
    async getPendingTickets() {
        return await this.model.findAll({
        where: {
            status: 'PENDING',
        },
        });
    }
}
module.exports = TicketRepository;
