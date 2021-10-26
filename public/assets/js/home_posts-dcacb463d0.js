{let t=function(){let e=$("#new-post-form");e.submit(function(t){t.preventDefault(),$.ajax({type:"post",url:"/post/create",data:e.serialize(),success:function(t){var e=s(t.data.post);$("#posts-list-container>ul").prepend(e),o($(" .delete-post-button",e)),new PostComments(t.data.post._id),new ToggleLike($(".like-btton",e)),new Noty({theme:"relax",text:`${t.message}`,type:"success",layout:"top",timeout:1500}).show()},error:function(t){console.log(error.reponseText)}})})},s=function(t){return $(`
        <li id="post-${t._id}"> 
            <div class="post-container">
                
                <div class="post-head">
               
                    <small style="float: right;">
                    <a class="delete-post-button" href="/post/destroy/${t._id}">
                        <i class="fas fa-times-circle"></i>
                    </a>
                    </small>
                    <h4 style="display: inline;"> ${t.user.name} </h4> 
                </div> 
                <div class="post-body"> 
                    <p>         ${t.content} </p>  
                </div>  
                <div class="post-foot">
                  
                    <a href="/likes/toggle/?id=${t._id}&type=Post"  class ="like-button" data-likes="0"> <i class="fas fa-thumbs-up"></i> 0 </a>  
                   &ensp;
                 
                   
                  
                 
                    <form action="/comment/create" method="POST">
                        <input name="content" id="" placeholder="Write your comment here....." required>
                        <input type="hidden" name="post" value="${t._id}">
                        <input type="submit" value="comment">
                    </form>
                   
                    <div class="post-comments-list">
                        <ul id="post-comments-${t._id}">
                       
                        </ul>
                    </div>
            
                </div>     
            </div>
            
        </li>`)},o=function(e){$(e).click(function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:`${t.message}`,type:"success",layout:"top",timeout:1500}).show()},error:function(t){console.log(t.reponseText)}})})},e=function(){$("#posts-list-container>ul>li").each(function(){let t=$(this);var e=$(" .delete-post-button",t);o(e);e=t.prop("id").split("-")[1];new PostComments(e)})};t(),e()}