const btnIniciar = document.querySelector(".btn-iniciar");
const telaInicial = document.getElementById("tela-inicial");
const quiz = document.getElementById("quiz");

btnIniciar.addEventListener("click", () => {
    telaInicial.style.display = "none";
    quiz.style.display = "block";

    quiz.scrollIntoView({
        behavior: "smooth"
    });
});

const perguntas = [
{
    pergunta: "O nível do rio subiu 2 metros em 24 horas. O que você faz?",
    opcoes: [
        "Ignoro a informação",
        "Espero mais uma semana",
        "Verifico histórico e previsão para avaliar o risco",
        "Desativo os alertas"
    ],
    correta: 2
},
{
    pergunta: "Qual é o principal objetivo do Space Connect?",
    opcoes: [
        "Monitorar satélites militares",
        "Prever enchentes e apoiar decisões preventivas",
        "Controlar trânsito urbano",
        "Monitorar qualidade do ar"
    ],
    correta: 1
},
{
    pergunta: "Qual satélite fornece os dados utilizados pelo projeto?",
    opcoes: [
        "Hubble",
        "James Webb",
        "SWOT",
        "Sputnik"
    ],
    correta: 2
},
{
    pergunta: "Quem é o principal público-alvo da solução?",
    opcoes: [
        "Jogadores de videogame",
        "Defesa Civil e gestores públicos",
        "Lojas virtuais",
        "Influenciadores digitais"
    ],
    correta: 1
},
{
    pergunta: "O que o sistema faz após coletar os dados do satélite?",
    opcoes: [
        "Apaga os dados",
        "Publica em redes sociais",
        "Processa e calcula o risco de enchente",
        "Armazena sem analisar"
    ],
    correta: 2
},
{
    pergunta: "Qual benefício do Space Connect ajuda a agir antes do desastre?",
    opcoes: [
        "Alertas automáticos",
        "Jogos educativos",
        "Propagandas online",
        "Controle financeiro"
    ],
    correta: 0
},
{
    pergunta: "Qual tecnologia é usada para acessar dados da NASA?",
    opcoes: [
        "Photoshop",
        "earthaccess",
        "Excel",
        "Canva"
    ],
    correta: 1
},
{
    pergunta: "Ao identificar risco elevado de enchente, qual ação é mais adequada?",
    opcoes: [
        "Esperar a enchente chegar",
        "Ignorar os dados",
        "Tomar medidas preventivas e alertar equipes",
        "Desligar o sistema"
    ],
    correta: 2
},
{
    pergunta: "Qual é uma vantagem dos dados utilizados pelo projeto?",
    opcoes: [
        "São secretos",
        "São pagos mensalmente",
        "São dados abertos e acessíveis",
        "Só podem ser usados pela NASA"
    ],
    correta: 2
},
{
    pergunta: "Qual é o resultado esperado do uso do Space Connect?",
    opcoes: [
        "Reduzir riscos e salvar vidas",
        "Aumentar enchentes",
        "Substituir satélites",
        "Controlar o clima"
    ],
    correta: 0
}
];

let perguntaAtual = 0;
let respostaSelecionada = null;
let respostas = [];

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const btnNext = document.getElementById("next-btn");
const btnPrev = document.getElementById("prev-btn");

function carregarPergunta() {

    const p = perguntas[perguntaAtual];

    perguntaEl.textContent =
        `${perguntaAtual + 1}/${perguntas.length} - ${p.pergunta}`;

    opcoesEl.innerHTML = "";

    respostaSelecionada = respostas[perguntaAtual] ?? null;

    p.opcoes.forEach((opcao, indice) => {

        const btn = document.createElement("button");
        btn.className = "quiz-opcao";
        btn.textContent = opcao;

        if (respostaSelecionada === indice) {
            btn.classList.add("selecionada");
        }

        btn.addEventListener("click", () => {

            document
                .querySelectorAll(".quiz-opcao")
                .forEach(b => b.classList.remove("selecionada"));

            btn.classList.add("selecionada");

            respostaSelecionada = indice;
            btnNext.disabled = false;
        });

        opcoesEl.appendChild(btn);
    });

    btnPrev.disabled = perguntaAtual === 0;

    btnNext.disabled = respostaSelecionada === null;

    btnNext.textContent =
        perguntaAtual === perguntas.length - 1
            ? "Finalizar"
            : "Próximo";
}

btnNext.addEventListener("click", () => {

    if (respostaSelecionada === null) return;

    respostas[perguntaAtual] = respostaSelecionada;

    perguntaAtual++;

    if (perguntaAtual >= perguntas.length) {

        let pontos = 0;

        respostas.forEach((resposta, indice) => {
            if (resposta === perguntas[indice].correta) {
                pontos += 10;
            }
        });

        let mensagem = "";

        if (pontos >= 90) {
            mensagem = "🏆 Excelente! Você domina o funcionamento do Space Connect.";
        } else if (pontos >= 70) {
            mensagem = "🚀 Muito bom! Você compreendeu a maior parte do projeto.";
        } else if (pontos >= 50) {
            mensagem = "👍 Bom resultado! Mas vale revisar alguns conceitos.";
        } else {
            mensagem = "📚 Releia a apresentação e tente novamente.";
        }

        document.querySelector(".quiz-container").innerHTML = `
            <div class="iniciar-formulario">
                <h3>Questionário Finalizado!</h3>
                <h3>${pontos}/100 pontos</h3>
                <p>${mensagem}</p>

                <button class="btn-iniciar" onclick="location.reload()">
                    Refazer Questionário
                </button>
            </div>
        `;

        return;
    }

    carregarPergunta();
});

btnPrev.addEventListener("click", () => {

    if (respostas[perguntaAtual] === undefined && respostaSelecionada !== null) {
        respostas[perguntaAtual] = respostaSelecionada;
    }

    if (perguntaAtual > 0) {
        perguntaAtual--;
        carregarPergunta();
    }
});

carregarPergunta();