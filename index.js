const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {

  const slack_name = req.query.slack_name;
  const track = req.query.track;

  if (!slack_name || !track) {
    return res.status(400).json({ error: "slack_name and track are required parameters" });
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getUTCDay()];

  const utc = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
  const currentUTC = utc.toISOString().split('.')[0] + 'Z';


  const githubFileURL = "https://github.com/Joshthefullstack/HNGxStageOne/blob/main/index.js";
  const githubRepoURL = "https://github.com/Joshthefullstack/HNGxStageOne";

  res.status(200).json({
    slack_name: slack_name,
    current_day: currentDay,
    utc_time: currentUTC,
    track: track,
    github_file_url: githubFileURL,
    github_repo_url: githubRepoURL,
    status_code: 200,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
