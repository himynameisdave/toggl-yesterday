## toggl-yesterday

Simple script to fetch a report of what I did yesterday to post in Slackbot for our daily standup report.

### Running

This is pretty hardcoded to my own projects and needs, but I guess in case I forget I should write this down.

Clone repo and then create a `.env` file at the root with the following:

```
API_TOKEN=<YOUR_TOGGLE_API_TOKEN>
```

Then `yarn install` and you should be good to go. Run `node index.js` (or `yarnpkg run go`) to run the script.

The result is something that looks like this:

```
👷 #6441 - fix a template builder related sentry issue
👷 #6369 - fix edit mode in timeline stuff
👷 #6202 - perf gainz in the survey builder
🕵 #6442 - include circle statuses in production-details
👨‍👩‍👧‍👦 Project Meetings

👌 👌 👌 COPIED TO THE CLIPBOARD WITH GREEEEAT SUCCESS! 👌 👌 👌
```

And it will actually copy that to your clipboard. Pretty handy.

---

*Created by Dave Lunny in 2017. Licensed under MIT 🖐*
