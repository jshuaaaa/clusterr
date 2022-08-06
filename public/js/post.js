

document.getElementById('comment').addEventListener('click', postComment)
document.getElementById('home').addEventListener('click', function(){
    window.location.href = '/home'
})
let url = window.location.href
url = url.split('/')
const id = url[url.length - 1]
async function postComment(event) {
    const commentContent = document.getElementById('comment-data').value.trim()

    if(commentContent) {
        const comment = await fetch('/api/posts/comment', {
            method: 'POST',
            body: JSON.stringify({commentContent, id}),
            headers: { 'Content-Type': 'application/json' },
    })
    if (comment.ok) {
        console.log('success')
    } else {
        event.preventDefault(event)
        alert('Failed to post please try again!')
    }
    } else {
        alert("Failed to post please try again")
    }
    }

    let user = document.getElementById('user')
    user = user.textContent

    document.getElementById('user').addEventListener('click', function(){
            window.location.href = `/home/${user}`
    })
