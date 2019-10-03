const request = require('sync-request');
const slack = require('./slack');
const pagerDuty = require('./pagerduty');
const moment = require('moment');

function updateChannel(channelID) {
	// Get the info endpoint according with type of channel
	// public or private
	let infoEndpoint = slack.getInfoEndpoint(channelID);
	// Read slack channel to get the current topic
	let infoResponse = request('GET', infoEndpoint);
	//Check if the response is valid
	let response = JSON.parse(infoResponse.body);
	if (slack.isValidResponse(response)) {
		let currentTopic = slack.isPrivate(channelID) ? response.group.topic.value : response.channel.topic.value;
		// Check if current topic is null
		if (currentTopic === null) {
			return
		}
		// Get PD schedule oncall name and update topic
		pagerDuty.getSchedule().then(res => {
			setTopic(res, currentTopic, channelID)
		})
	}
}

function setTopic(pagerDutyResult, currentTopic, channelID) {
	let response = JSON.parse(pagerDutyResult.body);
	if (response == null) {
		console.log('Empty response from PD');
		return
	}
	// Read oncall name from final schedule
	let onCallName = response.schedule.final_schedule.rendered_schedule_entries[0].user.summary;

	if (onCallName) {
		// Create topic message here
		let topic = moment().format('MM') + '/' + moment().format('DD') + ' On-call: ' + onCallName;

		if (currentTopic !== topic) {
			console.log('update done for slack topic ID: ' + channelID);
			slack.updateTopic(topic, channelID)
		}
	}
}

// Call the channels IDs you want here
// Could be public or private channels
// This information is public on your workspace
// TODO: adapt to pass more than one channel and split, for now you can call updateChannel with another ID after this one
updateChannel(process.env.CHANNEL_ID);

