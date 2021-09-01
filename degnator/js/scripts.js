// get Authenticated use
auth.onAuthStateChanged((user) => {
    if (user) {
        // username.innerHTML = user.displayName;
        // profile_img.src = user.photoURL;
        console.log(user.displayName)
        console.log("Logged in");
    } else {
        location.href = '/login.html';
    }
});

// getting current authenticated user
// var userId = firebase.auth().currentUser.uid;

let dropdown_header = document.getElementById("dropdown-header");
let dropdown_close = document.getElementById("dropdown_close");

dropdown_header.onclick = () => {
    document.querySelector(".header-dropdown").classList.toggle("active");
}
dropdown_close.onclick = () => {
    document.querySelector(".header-dropdown").classList.toggle("active");
}

window.onload = () => {
    if (window.innerWidth <= 880) {
        document.querySelector(".middle-section").classList.toggle("active");
        document.querySelector(".left-section").classList.toggle("active");
    }
}

// create channel popup
let createChannelPopup_close = document.getElementById("createChannelPopup_close");
let createChannelPopup = document.getElementById("createChannelPopup");
let createChannel = document.getElementById("createChannel");

createChannel.onclick = () => {
    createChannelPopup.classList.toggle("active");
}
createChannelPopup_close.onclick = () => {
    createChannelPopup.classList.toggle("active");
}

window.onclick = (e) => {
    if (e.target == createChannelPopup) {
        createChannelPopup.classList.toggle("active");

    }
}

// showing channels through trigger for small screens
let show_channel_trigger = document.getElementById("show_channel_trigger");
let is_channel_active = false;
let isLeft_section_active = true;


show_channel_trigger.onclick = () => {
    document.querySelector(".middle-section").classList.toggle("active");
    document.querySelector(".left-section").classList.toggle("active");
}

// fetching channels
let channels_container = document.getElementById("channels");
db.collection("channels").orderBy('timestamp', 'asc').onSnapshot(snapshot => {
    channels_container.innerHTML = '';
    snapshot.forEach(doc => {
        let channel = document.createElement("li");
        channel.innerHTML = `
            <span onclick="showChannel('${doc.id}')">#${doc.data().channelName}</span>
        `;
        channels_container.appendChild(channel);

    })
});

// creating a new channel
let createNewChannel = document.getElementById("createNewChannel");
const createChannelForm = document.querySelector('#createNewChannel');

createNewChannel.addEventListener('submit', function(e) {
    e.preventDefault();
    db.collection("channels").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        channelName: createChannelForm["channelName"].value
    });
    createChannelForm.reset();
    createChannelPopup.classList.toggle("active");
    document.querySelector(".header-dropdown").classList.toggle("active");

});

// firebase.firestore.FieldValue.serverTimestamp()
// { new Data(timestamp?.toData()).toUTCString() }

// get channel data
let activeChannel_ID = '';

function showChannel(id) {
    let channelName = document.getElementById("name");
    try {
        let section_body = document.getElementById("section-body");

        db.collection('channels').doc(id).get().then(doc => {
            channelName.innerHTML = '#' + doc.data().channelName;
            activeChannel_ID = id;
            db.collection("channels").doc(id).collection('messages').orderBy("timestamp", "asc").onSnapshot(snapshot => {
                if (snapshot.size > 0) {
                    section_body.innerHTML = "";
                    snapshot.forEach(snap => {
                        let msg = document.createElement('div');
                        if (snap.data().username == auth.currentUser.displayName) {
                            msg.className = 'right-message';

                            msg.innerHTML = `
                            <div class="header">
                                <img src=${snap.data().userProfile} alt="user-profile" />
                                <span>${snap.data().username}</span>
                            </div>
                            <p id="msg">${snap.data().msg}</p>
                        
                        `
                        } else {
                            msg.className = 'left-message';
                            msg.innerHTML = `
                            <div class="header">
                                <img src=${snap.data().userProfile} alt="user-profile" />
                                <span>${snap.data().username}</span>
                            </div>
                            <p id="msg">${snap.data().msg}</p>
                        `
                        }
                        section_body.appendChild(msg);
                        // scrool to the bottom everytime a message is sent
                        section_body.scrollTop = section_body.scrollHeight;

                    })
                } else {
                    section_body.innerHTML = '<b>No messages found</b>'
                }
                if (window.innerWidth <= 880) {
                    document.querySelector(".middle-section").classList.toggle("active");
                    document.querySelector(".left-section").classList.toggle("active");
                }
            });
        });

    } catch (error) {
        console.log("[error]", error);
    }
}

let msgForm = document.querySelector("#msgForm");
msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = document.getElementById("message");
    // console.log(auth.currentUser.photoURL)
    try {
        db.collection("channels").doc(activeChannel_ID).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            msg: msgForm["message"].value,
            username: auth.currentUser.displayName,
            userProfile: auth.currentUser.photoURL,
        });
        console.log("Message sent..")
        msgForm.reset();
    } catch (error) {
        console.log("[error]: ", error);
    }

});