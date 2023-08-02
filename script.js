// Mock user balance (you'd typically handle this server-side)
const userBalance = {
  1: 100, // User 1 has $100
  // Add balances for other users as needed
};

// Mock user profile pictures (you'd typically handle this server-side)
const userProfilePictures = {
  1: "https://via.placeholder.com/50", // User 1 has this profile picture
  // Add profile pictures for other users as needed
};

// The charge for using a curse word
const PROFANITY_CHARGE = 5;

function chargeUserForProfanity(userId) {
  if (userBalance[userId] >= PROFANITY_CHARGE) {
    userBalance[userId] -= PROFANITY_CHARGE;
  } else {
    alert(`User ${userId} has insufficient funds!`);
  }
}

function updateBalanceDisplay(userId) {
  const balanceDisplay = document.getElementById(`balance-${userId}`);
  balanceDisplay.textContent = `$${userBalance[userId]}`;
}

// Replace this URL with the actual API endpoint provided by the Word Associations Network API
function initializeSpeechToText() {
  const apiUrl = "https://rapidapi.com/twinword/api/word-associations";

  // Create the request data
  const requestData = {
    text: textWithCurseWord,
  };

  // Make the API request
  return (
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      // Extract the alternative phrases from the response data
      .then((data) => {
        const alternatives = data.alternatives;
        return alternatives;
      })
      // Return an empty array as alternatives in case of an error
      .catch((error) => {
        console.error("Error fetching data:", error);
        return [];
      })
  );
}

// Replace YOUR_API_KEY with your actual API key or set up the appropriate authentication method
const apiKey =
  "1053081302185-o9ffkj1dq73nse9vbi680lfilpqd2rrf.apps.googleusercontent.com";

function transcribeSpeech(audioBlob) {
  const apiUrl =
    "https://speech.googleapis.com/v1/speech:recognize?key=" + apiKey;

  // Create the request data
  const requestData = {
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US",
    },
    audio: {
      content: audioBlob,
    },
  };

  // Make the API request
  return (
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      // Process the response data (transcription)
      .then((data) => {
        const transcription = data.results[0].alternatives[0].transcript;
        return transcription;
      })
      // Return an empty string in case of an error
      .catch((error) => {
        console.error("Error fetching data:", error);
        return "";
      })
  );
}

// If the detected text contains a curse word, charge the user and update balance display
if (containsCurseWord) {
  chargeUserForProfanity(speakerId);
  updateBalanceDisplay(speakerId);
  profilePicture.classList.add("cursing");
}

// Initialize the website and user interface
document.addEventListener("DOMContentLoaded", () => {
  // ...existing code...

  // Initialize user balances display
  Object.keys(userBalance).forEach((userId) => {
    const balanceDisplay = document.createElement("div");
    balanceDisplay.id = `balance-${userId}`;
    balanceDisplay.textContent = `$${userBalance[userId]}`;
    document.getElementById("chat-room").appendChild(balanceDisplay);
  });
});
