console.log("Hello Javascript!")

const taskinput = document.querySelector(".task_input input") ,
filters = document.querySelectorAll(".filters span") ,
clear_all = document.querySelector(".clear_btn") ,
taskbox = document.querySelector(".task_box") ;

let editId ;
let isEditableTask = false ;

//getting local storage for todolist :
let todos = JSON.parse(localStorage.getItem("ToDo-List"));

//data stored in the browser's localStorage with the key "ToDo-List".
// Eg: "ToDo-List" : '[{"name":"Study JavaScript","status":"pending"}]'
// Data from localStorage is returned as a string.



//Step-7:
filters.forEach( btn =>{
    btn.addEventListener("click" , () =>{

        document.querySelector("span.active").classList.remove("active") ;
        btn.classList.add("active") ;

        showtodolist(btn.id); 
    })
})



//Step-2:
function showtodolist(filterr) {
    let liTag = ""

    if(todos && todos.length > 0){
        clear_all.classList.add("active");

        todos.forEach((todo, id) => {
          
          let isCompleted = todo.status == "completed" ? "checked" : "" ;
          
          if( filterr == todo.status || filterr == "all"){
            liTag =
            liTag +
            `
            <li class="task">
              <label for="${id}">
                <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
                <p class="${isCompleted}"> ${todo.name} </p>
              </label>
              <div class="settings">
                <img onclick ="showmenu(this)" src="menuicon.svg" alt=" nooo" />
                <ul class="task_menu">
                  <li onclick = 'editTask( ${id} , "${todo.name}")'><img src="editicon.svg" alt="" />Edit</li>
                  <li onclick = 'deleteTask(${id}, "${filterr}")' ><img src="deleteicon.svg" alt="" />Delete</li>
                </ul>
              </div>
            </li>`;
          }
        }); 
    }
    else{
        clear_all.classList.remove("active");
    }

    taskbox.innerHTML =
      liTag || `<span> You don't have any task here ❎</span>`;
}

showtodolist("all");



//step-4:
function showmenu(selectedTask){
    let menuDiv = selectedTask.parentElement.lastElementChild ;
    menuDiv.classList.add("show") ;

    document.addEventListener("click" , e =>{
        if( e.target.tagName != "IMG" || e.target != selectedTask ){
            menuDiv.classList.remove("show");
        }
    })
}


//Step-6:
function editTask(taskId ,taskName){
  editId = taskId;
  isEditableTask = true;
  taskinput.value = taskName;
}

//Step-5:
function deleteTask(deleteId , filterr){
    // removing selected Task from array/todos :
    todos.splice(deleteId ,1)
    
    //console.log(deleteId);
    localStorage.setItem("ToDo-List", JSON.stringify(todos));
    showtodolist(filterr);
}


//Step-3:
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild ;
    if( selectedTask.checked ){
        taskName.classList.add("checked") ;
        todos[selectedTask.id].status = "completed" ;
    }
    else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending" ;
    }
    localStorage.setItem("ToDo-List", JSON.stringify(todos));
}

//Step-7:
clear_all.addEventListener("click" , () =>{
    console.log("button clicked")
    todos.splice(0 , todos.length) ;            //removing all items from todos array
    console.log("button clicked")
    localStorage.setItem("ToDo-List", JSON.stringify(todos));
    showtodolist("all");
})



//Step-1:

taskinput.addEventListener("keyup" , e =>{

  let usertask = taskinput.value.trim();

  if (e.key == "Enter" && usertask) {
    
    if (!isEditableTask) {
      if (!todos) {
        todos = [];
      }
      let taskinfo = { name: usertask, status: "pending" };
      todos.push(taskinfo);                        //Adding new task to todos
    } 
    else {
      isEditableTask = false;
      todos[editId].name = usertask;
    }

    taskinput.value = "";                         //Clear the input box
    localStorage.setItem("ToDo-List", JSON.stringify(todos));

    showtodolist("all");
  }
  
})
// keyup runs when a keyboard key is released. The event object 'e' tells us which key was released.
//e.key tells us which key was pressed

//First If runs only when >> the key pressed was "Enter" AND the user actually entered some text.

//Make sure todos is an array; if it doesn't exist yet, create an empty array.
