'use strict';

const request = require('request-promise-native');

module.exports = path => server => server.post(path, listPrivate);

// const credentials = require('../../credentials.json');


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

function listPrivate(req, res) {
  try {
    const privateChannelsData = require('../../private-channels.json');
    console.log('listPrivate called'); //eslint-disable-line no-console
    // const chan = {
    //   id: '12345',
    //   name: 'private-ta',
    //   description: 'Room for discussing potential hires, including salary information, and open critical analysis of people who might come into the space.',
    // };
    const options = {
      method: 'POST',
      uri: req.body.response_url,
      body: {
        text: 'Unable to show private channels',
        blocks: [{
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'These channels are private to disallow previewing (view without join).\n\n Available private channels: ',
          },
        },
        {
          type: 'divider',
        },
        ...Object.keys(privateChannelsData.channels).map(chanKey => {
          const chan = privateChannelsData.channels[chanKey];
          const accessory = chan.accessible ? {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Join',
            },
            value: 'view_alternate_1',
          } : undefined;
          return {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*#${chanKey}*\n${chan.description}`,
            },
            accessory,
          };
        }),
        ],
      },
      // text: JSON.stringify(privateChannelsData),
      // },
      json: true, // Automatically stringifies the body to JSON
    };

    request(options).then(res => {
      console.log('response from respones'); //eslint-disable-line no-console
      console.log(res); //eslint-disable-line no-console
    }, (e) => {
      console.log('error from response'); //eslint-disable-line no-console
      console.error(e); //eslint-disable-line no-console
    });

    res.send(200);
  } catch (e) {
    console.error(e); //eslint-disable-line no-console
    res.send(500, `${e}`);
  }
}
