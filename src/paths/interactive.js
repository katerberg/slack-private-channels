'use strict';

const request = require('request-promise-native');
const Slack = require('slack');

module.exports = path => server => server.post(path, interactive);

const credentials = require('../../credentials.json');

function interactive(req, res) {
  try {
    const parsed = JSON.parse(req.body.payload);
    const channelToJoin = parsed.actions[0].value;
    const bot = new Slack({token: credentials.TOKEN});
    bot.chat.postMessage({
      channel: channelToJoin,
      text: `Invite request from <@${parsed.user.id}>! Use \`/invite <@${parsed.user.id}>\` to accept (anyone here can do this)!`,
    }).then(() => {
      const options = {
        method: 'POST',
        uri: parsed.response_url,
        body: {
          text: 'Private Channels List',
          blocks: [{
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `
Join request sent. Please wait while the request is processed.

Remember that private channels are for the stated audience unless otherwise specified and that there is a strong expectation of privacy in these channels.

What is said in there stays there.

This is not an excuse to be the kind of person your mother would be ashamed of.
`,
            },
          }],
        },
        json: true,
      };
      request(options).then(res => {
        console.log('response from join message response'); //eslint-disable-line no-console
        console.log(res); //eslint-disable-line no-console
      }, (e) => {
        console.log('error from join message response'); //eslint-disable-line no-console
        console.error(e); //eslint-disable-line no-console
      });
    }).catch(e => {
      if (e.message === 'channel_not_found') {
        console.warn('channel not found error'); //eslint-disable-line no-console
        console.log(parsed); //eslint-disable-line no-console
        bot.chat.postMessage({
          channel: credentials.SLACK_ADMINS,
          text: `Invite request to join <@${parsed.actions[0].value}> failed. Please verify that I am in that channel and investigate my setup if I am.`,
        });
      } else {
        throw e;
      }
    });
    res.send(200);
  } catch (e) {
    console.error(e); //eslint-disable-line no-console
    res.send(500, `${e}`);
  }
}
