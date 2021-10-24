// this is going to be server server recieves all connections from users


module.exports.chatSockets = function(socketServer){
  let io = require('socket.io')(socketServer);
  
  //recieving connection on server side  and emit back to client side
  io.sockets.on('connection' , function(socket){
   console.log('new connection recieved server side' , socket.id)
    //when client disconnect , disconnection event fires
    socket.on('disconnect' , function(){
      console.log("socket disconnected!");
    });

    socket.on('join_room' , function(data){
      console.log("joining request recieved" , data );

      // join socket to that room(if exists join it otherwise create a room and join it)
      socket.join(data.chatRoom);
      
      //everyone in chat room including me need to be notified that someone joined this room
      io.in(data.chatRoom).emit('user_joined' , data );
      
    })

    socket.on('send_message' , function(data){
      io.in(data.chatRoom).emit('recieve_message' , data );
    })

  
  });

  
}