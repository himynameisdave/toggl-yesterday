## toggl-yesterday

Simple script to fetch a report of what I did yesterday to post in Slackbot for our daily standup report.

### Running

This is pretty Hardcoded to my own projects and needs, but I guess in case I forget I should write this down.

Clone repo and then create a `.env` file at the root with the following:

```
API_TOKEN=<YOUR_TOGGLE_API_TOKEN>
```

Then `yarn install` and you should be good to go. Run `node index.js` (or `yarnpkg run go`) to run the script.

The result is something that looks like this:
