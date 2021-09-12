{
    // method to submit form of new form using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit( function(e){
            e.preventDefault();

            $.ajax({
               type: 'post',
               url: '/post/create',
               data: newPostForm.serialize(),
               success: function(data){
                let newPost = newPostDOM(data.data.post);
                $('.posts-list>ul').prepend(newPost);
               },
               error: function(err){
                   console.log(error.reponseText);
               }
            });
        });
    }


   // method to create a post in DOM
   let newPostDOM = function(post){
       return $(`
        <li id="post-${post._id}"> 
            <div class="post-container">
                
                <div class="post-head">
               
                    <small style="float: right;">
                    <a class="delete-post-button" href="/post/destroy/${post.id}">
                        <i class="fas fa-times-circle"></i>
                    </a>
                    </small>
                    <h4 style="display: inline;"> ${post.user.name} </h4> 
                </div> 
                <div class="post-body"> 
                    <p>         ${post.content} </p>  
                </div>  
                <div class="post-foot">
                    <form action="/comment/create" method="POST">
                        <input name="content" id="" placeholder="Write your comment here....." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="comment">
                    </form>
                   
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id}">
                       
                        </ul>
                    </div>
            
                </div>     
            </div>
            
        </li>`);
   }

   createPost();
   
}