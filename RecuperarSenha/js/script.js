function mostrarSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function esconderSpinner() {
  document.getElementById("spinner").style.display = "none";
}

function mensagemok(text){
  mensagem.style.visibility = 'visible';
  mensagem.textContent = text;
  mensagem.style.backgroundColor = "#00bf63"

  setTimeout(() => {
    mensagem.style.animation = 'aparecer 1s linear';
    mensagem.style.visibility = 'hidden';
  },  5000);
}


function mensagemError(text){
  mensagem.style.visibility = 'visible';
  mensagem.textContent = text;
  mensagem.style.backgroundColor = "#ff5757";

  setTimeout(() => {
    mensagem.style.animation = 'aparecer 1s linear';
    mensagem.style.visibility = 'hidden';
  },  5000);
}


const codigoCorreto = Math.floor(Math.random() * (5000 - 1000 + 10)) + 1000;
const mensagem = document.getElementById("mensagem");
let dados;

async function enviarCodigo() {
    document.querySelector("#btn1").disabled = true;
    const email = document.getElementById('email').value;
    if (email) {
        try {
            mostrarSpinner()
            const response = await fetch("http://localhost:8090/emails/recuperar-senha", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    to: email,
                    subject: "TesteAPI",
                    body: codigoCorreto
                 })
              });

              if (response.ok) {
                esconderSpinner()
                mensagemok("Codigo enviado com sucesso")
                document.getElementById('step1').classList.add('hidden');
                document.getElementById('step2').classList.remove('hidden');
                
              } else {
                const erro = await response.text();
                mensagemError(erro)
              }
    
              dados = await response.json(); 

        }catch(error){
            console.log(error)
        }
      
    } else {
      mensagemError("Digite um e-mail válido.");
    }
    
  }

  function verificarCodigo() {
    const codigo = document.getElementById('codigo').value;
    if (codigo == codigoCorreto) {
      document.getElementById('step2').classList.add('hidden');
      document.getElementById('step3').classList.remove('hidden');
    } else {
      mensagemError("Código incorreto!");
    }
  }

  async function trocarSenha() {
    const nova = document.getElementById('novaSenha').value;
    const confirmar = document.getElementById('confirmarSenha').value;

    if (nova.length < 4) {
      mensagemError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    if (nova !== confirmar) {
      mensagemError("As senhas não coincidem.");
      return;
    }

    mensagemok("Senha alterada com sucesso!");

    try{
      const usuario = {
        id: dados.id,
        nome: dados.nome,
        email: dados.email,
        senha: nova,
        identificacao: dados.identificacao,
        dataDaNascimento: dados.dataDaNascimento,
        sexo: dados.sexo
      };

      const response = await fetch("http://localhost:8090/happyparkapi/editar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      window.location.href = "../Login"
    }catch(error){
      console.log(error)
    }
  }