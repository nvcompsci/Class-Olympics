
const $eventsContainer = document.getElementById("events")
document.getElementById("login")
    .onsubmit = login


spawnEvents()
//2.2 Define function createPost to send post to server
let user_id = 1;


function login(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/login", payload)
        .then(res => res.json())
        .then(res => {
            user_id = res.userId
        })
        .catch(error => console.error(error))

    //1. get event registration from server
    //1.1 pull student id from text box (username)
    const input_user_id = 
    fetch(`/login/${input_user_id}`)
        .then(res => res.json())
        .then(res => {
            //1.2 show event info on page
            
        })
        .catch(error => console.error(error))
}

function spawnEvents() {
    //GET posts from server
    fetch("/events")
     .then(res => res.json())
     .then(events => {
         const eventsHTML = events.map( event => `
         <div class="event" data-eventid=${event.id}>
             <p>${event.title}</p>
             <div class="details">
                 <div>${event.teacher}</div>
                 <div>${event.location}</div>
                 <div>${event.capacity}</div>
             </div>
             <button onclick="e => {signUp(e);}">Sign Up!</button>
         </div>
         ` ).join("")
         $eventsContainer.innerHTML = eventsHTML
     })
     .catch(err => console.error(err))
    
 }

function signUp(e) {
    const $eventDiv = e.target.parentElement
    const event_id = $eventDiv.eventid

    const payload = {
        body: JSON.stringify({
            user_id: user_id,
            event_id: event_id
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/register", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

