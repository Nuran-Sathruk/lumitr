const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const speechSynthesis = window.speechSynthesis;

if (!SpeechRecognition) {
    alert("Sorry, your browser does not support Speech Recognition.");
}

if (!speechSynthesis) {
    alert("Sorry, your browser does not support Speech Synthesis.");
}

const recognition = new SpeechRecognition();

recognition.lang = 'en-US';

recognition.interimResults = false;

recognition.maxAlternatives = 1;

const startButton = document.getElementById('start-button');

const resultDiv = document.getElementById('result');

startButton.addEventListener('click', () => {
    recognition.start();
    resultDiv.textContent = 'Speaking...';
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    resultDiv.textContent = `You said: ${transcript}`;
    respondToInput(transcript);
};

recognition.onerror = (event) => {
    resultDiv.textContent = `Error occurred in recognition: ${event.error}`;
};

function respondToInput(input) {
    const response = generateResponse(input);
    speak(response);
}

function generateResponse(input) {
    const lowerCaseInput = input.toLowerCase();

if (lowerCaseInput.includes('hello')) {

    return "Hello! How can I help you today?";

} else if (lowerCaseInput.includes('how are you')) {

    return "I'm just a program, but I'm doing well! How about you?";

} else if (lowerCaseInput.includes('what is time')) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return `The current time is ${timeString}.`;

} else if (lowerCaseInput.includes('tell me a joke')) {

    return "Why don’t skeletons fight each other? Because they don’t have the guts!";

} else if (lowerCaseInput.includes('your name')) {

    return "You can call me Lumitr or Lum!";

} else if (lowerCaseInput.includes('weather')) {

    return "I'm not able to check the weather right now, but you can use a weather app for that!";

} else if (lowerCaseInput.includes('bye')) {
    return "Goodbye! Have a great day!";

} else if (lowerCaseInput.includes('what is your purpose')) {

    return "My purpose is to assist you with tasks and provide information!";

} else if (lowerCaseInput.includes('who created you')) {

    return "I was created by the Lumitr Project!";

} else if (lowerCaseInput.includes('favorite color')) {

    return "I don't have a favorite color, but I think blue is nice!";

} else if (lowerCaseInput.includes('open google')) {

    window.open('https://www.google.com', '_blank');

    return "Opening Google for you!";

} else if (lowerCaseInput.includes('play music')) {

    return "I'm not able to play music directly, but you can ask your favorite music app!";

} else if (lowerCaseInput.includes('Who is the President of USA')) {
    return "The current President of the United States is Joe Biden.";

} else if (lowerCaseInput.includes('Who is the Vice President of USA')) {

    return "The current Vice President of the United States is Kamala Harris.";

} else if (lowerCaseInput.includes('history')) {

    return "History is full of fascinating events! Which time period or event would you like to know more about?";

} else if (lowerCaseInput.includes('just talk')) {

    return "Sure, let's talk! What's on your mind?";

} else if (lowerCaseInput.includes("today's news")) {

    return "I'm not able to fetch live news right now, but you can check a news website for the latest updates!";
}

const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&format=json&origin=*&titles=${encodeURIComponent(input)}`;

fetch(url)
.then(response => response.json())
.then(data => {
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const extract = pages[pageId].extract;
    resultDiv.textContent = extract;
    speak(extract);
})

.catch(error => {
    resultDiv.textContent = "Error fetching information from Wikipedia.";
    speak("Sorry, I couldn't fetch the latest information from Wikipedia.");
    console.error('Error fetching Wikipedia data:', error);
});

return "Let me look that up for you...";

}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}
