const startButton = document.getElementById("start-btn");
const output = document.getElementById("output");

// Check if Web Speech API is available
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    output.textContent = "Listening...";
};

recognition.onspeechend = function () {
    output.textContent = "Stopped listening.";
    recognition.stop();
};

recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.textContent = `You said: "${transcript}"`;

    if (transcript.includes("hello")) {
        speak("Hello! How can I assist you?");
    } else if (transcript.includes("your name")) {
        speak("I am your voice assistant!");
    } else if (transcript.includes("time")) {
        const now = new Date();
        speak(`The current time is ${now.getHours()} ${now.getMinutes()}`);
    } else if (transcript.includes("bye")) {
        speak("Goodbye! Have a nice day.");
    }
    if (transcript.includes("open spotify")) {
        speak("Opening spotify")
        window.location.href = "https://www.spotify.com/";
    }

    else {
        speak("Sorry, I didn't understand.");
    }
};

// Convert text to speech
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

startButton.addEventListener("click", () => {
    recognition.start();
});
