import praw
from urllib.parse import quote_plus

triggers = ["what is", "who is", "what are"]
reply = "[Let me google that for you](http://lmgtfy.com/?q={})"
client_id = "nFQTrQaZIbEMDQ"
client_secret = "RRbBcidEdLzr2yCkzFZ_zEiwJC6QKg"
username = "java-tar"
password = "M-1dest4000"
user_agent = "personal LMGTFY beta (by u/java-tar)"


def main():
    reddit = praw.Reddit(client_id=client_id,
                         client_secret=client_secret,
                         username=username,
                         password=password,
                         user_agent=user_agent)
    target_sub = "faketaskfcih"
    subreddit = reddit.subreddit(target_sub)
    for submission in subreddit.stream.submissions():
        process_submission(submission)


def process_submission(submission):
    if len(submission.title.split()) > 10:
        return
    normalized_title = submission.title.lower()
    for question_phrase in triggers:
        if question_phrase in normalized_title:
            url_title = quote_plus(submission.title)
            reply_text = reply.format(url_title)
            print(f"Replying to: {submission.title}")
            submission.reply(reply_text)
            break


if __name__ == "__main__":
    main()
