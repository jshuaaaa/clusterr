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
    const id = e.target.parentElement.id
    if(id) {
    window.location.href = `/post/${id}`
    }
}

