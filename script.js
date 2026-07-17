document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // FLOWER GENERATOR
  // ==========================
  const container = document.querySelector(".flower-container");

  const TOTAL_FLOWERS = 15;

  const flowerFragment = document.createDocumentFragment();

  for (let i = 0; i < TOTAL_FLOWERS; i++) {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.innerHTML = "🌸";

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.top = Math.random() * 100 + "vh";

    flower.style.fontSize = 20 + Math.random() * 25 + "px";
    flower.style.animationDuration = 12 + Math.random() * 6 + "s";
    flower.style.opacity = 0.3 + Math.random() * 0.7;

    flowerFragment.appendChild(flower);
  }

  container.appendChild(flowerFragment);

  // ==========================
  // AUTO SHOW HOME (opening fades out smoothly instead of snapping)
  // ==========================

  setTimeout(() => {
    const openingSec = document.getElementById("opening");

    if (openingSec) {
      openingSec.classList.add("fade-out");

      setTimeout(() => {
        openingSec.style.display = "none";
      }, 1000);
    }

    document.getElementById("home").classList.add("show");
  }, 8000);

  // ==========================
  // HOME -> GIFT
  // ==========================
  document.getElementById("openGift").addEventListener("click", () => {
    document.getElementById("home").classList.remove("show");
    document.getElementById("gift").classList.add("show");

    startTyping();
  });

  // ==========================
  // TYPING LETTER
  // ==========================
  function startTyping() {
  const paragraphs = [
    "Another year older, but don’t worry, you’re", 
    "still young (for now).",
    "I hope you stay happy, healthy, and everything you want comes your way.",
    "Thank you for being my favorite person to annoy, talk to, and share random things with.",
    "I’m really glad I got to know you, and I hope we can keep making more fun memories together.",
    "Have the best day, birthday sayang! ✨"
  ];

  const el = document.getElementById("typeText");

  el.innerHTML = "";

  const nextBtn = document.getElementById("nextBtn");

  nextBtn.style.display = "none";

  let pIndex = 0;
  let charIndex = 0;

  function typing() {
    if (pIndex < paragraphs.length) {
      if (charIndex === 0) {
        el.innerHTML += "<p></p>";
      }

      const currentP = el.querySelectorAll("p")[pIndex];

      currentP.textContent += paragraphs[pIndex].charAt(charIndex);

      charIndex++;

      if (charIndex < paragraphs[pIndex].length) {
        setTimeout(typing, 35);
      } else {
        pIndex++;
        charIndex = 0;

        setTimeout(typing, 300);
      }
    } else {
      nextBtn.style.display = "inline-block";
    }
  }

  typing();
}

  // ==========================
  // NEXT -> GALLERY (small delay so gift fades out before gallery fades in)
  // ==========================
  document.getElementById("nextBtn").addEventListener("click", () => {
    document.getElementById("gift").classList.remove("show");

    setTimeout(() => {
      document.getElementById("gallery").classList.add("show");
      showEnding();
    }, 400);
  });

  // ==========================
  // LIGHTBOX
  // ==========================
  const photos = document.querySelectorAll(".gallery-track img");

  const lightbox = document.getElementById("lightbox");

  const lightboxImg = document.getElementById("lightboxImg");

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      lightbox.style.display = "flex";

      lightboxImg.src = photo.src;
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  const tracks = document.querySelectorAll(".gallery-track");
  const trackImgs = document.querySelectorAll(".gallery-track img");

  let loadedCount = 0;

  function startTracks() {
    tracks.forEach((t) => {
      t.style.animationPlayState = "running";
    });
  }

  function checkAllLoaded() {
    loadedCount++;

    if (loadedCount === trackImgs.length) {
      startTracks();
    }
  }

  if (trackImgs.length === 0) {
    startTracks();
  } else {
    trackImgs.forEach((img) => {
      if (img.complete && img.naturalWidth !== 0) {
        checkAllLoaded();
      } else {
        img.addEventListener("load", checkAllLoaded);
        img.addEventListener("error", checkAllLoaded);
      }
    });
    setTimeout(startTracks, 3000);
  }

  // ==========================
  // MUSIC (auto play)
  // ==========================
  const music = document.getElementById("bgMusic");

  music.volume = 0.6;

  const tryPlayMusic = () => {
    music.play().catch(() => {
      const resume = () => {
        music.play();
        document.removeEventListener("click", resume);
        document.removeEventListener("touchstart", resume);
      };

      document.addEventListener("click", resume, { once: true });
      document.addEventListener("touchstart", resume, { once: true });
    });
  };

  tryPlayMusic();

  // ==========================
  // SHOW ENDING
  // ==========================
  function showEnding() {
    const end = document.getElementById("endingText");

    if (!end) return;

    end.style.transition = ".8s";

    end.style.opacity = "0";

    setTimeout(() => {
      end.style.opacity = "1";
    }, 1000);
  }

  const showLetterBtn = document.getElementById("showLetterBtn");
  const letterPopup = document.getElementById("letterPopup");
  const popupBox = document.querySelector("#letterPopup .popup-box");
  const popupText = document.getElementById("popupText");
  const resizeBtn = document.getElementById("resizeBtn");
  const repeatBtn = document.getElementById("repeatBtn");
 // ubah kata kata popup disini 
  const letterMessage = `Dear Clarby

Once again, happy birthday yaa. Semoga tahun ini jadi tahun yang banyak bikin kamu senyum. I'm really happy we met. So, I want to ask you something...

Would you be my special person? ❤️`;

  let popupTypingTimeout = null;

  function typePopupLetter() {
    if (popupTypingTimeout) {
      clearTimeout(popupTypingTimeout);
    }

    let j = 0;

    popupText.textContent = "";

    function typingPopup() {
      if (j < letterMessage.length) {
        popupText.textContent += letterMessage.charAt(j);

        j++;

        popupTypingTimeout = setTimeout(typingPopup, 35);
      }
    }

    typingPopup();
  }

  let popupTyped = false;

  showLetterBtn.addEventListener("click", () => {
    letterPopup.style.display = "flex";

    if (!popupTyped) {
      typePopupLetter();
      popupTyped = true;
    } else {
      popupText.textContent = letterMessage;
    }
  });

  letterPopup.addEventListener("click", (e) => {
    if (e.target === letterPopup) {
      letterPopup.style.display = "none";
    }
  });

  resizeBtn.addEventListener("click", () => {
    letterPopup.style.display = "none";
  });

  repeatBtn.addEventListener("click", () => {
    location.reload();
  });
});