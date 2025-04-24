


document.addEventListener("DOMContentLoaded", async () => {
  
  
   const icones = document.querySelectorAll(".bi-pencil");
   const editar = document.querySelectorAll(".edit");
   const aceitar = document.getElementById("aceitar");

   
   editar.forEach(btn => {
      btn.addEventListener('click', () => {
        aceitar.style.display = "inline"
        icones.forEach(icon => {
          icon.style.display = "inline"
        })
      })
   })

   icones.forEach(icon => {
    icon.addEventListener('click', () => {
      const campo = icon.previousElementSibling;

      if (!campo) return;

      const valorAtual = campo.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = valorAtual;

      campo.replaceWith(input);
      input.focus();

      // Ao sair do campo ou pressionar Enter, salva o valor
      const salvar = () => {
        const novoP = document.createElement("p");
        novoP.id = campo.id;
        novoP.textContent = input.value;
        input.replaceWith(novoP);
      };

      input.addEventListener("blur", salvar);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          salvar();
        }
      });
    });
  });


    try {
        
            fetch("../nav/nav.html")
              .then(res => res.text())
              .then(data => {
                document.getElementById("nav-placeholder").innerHTML = data;
                
                const LinkDiv = document.querySelector('.botaoAutenticacao');
                const botaoDiv = document.querySelector('.perfil');

                botaoDiv.style.display = "block"
                LinkDiv.style.display = "none";
              
              });
       
        const token = localStorage.getItem("Token");

        const response = await fetch("http://localhost:8090/happyparkapi/sessao", {
            method: "POST",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })

        });

        const dados = await response.json();

        const nome = document.getElementById("nome").textContent = dados.nome;
        const email = document.getElementById("email").textContent = dados.email;
        const senha = document.getElementById("senha").textContent = "**********";
        const cpf = document.getElementById("cpf").textContent = dados.identificacao;
        const dataDaNascimento = document.getElementById("nascimento").textContent = dados.dataDaNascimento.replace("T00:00:00.000+00:00", "");
        const sexo = document.getElementById("sexo")

        if(dados.sexo == "F"){
          sexo.textContent = "Feminino";
        }else if (dados.sexo == "M") {
          sexo.textContent = "Masculino";
        }else {
          sexo.textContent = "Outro";
        }

        
        aceitar.addEventListener('click',async () => {

          const nome = document.getElementById("nome").textContent;
          const email = document.getElementById("email").textContent;
          const senha = document.getElementById("senha").textContent;
          const identificacao = document.getElementById("cpf").textContent;
          const dataNascimento = document.getElementById("nascimento").textContent;
          let sexo = document.getElementById("sexo").textContent;

          if(sexo === "Masculino"){
            sexo = "M"
          }else if(sexo === "Feminino"){
            sexo = "F"
          }else{
            sexo = "O"
          }
          
          const usuario = {
            id: dados.id,
            nome,
            email,
            senha: dados.senha,
            identificacao,
            dataDaNascimento: dataNascimento + "T00:00:00.000+00:00",
            sexo
          };

          

        try {
          const response = await fetch("http://localhost:8090/happyparkapi/editar", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(usuario)
        });

        if (!response.ok) {
          throw new Error("Erro ao editar usuário");
        }

        const resultado = await response.json();
        aceitar.style.display = "none"
        icones.forEach(icon => {
          icon.style.display = "none"
        })
        

      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    })
        
        
        
    }
    catch (error) {
      window.location.href = "/Login"
      console.log("error")
            fetch("../nav/nav.html")
              .then(res => res.text())
              .then(data => {
                document.getElementById("nav-placeholder").innerHTML = data;
                
                const botaoDiv = document.querySelector('.botaoAutenticacao');
            
              });
    }
});
