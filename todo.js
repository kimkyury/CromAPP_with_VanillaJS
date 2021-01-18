const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


let toDos = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //true인 아이템들만 가지고 새로운 array만듦 
    }); // filter는 array의 모든 아이템을 통해 함수를 실행시킴

    toDos = cleanToDos;
    saveToDos();
}


function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}



function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span= document.createElement("span");
    const newId = toDos.length + 1;
    
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);


    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();

}

function handleSumit(event){
    event.preventDefault();
    const  currentValue =toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}



function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){ // parseToDOs에 있는 것 각각에 대해 실행 
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSumit)
}

init();