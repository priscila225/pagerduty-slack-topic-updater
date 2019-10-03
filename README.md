# pagerduty-slack-topic-updater

A simple and clean nodeJS function to read the pagerduty on-call calendar schedule and update the slack topics channels automatically

## Install dependencies

*   yarn add moment
*   yarn add node-pagerduty
*   yarn add slack-topic-updater
*   yarn add sync-request

## Slack Authorization 

To get your Slack token, create an app from api.slack.com/apps. After making it to the app management screen, from Features: OAuth & Permissions, and then under Scopes, you'll need to select:

*   channels:write (to set the topic)
*   channels:read (read topic from public channels)
*   channels:history (to search for the topic update message)
*   groups:write (to set the topic in private channels)
*   groups:read (read topic from private channels)
*   groups:history (to search for the topic update message in private channels)
*   chat:write:user (to delete the topic update message)

IMPORTANT NOTE: The app will only be able to access channels that you are in (this applies to both public and private channels).

Once you've added the scopes, follow the instructions under Settings: Install App. You should be provided with an OAuth Access Token, which is what you'll need to send through to this module. Bot user tokens are NOT SUPPORTED by the channels.setTopic endpoint, so they can't be used here - you must use a user token instead. Reference about the user token from docs: https://api.slack.com/methods/channels.setTopic

## Run the bot
SLACK_API_KEY=xoxp-your-api-key-here CHANNEL_ID=your-slack-channel-id-here PAGERDUTY_API_KEY=your-pd-api-here node index.js
