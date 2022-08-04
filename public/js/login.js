

document.getElementById('submit-login').addEventListener("click", submitLogin)

async function submitLogin(e) {
    e.preventDefault()

    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()
if(username && password) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
})
    if (response.ok) {
        window.location.href = '/home'
    } else {
        alert('Failed to log in please try again')
    }

} else {
    alert("Please fill in all fields")
}
} 


// document.getElementById('signup').addEventListener('click', function(){
//     window.location.href = '/signup'
// })