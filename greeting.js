const form = document.querySelector(".js-form"), 
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS="currentUser", //사용자의 이름을 담는 key
SHOWING_ON = "showing";



function saveName(text){ //내 이름을 로컬스토리지에 저장
    localStorage.setItem(USER_LS, text); // currentUser의 value으로 사용자 저장
}


function paintGreeting(text){ 
    form.classList.remove(SHOWING_ON);  
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}


function handleSumit(event){ 
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue)

}

function askForName() {
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSumit)

}


function loadName(){
    const currentUser = localStorage.getItem(USER_LS); //로컬에서 이름을 찾아온다
    if(currentUser === null) {
        askForName(); //없으면 묻자
    }else {
        paintGreeting(currentUser); //있으면 반가워하자
    }
}
function init(){
    loadName() //기본으로 실행됨
}

init();