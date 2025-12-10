// ===== 設定 =====
const RECEIVER_NAME = "Mero Maya";
const SENDER_NAME = "Khine";
const AVATAR_SRC = "./image.png";

document.addEventListener("DOMContentLoaded", () => {
  const stepContainer = document.getElementById("step-container");
  const progressFill = document.getElementById("progress-fill");
  const tapSound = document.getElementById("tapSound");
  const bgm = document.getElementById("bgm");
  const playBtn = document.getElementById("playSong");

  let currentStep = 0;

  // ==== タイピングメッセージ ====
  const typingLines = [
    "I've created something a little magical just for you.",
    "Are you ready to begin this special journey with me?",
  ];

  function startTyping() {
    const el = document.getElementById("typing-text");
    if (!el) return;

    let line = 0;
    let charIndex = 0;
    const speed = 45;
    const linePause = 650;

    function type() {
      if (line >= typingLines.length) return;

      const currentLine = typingLines[line];
      const previous = typingLines.slice(0, line).join("<br/>");
      const current = currentLine.slice(0, charIndex + 1);
      el.innerHTML = (previous ? previous + "<br/>" : "") + current;

      charIndex++;

      if (charIndex >= currentLine.length) {
        line++;
        charIndex = 0;
        setTimeout(type, linePause);
      } else {
        setTimeout(type, speed);
      }
    }

    type();
  }

  // ==== ハート紙吹雪 ====
  function heartExplosion(x, y) {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "heart-confetti";
      document.body.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const distance = gsap.utils.random(50, 180);

      gsap.set(el, {
        x,
        y,
        scale: gsap.utils.random(0.4, 1),
        opacity: 1,
      });

      gsap.to(el, {
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        opacity: 0,
        duration: gsap.utils.random(1.2, 2),
        ease: "power2.out",
        onComplete: () => el.remove(),
      });
    }
  }

  // ==== ステップHTML ====
  const stepTemplates = [
    () => `
      <h1 class="step-title">Happy Birthday, ${RECEIVER_NAME}! 🎂</h1>
      <p class="step-text typing" id="typing-text"></p>
      <button class="btn-main" data-next>Open Your Gift</button>
    `,
    () => `
      <h1 class="step-title">For You, My Baby💗</h1>

      <div class="heart-wrap">
        <button class="big-heart" id="heart" type="button">
          <div class="heart-core"></div>
          <span class="tap-label">Tap me</span>
        </button>
      </div>

      <p class="step-text text-under-heart">
        Tap the heart to open your birthday surprise.<br/>
        I made this little page just for you.
      </p>

      <button class="btn-main" data-next>Continue to Your Message</button>
    `,
    () => `
      <h1 class="step-title">My Special Message For You ✨</h1>
      <div class="avatar-wrap">
        <div class="avatar-circle">
          <img src="${AVATAR_SRC}" alt="avatar" />
        </div>
      </div>
      <p class="step-text">
        My baby,<br/>
        you are more special to me than you’ll ever know.
      </p>
      <button class="btn-main" data-next>See Your Surprise</button>
    `,
    () => `
      <h1 class="step-title">From My Heart to Yours 💌</h1>
      <p class="step-text">
Happy birthday to the person who owns my heart.
I don’t know how long life will allow us to be together,
but I want to stay by your side for as long as I can.
I want to become a good person for you — someone who supports you emotionally
and stays close to you even during difficult times.
Thank you for giving me your precious heart and for making me feel emotionally safe.

I hope this little message makes you feel even a fraction of how much
I love you, admire you.

Happy birthday, my love.
Let’s stay together, happy, healthy, and in love.

With all my love, ${SENDER_NAME}.
      </p>
      <button class="btn-main" data-next>Replay the Magic 🔁</button>
    `,
  ];

  const totalSteps = stepTemplates.length;

  // ==== ステップ描画 ====
  function renderStep(index) {
    currentStep = index;
    stepContainer.innerHTML = stepTemplates[index]();

    const percentage = ((index + 1) / totalSteps) * 100;
    progressFill.style.width = `${percentage}%`;

    if (index === 0) startTyping();

    gsap.fromTo(
      stepContainer,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    const heart = document.getElementById("heart");
    if (heart) {
      const core = heart.querySelector(".heart-core") || heart;

      gsap.to(core, {
        scale: 1.05,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      heart.addEventListener("click", (e) => {
        if (tapSound) {
          tapSound.currentTime = 0;
          tapSound.play().catch(() => {});
        }

        // ★ ハートを押したときにBGMスタート ★
        if (bgm && bgm.paused) {
          bgm.currentTime = 0;
          bgm.play().catch(() => {});
        }

        heartExplosion(e.clientX, e.clientY);

        gsap.fromTo(
          core,
          { scale: 1.05 },
          {
            scale: 1.25,
            duration: 0.22,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          }
        );

        setTimeout(() => {
          const nextIndex = (currentStep + 1) % totalSteps;
          renderStep(nextIndex);
        }, 320);
      });
    }

    const nextBtn = stepContainer.querySelector("[data-next]");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const nextIndex = (currentStep + 1) % totalSteps;
        renderStep(nextIndex);
      });
    }
  }

  // ★ Play Song ボタンで再生 / 一時停止 ★
  if (playBtn && bgm) {
    playBtn.addEventListener("click", () => {
      if (bgm.paused) {
        bgm.currentTime = 0;
        bgm.play().catch(() => {});
      } else {
        bgm.pause();
      }
    });
  }

  // particles.js
  function initParticles() {
    particlesJS("particles-js", {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: ["#ff4e88", "#ff9bb9", "#ffc4dc"] },
        shape: {
          type: "image",
          image: {
            src: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
            width: 40,
            height: 40,
          },
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: { enable: true, speed: 0.6, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 12,
          random: true,
          anim: { enable: false },
        },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 1.2,
          direction: "bottom",
          random: true,
          straight: false,
          out_mode: "out",
          attract: { enable: false },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false },
          onclick: { enable: false },
          resize: true,
        },
      },
      retina_detect: true,
    });
  }

  initParticles();
  renderStep(0);
});
