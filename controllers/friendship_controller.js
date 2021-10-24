const Friendship = require('../models/friendship');
const User = require('../models/users');


module.exports.addFriend = async function( req , res ){
  //console.log(req.query);  working fine
  
  try{
      let isFriend = false;
      let from = await User.findById(req.query.from_user);
      let to = await User.findById(req.query.to_user );
      
      let f1 = await Friendship.findOne({
          from_user: from._id,
          to_user:to._id
      });
      let f2 = await Friendship.findOne({
        from_user: to._id,
        to_user:from._id
      });
      
      if(f1 || f2 ){
        isFriend = false; // no need to show user
        if(f1){
            await User.findByIdAndUpdate(from._id , { $pull: {friendships: f1._id}} ); 
            await User.findByIdAndUpdate(to._id , { $pull: {friendships: f1._id}} ); 
            f1.remove();
            // from.friendships.pull({friendships: f1});
            // to.friendships.pull({friendships: f1}); 
            //from.save();
            //to.save();
            console.log("friendhip1 removed");

        }else{
            await User.findByIdAndUpdate(from._id , { $pull: {friendships: f2._id}} ); 
            await User.findByIdAndUpdate(to._id , { $pull: {friendships: f2._id}} );
            f2.remove(); 
            // from.friendships.pull({friendships: f2});
            // to.friendships.pull({friendships: f2}); 
            // from.save();
            // to.save();
            console.log("friendhip2 removed");
          
        }
        if(req.xhr){
          return res.status(200).json({
            message: "Friendship added successfully",
            friendUser: to,
            isFriend: isFriend
          });
        }
      }else{
        let newFriendship = await Friendship.create({
        from_user: from._id,
        to_user: to._id 
        });

        from.friendships.push(newFriendship);
        to.friendships.push(newFriendship);
        to.save();
        from.save();
        isFriend = true; // show user in friend section
        
        if(req.xhr){
          await from.populate('friendship').execPopulate();
          await to.populate('friendship').execPopulate();

          return res.status(200).json({
             data:{
              friendUser: to,
              isFriend: isFriend
             },
             message: "post created successfully"
          })
        }
  
      }
      
      

    }catch(err){
    console.log(err);
    return res.json(500 , {
      message: "Internal Server"
    });

  }

 
}

