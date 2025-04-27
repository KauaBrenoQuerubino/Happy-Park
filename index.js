


document.addEventListener("DOMContentLoaded", async () => {

    try {
        
            fetch("./nav/nav.html")
              .then(res => res.text())
              .then(data => {
                document.getElementById("nav-placeholder").innerHTML = data;
                
                const LinkDiv = document.querySelector('.botaoAutenticacao');
                const botaoDiv = document.querySelector('.perfil');
                const sair = document.querySelector('.bi-box-arrow-left');

                sair.style.display = "block"
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

        
    }
    catch (error) {

            fetch("./nav/nav.html")
              .then(res => res.text())
              .then(data => {
                document.getElementById("nav-placeholder").innerHTML = data;
                
                const botaoDiv = document.querySelector('.botaoAutenticacao');
            
              });
    }
});