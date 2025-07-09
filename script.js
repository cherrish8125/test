
const firebaseConfig = {
  apiKey: "AIzaSyCSEyPdWCSZb3a8c_pb57OV87xNTgeZAzc",
  authDomain: "sr-global-2835b.firebaseapp.com",
  projectId: "sr-global-2835b",
  storageBucket: "sr-global-2835b.firebasestorage.app",
  messagingSenderId: "534870929333",
  appId: "1:534870929333:web:851628aebb74f4722ef3fc"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function createBubble(msgObj) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerText = `${msgObj.text}\n- ${msgObj.author}`;
  bubble.style.left = Math.random() * 90 + 'vw';
  bubble.style.animationDuration = (Math.random() * 10 + 10) + 's';
  bubble.onclick = () => showModal(msgObj);
  document.getElementById('bubble-container').appendChild(bubble);
  setTimeout(() => bubble.remove(), 15000);
}

function showModal(msg) {
  const modal = document.getElementById("popup");
  modal.innerHTML = `<h2>${msg.author}</h2><p>${msg.text}</p>`;
  modal.style.display = "block";
}
function closeModal() {
  document.getElementById("popup").style.display = "none";
}
function toggleMusic() {
  const music = document.getElementById("bgMusic");
  music.paused ? music.play() : music.pause();
}

document.getElementById("messageForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const author = document.getElementById("author").value.trim();
  const text = document.getElementById("message").value.trim();
  if (author && text) {
    db.ref("messages").push({ author, text });
    this.reset();
  }
});

db.ref("messages").on("child_added", (snapshot) => {
  const msg = snapshot.val();
  createBubble(msg);
});
