class addFriends{
    constructor(addElement){
      this.element = addElement;
      this.showFriend();

    }

    showFriend(){
        
        $(this.element).click( function(e){
            e.preventDefault();
            let self = this;
            
            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
            }). 
            done( function(data){
             
            if(data.isFriend == true){
               
                //$('#friends-list').html(`<li data-friendName='<%= data.friendUser.name %>'> ${data.friendUser.name}</li>`);
                //$(`#friends-list-name`).prepend(data.friendUser.name);
                
                $(self).html(`Remove Friend`);
            }else{
                $(self).html(`Add Friend`);
            }
            }).fail( function(errThrown){
                console.log("error in completing request");
            })
        } )
    }

}