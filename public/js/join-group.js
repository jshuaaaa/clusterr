


const groupPaymentAddress = "0xf8c7053A329669cDf621Ae93Af32F57CbF4b702c"
const groupPayment = new web3.eth.Contract([
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address payable",
                "name": "groupOwner",
                "type": "address"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
], groupPaymentAddress)

console.log(groupPayment)
const owner = document.getElementById('owner').textContent
let group = document.getElementById('group')

group = group.textContent

document.getElementById('join-group').addEventListener('click', joinGroup)

const costOfGroup = document.getElementById('cost-of-group').textContent
let cost = costOfGroup * 10 ** 18
cost = cost.toString()

async function joinGroup() {

const addGroupUser = await fetch('/api/users/add-group-user', {
        method: 'POST',
        body: JSON.stringify({ group, owner}),
        headers: { 'Content-Type': 'application/json' },
      })
    const response = await addGroupUser.json()
    
    console.log(response)
    let cost = response[1].cost * 10 ** 18
    cost = cost.toString()
    console.log(cost)
    if(response[1].is_paid === true) {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];
        const sendTxn = await groupPayment.methods.deposit(cost, response[0].address).send({from: account, value: cost})
        if(sendTxn) {
            const addGroupUser = await fetch('/api/users/add-group', {
                method: 'POST',
                body: JSON.stringify({ group}),
                headers: { 'Content-Type': 'application/json' },
              })
        }
    } else {
        const addGroupUser = await fetch('/api/users/add-group', {
            method: 'POST',
            body: JSON.stringify({ group}),
            headers: { 'Content-Type': 'application/json' },
          })
    }


}