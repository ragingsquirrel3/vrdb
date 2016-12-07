function setup (server) {
  const io = require('socket.io').listen(server, () => {});
  io.sockets.on('connection', function(socket){
    socket.on('subscribe', function(d) {
      // broadcast to just the sender
      console.log('user looking at chrom ', d);
      socket.join(d);
    });

    socket.on('sync', function(d) {
      // broadcast to just the sender
      console.log('syncing user to config ', d);
      io.emit('sync', d);
    });
  });
}

module.exports = setup;
