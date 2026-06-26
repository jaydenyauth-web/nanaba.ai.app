const chatbox = document.getElementById("chatbox");

function addMessage(sender, text, type) {
    const message = document.createElement("div");
    message.className = "message " + type;
    message.innerHTML = `<strong>${sender}</strong><br>${text}`;

    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {

    const input = document.getElementById("message");
    const text = input.value.trim();

    if (text === "") return;

    addMessage("You", text, "user");

    input.value = "";

    try {

        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        addMessage("👑 NANABA AI", data.reply, "bot");

    } catch (err) {

        addMessage(
            "System",
            "Unable to connect to the backend. Make sure the Python server is running.",
            "bot"
        );

        console.error(err);
    }

}

window.onload = () => {
    addMessage(
        "👑 NANABA AI",
        "Servant Activated. Welcome, your majesty.",
        "bot"
    );
};
