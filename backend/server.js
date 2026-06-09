const express=require('express')
const app=express()
const cors=require('cors');

app.use(express.json())
app.use(cors({
    'origin':"http://127.0.0.1:5500",
    'credentials':true
}))
const expenses=[]

app.get("/api/expenses",(req,res)=>{
    res.status(200).json(expenses);
})
app.post("/api/expenses",(req,res)=>{
   const {category, amount, date}=req.body;
   const expense={
    category,
    amount,
    date
   };
   expenses.push(expense);
    
   res.status(201).json({
    message:"Expense added successfully"
   })

})
const PORT=process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})