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
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button' , newPost));

                // call the create Comment class
                new PostComments(data.data.post._id);
                
                new ToggleLike($('.like-btton' , newPost));

                new Noty({
                    theme: 'relax',
                    text: `${data.message}`,
                    type: 'success',
                    layout: 'top',
                    timeout: 1500 
                
                }).show();

               
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
                    <a class="delete-post-button" href="/post/destroy/${post._id}">
                        <i class="fas fa-times-circle"></i>
                    </a>
                    </small>
                    <h4 style="display: inline;"> ${post.user.name} </h4> 
                </div> 
                <div class="post-body"> 
                    <p>         ${post.content} </p>  
                </div>  
                <div class="post-foot">
                  
                    <a href="/likes/toggle/?id=${post._id}&type=Post"  class ="like-button" data-likes="0"> <i class="fas fa-thumbs-up"></i> 0 </a>  
                   &ensp;
                 
                   
                  
                 
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



   //method to delete post from DOM
   let deletePost = function(deleteLink){
    //1st step: I ld pass the a tag for delete post in deleteLink
    
    $(deleteLink).click(function(e){
        e.preventDefault();
        //blocking natural behaviour
        $.ajax({
           type: 'get',
           //you can use delete
           url: $(deleteLink).prop('href'),
           success: function(data){
            // lets assume we have data as id of post which need to be deleted
           
            $(`#post-${data.data.post_id}`).remove();

            new Noty({
                theme: 'relax',
                text: `${data.message}`,
                type: 'success',
                layout: 'top',
                timeout: 1500 
            
            }).show();

           },
           error: function(error){
               console.log(error.reponseText);
           }
        });
    });

   }

   


  
    

   let convertPostsToAjax = function(){
       $('#posts-list-container>ul>li').each(function(){
           let self = $(this);
           let deleteButton = $(' .delete-post-button' , self);

           deletePost(deleteButton);

           //get postId by splittiing the id attr
           let postId = self.prop('id').split("-")[1];

           new PostComments(postId);
       });
   }


   createPost();
   
   convertPostsToAjax();


  

}