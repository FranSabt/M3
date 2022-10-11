//const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 0;
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.get('/', (req, res) => {
    let obj = {
        saludo: 'hola mundo'
    }
    
    res.status(200).send(obj);
})

server.post('/posts', (req, res) => {
    const {author, title, contents}= req.body

    if(!author || !title || !contents){
        const err = {error: "No se recibieron los parámetros necesarios para crear el Post"};
        return res.status(STATUS_USER_ERROR).send(err)
    }
    id++
    posts.push({author, title, contents, id})
    return res.send({author, title, contents, id})
});

server.post('/posts/author/:author', (req, res) => {
    const author = req.params.author;
    const { title, contents} = req.body;

    if(!title || !contents){
        const err = {error: "No se recibieron los parámetros necesarios para crear el Post"};
        return res.status(STATUS_USER_ERROR).send(err)
    }
    id++
    posts.push({author, title, contents, id})
    return res.send({author, title, contents, id})
});

server.get('/posts', (req, res) => {
    let querys =  req.query.term;

    if (querys !== undefined) {
        let looking = posts.filter(obj => obj.hasOwnProperty(querys))
        return res.send(looking)
    }
    return res.send(posts)
});

module.exports = { posts, server };
