const git_profile = "https://api.github.com/users/BR-Darkness/repos";

/**
* Dark Theme Function / Função de Tema Escuro
*/
function DarkTheme()
{
    var Element = document.body;
    Element.classList.toggle("dark-theme");
}

/**
* Função que retorna um Array com os repositórios de estudos.
*/
function Repositorios() 
{
    fetch(git_profile)
    .then(function (response)
    {
        if (!response.ok) 
        {
            document.getElementById('Repositories-List').innerHTML =
            `
                <div class="card">
                    <h4 style="Text-align: center;">Erro 403:</h4>
                    <p style="Text-align: center;">A API atingiu o limite de requisições por hora, por favor volte mais tarde</p>
                    <br>
                    <p style="Text-align: center;"><a href="https://github.com/BR-Darkness"><button>Acesse meu GitHub enquanto isso</button></a></p>
                </div>
            `
        }
        else return response.json();
    })
    .then(function (json)
    {       
        let data = ''; 
        json.forEach( Repositorio => 
        {
            data +=
            `   
                <div class="card">
                    <h4>${Repositorio.name.replace(/_/gi," ")}</h4>
                    <p><q>${Repositorio.description}</q></p>          
                    <nav>
                        <nav>
                            <p><b>Linguagem:</b> ${String(Repositorio.language).replace("null", "Indefinida")}</p>
                            <p><b>Data:</b> ${String('####-##-##').replace(/#/g,function(m,o) {return Repositorio.created_at[o];}).split('-').reverse().join('/')}</p>
                        </nav>
                        <nav>
                            <a href="${Repositorio.html_url}" target="_blank"><button class="card-github-button">GitHub</button></a>`;
   
                        if (Repositorio.homepage) data += `<a href="${Repositorio.homepage}" target="_blank"><button>Ver Site</button></a>`;
                        
                        data += `
                        </nav>
                    </nav>
                </div>
            `;
            document.getElementById('Repositories-List').innerHTML = data;
        })
    })
}