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
  let url = window.location.href
  url = url.split('/')
  const groupName = url[url.length - 1]

  console.log(groupName)
  document.getElementById("post-timeline").addEventListener("click", async function(event) {
    event.preventDefault(event)
    const post_content = document.getElementById('post').value.trim()
    if(post_content) {
        console.log(JSON.stringify(post_content))
        const post = await fetch('/api/posts/group-post', {
            method: 'POST',
            body: JSON.stringify({post_content, groupName}),
            headers: { 'Content-Type': 'application/json' },
    })
    if (post.ok) {
        window.location.href = '/home'
    } else {
        alert('Failed to log in please try again')
    }
    } else {
        alert("Failed to post please try again")
    }
  })


  