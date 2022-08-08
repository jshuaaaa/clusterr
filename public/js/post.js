

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
        location.reload()
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
            window.location.href = `/user/${user}`
    })



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