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