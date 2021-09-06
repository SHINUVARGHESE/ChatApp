const socket = io();
let text = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let name;

do{
    name = prompt('Please Enter your name')
}while(!name)

function send() {
    sendmessage(text.value)   
}


text.addEventListener('keyup',(e)=>{
   if(e.key=== 'Enter'){
       sendmessage(e.target.value)
   }
})

function sendmessage(message) {
    let msg = {
        user : name,
        message:message.trim()
    }

    socket.emit('message',msg)

    appandMessage(msg,'outgoing')
    scroleToBottom()
    text.value=""
}

function appandMessage(msg,type){
    let msgDiv = document.createElement('div')
    let className =  type

    msgDiv.classList.add(className, 'message')

    let markUp = `
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
    `
    msgDiv.innerHTML = markUp

    messageArea.appendChild(msgDiv)

}

socket.on('message',(msg)=>{

    appandMessage(msg,'incoming')
    scroleToBottom()

})

function scroleToBottom() {
    messageArea.scrollTop=messageArea.scrollHeight
}