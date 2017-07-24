## toggl-yesterday

Simple script to fetch a report of what I did yesterday to post in Slackbot for our daily standup report.

### Running

This is pretty hardcoded to my own projects and needs, but I guess in case I forget I should write this down.

Clone repo and then create a `.env` file at the root with the following:

```
GITHUB_API_TOKEN=<YOUR_GITHUB_API_TOKEN>
TOGGL_API_TOKEN=<YOUR_TOGGL_API_TOKEN>
ZENHUB_API_TOKEN=<YOUR_ZENHUB_API_TOKEN>
```

Then `yarn install` and you should be good to go. Run `node index.js` (or `yarnpkg run go`) to run the script.

The result is something that looks like this:

```
   C O P I E D    T O    T H E    C L I P B O A R D:

   =====>   👷 Building out that sweet new feature #4433
   =====>   👷 Resolving some CR feedback (#1234)
   =====>   👨‍👩‍👧‍👦 Feedback project meeting
   =====>   🍔 Lunch and learned

   ___T_
  | o o |
  |__-__|   Stop SLACKing off, human!
  /| []|\
()/|___|\()
   |_|_|
   /_|_\

```

And it will actually copy that to your clipboard. Pretty handy.

---

*Created by Dave Lunny in 2017. Licensed under MIT 🖐*
