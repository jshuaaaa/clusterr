

const signupButton = document.getElementById("signup-submit")
if (typeof web3 !== 'undefined') {
    web3 = new Web3(ethereum);
    console.log(web3.eth.accounts);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
let account


signupButton.addEventListener("click", createUser)

async function createUser(e) {
    const confirmPassword = document.getElementById("confirm-password").value.trim()
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    console.log(confirmPassword)
    console.log(password)
    if(username && password && confirmPassword && password === confirmPassword) {
        e.preventDefault()
        let metamask = false
        const response = await fetch('/api/users/signup', {
            method: 'POST',
        body: JSON.stringify({ username, password, metamask}),
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
document.getElementById('metamask').addEventListener('click', connect)

async function connect(e) {
    const username = document.getElementById('username').value.trim()
    e.preventDefault()
    if(username) {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    let account = accounts[0]
    let message = "Sign up for our website!"
    let hash = web3.utils.sha3(message)
    let sig = await web3.eth.personal.sign(message, account)
    let sigAddress = await web3.eth.personal.ecRecover(hash,sig)
    console.log(sigAddress)
    let password = "password"
    let metamask = true

    const response = await fetch('/api/users/signup', {
        method: 'POST',
    body: JSON.stringify({username, account, password, metamask}),
    headers: { 'Content-Type': 'application/json' },
})
    window.location.href = '/home'
} else {
    alert("Please enter a username to display on your profile!")
}
}

