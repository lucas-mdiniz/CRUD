/* The API is built with https://github.com/typicode/json-server wich is a quick way to built a fake API for front-end devs*/

import { http } from './http';
import { ui } from './ui';

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
 
// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost); 

// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost); 

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit); 

// Listem for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}

function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  if(title === '' || body === ''){
    ui.showAlert('Please fill in all fields', 'alert alert-danger')
  } else {

    let data = {
      title: title,
      body: body
    };

    if(id === ''){
    http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post Added', 'alert alert-success');
      ui.clearForm();
      getPosts();
    })
    .catch(err => console.log(err));
    } else {
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post Updated', 'alert alert-success');
        ui.clearForm();
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
}


function deletePost(e){

  if(e.target.parentElement.classList.contains('delete')){
    console.log('teste');

    const postId = e.target.parentElement.dataset.id;
    
    if(confirm('Are you sure?')){
      http.delete(`http://localhost:3000/posts/${postId}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-danger');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }

  e.preventDefault();
}

// enable Edit state
function enableEdit(e){

  if(e.target.parentElement.classList.contains('edit')){
    const postId = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      postId,
      title,
      body
    }

    ui.fillForm(data);
  }

  e.preventDefault();
}

function cancelEdit(e){
  if(e.target === document.querySelector('.post-cancel')){
    ui.changeFormState('add');
  }
  
  e.preventDefault();
}

