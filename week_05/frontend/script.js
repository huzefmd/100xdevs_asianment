let isSignup=false
let isAddingTodo=false

document.getElementById('signup-form'),addEventListener('submit',async (e)=>{
    e.preventDefault()
    if(isSignup)return;
    isSigningUp=true
    const username=document.getElementById('signup-username').ariaValueMax;
    const password=document.getElementById('signup-password').ariaValueMax;
    try {
        const response=await fetch('http://localhosst:3000/user/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,password})   
        });
        const result =await response.json()
        isSigningUp=false
        if(response.ok){
            document.getElementById('response-message').innerText=result.message||"Sign Up Succesfull  Please Sign in";
            document.getElementById('signup-container').style.display='none';
            document.getElementById('signin-container').style.display='block';
        }
        else{
            document.getElementById('response-message').innerText=result.message||"Sign in Failed"

        }
        
    } catch (error) {
        isSigningUp=false
        document.getElementById("response-message").innerText="error during SIgnup";
    }
})

document.getElementById('signin-form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username =document.getElementById('signin-username').value
    const password =document.getElementById('signin-password').value
    try {
        const response=await fetch('http://localhosst:3000/user/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,password})   
        });
        const result =await response.json()
        isSigningUp=false
        if(response.ok){
            localStorage.setItem('token',result.token);
            document.getElementById('signin-contaner').style.display='none';
            document.getElementById('todo-contaner').style.display='block';
            document.getElementById('response-message').innerHTML=
            `Logged in Succesfully <a  href ="#"  id="logut-link">Logout </a>`;
            loadTodos()

            document.getElementById('logout-link').addEventListener('click',(e)=>{
                e.preventDefault()
                localStorage.removeItem('token');
                document.getElementById('todo-container').style.display='none';
                document.getElementById('signin-container').style.display='block';
                document.getElementById('response-message').innerText='';

            });
        }
        else{
            document.getElementById('response-message').innerText=result.message||"Sign in Failed"

        }
        
    } catch (error) {
        document.getElementById("response-message").innerText="error during Signin";
    }
});


document.getElementById('todo-form').addEventListener('submit',async (e)=>{
    e.preventDefault();
    if(isAddingTodo)return
    isAddingTodo=true
    const todoInput=document.getElementById('todo-input');
    const todoText=todoInput.value.trim()
    if(!todoText){
        isAddingTodo=false;
        return
    }
    const token =localStorage .getItem('token')
    try {
        const response =await fetch('http//localhost:3000/todo',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer${token}`,

            },
            body:JSON.stringify({title:todoText})
        });
        const result =await response.json();
        isAddingTodo=false;
        if(response.ok){
            todoInput.value=''
            loadTodos();
        }
        else{
            console.log(result.msg)
        }
    } catch (error) {
        isAddingTodo=false;
        console.error("error adding todos")   
    }
});


async function loadTodos() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:3000/todo', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const { todos } = await response.json();
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;

            if (todo.completed) {
                li.style.textDecoration = 'line-through';
            }

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = () => {
                completeTodo(todo._id, !todo.completed);
            };

            if (!todo.completed) {
                li.appendChild(completeButton);
            }

            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

async function completeTodo(id, completed) {
    const token = localStorage.getItem('token');
    try {
        await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ completed }),
        });
        loadTodos();
    } catch (error) {
        console.error('Error completing todo:', error);
    }
}
document.getElementById('show-signin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('signin-container').style.display = 'block';
});
document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signin-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
});