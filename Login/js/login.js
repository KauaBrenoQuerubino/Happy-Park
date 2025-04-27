document.getElementById("formLogin").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = { email, senha };
    const mensagem = document.getElementById("mensagem");

    try {
        const response = await fetch("http://localhost:8090/happyparkapi/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        const dados = await response.json(); 

       
        console.log("Resposta da API:", dados);

        if (response.status === 200) {
            mensagem.style.visibility = 'visible';
            mensagem.textContent = dados.mensagem || "Login realizado com sucesso!";
            mensagem.style.backgroundColor = "#00bf63";

            localStorage.setItem("Token", dados.token)
            setTimeout(() => {
                window.location.href = "/"
              },  2000);

        } else if (response.status === 409) {
            mensagem.style.visibility = 'visible';
            mensagem.textContent = dados.mensagem || "Falha no login. Verifique suas credenciais.";
            mensagem.style.backgroundColor = "#ff4d4d";
        }

        setTimeout(() => {
            mensagem.style.animation = 'aparecer 1s linear';
            mensagem.style.visibility = 'hidden';
          },  5000);

    } catch (error) {
        console.error("Erro:", error);
        mensagem.style.visibility = 'visible';
        mensagem.textContent = "Falha no login. Verifique suas credenciais.";
        mensagem.style.backgroundColor = "#ff4d4d";

        setTimeout(() => {
            mensagem.style.animation = 'aparecer 1s linear';
            mensagem.style.visibility = 'hidden';
          },  5000);
    }
});
