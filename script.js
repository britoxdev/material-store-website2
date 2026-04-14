document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quoteForm");
  const formStatus = document.getElementById("formStatus");
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");

    if (themeToggle) {
      themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");

      const isDark = body.classList.contains("dark-mode");

      localStorage.setItem("theme", isDark ? "dark" : "light");

      themeToggle.innerHTML = isDark
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-stars-fill"></i>';
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome");
      const telefone = document.getElementById("telefone");
      const mensagem = document.getElementById("mensagem");

      let isValid = true;

      [nome, telefone, mensagem].forEach((campo) => {
        if (!campo.value.trim()) {
          campo.classList.add("is-invalid");
          isValid = false;
        } else {
          campo.classList.remove("is-invalid");
        }
      });

      if (!isValid) {
        formStatus.textContent = "Preencha os campos obrigatórios para continuar.";
        return;
      }

      const texto = `Olá! Gostaria de solicitar um orçamento.%0A%0A*Nome:* ${encodeURIComponent(nome.value)}%0A*Telefone:* ${encodeURIComponent(telefone.value)}%0A*Produtos/Detalhes:* ${encodeURIComponent(mensagem.value)}`;

      const numero = "5573991931077";
      const linkWhatsApp = `https://wa.me/${numero}?text=${texto}`;

      formStatus.textContent = "Redirecionando para o WhatsApp...";
      window.open(linkWhatsApp, "_blank");
    });
  }

  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const menuCollapse = document.getElementById("menuPrincipal");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuCollapse.classList.contains("show")) {
        const bsCollapse =
          bootstrap.Collapse.getInstance(menuCollapse) ||
          new bootstrap.Collapse(menuCollapse, { toggle: false });

        bsCollapse.hide();
      }
    });
  });
});