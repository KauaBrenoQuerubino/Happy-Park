


document.addEventListener("DOMContentLoaded", async () => {
  
  
     const editBtns = document.getElementById('edit');
     editBtns.addEventListener('click', () => {
        console.log('ok')
     })
 

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
        const dataDaNascimento = document.getElementById("nascimento").textContent = dados.dataDaNascimento;
        const sexo = document.getElementById("sexo")

        if(dados.sexo == "F"){
          sexo.textContent = "Feminino";
        }else if (dados.sexo == "M") {
          sexo.textContent = "Masculino";
        }else {
          sexo.textContent = "Outro";
        }

        
        
        
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