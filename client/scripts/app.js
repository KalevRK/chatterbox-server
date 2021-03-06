// YOUR CODE HERE:
var app = {};
app.server = 'http://127.0.0.1:3000';

var dataSize = 0;
var openRooms = {};
var currentRoom = null;
var friends = {};

var scrollPosition = $('document').height();

app.init = function(){
};

app.send = function(message){
  $.ajax({
    // always use this url
    url: app.server + '/sendmessage',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    // always use this url
    url: app.server+'/getmessages',
    limit: 50,
    type: 'GET',
    data : {
      //order : "-createdAt",
      //where : "createdAt:{'$gte':lastDate}"
    },
    success: function (data) {
      //console.log(data);
      app.update(data);
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};
setInterval(app.fetch, 1000);

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message) {
  app.send(message);
};

app.addRoom = function(roomname){
  $('#roomSelect').prepend('<div>' + roomname + '</div>');
};

app.update = function(data) {
  console.log(data.results.length, dataSize);
  if (data.results.length > 0){
    for(var i = data.results.length - 1 ; i >= dataSize; i--){
      var room = data.results[i].roomname;
      var message = data.results[i].text;
      var userName = data.results[i].username;
      if (data.results.length > dataSize){
        if(room !== undefined && typeof room !== 'function'
        && message !== undefined && typeof message !== 'function'
        && userName !== undefined && typeof userName !== 'function') {
          message = message.replace(/<[^>]*>/g, "<nice try>");
          userName = userName.replace(/<[^>]*>/g, "<nice try>");
          if (!openRooms.hasOwnProperty(room)){
            room = room.replace(/<[^>]*>/g, "<nice try>");
            openRooms[room] = true;
            var $room = $('<div class="roomname" id="'+room+'">'+'# '+room+'</div>');
            $('.roomSelect').append($room);
            $('.roomname').on("click", function(){
              currentRoom = $(this).attr('id');
              $('h1').text('#' + currentRoom);
              $('#roomput, .enter').fadeOut();
              if (currentRoom === "lobby"){
                currentRoom = null;
                $('h1').text('#Chatterbox');
                $('#roomput').fadeIn();
              }
              $('.chatBox').remove();
            });
          }
          var name = userName
          var userName = $('<span class="user">'+name+' says: </span>');
          var text = $('<span>'+message+' in '+room+'</span>')
          if (friends[name] === true){
            text.addClass('friend');
          }
          userName.click(function(){
            friends[name] = true;
          });
          if (currentRoom === null || currentRoom === room){
            var $holder = $('<div class="chatBox"></div>');
            $holder.append(userName);
            $holder.append(text);
            $('#chats').append($holder);
          }
        }
      }
    }
    dataSize = data.results.length;
    $("#chats").animate({ scrollTop: scrollPosition }, "slow");
    scrollPosition += 100;
    //$('#chats').empty();
  }
}
app.room =function(data) {

};

setInterval(app.room, 1000);
//submit
$(document).ready(function(){
  $('#submit').on('click', function(e) {
      var name = "Whatever"; //window.location.search.slice(10);
      var text = $("#message").val();
      var roomput = $("#roomput").val();
      if (currentRoom !== null){
        roomput = currentRoom;
      }
      var message = {
        'username': name,
        'text': text,
        'roomname': roomput
      };
      app.addMessage(message);
      $("#message, #roomput").val("");
      e.preventDefault();
      //e.stopPropagation();
  });
});
