const slackTopicUpdater = require('slack-topic-updater');

function getInfoEndpoint(channelID) {
	const channelEndpoint = isPrivate(channelID) ? 'groups.info' : 'channels.info';
	return 'https://slack.com/api/' + channelEndpoint + '?token=' + process.env.SLACK_API_KEY + '&channel=' + channelID
}

const isPrivate = (channelId) => {
	return 'G' === channelId.substring(0, 1);
};

function isValidResponse(response) {
	return !(!response || !response.ok);
}

async function updateTopic(topic, channelID) {
	await slackTopicUpdater.update({
		token: process.env.SLACK_API_KEY,
		channel: channelID,
		topic: topic
	});
}

module.exports = {
	getInfoEndpoint,
	isValidResponse,
	isPrivate,
	updateTopic,
};
