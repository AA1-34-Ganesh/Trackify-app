require('dotenv').config()
const express=require('express')
const app=express()
const Task=require('./models/tasks')
const cors=require('cors');

app.use(express.json())
app.use(cors({
    'origin':"http://127.0.0.1:5500",
    'credentials':true
}))

let count=1;
app.get("/api/expenses",(req,res)=>{
    Task.find({}).then((expenses)=>{
        res.json(expenses)
    })
})
app.post("/api/expenses", (req, res) => {
    const task = new Task(req.body);

    task.save()
        .then(result => {
            res.status(201).json(result);
        });
});
app.delete("/api/expenses/:id",(req,res)=>{
    Task.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).end()
    })
    .catch((error)=>{
        console.log("Error",error);
    })
})
const PORT=process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})