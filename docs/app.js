const config_file = "https://api.github.com/users/BR-Darkness/repos";

/**
* Dark Theme Function / Função de Tema Escuro
*/
function DarkTheme()
{
    var Element = document.body;
    Element.classList.toggle("Dark-Theme");
}

/**
 * Função que retorna um Array com os repositórios de estudos.
 */
function Repositorios() 
{
    fetch("https://api.github.com/users/BR-Darkness/repos")
    .then(function (response)
    {
        if (!response.ok) 
        {
            document.getElementById('Repositorios_List').innerHTML +=
            `
                <div class="Card">
                    <h4 style="Text-align: center;">Erro 403:</h4>
                    <p style="Text-align: center;">A API atingiu o limite de requisições por hora, por favor volte mais tarde</p>
                    <br>
                    <p style="Text-align: center;"><a href="https://github.com/BR-Darkness"><button>Acesse meu GitHub enquanto isso</button></a></p>
                </div>
            `
        }
        else
        {
            return response.json();
        }
    })
    .then(function (json)
    {        
        json.forEach( (Repositorio, Index) => 
        {
            if (Repositorio.homepage) 
            {
                document.getElementById('Repositorios_List').innerHTML +=
                `
                    <div class="Card">

                        <h4><b>${Repositorio.name.replace(/_/gi," ")}</b></h4>

                        <p><q>${Repositorio.description}</q></p>
                        
                        <nav>
                            <nav>
                                <p><b>Linguagem:</b> <i>${String(Repositorio.language).replace("null", "???")}</i></p>
                                <p><b>Data:</b> <i>${String('####-##-##').replace(/#/g,function(m,o) {return Repositorio.created_at[o];}).split('-').reverse().join('/')}</i></p>
                            </nav>
                            <nav>
                                <a href="${Repositorio.homepage}" target="_blank"><button>Ver Site</button></a>
                                <a href="${Repositorio.html_url}" target="_blank"><button class="GithubButton">GitHub</button></a>
                            </nav>
                        </nav>
                    </div>
                `
            }
            else
            {
                document.getElementById('Repositorios_List').innerHTML +=
                `
                    <div class="Card">

                        <h4><b>${Repositorio.name.replace(/_/gi," ")}</b></h4>
                        
                        <p><q>${Repositorio.description}</q></p>
                        
                        <nav>
                            <nav>
                                <p><b>Linguagem:</b> <i>${String(Repositorio.language).replace("null", "???")}</i></p>
                                <p><b>Data:</b> <i>${String('####-##-##').replace(/#/g,function(m,o) {return Repositorio.created_at[o];}).split('-').reverse().join('/')}</i></p>
                            </nav>
                            <nav>
                                <a href="${Repositorio.html_url}" target="_blank"><button class="GithubButton">GitHub</button></a>
                            </nav>
                        </nav>
                    </div>
                `
            } 
        })
    })
}