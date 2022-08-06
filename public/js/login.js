

document.getElementById('submit-login').addEventListener("click", submitLogin)
if (typeof web3 !== 'undefined') {
    web3 = new Web3(ethereum);
    console.log(web3.eth.accounts);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}



async function submitLogin(e) {
    e.preventDefault()

    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()
    let metamask = false
    if(username && password) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password,metamask}),
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

document.getElementById("metamask").addEventListener('click', async function(e){
    const username = document.getElementById('username').value.trim()
    e.preventDefault()
    if(username) {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    let account = accounts[0]
    let message = "Welcome back! We missed you ;)"
    let hash = web3.utils.sha3(message)
    let sig = await web3.eth.personal.sign(message, account)
    let sigAddress = await web3.eth.personal.ecRecover(hash,sig)
    console.log(sigAddress)
    let password = "password"
    let metamask = true

    const response = await fetch('/api/users/login', {
        method: 'POST',
    body: JSON.stringify({username, account, password, metamask}),
    headers: { 'Content-Type': 'application/json' },
})
    window.location.href = '/home'
} else {
    alert("Please enter a username to display on your profile!")
}
})

document.getElementById('signup').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/signup';
});