var db = require("./db.js");

module.exports = {

  // GET /technician_schedules
  // get the whole technician_schedules table
  getAllTechnicianSchedules: function() {
    var con = db.connectToScheduleDB();
    con.query('SELECT * FROM technician_schedules',function(err,rows){
      if(err) throw err;
      console.log('\nAll data from technician_schedules table:\n');
      console.log(rows);
      // *** this wasn't working, probably because it's a return instead of a response
      return JSON.stringify(rows);
    });
  },

  // GET /technician_schedules/:id
  // get the most recent entry in technician_schedules for a given user_id
  getTechnicianSchedule: function(user_id) {
    var key = user_id;
    var queryString = 'SELECT * FROM technician_schedules ' +
                      'WHERE user_id = ? ' +
                      'ORDER BY created_at DESC ' +
                      'LIMIT 1';
    var con = db.connectToScheduleDB();
    con.query(queryString, [key], function(err,rows){
      if(err) throw err;
      console.log('\nSchedule of Tech with user_id = ' + user_id + ':');
      console.log(rows);
    });
  },

  // POST /technician_schedules
  // create an entry in technician_schedules
  // (Don't forget to validate and sanitize all user input)
  createTechnicianSchedule: function(schedule) {
    var con = db.connectToScheduleDB();
    con.query('INSERT INTO technician_schedules SET ?', schedule, function(err,res){
      if(err) throw err;

      console.log('Last insert ID:', res.insertId);
    });
  }

};


// *** so far we're stealing code from here and sticking it in api.js
// *** we started with getAllTechnicianSchedules
