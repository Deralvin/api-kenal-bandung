const socketIO = require("socket.io");

exports.socketConnection=(server,options)=>{
    io = socketIO(server, options);
        io.on("connection", (socket) => {
            console.log(`${socket.id} has joined`);    
            socket.on("send-message", (body, roomId, cb) => {
              console.log(`incoming from ${socket.id}---${roomId}`);
              if (roomId) {
                let dataTempChat={"messages":{
                  "sender":socket.id,
                  "message":body.text,
                  "timeStamp": new Date()
                }}
                io.to(roomId).emit("message-received", {...dataTempChat});
                cb({ status: true, data: dataTempChat });
                
              } else {
                socket.broadcast.emit("message-received", body);
              }
            });
            socket.on("join-room", (rooms, cb) => {
                // socket.join(rooms);

                if(typeof rooms === 'string'){
                    socket.join(rooms);
                    cb({ status: true, data: []});
                }else{
                  console.log("joinn--rooom",rooms);
                  socket.join(rooms.room_id);
                  cb({status:true,data:rooms.room_id});
                }

            });
    });
}
