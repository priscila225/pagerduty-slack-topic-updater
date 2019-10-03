const moment = require('moment');
const Client = require('node-pagerduty');

function getSchedule() {
	let dateNow = moment().format('YYYY-MM-DDTHH:mm:ss');
	let dateSum = moment(dateNow).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss');

	const apiToken = process.env.PAGERDUTY_API_KEY;
	const pdClient = new Client(apiToken);

	let scheduleID = process.env.PAGERDUTY_SCHEDULE_ID;
	let query = {
		time_zone: 'UTC',
		since: dateNow,
		until: dateSum
	};
	// Get PD schedules
	return pdClient.schedules.getSchedule(scheduleID, query)
}

module.exports = {
	getSchedule,
};
