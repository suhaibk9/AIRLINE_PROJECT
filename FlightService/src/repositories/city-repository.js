const CrudRepository = require('./crud-repository');
class CityRepository extends CrudRepository {
  constructor(model) {
    super(model);
  }
}
module.exports = CityRepository;
