const express = require('express');

const app = express();
app.use(express.json());

let initialTodo = [
    {
        title: "HTML",
        isCompleted: true,
        id: 1
    },
    {
        title: "javascript",
        isCompleted: true,
        id: 2
    },
    {
        title: "React",
        isCompleted: false,
        id: 3
    }]
// get rounts

app.get("/", (req, res) => {
    res.status(200).send("<h1> welcome to the todo api</h1>")
})

// get rounts
app.get("/todos", (req, res) => {
    res.status(200).send(initialTodo)
})

// post rounts

app.post("/addtodo", (req, res) => {
    console.log(req.body);
    let newTodo = {
        title: req.body.title,
        isCompleted: req.body.isCompleted,
        id: initialTodo.length + 1
    }
    initialTodo.push(newTodo);
    res.status(200).send(newTodo);
})

// patch

app.patch("/update/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let dataupdate = initialTodo.filter(update => update.id == id);
    dataupdate[0].title = req.body.title;
    dataupdate[0].isCompleted = req.body.isCompleted;
    res.status(200).send(...dataupdate);
    console.log(...dataupdate);

});

// delete 

app.delete("/delete/:id", (req, res)=>{

    let {id} = req.params;
    let deleted = initialTodo.filter((todos) => todos.id == id);
    console.log(deleted);
    let deletetodo = initialTodo.splice(deleted, 1)[0];
    console.log(deletetodo)
    res.status(200).send({deletedTodo : deletetodo});

})


app.get("/todo/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let dataupdate = initialTodo.filter(update => update.id == id);
    if (dataupdate) {
        res.status(200).send(...dataupdate);
        console.log(...dataupdate);
    }
    else {
        res.status(404).send("404");
        console.log("dataupdate");
    }

});

app.get('/findbystatus', (req, res) => {
    console.log(req.query);
    let { isCompleted } = req.query;
    console.log(isCompleted);
    let find = initialTodo.filter(datas => datas.isCompleted == isCompleted);
    res.status(200).send(find);
    console.log(find);

});



app.listen(8090, () => {
    console.log("start server in 8090")
})

