// ================================
// Load saved UID when popup opens
// ================================
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("savedUID", (data) => {
    if (data.savedUID) {
      document.getElementById("uid").value = data.savedUID;
    }
  });
});

// ================================
// Submit button logic
// ================================
document.getElementById("submit").onclick = () => {
  const userId = document.getElementById("uid").value.trim();

  // Validation
  if (userId === "") {
    document.getElementById("output").innerText =
      "Error: Please enter your UID";
    return;
  }

  // Save UID permanently
  chrome.storage.local.set({ savedUID: userId });

  document.getElementById("output").innerText =
    "Your UID is " + userId;

  // Open target page
  chrome.tabs.create(
    {
      url: "http://192.168.0.66:8090/", // http://127.0.0.1:5500/sample.html 
      active: true
    },
    (tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
func: (uid) => {
  setTimeout(() => {
    const user = document.getElementById("username");
    const pass = document.getElementById("password");

    if (user) user.value = uid;
    if (pass) {
      pass.value = uid;
      pass.focus(); // cursor ready → user presses Enter
    }
  }, 2000);
}


,
          

        args: [userId]
      });

    }
  );
};
