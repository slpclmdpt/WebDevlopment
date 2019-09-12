const express = require("express");
const app = express();
const PORT = 4000;
const chat = require("./chat");

app.use(express.static('./public'));

app.put("/messages", express.json(), (req,res) => {
	const message = req.body.message;
	const username = req.body.username;
	if(message&&username){
		chat.addMessage({sender: username, timestamp: new Date(), text: message});
		res.json({users: chat.users, messages: chat.messages});
	} else {
		res.status(400).json({ error: ` 'message' and 'username' property are required.`});
	}
});

app.get("/messages", (req,res) => {
	res.json({users: chat.users, messages: chat.messages});
});

app.put("/login", express.json(), (req,res) =>{
	const username = req.body.name;
	if(username){
		chat.addUser({username});
		res.json({"users": chat.users,"username": username});
	} else {
		res.status(400).json({error: " Username is required."});
	}
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));