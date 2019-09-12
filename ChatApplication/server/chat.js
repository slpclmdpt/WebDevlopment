const users = {
  Ada: "Ada",
  Bob: "Bob"
};

const messages = [
	{sender: "Ada", timestamp: new Date(), text: "Hello!"},
	{sender: "Bob", timestamp: new Date(), text: "Hi!"}
];


function addMessage({ sender, timestamp, text }) {
  messages.push({ sender, timestamp, text });
}

function addUser({ username }) {
  users[username] = username;
}

function removeUser({ username }) {
  delete users[username];
}

const chat = {
  users,
  messages,
  addMessage,
  addUser,
  removeUser
};

module.exports = chat;