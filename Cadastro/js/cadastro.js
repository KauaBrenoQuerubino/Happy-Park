
document.getElementById("formCadastro").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const identificacao = document.getElementById("identificacao").value.replaceAll(".", "").replaceAll("-", "");
  const dataNascimento = document.getElementById("dataNascimento").value;
  const sexo = document.getElementById("sexo").value;

  const mensagem = document.getElementById("mensagem");

  if(identificacao.length > 14 || identificacao.length < 11){
      mensagem.style.visibility = 'visible';
      mensagem.textContent = "Digite um cpf Valido";
      mensagem.style.backgroundColor = "#ff5757";

      setTimeout(() => {
        mensagem.style.animation = 'aparecer 1s linear';
        mensagem.style.visibility = 'hidden';
      },  5000);
      throw new Error("Digite um CPF valido");
  }

  if(senha.length < 4) {
    mensagem.style.visibility = 'visible';
    mensagem.textContent = "Senha muito curta";
    mensagem.style.backgroundColor = "#ff5757";

    setTimeout(() => {
      mensagem.style.animation = 'aparecer 1s linear';
      mensagem.style.visibility = 'hidden';
    },  5000);
    throw new Error("Digite uma senha maior");
  }

  const usuario = {
    id: 0,
    nome,
    email,
    senha,
    identificacao,
    dataDaNascimento: dataNascimento + "T00:00:00.000+00:00", // formato ISO com timezone
    sexo
  };

  try {
    const response = await fetch("http://localhost:8090/happyparkapi/cadUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });

    
    if (response.status === 201) {
      mensagem.style.visibility = 'visible';
      mensagem.textContent = "Usuário cadastrado com sucesso!";
      mensagem.style.backgroundColor = "#00bf63"

      setTimeout(() => {
        window.location.href = "/login/"
      },  2000);
      

    } else if (response.status === 409) {
      mensagem.style.visibility = 'visible';
      mensagem.textContent = "Email ou CPF já cadastrados.";
      mensagem.style.backgroundColor = "#ff5757";
    } else {
      mensagem.style.visibility = 'visible';
      mensagem.textContent = "Erro ao cadastrar usuário.";
      mensagem.style.backgroundColor = "#ff5757";
    }
    setTimeout(() => {
      mensagem.style.animation = 'aparecer 1s linear';
      mensagem.style.visibility = 'hidden';
    },  5000);
  } catch (error) {
    console.error("Erro:", error);
    document.getElementById("mensagem").textContent = "Erro na conexão com o servidor.";
  }
});
