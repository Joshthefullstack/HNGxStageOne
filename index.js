const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
  // Get query parameters from the GET request
  const slack_name = req.query.slack_name;
  const track = req.query.track;

  // Validate parameters
  if (!slack_name || !track) {
    return res.status(400).json({ error: "slack_name and track are required parameters" });
  }

  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getUTCDay()];

  // Get the current UTC time with validation of +/-2 minutes
  const currentUTC = new Date().toISOString();

  // Construct GitHub URLs
  const githubFileURL = "https://github.com/Joshthefullstack/HNGxStageOne/blob/main/index.js";
  const githubRepoURL = "https://github.com/Joshthefullstack/HNGxStageOne";

  // Create the JSON response
  const response = {
    slack_name: slack_name,
    current_day: currentDay,
    utc_time: currentUTC,
    track: track,
    github_file_url: githubFileURL,
    github_repo_url: githubRepoURL,
    status_code: 200,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
