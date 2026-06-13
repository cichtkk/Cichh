// --- Diálogo morse entre os cientistas Dr. Voss e Dra. Elara ---
// Cada objeto contém: morse, resposta esperada (inglês minúsculo sem pontuação), mensagem de retorno

const scenes = [
    {
        morse: ". .-.. .- .-. .- --..-- / ...- --- ... ... --..-- / ...- --- -.-. . / ...- .. ..- / .- / -.-. .- ... .- --..-- / --.- ..- . / -. .- --- / . ... - .- --- / -. --- / -- .- .--. .- ..--..",
        expected: "elara you see a house that is not on the map",
        response: "🔬 DR. VOSS: 'Elara, você viu a casa que não está no mapa?' — A casa se move entre frames."
    },
    {
        morse: "... .. -- --..-- / ...- --- ... ... .-.-.- / . .-.. .- .-.-.- / . .-.. .- / .--. .. ... -.-. .- / . -- / ..-. .-. . --.- ..- . -. -.-. .. .- / .---- ---.. .--... --... .... --..",
        expected: "sim voss ela pisca em frequencia 18 ponto 7 hz",
        response: "📡 DRA. ELARA: 'Sim, Voss. Ela pisca em frequência 18.7 Hz.' — O chão vibra nesta frequência."
    },
    {
        morse: ".- ... / .--. .- .-. . -.. . ... / . ... - .- --- / -- ..- .-. -- ..- .-. .- -. -.. --- / . -- / -... .. -. .- .-. .. --- .-.-.-",
        expected: "as paredes estao murmurando em binario",
        response: "🧱 DR. VOSS: 'As paredes estão murmurando em binário.' — Escute os 0s e 1s na estática."
    },
    {
        morse: ".-.-. / .--. .- .-. . -.. . ... / . ... - .- --- / -- ..- .-. -- ..- .-. .- -. -.. --- / . -- / -... .. -. .- .-. .. --- .-.-.-",
        expected: "as paredes estao murmurando em binario",
        response: "🔄 (ECO) As paredes repetem: 01001000 01001111 01010101 01010011 01000101 — 'HOUSE'"
    },
    {
        morse: ". .-.. .- .-. .- --..-- / ... .- .. .- / -.. .- / .- .. / .- --. --- .-. .- .-.-.-",
        expected: "elara saia dai agora",
        response: "⚠️ DR. VOSS: 'Elara, saia daí agora.' — A estática aumenta."
    },
    {
        morse: "- .- .-. -.. . / -.. . -- .- .. ... --..-- / ...- --- ... ... .-.-.- / . .-.. .- / -- . / -.... .- -- --- ..- / .--. . .-.. --- / -- . ..- / -. --- -- . .-.-.-",
        expected: "tarde demais voss ela me chamou pelo meu nome",
        response: "🌀 DRA. ELARA: 'Tarde demais, Voss. Ela me chamou pelo meu nome.' — A casa agora te observa."
    }
];

let currentScene = 0;

// Elementos DOM
const morseDisplay = document.getElementById('morseDisplay');
const morseInput = document.getElementById('morseInput');
const decodeBtn = document.getElementById('decodeBtn');
const logMessage = document.getElementById('logMessage');
const dynamicLine = document.getElementById('dynamicLine');

// Atualiza o display com o morse da cena atual
function updateMorse() {
    if (currentScene < scenes.length) {
        morseDisplay.innerText = scenes[currentScene].morse;
        logMessage.innerHTML = `📻 [MENSAGEM ${currentScene+1}/${scenes.length}] Cientista fala em morse. Digite a tradução em inglês (minúsculas, sem pontuação).`;
    } else {
        morseDisplay.innerText = "... --- ... / ... --- ... / .-- . / .-- .- .. -";
        logMessage.innerHTML = "✅ TODAS AS MENSAGENS DECODIFICADAS. O TERMINAL REVELOU O SEGREDO FINAL.";
        dynamicLine.innerHTML = "> DR. VOSS E DRA. ELARA SUMIRAM. // A CASA SUSSURRA: 'WELCOME HOME'";
    }
}

// Normaliza o texto para comparação (remove acentos, pontuação, espaços extras)
function normalizeText(text) {
    return text.toLowerCase()
        .replace(/[áàãâä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòõôö]/g, 'o')
        .replace(/[úùûü]/g, 'u')
        .replace(/[ç]/g, 'c')
        .replace(/[.,!?;:()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Evento do botão decodificar
decodeBtn.addEventListener('click', () => {
    // Se já completou todas as cenas
    if (currentScene >= scenes.length) {
        logMessage.innerHTML = "🏁 ARG concluído. A mensagem final ecoa: 'THIS HOUSE HELLO HOUSE HOUSE' — entre pela porta amarela.";
        dynamicLine.innerHTML = "> ACESSO CONCEDIDO AO NÍVEL 18.7 // A CASA SABE SEU NOME";
        return;
    }

    const userAnswer = normalizeText(morseInput.value);
    const expected = scenes[currentScene].expected;

    if (userAnswer === expected) {
        // Resposta correta
        logMessage.innerHTML = `✅ CORRETO! ${scenes[currentScene].response}`;
        dynamicLine.innerHTML = `> [LOG ${currentScene+1}] ${scenes[currentScene].response.substring(0, 70)}...`;
        
        currentScene++;
        morseInput.value = '';
        
        if (currentScene < scenes.length) {
            updateMorse();
            if (currentScene === scenes.length - 1) {
                dynamicLine.innerHTML += " ⚠️ A PORTA DA CASA COMEÇA A RANGER.";
            }
        } else {
            updateMorse();
            // Final: revela combinação de cifras
            setTimeout(() => {
                logMessage.innerHTML += "<br><br>🔓 MENSAGEM FINAL DA IMAGEM DECODIFICADA:<br> CIFRA DE CÉSAR: 'THIS THIS HOUSE'<br> BINÁRIO: 'HOUSE'<br> MORSE: 'HELLO HOUSE'<br> → 'SAY HELLO TO THIS HOUSE'";
                dynamicLine.innerHTML = "> // ACESSO TOTAL // A CASA SE ABRE. BEM-VINDO AO LAR.";
            }, 800);
        }
    } else {
        logMessage.innerHTML = `❌ INCORRETO. O cientista repete o sinal... Tente novamente. (Dica: nomes Voss/Elara, inglês simples)`;
        dynamicLine.innerHTML = "> ESTÁTICA // RESPOSTA NEGADA // TENTE NOVAMENTE";
    }
});

// Easter egg: clique nos cantos da imagem
const img = document.querySelector('.backrooms-img');
if (img) {
    img.addEventListener('click', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;
        
        // Canto superior esquerdo ou inferior direito
        if ((x < 80 && y < 80) || (x > width - 80 && y > height - 80)) {
            logMessage.innerHTML = "🔍 Você encontrou um fragmento binário no canto da imagem: 01001000 01001111 01010101 01010011 01000101 = HOUSE";
            dynamicLine.innerHTML = "> BINÁRIO REVELADO // A CASA SUSSURRA SEU NOME";
        } else {
            logMessage.innerHTML = "📟 A imagem emite baixa frequência... tente os cantos.";
        }
    });
}

// Inicializa o jogo
updateMorse();
