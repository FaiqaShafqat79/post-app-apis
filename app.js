const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPosts, storePosts } = require('./data/posts');
const { getStoredMeetups, storeMeetups } = require('./data/meetups')

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});


// MEETUPS 

app.get('/meetups', async (req, res) => {
  const storedMeetups = await getStoredMeetups();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ meetups: storedMeetups });
});

app.get('/meetups/:id', async (req, res) => {
  const storedMeetups = await getStoredMeetups();
  const meetup = storedMeetups.find((meetup) => meetup.id === req.params.id);
  res.json({ meetup });
});

app.post('/meetups', async (req, res) => {
  const existingMeetups = await getStoredMeetups();
  const meetupData = req.body;
  const newMeetup = {
    ...meetupData,
    id: Math.random().toString(),
  };
  const updatedMeetups = [newMeetup, ...existingMeetups];
  await storeMeetups(updatedMeetups);
  res.status(201).json({ message: 'Stored new Meetup.', meetup: newMeetup });
});

app.listen(8080);
