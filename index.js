function todoEkle(){
    let todo =document.querySelector("#input");
    let cardBody=document.querySelector(".cardbd")
    cardBody.innerHTML+=` <div class="card-body">
                         <p class="card-text">${todo.value}</p>
                        <div class="d-flex flex-row">
                            <button class="btn checkButton"><i class="fas fa-check-circle"></i></button>
                            <button class="btn editButton"><i class="fas fa-edit"></i></button>
                            <button class="btn deleteButton"><i class="fas fa-trash"></i></button>
                        </div> </div>`;

}

function getTodos(){
let todos;
if(localStorage.getItem("todos")===null){
    todos=[];
}else{
    todos=JSON.parse(localStorage.getItem("todos"));
}return todos;
}

function addtodoToLocalStorage(value){
    let todosList = getTodos();
    todosList.push(value);
    localStorage.setItem("todos",JSON.stringify)
}