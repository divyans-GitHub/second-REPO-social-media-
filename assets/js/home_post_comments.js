  
  

  

   // Let's implement this via classes

   // this class would be initialized for every post on the page
   // 1. When the page loads
  // 2. Creation of every post dynamically via AJAX

  class PostComments{
        // constructor is used to initialize the instance of the class whenever a new instance is created
        constructor(postId){
            this.postId = postId;
            this.postContainer = $(`#post-${postId}`);
            this.newCommentForm = $(`#post-${postId}-comments-form`);

            this.createComment(postId);

            let self = this;
            // call for all the existing comments
            $(' .delete-comment-button', this.postContainer).each(function(){
                self.deleteComment($(this));
            });
        }


        createComment(postId){
            let pSelf = this;
            this.newCommentForm.submit(function(e){
                e.preventDefault();
                let self = this;

                $.ajax({
                    type: 'post',
                    url: '/comment/create',
                    data: $(self).serialize(),
                    success: function(data){
                        let newComment = pSelf.newCommentDom(data.data.comment);
                        $(`#post-comments-${postId}`).prepend(newComment);
                        pSelf.deleteComment($(' .delete-comment-button', newComment));
                        //console.log( "%%%%%%%%%" , $('.like-button' , newComment));
                        
                        // keeping an instance of class for each new comment made
                        // same thing for post also
                        // since we want unique like count and toggle button for each post and comments
                        new ToggleLike($('.like-button' , newComment));

                        new Noty({
                            theme: 'relax',
                            text: "Comment published!",
                            type: 'success',
                            layout: 'top',
                            timeout: 1500
                            
                        }).show();

                    }, error: function(error){
                        console.log(error.responseText);
                    }
                });


            });
        }


        newCommentDom(comment){
            // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
            return $(`<li id="comment-${comment.id}">
                  <h5 style="display: inline;"> ${comment.user.name} :</h5>
                  <small> ${comment.content} </small>
            
                    
                    <small>
                    <a href="/comment/destroy/${comment._id}" class="delete-comment-button">
                        <i class="fas fa-times-circle"></i>
                    </a>
                    </small>

                    <a href="/likes/toggle/?id=${comment._id}&type=Comment"  class ="like-button" data-likes="0"> <i class="fas fa-thumbs-up"></i> 0</a>  
                     &ensp;
            
                </li>`
            );
        }


        deleteComment(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();

                $.ajax({
                    type: 'get',
                    url: $(deleteLink).prop('href'),
                    success: function(data){
                        $(`#comment-${data.data.comment_id}`).remove();

                        new Noty({
                            theme: 'relax',
                            text: "Comment Deleted",
                            type: 'success',
                            layout: 'top',
                            timeout: 1500
                            
                        }).show();
                    },error: function(error){
                        console.log(error.responseText);
                    }
                });

            });
        }
    }










