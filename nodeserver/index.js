// node server handling socket io connections

const io = require('socket.io')(8000); //8000 ->Post -> Used by me

const users = {};

io.on('connection',socket => { 
   socket.on('new-user-joined',name =>{
        console.log('New User',name);
        users[socket.id] = name;//appending users array
        socket.broadcast.emit('user-joined',name);//We are giving this      
                                                //event name 'user-joined'
    });

    socket.on('send' , message=>{
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });
    socket.on('disconnect' , message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});

