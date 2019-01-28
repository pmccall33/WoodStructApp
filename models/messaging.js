// ##messaging
// - message board
// - username
// -date 
// -text content
// -threading

const mongoose = require('mongoose');





const Message = mongoose.model('Message', messageSchema);

module.exports = Message;