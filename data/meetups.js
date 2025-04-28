const fs = require('node:fs/promises');

async function getStoredMeetups() {
  const rawFileContent = await fs.readFile('meetups.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedMeetups = data.meetups ?? [];
  return storedMeetups;
}

function storeMeetups(meetups) {
  return fs.writeFile('meetups.json', JSON.stringify({ meetups: meetups || [] }));
}

exports.getStoredMeetups = getStoredMeetups;
exports.storeMeetups = storeMeetups;