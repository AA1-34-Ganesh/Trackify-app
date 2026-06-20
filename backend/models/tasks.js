const mongoose=require('mongoose')

mongoose.set('strictQuery',false)

const url=process.env.MONGODB_URL

mongoose.connect(url)
.then(()=>{
    console.log("Connected to mongodb.")
})
.catch((error)=>{
    console.log("Error connecting to mongodb:",error.message)
})

const taskSchema=mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    taskTime:{
       type:Date,
       required:true
    }
})

taskSchema.set('toJSON',{
  transform:(document, returnedObject) => {
    returnedObject.id=returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports=mongoose.model('Task',taskSchema)