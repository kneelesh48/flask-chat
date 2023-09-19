var socket = io.connect('http://' + location.host + '/chat');
socket.on('connect', function() {
    socket.emit('join', {});
});

socket.on('status', function(data) {
    $('#chat').val($('#chat').val() + '<' + data.msg + '>\n');
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
});

socket.on('message', function(data) {
    $('#chat').val($('#chat').val() + data.msg + '\n');
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
});

$('#chat-form').submit(function(e) {
    e.preventDefault();
    text = $('#text').val();
    $('#text').val('');
    socket.emit('text', {msg: text});
});

function leave_room() {
    socket.emit('left', {}, function() {
        socket.disconnect();
        // go back to the login page
        window.location.href = "{{ url_for('index') }}";
    });
}