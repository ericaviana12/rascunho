// config.js – Lógica das configurações de fonte, tema e backup

document.addEventListener("DOMContentLoaded", () => {
  const fonteSelect = document.getElementById("fonte");
  const temaSelect = document.getElementById("tema");
  const backupBtn = document.getElementById("fazer-backup");

  // Carrega preferências salvas
  const preferencias = JSON.parse(localStorage.getItem("preferencias")) || {
    fonte: "sans-serif",
    tema: "claro"
  };

  fonteSelect.value = preferencias.fonte;
  temaSelect.value = preferencias.tema;
  aplicarPreferencias(preferencias);

  fonteSelect.addEventListener("change", () => {
    preferencias.fonte = fonteSelect.value;
    salvarPreferencias();
    aplicarPreferencias(preferencias);
  });

  temaSelect.addEventListener("change", () => {
    preferencias.tema = temaSelect.value;
    salvarPreferencias();
    aplicarPreferencias(preferencias);
  });

  backupBtn.addEventListener("click", () => {
    const livros = localStorage.getItem("livros") || "[]";
    const blob = new Blob([livros], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "backup_rascunho.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  function salvarPreferencias() {
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
  }

  function aplicarPreferencias(prefs) {
    document.body.style.fontFamily = prefs.fonte;
    if (prefs.tema === "escuro") {
      document.body.style.backgroundColor = "#1c1c1c";
      document.body.style.color = "#f0f0f0";
    } else {
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.style.color = "#333";
    }
  }
});
