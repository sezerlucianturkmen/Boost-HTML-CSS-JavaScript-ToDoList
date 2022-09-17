/* 
Global Değişkenler
*/
let input = document.querySelector(".input");
let cardbd = document.querySelector(".cardbd");
let card = document.querySelector(".card ");
let alertContainer = document.querySelector(".alertContainer");
let todos = document.querySelector("#todos");
let completed = document.querySelector("#completed");
let cardheader = document.querySelector(".card-header");
function addEventListener() {
  document.addEventListener("DOMContentLoaded", loadAllTodos);
  cardbd.addEventListener("click", remove);
  cardbd.addEventListener("click", completedToTodo);
  cardheader.addEventListener("click", changeActive);
}

/*
Todo ekleme metodu 
*/
let todoEkle = () => {
  let todo = input.value;
  console.log(todo);

  if (todo === "") {
    showAlert("danger", "Lütfen Bir To do Giriniz");
  } else {
    createTodoElements(todo);
    addTodoToLocalStorage(todo);
    showAlert("success", "Başarılı bir Şekilde Eklendi");
  }

  //   cardbd.innerHTML += ` <div class="card-body">
  // <p class="card-text">${input.value}
  // </p>
  // <div class="d-flex flex-row">
  //     <button class="btn checkButton"><i class="fas fa-check-circle"></i></button>
  //     <button class="btn editButton"><i class="fas fa-edit"></i></button>
  //     <button class="btn deleteButton"><i class="fas fa-trash"></i></button>
  // </div>`;
};

/*
Todolarımızın html elemtlerlini yaratan metodumuz
*/
let createTodoElements = (value) => {
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let p = document.createElement("p");
  p.className = "card-text";
  p.textContent = value;

  let div2 = document.createElement("div");
  div2.classList.add("d-flex");
  div2.classList.add("flex-row");

  let checkButton = document.createElement("button");
  checkButton.setAttribute("class", "btn checkButton");

  let checkİcon = document.createElement("i");
  checkİcon.className = "fas fa-check-circle";
  checkButton.appendChild(checkİcon);

  let editButton = document.createElement("button");
  editButton.setAttribute("class", "btn editButton");

  let editİcon = document.createElement("i");
  editİcon.className = "fas fa-edit";
  editButton.appendChild(editİcon);

  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn deleteButton");

  let deleteİcon = document.createElement("i");
  deleteİcon.className = "fas fa-trash";
  deleteButton.appendChild(deleteİcon);

  div2.appendChild(checkButton);
  div2.appendChild(editButton);
  div2.appendChild(deleteButton);

  cardBody.appendChild(p);
  cardBody.appendChild(div2);

  cardbd.appendChild(cardBody);
};

/* 
Silme Fonksiyonu 
*/
let remove = (e) => {
  console.log(e.target);
  if (e.target.className === "fas fa-trash") {
    e.target.parentElement.parentElement.parentElement.remove();
    deleteFromStorage(
      e.target.parentElement.parentElement.parentElement.textContent
    );
  }
};

/**
 *
 * @param {*} type  alerttimizin type danger- success gibi
 * @param {*} message alertimizin içine yazdığımız mmetin
 */
let showAlert = (type, message) => {
  let alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  alertContainer.appendChild(alert);

  setTimeout(function () {
    alertContainer.removeChild(alert);
  }, 1000);
};
/**
 *
 *
 * active clası nı değiştirerek todolarımız
 * ve tamamlanmış todlar arasında geçiş yapıyoruz
 * geçiş yparken sayfada ki todolaro geçiş yaptığımız kısıma
 * göre local storagedan getiriyoruz
 *
 */
let changeActive = (e) => {
  if (e.target.id === "todos" && todos.classList[1] != "active") {
    todos.classList.add("active");
    completed.classList.remove("active");
    loadAllTodos();
  } else if (completed[1] != "active") {
    completed.classList.add("active");
    todos.classList.remove("active");
    getCompletedTodos();
  }
};
/**
 *
 * tamamlanmış todo yu check buttonuna tıklayarak
 * tamamlanmıs todolar listesine local storage ekliyoruz ve todolardan siliyoruz
 *
 */
let completedToTodo = (e) => {
  if (e.target.parentElement.className === "btn checkButton") {
    e.target.parentElement.parentElement.parentElement.remove();

    addToCompletedTodosStorage(
      e.target.parentElement.parentElement.parentElement.textContent
    );
    deleteFromStorage(
      e.target.parentElement.parentElement.parentElement.textContent
    );

    showAlert("success", "Yapılanlara eklendi");
  }
};

/*
 ******Local Storage İşlemleri*********
 */

/* 
Local Stroage dan todo listesi getirme 
*/
let getTodos = () => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};

/**
 *local storage a Todo ekleme
 * @param {*} value  local storage da ki todos arrayine eklenecek todo değeri
 */
let addTodoToLocalStorage = (value) => {
  let todosList = getTodos();
  todosList.push(value);
  localStorage.setItem("todos", JSON.stringify(todosList));
};

/* Local Stroage dan verileri sayfaya yukleme */
function loadAllTodos() {
  cardbd.innerHTML = "";
  let todos = getTodos();
  todos.forEach((element) => {
    createTodoElements(element);
    console.log(element);
  });
}

/**
 *local storage dan Todo silme
 * @param {*} value  local storage da ki todos arrayinden silinecek todo değeri
 */
let deleteFromStorage = (value) => {
  let todos = getTodos();

  todos.forEach((x, index) => {
    if (x === value) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

/*
******Tamamlanmış TODO ların Local storage iişlemleri*******
*
 /
  
 * 
 * @returns  completed
 * local storage da completed arrayı olusturyoruz
 * eğer daha önce oluşturmussak local storage dana ki arrayi dönüyoruz
 *
 *
 *
 */
let getCompletedTodos = () => {
  let completed;

  if (localStorage.getItem("completed") === null) {
    completed = [];
  } else {
    completed = JSON.parse(localStorage.getItem("completed"));
  }
  return completed;
};

/**
 *
 * @param {*} value  local storage da ki completed arrayine eklenecek todo değeri
 */
let addToCompletedTodosStorage = (value) => {
  let completed = getCompletedTodos();
  console.log(completed);
  completed.push(value);

  localStorage.setItem("completed", JSON.stringify(completed));
};
addEventListener();
/***
 * local storage da ki butun tammalanmış todları sayfaya yazdıran fonksiyon
 */
let loadtAllCompletedTodos = () => {
  let completed = getCompletedTodos();

  cardbd.innerHTML = "";
  completed.forEach((x) => {
    createTodoElements(x);
  });
};