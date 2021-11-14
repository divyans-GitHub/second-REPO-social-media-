// this is file communicating from client side


class chatEngine{
   constructor(chatBoxId , userEmail ){
       this.chatBox = $(`#chatBoxId`);
       this.userEmail = userEmail;
       //emiting connection to server chat_socket.js
       this.socket = io("http://3.141.28.7:5000"  , {transports: ['websocket', 'polling', 'flashsocket']});

       if(this.userEmail){
           this.connectionHandler();
        }
   }

    connectionHandler(){

        let self = this;   

        this.socket.on('connect' , function(){
            // verifying connection emitted by chat_socket.js
            console.log("connection from client is established..!");
            
            self.socket.emit('join_room' , {
                user_email: self.userEmail,
                chatRoom: 'codeial_room'
            });
            //detecting the user_joined event on client side  from server side
            self.socket.on('user_joined' , function(data){
                console.log("user has joined" , data);
            })

            $('#send-msg-btn').click(function(){
                let msg = $('#chat-message-input').val();
                if(msg != "" ){
                    self.socket.emit('send_message' ,{
                        message: msg,
                        user_email: self.userEmail,
                        chatRoom: 'codeial_room'
                    } );
                }
            })

            self.socket.on('recieve_message' , function(data){
              console.log("message recieved" , data);

              let newMessage = $('<li>');
              let messageType = 'other-message';
              if(data.user_email == self.userEmail ){
                messageType = 'self-message';
              }

              newMessage.append($('<span>' , {
                  'html': data.message
              }));
              newMessage.append($('<sub>' , {
                  'html': data.user_email
              }))

              newMessage.addClass(messageType);
              $('#chat-message-list').append(newMessage);

            })


        });
    

    }

}

