import express from "express";
import cors from "cors";

const api = express();

api.use(cors());
api.use(express.json());

const posts = [
	{
		id: 1,
		title: "Hello World",
		coverUrl: "https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png",
		contentPreview: "Esta é a estrutura de um post esperado pelo front-end",
		content:
			"Este é o conteúdo do post, o que realmente vai aparecer na página do post...",
		commentCount: 2,
	},
];

const comments = [
	{
		id: 1,
		postId: 1,
		author: "João",
		content: "Muito bom esse post! Tá de parabéns",
	},
	{
		id: 2,
		postId: 1,
		author: "Maria",
		content: "Como faz pra dar palmas?",
	},
];

api.get("/posts", (req, res) => {
	res.send(posts);
});

api.get("/posts/:id", (req, res) => {
	const postId = parseInt(req.params.id);
	const post = posts.find((post) => post.id === postId);
	res.send(post);
});

api.get("/posts/:id/comments", (req, res) => {
	const postId = parseInt(req.params.id);
	const postComments = comments.filter(
		(postComments) => postComments.postId === postId
	);
	res.send(postComments);
});

let countIds = 1;

api.post("/posts", (req, res) => {
	countIds++;
	const newPost = req.body;
	posts.push({ ...newPost, id: countIds, contentPreview: "", commentCount: 0 });
	res.send("Post criado!");
});

api.post("/posts/:id/comments", (req, res) => {
	const postId = parseInt(req.params.id);
	const newComment = { id: comments.length + 1, postId, ...req.body };
	comments.push(newComment);
	const newCommentsCount = comments.filter(
		(comment) => comment.postId === postId
	).length;
	posts.map((post) => {
		if (post.id === postId) post = { ...post, commentCount: newCommentsCount };
		return post;
	});
	res.send("comentário adicionado com sucesso");
});

api.listen(5001);
