const express = require('express')


const app=express()

app.use(express.json())

const tasks= [
   {id :1 , title : "CSE" , description : "Computer Science" , isComplete : true },
   {id :2 , title : "ECE" , description : "Electronis and Communication" , isComplete : true }
]

app.get('/tasks' , (req,res)=>{
    res.send(tasks)
})

app.get('/tasks/:id' , (req,res)=>{
   const task=tasks.find(c=>c.id===parseInt(req.params.id))
   if(!task) res.status(404).send("task with input id not found")
   res.send(task)
})



app.post('/tasks', (req,res)=> {

    if(!req.body.title || req.body.title.length<=0) {
        res.status(404).send("title is empty")
        return
    }
    

    if(!req.body.description || req.body.description.length<=0) {
        res.status(404).send("description is empty")
        return
    }

    if (typeof req.body.isComplete !== 'boolean'){
        res.status(404).send("is Complete should boolean")
        return
    }
    
  
   const task = {
        id :tasks.length+1,
        title:req.body.title,
        description : req.body.description,
        isComplete: req.body.isComplete
    }

    tasks.push(task)
    res.send(task);
})


app.put('/tasks/:id' , (req,res)=> { 

    const task=tasks.find(c=>c.id===parseInt(req.params.id))

   if(!task) res.status(404).send("task with input id not found") 

    if(req.body.description && req.body.description.length>0) 
        task.description=req.body.description
    
   

    if(req.body.title && req.body.title.length>0)
    task.title=req.body.title

    
    task.isComplete=req.body.isComplete


   res.send(task)
 })
 

 app.delete('/tasks/:id', (req,res)=>{
    const task=tasks.find(c=>c.id===parseInt(req.params.id))

    if(!task) res.status(404).send("task with input id not found") 
    
    const index=tasks.indexOf(task)

    tasks.splice(index,1)

    res.send(task)

 })



app.listen(3000, ()=> {
    console.log("app is running on port 3000")
})