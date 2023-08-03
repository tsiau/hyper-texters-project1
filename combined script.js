function showPage(pageId) {
  // Hide all the pages first
  document.querySelectorAll('.page').forEach(page => {
      page.style.display = 'none';
  });

  // Show the selected page
  document.getElementById('home-link').style.display = 'block';
}

// Show the first page by default
showPage('page1');

// Attach click event listeners to navigation links
document.getElementById('home-link').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default link behavior
  loadPage('/home.html');
});

document.getElementById('profile-link').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default link behavior
  loadPage('/profile.html');
});

// Function to handle user sign-up
function handleSignUp() {
    // Get the form inputs and perform any necessary validations
    // Submit the form data to the server or perform the necessary actions
    // Redirect to the home.html page after successful sign-up
    window.location.href = "/home.html";
  }
  
  // Function to handle user logout
  function handleLogout() {
    // Perform logout actions, e.g., clear session, redirect to sign-in page, etc.
    // For demonstration purposes, we are redirecting to the sign-up page
    window.location.href = "/index.html";
  }
  
  // Function to start speech-to-text transcription
  function startTranscription() {
    // Add your code to start speech-to-text transcription here
    // For demonstration purposes, you can show a message that transcription started
    console.log("Transcription started...");
  }
  
  // Attach event listeners to the trigger buttons
  document.addEventListener("DOMContentLoaded", () => {
    // Trigger Sign Up when the Sign Up button is clicked
    document.querySelector("#form1 button[type='button']").addEventListener("click", handleSignUp);
  
    // Trigger Logout when the Logout button is clicked
    document.querySelector("#chatroom .home-container1 button:nth-child(2)").addEventListener("click", handleLogout);
  
    // Trigger Transcription when the Start Transcription button is clicked
    document.querySelector("#chatroom #startTranscriptionBtn").addEventListener("click", startTranscription);
  });  

// Mock user balance (you'd typically handle this server-side)
const userBalance = {
    1: 100, // User 1 has $100
    // Add balances for other users as needed
  };
  
  // Mock user profile pictures (you'd typically handle this server-side)
  const userProfilePictures = {
    1: "./assets/images/profile-picture-user1.png", // User 1 has this profile picture
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
  
  // List of curse words (for demonstration purposes)
  const curseWords = ["curse1", "curse2", "badword", "inappropriate"];
  
  // Function to check if the text contains any curse word
  function containsCurseWord(text) {
    return curseWords.some((curse) => text.includes(curse));
  }
  
  // Example definition for textWithCurseWord (replace this with actual transcribed text)
  const textWithCurseWord = "Hello, this is a test with a badword in it.";
  
  // Example usage of containsCurseWord function
  const hasCurseWord = containsCurseWord(textWithCurseWord);
  console.log(hasCurseWord); // Output: true (because "badword" is present in the text)
  
  // Function to display profile picture based on speakerId
  function displayProfilePicture(speakerId) {
    const profilePicture = document.getElementById("profilePicture");
    const profilePictureURL =
      userProfilePictures[speakerId] || "./assets/images/default-profile-picture.png";
    profilePicture.src = profilePictureURL;
    profilePicture.alt = `Profile Picture for User ${speakerId}`;
  }
  
  // Example definition for speakerId (replace this with the actual speaker ID)
  const speakerId = 1; // Assuming user 1 is speaking (for demonstration purposes)
  
  // Call the function to display the profile picture
  displayProfilePicture(speakerId);
  
  
  // Word Associations Network API
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
  
  // Google Cloud Speech-to-Text API
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
  