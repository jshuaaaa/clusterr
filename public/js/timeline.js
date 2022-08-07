document.getElementById('post-timeline').addEventListener('click', postToTimeline)


async function postToTimeline(event) {
    event.preventDefault(event)
    const post_content = document.getElementById('post').value.trim()
    if(post_content) {
        console.log(JSON.stringify(post_content))
        const post = await fetch('/api/posts/timeline-post', {
            method: 'POST',
            body: JSON.stringify({post_content}),
            headers: { 'Content-Type': 'application/json' },
    })
    if (post.ok) {
       
        window.location.href = '/home'
    } else {
        alert('Failed to log in please try again')
    }
    } else {
        alert("Failed to post please try again")
    }
} 

const data = document.querySelectorAll('.timeline-post')
console.log(data)

data.forEach(element => {
    element.addEventListener("click", getPost)
    console.log(element)
})


async function getPost(e) {
    let id = e.target.parentElement.id
    if(id === "timeline") {
        id = e.target.id
    }
    if(id !== "timeline") {
    window.location.href = `/post/${id}`
    }
}

const groupData = document.querySelectorAll('.group-target')
console.log(groupData)

groupData.forEach(element => {
    element.addEventListener("click", getGroupPost)
    console.log(element)
})

let url = window.location.href
url = url.split('/')
console.log(url)
async function getGroupPost(e) {

    e.preventDefault()
    let id = e.target.parentElement.id
      
    if(id === "groupsList") {
        id = e.target.id
        console.log(id)
    }
    if(url.length === 4) {
    if(id !== "") {
    window.location.href = `home/groups/${id}`
    }
} else {
    e.preventDefault()
}
}
