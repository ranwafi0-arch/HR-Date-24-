const songUrl = "https://youtu.be/PPIDwhXrcI4?t=19";

const journeyData = [
  {
    question: "هل تفضل موعدنا يكون بدري ولا متأخر؟",
    answers: [
      {
        text: "بدري",
        response: "أكيد بدري… عشان اليوم معك ما يكفيه وقت 🤍"
      },
      {
        text: "متأخر",
        response: "لا لا 😏 أنا أفضل بدري… بدي وقت أطول معك"
      }
    ]
  },
  {
    question: "تحب تكون السائق أم الـ DJ؟",
    answers: [
      {
        text: "السائق",
        response: "أنت أصلًا سائقي المفضل… أثق بسواقتك وبسوالفك 🤍"
      },
      {
        text: "الـ DJ",
        response: "لا 😌 أنا اليوم الأميرة… أصور وأغني وأعيش الجو… وأنت تسوق"
      }
    ]
  },
  {
    question: "تفضل أكل جاهز أم نطبخ سوا؟",
    answers: [
      {
        text: "أكل جاهز",
        response: "خلينا نجرب شيء مختلف هالمرة… نطبخ سوا ونسرق وقت أجمل 🤍"
      },
      {
        text: "نطبخ سوا",
        response: "يااااي 🤍 هذا من البداية يبدو أفضل موعد!"
      }
    ]
  },
  {
    question: "هل تثق بتخطيط رنين؟",
    answers: [
      {
        text: "نعم",
        response: "أوه 😏 جاهز لمفاجأة ما راح تنساها"
      },
      {
        text: "إلى حد ما",
        response: "واضح إنك متردد… بس اصبر علي شوي 😌🤍"
      },
      {
        text: "ثقة عمياء",
        response: "أوه 😏 هذا المستوى اللي بدي ياه فعلًا 🔥🤍"
      }
    ]
  }
];

const finalMessageText =
`في هذا اليوم… سننفصل عن كل شيء 🤍

من لحظة ما تدخل السيارة… جوالك لازم يكون بين الغيوم ✈️
وعدني تحاول بكل قلبك تعيش اللحظة…
وأنا أوعدك إني راح أحاول أخليها لحظة تستحق وما تنسى.

مثل كل مرة… أتمنى الوقت ما يخلص،
لكن هالمرة حاسة بهيك حتى قبل ما يبدأ اليوم.

وفي نهاية هذا الموعد…
سيُطلب منك أن تكتب رسالة لك… ولي.
رسالة سنخفيها إلى يوم نختاره نحن الاثنين.

إن كنا حينها ما زلنا معًا… سنقرأها سوا 🤍
وإن لم نكن… فستبقى ذكرى جميلة مرّت من هنا بهدوء. 🌷✨`;

let currentStep = 0;
let lastAnsweredStep = -1;

const heroSection = document.getElementById("heroSection");
const mapSection = document.getElementById("mapSection");
const popupBackdrop = document.getElementById("popupBackdrop");
const popupQuestion = document.getElementById("popupQuestion");
const popupAnswers = document.getElementById("popupAnswers");
const popupResponse = document.getElementById("popupResponse");
const finalMessage = document.getElementById("finalMessage");

const questionView = document.getElementById("questionView");
const responseView = document.getElementById("responseView");
const finalView = document.getElementById("finalView");

const mapCar = document.getElementById("mapCar");
const stops = [
  document.querySelector(".stop1"),
  document.querySelector(".stop2"),
  document.querySelector(".stop3"),
  document.querySelector(".stop4")
];
const finalStop = document.querySelector(".final-stop");

function playSong() {
  window.open(songUrl, "_blank");
}

function startWithMusic() {
  playSong();
  startJourney();
}

function startJourney() {
  heroSection.classList.add("hidden");
  mapSection.classList.remove("hidden");
  moveCarTo(0);
  unlockStep(0);
}

function moveCarTo(positionIndex) {
  mapCar.className = "map-car";
  mapCar.classList.add(`pos${positionIndex}`);
}

function unlockStep(stepIndex) {
  stops.forEach((stop, index) => {
    stop.classList.remove("active");
    if (index < stepIndex) {
      stop.classList.remove("locked");
    } else if (index === stepIndex) {
      stop.classList.remove("locked");
      stop.classList.add("active");
    } else {
      stop.classList.add("locked");
    }
  });

  if (stepIndex >= journeyData.length) {
    finalStop.classList.remove("locked");
    finalStop.classList.add("active");
  }
}

function openQuestion(index) {
  if (index > currentStep) return;

  const step = journeyData[index];
  lastAnsweredStep = index;

  popupBackdrop.classList.remove("hidden");
  questionView.classList.remove("hidden");
  responseView.classList.add("hidden");
  finalView.classList.add("hidden");

  popupQuestion.textContent = step.question;
  popupAnswers.innerHTML = "";

  step.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => showResponse(answer.response);
    popupAnswers.appendChild(btn);
  });
}

function showResponse(text) {
  questionView.classList.add("hidden");
  responseView.classList.remove("hidden");
  finalView.classList.add("hidden");
  popupResponse.textContent = text;
}

function continueJourney() {
  popupBackdrop.classList.add("hidden");

  if (lastAnsweredStep === currentStep) {
    currentStep++;
    moveCarTo(currentStep);

    if (currentStep < journeyData.length) {
      unlockStep(currentStep);
    } else {
      unlockStep(journeyData.length);
    }
  }
}

function showFinalMessage() {
  if (currentStep < journeyData.length) return;

  popupBackdrop.classList.remove("hidden");
  questionView.classList.add("hidden");
  responseView.classList.add("hidden");
  finalView.classList.remove("hidden");
  finalMessage.textContent = finalMessageText;
}

function closePopup() {
  popupBackdrop.classList.add("hidden");
}
