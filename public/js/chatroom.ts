function myFunction() {
  const x: any  = document.getElementById("pop_up");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};

  fetch("/api/rooms")
  .then(response => response.json())
  .then(rooms => {
      const allRooms = document.getElementById('test')!;
      for (let i = 0; i<rooms.length; i++){
          const text = document.createElement("div");
          text.classList.add("chatroom")
          text.innerHTML = rooms[i].title;
          allRooms.appendChild(text);
      }
  });

  fetch("/users")
  .then(response => response.json())
  .then(users => {
      const allUsers = document.getElementById('room_participants')!;
      for (let i = 0; i<users.length; i++){
          const text = document.createElement("p");
          text.innerHTML = users[i].username;
          allUsers.appendChild(text);
      }
  })