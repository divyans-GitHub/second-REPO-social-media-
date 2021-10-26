class PostComments{constructor(e){this.postId=e,this.postContainer=$(`#post-${e}`),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(" .delete-comment-button",this.postContainer).each(function(){t.deleteComment($(this))})}createComment(t){let o=this;this.newCommentForm.submit(function(e){e.preventDefault();$.ajax({type:"post",url:"/comment/create",data:$(this).serialize(),success:function(e){e=o.newCommentDom(e.data.comment);$(`#post-comments-${t}`).prepend(e),o.deleteComment($(" .delete-comment-button",e)),new ToggleLike($(".like-button",e)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"top",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})}newCommentDom(e){return $(`<li id="comment-${e.id}">
                  <h5 style="display: inline;"> ${e.user.name} :</h5>
                  <small> ${e.content} </small>
            
                    
                    <small>
                    <a href="/comment/destroy/${e._id}" class="delete-comment-button">
                        <i class="fas fa-times-circle"></i>
                    </a>
                    </small>

                    <a href="/likes/toggle/?id=${e._id}&type=Comment"  class ="like-button" data-likes="0"> <i class="fas fa-thumbs-up"></i> 0</a>  
                     &ensp;
            
                </li>`)}deleteComment(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"top",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})}}