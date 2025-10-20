
const edits = document.querySelectorAll('.edit')
const remove =document.querySelectorAll('.delete')
edits.forEach(edit=>{
    edit.addEventListener('click',(e)=>{
        const ID=(e.target.classList)[1]
        const url=`http://localhost:3000/edit/${ID}`
        const newTask=prompt('Enter Your Task!')
        const update={task:newTask}

        fetch(url,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(update)
        })
        .then(response=>{
            if(response.ok) {
                window.location.href='http://localhost:3000/'
            }
        })
    })
})
remove.forEach(rem=>{
    rem.addEventListener('click',(e)=>{
        const ID=(e.target.classList)[1]
        const url=`http://localhost:3000/delete/${ID}`
        
        fetch(url,{
            method:'DELETE',
        })
        .then(response=>{
            if(response.ok){
                document.querySelector(`.todo_${ID}`).remove()
            }
        })
    })
})