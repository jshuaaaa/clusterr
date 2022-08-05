var groupBackBtn = document.getElementById("backGroups");
var backFriendsBtn = document.getElementById("backFriends");
var backTimeLineBtn = document.getElementById("backTimeline")
var themeBtn = document.querySelector(".themeSelector")
var homeSecs = document.querySelectorAll('.homeSections')
let buttonStatus = true;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(ethereum);
  console.log(web3.eth.accounts);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
// the following if statement is needed to connect users to metamask


document.querySelectorAll(".friendName").forEach((item) => {
    item.addEventListener("click", () => {
      backFriendsBtn.style.display = "inline";
    });
  });

  backFriendsBtn.addEventListener("click", function () {
    backFriendsBtn.style.display = "none";
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





