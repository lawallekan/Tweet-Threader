const form = document.getElementById("thread-form");
const urlInput = document.getElementById("thread-url");
const tweetContainer = document.getElementById("tweet-container");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let page = 1;
let threadUrl = "";

async function getTweets(url) {
  try {
    // use the Twitter API or a library like Axios to retrieve the tweets in the thread
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function displayTweets(tweets) {
  tweetContainer.innerHTML = ""; // clear the tweet container
  prevButton.disabled = page === 1; // disable the "Prev" button if we're on the first page
  nextButton.disabled = !tweets.length; // disable the "Next" button if there are no more tweets

  // create an HTML element for each tweet and add it to the tweet container
  tweets.forEach((tweet) => {
    const div = document.createElement("div");
    div.classList.add("tweet");
    div.innerHTML = `
      <img src="${tweet.user.profile_image_url_https}" alt="${tweet.user.name}">
      <h3>${tweet.user.name}</h3>
      <p>${tweet.text}</p>
    `;
    tweetContainer.appendChild(div);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent the form from reloading the page

  threadUrl = urlInput.value;
  page = 1; // reset the page to 1 when the user submits a new URL

  const tweets = await getTweets(threadUrl);
  displayTweets(tweets);
});

prevButton.addEventListener("click", async (event) => {
  page--; // go to the previous page
  const tweets = await getTweets(`${threadUrl}?page=${page}`);
  displayTweets(tweets);
});

nextButton.addEventListener("click", async (event) => {
  page++; // go to the next page
  const tweets = await getTweets(`${threadUrl}?page=${page}`);
  displayTweets(tweets);
});
