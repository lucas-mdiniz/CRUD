class UI {
  constructor(){
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');  
    this.bodyInput = document.querySelector('#body'); 
    this.idInput = document.querySelector('#id'); 
    this.postSubmt = document.querySelector('.post-submit'); 
    this.forState = 'add'; 
  }

  showPosts(posts) {
    let output = '';
    
    posts.forEach(post => {
      output += `
        <div class = "card mb-3">
          <div class = "card-body">
            <h4 class = "card-title">${post.title}</h4>
            <p class = "card-text">${post.body}</p>
            <a href="#" class='edit card-link' data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class='delete card-link' data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    //Create Div
    const div = document.createElement('div');
    //Add class names
    div.className = className;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get the parent
    const container = document.querySelector('.postsContainer');
    // Get posts
    const posts = document.querySelector('#posts');
    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout

    setTimeout(() =>{
      this.clearAlert();
    }, 3000);
  }

  clearAlert(){
    const currentAlert = document.querySelector('.alert');

    if(currentAlert){
      currentAlert.remove();
    }
  }
  
  clearForm(){
    document.querySelector('#title').value = '';
    document.querySelector('#body').value = '';
  }


  fillForm(data){
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.postId;

    this.changeFormState('edit'); 
  }

  clearIdInput(){
    this.idInput.value = '';
  }

  changeFormState(type){
    if(type === 'edit'){
      this.postSubmt.textContent = 'Update Post';
      this.postSubmt.className = 'post-submit btn btn-warning btn-block';

      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');
      cardForm.insertBefore(button, formEnd);
      
    } else {
      this.postSubmt.textContent = 'Post it';
      this.postSubmt.className = 'post-submit btn btn-primary btn-block';

      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }

      this.clearIdInput();
      this.clearForm();
    }

  }
}

export const ui = new UI();