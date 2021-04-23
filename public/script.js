
const $eventsContainer = document.getElementById("events")
document.getElementById("login")
    .onsubmit = login


spawnEvents()
//2.2 Define function createPost to send post to server
let user_id


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
}

function spawnUsers() {
    //GET posts from server
    fetch("/users")
     .then(res => res.json())
     .then(users => {
         const usersHTML = users.map( user => `
         <div class="user" data-userid=${user.id}>
             <p>${user.username}</p>
             <div class="details">
                 <div>${user.firstName}</div>
             </div>
             <button onclick="e => {addFriend(e);}">Add Friend</button>
         </div>
         ` ).join("")
         $usersContainer.innerHTML = usersHTML
     })
     .catch(err => console.error(err))
    
 }

function addFriend(e) {
    const $userDiv = e.target.parentElement
    const friend_id = $userDiv.userid

    const payload = {
        body: JSON.stringify({
            user_id: user_id,
            friend_id: friend_id
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/friends", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

