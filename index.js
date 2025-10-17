import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let task=[]
let order=0
app.get('/',(req,res)=>{
    res.render('index.ejs',{id:order++,list:task})
    console.log(order++)
})


app.post('/add',(req,res)=>{
   
    task.push(req.body.data)
    
     res.redirect('/')
   
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
