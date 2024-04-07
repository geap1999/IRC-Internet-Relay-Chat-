function myFunction() {
    var x = document.getElementById("pop_up");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
}
;
fetch("/api/rooms")
    .then(function (response) { return response.json(); })
    .then(function (rooms) {
    var allRooms = document.getElementById('test');
    for (var i = 0; i < rooms.length; i++) {
        var text = document.createElement("div");
        text.classList.add("chatroom");
        text.innerHTML = rooms[i].title;
        allRooms.appendChild(text);
    }
});
fetch("/users")
    .then(function (response) { return response.json(); })
    .then(function (users) {
    var allUsers = document.getElementById('room_participants');
    for (var i = 0; i < users.length; i++) {
        var text = document.createElement("p");
        text.innerHTML = users[i].username;
        allUsers.appendChild(text);
    }
});
