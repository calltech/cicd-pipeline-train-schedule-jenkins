var express = require('express');
var router = express.Router();

var dbPromise;

function getDb() {
  if (!dbPromise) {
    dbPromise = import('lowdb/node').then(function(mod) {
      return mod.JSONFilePreset('data/trains.json', { trains: [] });
    });
  }
  return dbPromise;
}

/* GET trains listing. */
router.get('/', async function(req, res) {
  var db = await getDb();
  var trains = db.data.trains.slice().sort(function(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  res.send(trains);
});

module.exports = router;
