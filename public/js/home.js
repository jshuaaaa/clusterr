var groupBackBtn = document.getElementById("backGroups");
var backTimeLineBtn = document.getElementById("backTimeline")
var themeBtn = document.querySelector(".themeSelector")
var homeSecs = document.querySelectorAll('.homeSections')


let buttonStatus = true;

  $("#create-group").click(function () {
    setTimeout(function () {
      
      location.reload(true);
    }, 200);
    });

    $("#add-friend").click(function () {
      setTimeout(function () {
        
        location.reload(true);
      }, 200);
      });

  



if (typeof web3 !== 'undefined') {
  web3 = new Web3(ethereum);
  console.log(web3.eth.accounts);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

async function routeToFriend (friendName) {
  let response = await fetch(`/user/${friendName}`);
  if (response.ok) {
    window.location.href = `/user/${friendName}`
  } else {
    alert('Failed to log in please try again')
  }
}

document.querySelectorAll(".friendName").forEach((friend) => {
    friend.addEventListener("click", () => {
      routeToFriend(friend.id);
    });
  });

document.querySelectorAll(".groupLink").forEach((item) => {
  item.addEventListener("click", () => {
    groupBackBtn.style.display = "inline";
  });
});

groupBackBtn.addEventListener("click", function () {
  groupBackBtn.style.display = "none";
});

console.log(window.ethereum)




// All modal functionality

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});


document.getElementById("create-group").addEventListener("click", createGroup)

async function createGroup(e) {
  const groupName = document.getElementById('group-name').value.trim()
  const paid = document.getElementById('paid')
  const cost = document.getElementById('cost').value.trim()
  
  if(groupName) {
    e.preventDefault()
    let isPaid = false
    if(paid.checked) {
      isPaid = true
    }
    const response = await fetch('/api/groups/create', {
      method: 'POST',
      body: JSON.stringify({ groupName, isPaid, cost}),
      headers: { 'Content-Type': 'application/json' },
})

const addGroupUser = await fetch('/api/users/add-group', {
  method: 'POST',
  body: JSON.stringify({ groupName}),
  headers: { 'Content-Type': 'application/json' },
})
console.log('done')
  } else {
    alert("Please submit a group name")
  }
}

// functionality for adding a friend
document.getElementById("add-friend").addEventListener("click", addFriend)

async function addFriend(e) {
  const friendName = document.getElementById('friendName').value.trim()
  
  if(friendName) {
    e.preventDefault()
    const addFriend = await fetch('/api/users/friends', {
      method: 'POST',
      body: JSON.stringify({ friend: friendName }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!addFriend.ok) {
      alert('Friend either does not exist or is already added!');
    }
  } else {
    alert("Please submit a friend name")
  }
}


document.getElementById('submit-search-group').addEventListener("click", findGroup)


async function findGroup(e) {
  const groupName = document.getElementById('search-group').value.trim()
  
  if(groupName) {
    e.preventDefault()
    window.location.href = `/home/${groupName}`
  }
}

document.getElementById('submit-search-friend').addEventListener("click", findFriend)


async function findFriend(e) {
  const friendName = document.getElementById('search-friend').value.trim()
  let friends = getFriends();
  if(friends.includes(friendName)) {
    e.preventDefault()
    window.location.href = `/user/${friendName}`
  } else {
    alert('This user is not in your friend list');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  
  $( "#search-friend" ).autocomplete({
    source: getFriends()
  });
});

function getFriends() {
  let friends = document.getElementById('friendList').children;
  let friendList = [];


  for (let i = 0; i < friends.length; i++) {
    friendList.push(friends[i].id);
  }

  return friendList;
}

