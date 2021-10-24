class ToggleLike{
    constructor(toggleElement){
      //  console.log(toggleElement);
      this.toggler = toggleElement;
      this.toggleLike();
      
    }


 toggleLike(){
    $(this.toggler).click( function(e){
        e.preventDefault();
        let self = this;

        //this is new way of writting ajax like the same as promises
        $.ajax({
            type: 'POST',
            url: $(self).attr('href')
        })
        .done( function(data){
            let likesCount = parseInt($(self).attr('data-likes'));
            console.log(likesCount);
            if(data.data.deleted == true ){
                likesCount -= 1;
                $(self).css("color" , "blue")
            }else{
                likesCount += 1;
                $(self).css("color" , "red")
            }

            $(self).attr('data-likes' , likesCount );
            $(self).html(`<i class="fas fa-thumbs-up"></i>${likesCount}`);
        })
        .fail( function( errData ){
            console.log("error in completing request");
        });
    });
 }
}