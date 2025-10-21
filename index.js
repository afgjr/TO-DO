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
    tasks.push({id:num++,task:data,check:false})
  }
  res.redirect('/')
})


app.patch('/edit/:ID',(req,res)=>{
  const userID = parseInt(req.params.ID)
  const indexOftask=tasks.findIndex(task=>task.id===userID)
  if(req.body.task!=='' && (req.body.task).trim()!==''){
    tasks[indexOftask].task=req.body.task
    tasks[indexOftask].check=req.body.check
  }
  res.status(200).json({message:'successful'})
})

app.patch('/check/:ID',(req,res)=>{
  const userID = parseInt(req.params.ID)
  const indexOftask=tasks.findIndex(task=>task.id===userID)
  tasks[indexOftask].check=req.body.check

})

app.delete('/delete/:ID',(req,res)=>{
  const userID = parseInt(req.params.ID)
  tasks=tasks.filter(task=>task.id!==userID)
  res.status(204).send()
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 

