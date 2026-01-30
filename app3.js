const username = document.getElementById("username");
const Btn = document.getElementById("btn");
const status = document.getElementById("status");
const card = document.getElementById("profile-card");
const avatar = document.getElementById("avatar");
const namee = document.getElementById("name");
const bio = document.getElementById("bio");
const joinDate = document.getElementById("join-date");
const portfolio = document.getElementById("portfolio");

Btn.addEventListener("click", function (e) {
  e.preventDefault();
  fetchUser();
});

async function fetchUser() {
  const user = username.value.trim();

  if (user === "") {
    status.textContent = "Please enter a GitHub username";
    card.style.display = "none";
    return;
  }

  status.textContent = "Loading...";
  card.style.display = "none";

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    avatar.src = data.avatar_url;
    namee.textContent = data.name || data.login;
    bio.textContent = "Bio: " + data.bio || "No bio available";

    joinDate.textContent =
      "Joined: " + new Date(data.created_at).toDateString();

    portfolio.href = data.html_url;
    portfolio.textContent = data.html_url;

    status.textContent = "";
    card.style.display = "block";

  } catch (error) {
    status.textContent = error.message;
    card.style.display = "none";
  }
}
