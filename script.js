let current = 0;

const data = [
  {
    question: "هل تفضل موعدنا يكون بدري أم متأخر؟",
    answers: [
      { text: "بدري", response: "أكيد بدري… عشان اليوم معك ما يكفيه وقت 🤍" },
      { text: "متأخر", response: "لا لا 😏 أنا أفضل بدري… أبغى وقت أطول معك" }
    ]
  },
  {
    question: "تحب تكون السائق أم الـ DJ؟",
    answers: [
      { text: "السائق", response: "أنت أصلًا سائقي المفضل… أثق بسواقتك وبسوالفك 🤍" },
      { text: "الـ DJ", response: "لا 😌 أنا اليوم الأميرة… أصور وأغني وأعيش الجو… وأنت تسوق" }
    ]
  },
  {
    question: "تفضل أكل جاهز أم نطبخ سوا؟",
    answers: [
      { text: "أكل جاهز", response: "خلينا نجرب شيء مختلف هالمرة… نطبخ سوا ونسرق وقت أجمل 🤍" },
      { text: "نطبخ سوا", response: "يااااي 🤍 هذا من البداية يبدو أفضل موعد!" }
    ]
  },
  {
    question: "هل تثق بتخطيط رنين؟",
    answers: [
      { text: "نعم", response: "أوه 😏 جاهز لمفاجأة ما راح تنساها" },
      { text: "إلى حد ما", response: "واضح إنك متردد… بس اصبر علي 😌" },
      { text: "ثقة عمياء", response: "أوه 😏 هذا المستوى اللي أبغاه 🔥" }
    ]
  }
];

function startGame() {
  document.getElementById("game").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = data[current];
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.innerText = a.text;
    btn.onclick = () => showResponse(a.response);
    answersDiv.appendChild(btn);
  });
}

function showResponse(text) {
  document.getElementById("questionBox").classList.add("hidden");
  document.getElementById("responseBox").classList.remove("hidden");
  document.getElementById("response").innerText = text;
}

function nextQuestion() {
  current++;

  if (current >= data.length) {
    document.getElementById("response").innerText =
      "في هذا اليوم… سنفصل عن كل شيء 🤍\n\nوعدني تعيش اللحظة… وأنا أوعدك أخليها ما تُنسى.\n\nوفي النهاية… راح نكتب رسالة ونخبيها ليوم نرجع نقرأها سوا ✨";
    return;
  }

  document.getElementById("questionBox").classList.remove("hidden");
  document.getElementById("responseBox").classList.add("hidden");
  showQuestion();
}
