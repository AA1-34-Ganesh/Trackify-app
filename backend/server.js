const express=require('express')
const app=express()
const cors=require('cors');

app.use(express.json())
app.use(cors({
    'origin':"http://127.0.0.1:5500",
    'credentials':true
}))
let expenses=[]
let count=1;
app.get("/api/expenses",(req,res)=>{
    res.status(200).json(expenses);
})
app.post("/api/expenses",(req,res)=>{
   let {category, amount, date}=req.body;
   let expense={
    id:count++,
    category,
    amount,
    date
   };
   expenses.push(expense);
    
   res.status(201).json({
    message:"Expense added successfully"
   })
})
app.delete("/api/expenses/:id",(req,res)=>{
    let id=Number(req.params.id);
    expenses=expenses.filter(expense=>expense.id!==id);

    res.status(200).send({
        message:"Expense deleted successfully"
    });
})
const PORT=process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})