function auth() {
  const url = "http://localhost:3000/auth";
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ numId: $("#numId").val(), pass: $("#pass").val() }),
  })
    .then((resp) => resp.json())
    .then((ret) => {
      if (ret) {
        window.location.replace(
          "http://localhost/ChatbotIFMG_Sabara/views/admin/funcionalidade.html"
        );
      } else {
        alert("Errou o login!");
      }
    });
}
