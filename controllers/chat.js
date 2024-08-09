const Chat = require("../models/chat");

exports.chatMessages = async (req, res) => {
  let { userId, otherUserId,pageNo,perPageRecord } = req.query;
  try {
    pageNo = pageNo || 1
    perPageRecord = perPageRecord || 10
    if (!userId || !otherUserId) {
      return res.status(400).send({
        status: "failed",
        statusCode: 400,
        message: "userId and otherUserId is required",
        data: [],
      });
    }
    let query = {
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    };
    await Chat.updateMany( { sender: otherUserId, receiver: userId },{msgRead:1})
    let chats = await Chat.find(query).sort({ createdAt: -1}).skip(pageNo * perPageRecord - perPageRecord).limit(
        perPageRecord
    );
    let totalChat = await Chat.countDocuments(query)
    console.log({ chats });
    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "chat data",
      data: {chats,
        totalChat,
        pageNo,
        perPageRecord
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "failed",
      statusCode: 400,
      message: err.message,
      data: [],
    });
  }
}

exports.chatList = async (req,res) =>{

try{

}
catch(err){
    console.log(err);
    res.status(400).send({
        status:"failed",
        statusCode:400,
        message:err.message,
        data:[]
    })
    
}
}

