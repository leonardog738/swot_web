O que foi solicitado para a IA 

quero um script.js que quando ele reponde e clique em proxima ele vá ate a questao 10 dps no final ele mostra o toral de pontos x/100
O que a IA retornou 
const perguntas = [
    {
        pergunta: "O nível do rio subiu 2 metros em 24h. O que você faz?",
        opcoes: [
            "A) Envio equipe para monitorar o local",
            "B) Aguardo o próximo ciclo de dados do satélite",
            "C) Verifico histórico e previsão para avaliar risco",
            "D) Não faço nada"
        ],
        correta: 2
    },
    {
        pergunta: "Uma chuva intensa está prevista para amanhã. O que fazer?",
        opcoes: [
            "A) Ignorar",
            "B) Acionar monitoramento preventivo",
            "C) Esperar acontecer",
            "D) Desligar os alertas"
        ],
        correta: 1
    },

    // Adicione até a questão 10

    {
        pergunta: "Questão 10",
        opcoes: [
            "A",
            "B",
            "C",
            "D"
        ],
        correta: 0
    }
];

let perguntaAtual = 0;
let respostaSelecionada = null;
let pontos = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const btnNext = document.getElementById("next-btn");
const btnPrev = document.getElementById("prev-btn");

function carregarPergunta() {

    respostaSelecionada = null;
    btnNext.disabled = true;

    const p = perguntas[perguntaAtual];

    perguntaEl.textContent =
        `${perguntaAtual + 1}/10 - ${p.pergunta}`;

    opcoesEl.innerHTML = "";

    p.opcoes.forEach((opcao, indice) => {

        const btn = document.createElement("button");
        btn.className = "quiz-opcao";
        btn.textContent = opcao;

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

    btnNext.textContent =
        perguntaAtual === perguntas.length - 1
            ? "Finalizar"
            : "Próximo";
}

btnNext.addEventListener("click", () => {

    if (respostaSelecionada === null) return;

    if (
        respostaSelecionada ===
        perguntas[perguntaAtual].correta
    ) {
        pontos += 10;
    }

    perguntaAtual++;

    if (perguntaAtual >= perguntas.length) {

        document.querySelector(".quiz-container").innerHTML = `
            <div class="resultado-quiz">
                <h2>Questionário Finalizado!</h2>
                <h3>${pontos}/100 pontos</h3>
                <p>
                    Você acertou ${pontos / 10}
                    de ${perguntas.length} perguntas.
                </p>
            </div>
        `;

        return;
    }

    carregarPergunta();
});

btnPrev.addEventListener("click", () => {
    if (perguntaAtual > 0) {
        perguntaAtual--;
        carregarPergunta();
    }
});

carregarPergunta();

O que foi alterado ou rejeitado e o motivo 

Alterei as alternativas e coloquei no final para aparecer algum texto dependendo do resultado.