
const signupButton = document.getElementById("signup-submit")


signupButton.addEventListener("click", createUser)

async function createUser(e) {
    const confirmPassword = document.getElementById("confirm-password").value.trim()
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    console.log(confirmPassword)
    console.log(password)
    if(username && password && confirmPassword && password === confirmPassword) {
        e.preventDefault()
        const response = await fetch('/api/users/signup', {
            method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    })
    if(response.ok) {
        window.location.href = "/home"
    }
    } else {
        alert('Failed to Sign up');
        e.preventDefault()
    }

    

}