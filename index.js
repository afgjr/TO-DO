import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


let tasks=[]
let  num=0
app.get('/',(req,res)=>{
    res.render('index.ejs',{list:tasks})
   
})

app.post('/add',(req,res)=>{
  const data=req.body.data
  if(data!==''){
    tasks.push({id:num++,task:data})
  }
  res.redirect('/')
})
app.patch('/edit/:ID',(req,res)=>{
  const userID = parseInt(req.params.ID)
  const indexOftask=tasks.findIndex(task=>task.id===userID)
  console.log(req.body.task)
  if(req.body.task!=='' && (req.body.task).trim()!==''){
    tasks[indexOftask].task=req.body.task
  }
  res.status(200).json({message:'successful'})
})
app.delete('/delete/:ID',(req,res)=>{
  const userID = parseInt(req.params.ID)
  console.log(userID)
  tasks=tasks.filter(task=>task.id!==userID)
  console.log(tasks)
  res.status(204).send()
  
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
