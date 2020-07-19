'use strict';

const request = require('request-promise-native');
const Slack = require('slack');

module.exports = path => server => server.post(path, interactive);

const credentials = require('../../credentials.json');


//  Example request
// {
//     "token": "sjdglajdg",
//     "team_id": "TEAMID",
//     "team_domain": "slalomstl-dev",
//     "channel_id": "HKF786F4",
//     "channel_name": "slack-test",
//     "user_id": "FGJF655GG",
//     "user_name": "first.last",
//     "command": "/list-private",
//     "text": "foobar",
//     "response_url": "https://hooks.slack.com/commands/TEAMID/TRIGGER_FIRST/546gsdfakldsfg7s6gasdg",
//     "trigger_id": "TRIGGER_FIRST.12345678.aksdgnhlusadg67sdg65sadf854356"
// }

// const {TOKEN} = credentials;

function interactive(req, res) {
  try {
    // credentials.TOKEN;
    const bot = new Slack({token: credentials.TOKEN});
    bot.api.postMessage({
      channel: channel.id,
      text: `Invite request from <@${argv.user_id}>! Use \`/invite <@${argv.user_id}>\` to accept (anyone here can do this)!`,
    }).then(() => {
      // chat.postMessageAsync({
      //   token: TOKEN,
      //   channel: channel.id,
      //   text: `Invite request from <@${argv.user_id}>! Use \`/invite <@${argv.user_id}>\` to accept (anyone here can do this)!`,
      // }).then(() => ({
      bot.api.postMessage({
        channel: 'FGJF655GG',
        text: `
Join request sent. Please wait while the request is processed.

Remember that private channels are for the stated audience unless otherwise specified and that there is a strong expectation of privacy in these channels.

What is said in there stays there.

This is not an excuse to be the kind of person your mother would be ashamed of.
`,
      });
    });
    // const options = {
    //   method: 'POST',
    //   uri: req.body.response_url,
    //   body: {
    //   },
    //   json: true,
    // };
    //
    // request(options).then(res => {
    //   console.log('response from respones'); //eslint-disable-line no-console
    //   console.log(res); //eslint-disable-line no-console
    // }, (e) => {
    //   console.log('error from response'); //eslint-disable-line no-console
    //   console.error(e); //eslint-disable-line no-console
    // });
    // console.log('interactive happened'); //eslint-disable-line no-console
    res.send(200);
  } catch (e) {
    console.error(e); //eslint-disable-line no-console
    res.send(500, `${e}`);
  }
}
