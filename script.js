const randomImageElement = document.getElementById('random-image');
const generateButton = document.getElementById('generate-button');

const randomImages = [
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpg',
  'images/6.jpg',
  'images/7.jpg',
  'images/8.jpg',
  'images/9.jpg',
  'images/10.jpg'
];

generateButton.addEventListener('click', generateRandomImage);

function generateRandomImage() {
  const randomIndex = Math.floor(Math.random() * randomImages.length);
  const randomImageUrl = randomImages[randomIndex];
  randomImageElement.src = randomImageUrl;

  // Yönlendirme
  window.location.href = `second-page.html?image=${encodeURIComponent(randomImageUrl)}`;
}

// $(document).ready(function () {
//   // Add smooth scrolling to all links
//   $("a").on("click", function (event) {
//     // Make sure this.hash has a value before overriding default behavior
//     if (this.hash !== "") {
//       // Prevent default anchor click behavior
//       event.preventDefault();

//       // Store hash
//       var hash = this.hash;

//       // Using jQuery's animate() method to add smooth page scroll
//       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//       $("html, body").animate(
//         {
//           scrollTop: $(hash).offset().top,
//         },
//         800,
//         function () {
//           // Add hash (#) to URL when done scrolling (default click behavior)
//           window.location.hash = hash;
//         }
//       );
//     } // End if
//   });
// });


// Wallet Connect

document.addEventListener("DOMContentLoaded", () => {
  const connectButton = document.getElementById("connect-button");

  connectButton.addEventListener("click", async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected!");
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      console.error("No Ethereum provider detected");
    }
  });
});


const subscriptionLink = document.getElementById('subscription-link');

// "Subscription" bağlantısına tıklama olayını dinleyin
subscriptionLink.addEventListener('click', function(event) {
  // Varsayılan olayı engelleyin (sayfanın yeniden yüklenmesini engeller)
  event.preventDefault();

  // Yeni bir pencere (sayfa) açın
  window.open('subscription.html', '_blank');
});