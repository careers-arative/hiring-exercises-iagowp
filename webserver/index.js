const express = require('express');
const moment = require('moment');
const GetDashboardDataUseCase = require('../src/main/ad-dashboard/get-dashboard-data-use-case.js');
const Config = require('./constants');


const app = express();

// Serve the static frontend files
app.use(express.static('static'));

// The endpoint for the dashboard data
app.get('/api/v0/performance/:startDate/:endDate', async (req, res) => {
  let { startDate, endDate } = req.params;

  if (!startDate || !endDate) {
    res.status(400).send({
      success: false,
      error: `Missing "startDate" or "endDate" parameter (${Config.DATE_FORMAT})`,
    });
  }

    let startMoment = moment(startDate, Config.DATE_FORMAT);
  let endMoment = moment(endDate, Config.DATE_FORMAT);


  let performanceData = new GetDashboardDataUseCase().calculateDashboardData(
    'someUserId',
    startMoment,
    endMoment,
  );

  res.send({
    success: true,
    interpretedStart: startMoment.format(),
    interpretedEnd: endMoment.format(),
    data: performanceData,
  });
});

// Fire it up
app.listen(Config.PORT, () => {
  console.log(`Server ready on port ${Config.PORT}`);
});
