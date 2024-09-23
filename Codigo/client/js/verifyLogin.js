window.addEventListener("load", () => {
    const currentUrl = window.location.href;
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.alert("Voce precisa estar logado!");
        window.location.href = "../index.html";
    }
});