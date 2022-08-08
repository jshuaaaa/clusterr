const data = document.querySelectorAll('.timeline-post')
console.log(data)

data.forEach(element => {
    element.addEventListener("click", getPost)
    console.log(element)
})


async function getPost(e) {
    const id = e.target.parentElement.id
    console.log(id)
    if(id) {
    window.location.href = `/post/${id}`
    }
}

document.getElementById('home').addEventListener('click', function(){
    window.location.href = '/home'
})

document.getElementById('add-friend').addEventListener('click', addFriend)
const friend = document.getElementById('user').textContent

async function addFriend() {
    const response = await fetch('/api/users/friends', {
        method: 'POST',
        body: JSON.stringify({ friend }),
        headers: { 'Content-Type': 'application/json' },
      })

    alert(`You and ${friend} are now friends!`)
}