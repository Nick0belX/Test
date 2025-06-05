// 1. ЗБЕРЕЖЕННЯ ІНФОРМАЦІЇ В LOCALSTORAGE
const browserInfo = {
  platform: navigator.platform,
  appName: navigator.appName,
  appVersion: navigator.appVersion,
  userAgent: navigator.userAgent,
  language: navigator.language
};
localStorage.setItem("browserInfo", JSON.stringify(browserInfo));

// 1.b Виведення інформації в footer
const footer = document.getElementById("footer");
if (footer) {
  const stored = JSON.parse(localStorage.getItem("browserInfo"));
  footer.innerHTML = `<hr><strong>Інформація про браузер:</strong><br>
    Платформа: ${stored.platform}<br>
    Браузер: ${stored.appName}<br>
    Версія: ${stored.appVersion}<br>
    Мова: ${stored.language}`;
}

// 2. ЗАПИТ НА КОМЕНТАРІ
fetch("https://jsonplaceholder.typicode.com/posts/5/comments")
  .then(response => response.json())
  .then(data => {
    const commentsSection = document.createElement("section");
    commentsSection.classList.add("section", "comments");
    commentsSection.innerHTML = "<h2>Коментарі роботодавців</h2>";
    data.forEach(comment => {
      commentsSection.innerHTML += `
        <div class="comment">
          <p><strong>${comment.name}</strong></p>
          <p>${comment.body}</p>
        </div>`;
    });
    document.querySelector(".resume-container").appendChild(commentsSection);
  });

// 3. ФОРМА ЗВОРОТНОГО ЗВЯЗКУ
setTimeout(() => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <form class="modal-form" action="https://formspree.io/f/meogwoay" method="POST">
      <h2>Зворотний зв'язок</h2>
      <label>Ім'я:<br><input name="name" required></label><br>
      <label>Email:<br><input type="email" name="email" required></label><br>
      <label>Телефон:<br><input name="phone" required></label><br>
      <label>Повідомлення:<br><textarea name="message" required></textarea></label><br>
      <button type="submit">Відправити</button>
    </form>`;
  document.body.appendChild(modal);
}, 60000);

// 4. ТЕМА: ДЕННА/НІЧНА + ПЕРЕМИКАЧ
function setTheme() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 21) {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
}

setTheme();

// Кнопка перемикання
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "Перемкнути тему";
toggleBtn.classList.add("theme-toggle");
toggleBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");
};
document.body.prepend(toggleBtn);
