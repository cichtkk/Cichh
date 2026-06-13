// ============================================
// FASES DO ARG
// ============================================

// FASE 1: MORSE (diálogo dos cientistas)
const morseMessages = [
    {
        morse: ". .-.. .- .-. .- --..-- / ...- --- ... ... --..-- / ...- --- -.-. . / ...- .. ..- / .- / -.-. .- ... .- --..-- / --.- ..- . / -. .- --- / . ... - .- --- / -. --- / -- .- .--. .- ..--..",
        resposta: "elara voce viu uma casa que nao esta no mapa",
        dica: "Pergunta de Voss para Elara sobre uma casa invisível"
    },
    {
        morse: "... .. -- --..-- / ...- --- ... ... .-.-.- / . .-.. .- .-.-.- / . .-.. .- / .--. .. ... -.-. .- / . -- / ..-. .-. . --.- ..- . -. -.-. .. .- / .---- ---.. .--... --... .... --..",
        resposta: "sim voss ela pisca em frequencia 18 ponto 7 hz",
        dica: "Elara confirma a frequência 18.7 Hz"
    },
    {
        morse: ".- ... / .--. .- .-. . -.. . ... / . ... - .- --- / -- ..- .-. -- ..- .-. .- -. -.. --- / . -- / -... .. -. .- .-. .. --- .-.-.-",
        resposta: "as paredes estao murmurando em binario",
        dica: "Voss percebe que as paredes sussurram em binário"
    },
    {
        morse: ". .-.. .- .-. .- --..-- / ... .- .. .- / -.. .- / .- .. / .- --. --- .-. .- .-.-.-",
        resposta: "elara saia dai agora",
        dica: "Alerta urgente de Voss"
    },
    {
        morse: "- .- .-. -.. . / -.. . -- .- .. ... --..-- / ...- --- ... ... .-.-.- / . .-.. .- / -- . / -.... .- -- --- ..- / .--. . .-.. --- / -- . ..- / -. --- -- . .-.-.-",
        resposta: "tarde demais voss ela me chamou pelo meu nome",
        dica: "Última mensagem assustadora de Elara"
    }
];

// FASE 2: BINÁRIO
const binaryMessages = [
    {
        binario: "01001000 01001111 01010101 01010011 01000101",
        resposta: "house",
        dica: "Traduza o binário para ASCII"
    },
    {
        binario: "01010111 01000101 01001100 01000011 01001111 01001101 01000101",
        resposta: "welcome",
        dica: "Primeira palavra da saudação da casa"
    },
    {
        binario: "01001000 01000101 01001100 01001100 01001111",
        resposta: "hello",
        dica: "Saudação em inglês"
    }
];

// FASE 3: CIFRA DE CÉSAR (shift 3)
const cipherMessages = [
    {
        textoCifrado: "WKH KXRVEH LV ZDWFKLQJ",
        resposta: "the house is watching",
        dica: "Cifra de César com deslocamento 3"
    },
    {
        textoCifrado: "FRPH LQVLGH",
        resposta: "come inside",
        dica: "Desloque cada letra 3 posições para trás"
    },
    {
        textoCifrado: "BRX DUH QRW DORQH",
        resposta: "you are not alone",
        dica: "Mensagem final da casa"
    }
];

// Estado do jogo
let faseAtual = 1;        // 1 = Morse, 2 = Binário, 3 = Cifra
let indiceSubFase = 0;    // Índice dentro da fase
let fasesDesbloqueadas = [true, false, false];  // Morse começa desbloqueado

// Elementos DOM
const puzzleTitle = document.getElementById('puzzleTitle');
const morseDisplay = document.getElementById('morseDisplay');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const logMessage = document.getElementById('logMessage');
const hintMessage = document.getElementById('hintMessage');
const dynamicLine = document.getElementById('dynamicLine');
const step1El = document.getElementById('step1');
const step2El = document.getElementById('step2');
const step3El = document.getElementById('step3');

// Função para normalizar texto (remover acentos, pontuação, espaços extras)
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // remove acentos
        .replace(/[.,!?;:()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Atualiza a interface conforme a fase atual
function updateUI() {
    // Atualiza barra de progresso
    if (fasesDesbloqueadas[0]) step1El.classList.add('unlocked');
    else step1El.classList.remove('unlocked');
    
    if (fasesDesbloqueadas[1]) step2El.classList.add('unlocked');
    else step2El.classList.remove('unlocked');
    
    if (fasesDesbloqueadas[2]) step3El.classList.add('unlocked');
    else step3El.classList.remove('unlocked');
    
    // Define o título e o conteúdo do puzzle
    if (faseAtual === 1) {
        puzzleTitle.innerHTML = "📡 FASE 1: CÓDIGO MORSE";
        if (indiceSubFase < morseMessages.length) {
            morseDisplay.innerHTML = morseMessages[indiceSubFase].morse;
            hintMessage.innerHTML = `🔎 Dica: ${morseMessages[indiceSubFase].dica}`;
        } else {
            // Fase 1 concluída, avança para fase 2
            faseAtual = 2;
            indiceSubFase = 0;
            updateUI();
        }
    }
    else if (faseAtual === 2) {
        puzzleTitle.innerHTML = "💻 FASE 2: CÓDIGO BINÁRIO";
        if (indiceSubFase < binaryMessages.length) {
            morseDisplay.innerHTML = binaryMessages[indiceSubFase].binario;
            hintMessage.innerHTML = `🔎 Dica: ${binaryMessages[indiceSubFase].dica}`;
        } else {
            faseAtual = 3;
            indiceSubFase = 0;
            updateUI();
        }
    }
    else if (faseAtual === 3) {
        puzzleTitle.innerHTML = "🔐 FASE 3: CIFRA DE CÉSAR (shift 3)";
        if (indiceSubFase < cipherMessages.length) {
            morseDisplay.innerHTML = cipherMessages[indiceSubFase].textoCifrado;
            hintMessage.innerHTML = `🔎 Dica: ${cipherMessages[indiceSubFase].dica}`;
        } else {
            // JOGO CONCLUÍDO
            morseDisplay.innerHTML = "🏆 TODAS AS FASES CONCLUÍDAS 🏆";
            answerInput.disabled = true;
            submitBtn.disabled = true;
            logMessage.innerHTML = "✅ PARABÉNS! Você desvendou todos os mistérios da casa.\n\nA mensagem final: 'SAY HELLO TO THIS HOUSE' — A casa agora te conhece.";
            dynamicLine.innerHTML = "> ACESSO TOTAL CONCEDIDO // BEM-VINDO AO LAR // A CASA SABE SEU NOME";
            return;
        }
    }
    
    // Limpa o campo de resposta
    answerInput.value = '';
    logMessage.innerHTML = `⚡ [FASE ${faseAtual}] Aguardando resposta...`;
}

// Verifica a resposta do jogador
function checkAnswer() {
    let userAnswer = normalizeText(answerInput.value);
    let isCorrect = false;
    
    if (faseAtual === 1 && indiceSubFase < morseMessages.length) {
        const expected = morseMessages[indiceSubFase].resposta;
        if (userAnswer === expected) {
            isCorrect = true;
            logMessage.innerHTML = `✅ CORRETO! Mensagem ${indiceSubFase+1}/${morseMessages.length} decifrada.`;
            dynamicLine.innerHTML = `> [MORSE] ${morseMessages[indiceSubFase].resposta.substring(0, 50)}...`;
            indiceSubFase++;
            
            // Se terminou a fase 1, desbloqueia fase 2
            if (indiceSubFase >= morseMessages.length) {
                fasesDesbloqueadas[1] = true;
                logMessage.innerHTML += "<br>🔓 FASE 2 DESBLOQUEADA! Agora decifre os códigos binários.";
                dynamicLine.innerHTML += " // BINÁRIO DETECTADO NAS PAREDES";
            }
            updateUI();
        }
    }
    else if (faseAtual === 2 && indiceSubFase < binaryMessages.length) {
        const expected = binaryMessages[indiceSubFase].resposta;
        if (userAnswer === expected) {
            isCorrect = true;
            logMessage.innerHTML = `✅ CORRETO! Binário ${indiceSubFase+1}/${binaryMessages.length} decifrado.`;
            dynamicLine.innerHTML = `> [BINÁRIO] ${binaryMessages[indiceSubFase].resposta}`;
            indiceSubFase++;
            
            if (indiceSubFase >= binaryMessages.length) {
                fasesDesbloqueadas[2] = true;
                logMessage.innerHTML += "<br>🔓 FASE 3 DESBLOQUEADA! Agora decifre a Cifra de César.";
                dynamicLine.innerHTML += " // CIFRA DETECTADA NOS VIDROS DAS JANELAS";
            }
            updateUI();
        }
    }
    else if (faseAtual === 3 && indiceSubFase < cipherMessages.length) {
        const expected = cipherMessages[indiceSubFase].resposta;
        if (userAnswer === expected) {
            isCorrect = true;
            logMessage.innerHTML = `✅ CORRETO! Cifra ${indiceSubFase+1}/${cipherMessages.length} decifrada.`;
            dynamicLine.innerHTML = `> [CIFRA] ${cipherMessages[indiceSubFase].resposta}`;
            indiceSubFase++;
            updateUI();
        }
    }
    
    if (!isCorrect && faseAtual <= 3) {
        logMessage.innerHTML = `❌ RESPOSTA INCORRETA. Tente novamente.\nDica: ${hintMessage.innerText}`;
        dynamicLine.innerHTML = "> ESTÁTICA // ACESSO NEGADO // TENTE NOVAMENTE";
    }
}

// Evento do botão
submitBtn.addEventListener('click', checkAnswer);

// Permitir enviar com Enter
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
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
        
        if ((x < 80 && y < 80) || (x > width - 80 && y > height - 80)) {
            logMessage.innerHTML = "🔍 Você encontrou um fragmento oculto: 'A CASA RESPIRA EM 18.7 Hz'";
            dynamicLine.innerHTML = "> FREQUÊNCIA OCULTA REVELADA // 18.7 Hz";
        } else if ((x < width && x > width-100) && (y < 100)) {
            logMessage.innerHTML = "📟 Mensagem em néon piscando: 'VOCÊ JÁ ESTVE AQUI'";
            dynamicLine.innerHTML = "> MEMÓRIA CORROMPIDA // ACESSO PARCIAL";
        }
    });
}

// Inicializa o jogo
updateUI();
