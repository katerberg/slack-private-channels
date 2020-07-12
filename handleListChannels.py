"""
Slack chat-bot Lambda handler.
"""

import json
import os
import logging
import urllib.parse
import urllib.request
import re


# Token for Slack API access
API_TOKEN = os.environ["API_TOKEN"]

# Example response
#{
#    "token": "sjdglajdg",
#    "team_id": "TEAMID",
#    "team_domain": "slalomstl",
#    "channel_id": "HKF786F4",
#    "channel_name": "slack-test",
#    "user_id": "FGJF655GG",
#    "user_name": "first.last",
#    "command": "/highfive",
#    "text": "foobar",
#    "response_url": "https://hooks.slack.com/commands/TEAMID/TRIGGER_FIRST/546gsdfakldsfg7s6gasdg",
#    "trigger_id": "TRIGGER_FIRST.12345678.aksdgnhlusadg67sdg65sadf854356"
#}

def lambda_handler(slack_event, context):
    """Handle an incoming HTTP request from a Slack chat-bot.
    """

    try:
        # We need to discriminate between events generated by
        # the users, which we want to process and handle,
        # and those generated by the bot.
        if "bot_id" in slack_event:
            logging.warn("Ignore bot event")
        else:
            logging.warn(slack_event)
        #     text = slack_event["text"].strip()
        #
        #     if not HOOK_TOKEN == slack_event["token"]:
        #         logging.warn("Token mismatch: " + slack_event["token"])
        #         return "Error: security mismatch. Please contact an administrator"
        #
        #     # Needs to start with a user to give a high five
        #     if not re.search("^<@", text):
        #         return 'Error: Try `/highfive @stefanie.thelen for being Wonder Woman` instead'
        #
        #     # Should contain more than just a username
        #     if re.search("^<@\w+?\|?[\w\d\._-]+>$", text):
        #         return "Error: Try giving a reason for the high five"
        #
        #     # This is needed to handle a bug that emerges since mobile Slack escapes channel names even though it's not supposed to
        #     text = text.replace("&lt;", "<")
        #     text = text.replace("&gt;", ">")
        #
        #     # Get the mentioned user
        #     textArr = text.split(">")
        #     # Either <@U4L466|first.last> or <@U46H6654>
        #     user_receive = textArr[0] + ">"
        #     # Chop off the <@ from the front of the user
        #     user_slug = user_receive[2:]
        #     # Chop off the end of the bracket
        #     user_slug = user_slug.split(">")[0]
        #     # Just in case we still have the deprecated users
        #     user_slug = user_slug.split("|")[0]
        #
        #     # Wrapping user_id who sent the message in escaped style
        #     user_id = "<@" + slack_event["user_id"] + ">"
        #
        #     message = user_receive;
        #     if not re.search("^ for", textArr[1]):
        #         message = message + ": "
        #     textArr.pop(0)
        #
        #     for item in textArr:
        #         message = message + item + ">"
        #     message = message[0:(len(message) - 1)]
        #
        #     values = {"text": user_id + " gave a high five to " + message}
        #     print("message came across as " + message)
        #
        #     # Construct the HTTP request that will retrieve current members
        #     gratitude_member_request = urllib.request.Request(CONVERSATION_MEMBER_URL + "?limit=" + GRATITUDE_LIMIT + "&token=" + API_TOKEN + "&channel=" + GRATITUDE_CHANNEL)
        #     gratitude_member_json = urllib.request.urlopen(gratitude_member_request).read()
        #     gratitude_member_list = json.loads(gratitude_member_json)["members"]
        #
        #     if user_slug not in gratitude_member_list:
        #         print(user_slug + " is missing from member list")
        #         print(gratitude_member_list)
        #         direct_message_text = "You were mentioned in <#" + GRATITUDE_CHANNEL + ">: " + values["text"];
        #         direct_message_request = urllib.request.Request(POST_MESSAGE_URL + "?token=" + API_TOKEN + "&channel=" + user_slug + "&text=" + urllib.parse.quote(direct_message_text))
        #         urllib.request.urlopen(direct_message_request).read()
        #     else:
        #         print(user_slug + " is in member list")
        #
        #     # Construct the HTTP request that will be sent to the Slack API.

            values = {
                "text": "Thanks for your request, we'll process it and get back to you."
            }
            request = urllib.request.Request(slack_event["response_url"])
        #     # Add a header mentioning that the text is URL-encoded.
            request.add_header(
                "Content-Type",
                "application/x-www-form-urlencoded"
            )
        #
        #     # Translate values into packet
            jsonData = json.dumps(values)
            jsonDataAsBytes = jsonData.encode('utf-8')  # needs to be bytes
            request.add_header('Content-Length', len(jsonDataAsBytes))
        #
        #     # Fire off the request!
            urllib.request.urlopen(request, jsonDataAsBytes).read()
        #
        # # Posted in #gratitude channel
        # return "Your message was posted in <#" + GRATITUDE_CHANNEL + ">"
        return "Message received";
    except:
        logging.warn("Crashed...")
        logging.warn(slack_event)
        logging.warn(context)
        return "There was an error trying to get channels. Please contact an administrator."
