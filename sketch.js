// Variáveis globais
let fase = 0;  // controla a fase atual do jogo
let nomeJogador = "";
let inputNome;
let botaoComecar;
let textoInicialX;  // posição X do texto animado na tela inicial
let tempoPiscar = 0;
let falaAtual = 0;

// Falas da Fase 1
const falasFase1 = [
  "Olá! Sou Maria e seja bem-vindo(a), qual é o seu nome?",
  (nome) => `Que alegria ter você aqui, ${nome}! Hoje você vai conhecer como as cidades e o campo podem trabalhar juntos.`,
  "Você já ouviu falar em cooperativas? São grupos de pessoas que se unem para alcançar objetivos em comum…",
  "Como melhorar a vida das pessoas, gerar renda, proteger o meio ambiente e fortalecer a comunidade.",
  "Cooperar é mais do que ajudar: é construir juntos! E nesse jogo, você vai viver essa experiência com a gente, conectando o campo e a cidade de forma divertida e consciente!",
  "Nossa cidade produz muito lixo… Mas nem tudo precisa ir pro lixo! Vamos juntos separar garrafas PET?",
  "Essas garrafas podem ganhar uma nova vida no campo. Com criatividade e cooperação, vamos transformá-las em ferramentas para a horta.",
  "Use o mouse para mover o cesto para os lados e coletar apenas as garrafas PET. Ganhe 2 pontos para cada garrafa PET e perca 1 ponto se pegar outro material.",
  "Quando conseguir 10 pontos pegando garrafas PET, passamos para a próxima etapa, clique em vamos começar!"
];

// --- Variáveis da Fase 2 ---
let pontos = 0;
let objetosCaindo = [];
let cestoX;
const cestoY = 550;
const cestoWidth = 80;
const cestoHeight = 50;
const velocidadeQueda = 3;
const objetoTipos = [
  {emoji: '🧴', tipo: 'garrafa', pontos: 2},
  {emoji: '🍌', tipo: 'banana', pontos: -1},
  {emoji: '📃', tipo: 'papel', pontos: -1},
];

// Variáveis para Fase 3
let fase3Iniciada = false;
let caminhaoX;
let caminhaoY;
let falaMostrada = false;
let falasFase3 = [
  "Ótimo trabalho! Podemos reciclar e reutilizar qualquer lixo. O lixo orgânico vira compostagem para o campo, por exemplo, mas nessa aventura pegamos as garrafas PET. Agora vou levar essas garrafas recicláveis para o campo!",
  "O que parece lixo para uns, podemos transformar e dar uma nova vida para ele. A cidade ajuda o campo, e o campo ajuda a cidade. Juntos ajudamos o mundo. Isso é cooperação!"
];
let falaAtual3 = 0;
let mostrandoFala3 = true;
let caminhaoVel = 3;
let fala3Terminou = false;

// Novas variáveis para Fase 3.5
let tempoCaminhando = 0;
let cenarioMudou = false;
let falasFase3_5 = [
  "Oi, [NOME]! Que bom que você veio, Maria me falou de você!",
  "Essas garrafas vão virar vasos e sistemas de irrigação para nossa horta! Aqui no campo, a gente faz muito com pouco, graças à união das pessoas e à força das cooperativas.",
  "Você pode me ajudar? Precisamos colher verduras fresquinhas!",
  "Arraste as verduras até o cesto. Precisamos de 10 verduras para levar até a feira da cooperativa, vamos lá."
];
let falaAtual3_5 = 0;

// Variáveis para Fase 4
let verduras = [];
let verdurasColhidas = 0;
let cestoVerduras = { x: 700, y: 500, width: 80, height: 60 };
let arrastandoVerdura = null;

// Variáveis para Fase Final
let fogos = [];
let tempoFinal = 0;
let falasFaseFinal = [
  "Chegamos à feira! Aqui, os alimentos que colhemos são vendidos com apoio da cooperativa.",
  "Graças à união entre campo e cidade, todos ganham. O agricultor vende, a cidade se alimenta, e o planeta agradece.",
  "Isso é celebrar a cooperação! Isso é fazer parte de uma comunidade que cresce unida!"
];
let falaAtualFinal = 0;
let tempoFalaFinal = 0;

function setup() {
  createCanvas(800, 600);
  textFont('Arial');

  textoInicialX = width; // começa o texto no canto direito

  // Criar input e botão na Fase 1, mas só mostrar quando for necessário
  inputNome = createInput();
  inputNome.position(width/2 - 100, height/2 + 50);
  inputNome.size(200, 30);
  inputNome.hide();

  botaoComecar = createButton("Vamos começar");
  botaoComecar.position(width/2 - 60, height/2 + 50);
  botaoComecar.size(120, 40);
  botaoComecar.mousePressed(() => {
    fase = 2; // Vai para fase 2 após clicar no botão
    inputNome.hide();
    botaoComecar.hide();
    iniciarFase2();
  });
  botaoComecar.hide();

  cestoX = width / 2;
  
  // Inicializa variáveis da fase 3
  caminhaoX = -200; // começa fora da tela à esquerda
  caminhaoY = height - 120;
}

function draw() {
  if (fase === 0) {
    fase0();
  } else if (fase === 1) {
    fase1();
  } else if (fase === 2) {
    fase2();
  } else if (fase === 3) {
    fase3();
  } else if (fase === 3.5) {
    fase3_5();
  } else if (fase === 4) {
    fase4();
  } else if (fase === 5) { // Fase Final
    faseFinal();
  }
}

// Fase 0 - Tela inicial
function fase0() {
  background(0, 0, 128);
  fill(255);
  textSize(40);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);

  // Texto animado da direita para esquerda
  text("Agrinho: Campoliga Cresce com Você", textoInicialX, height / 2);
  textoInicialX -= 3;
  if (textoInicialX < -500) { // quando sair da tela, reseta
    textoInicialX = width;
  }

  // Botão "COMEÇAR" piscando
  tempoPiscar++;
  if (tempoPiscar % 60 < 30) {
    fill(255);
    rect(width/2 - 100, height/2 + 100, 200, 60, 10);
    fill(0, 0, 128);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("COMEÇAR", width/2, height/2 + 130);
  }

  // Detectar clique no botão
  if (mouseIsPressed) {
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
        mouseY > height/2 + 100 && mouseY < height/2 + 160) {
      fase = 1;
      textoInicialX = width; // reset texto inicial para caso voltar
      delayInputShow();
    }
  }
}

function delayInputShow() {
  setTimeout(() => {
    inputNome.show();
    inputNome.value('');
    inputNome.elt.focus();
  }, 200);
}

// Fase 1 - Apresentação e introdução
function fase1() {
  background(100, 149, 237); // fundo azul claro/prédios da cidade

  desenharPredios();

  // Desenha chão cinza (faixa na parte inferior)
  fill(150); // cinza
  rect(0, height - 100, width, 100);

  desenharMaria(150, height - 150); // Maria "em pé" no chão

  fill(255);
  rect(100, 400, 600, 150, 20); // balão de fala fundo branco
  fill(0);
  textSize(22);
  textAlign(LEFT, TOP);

  // Mostrar a fala atual
  let fala = falasFase1[falaAtual];
  if (typeof fala === "function") {
    fala = fala(nomeJogador);
  }
  text(fala, 120, 420, 560, 120);

  // Se estamos na fala da pergunta do nome, mostrar input
  if (falaAtual === 0) {
    inputNome.show();
  } else {
    inputNome.hide();
  }

  // Aviso para clicar na seta só se já passou da fala 0
  if (falaAtual > 0 && falaAtual < falasFase1.length) {
    fill(255);
    textAlign(CENTER);
    textSize(18);
    text("Clique na seta para passar a conversa", width / 2, 60);
  } else if (falaAtual === 0) {
    // No início (fala 0), avisa para digitar nome e apertar Enter
    fill(255);
    textAlign(CENTER);
    textSize(18);
    text("Digite seu nome e pressione Enter para continuar", width / 2, 60);
  }

  // Mostrar seta para avançar fala (exceto quando está na fala 0, que espera o input)
  if (falaAtual > 0) {
    desenharSetaAvancar(width - 100, 500);
  }

  // Botão "Vamos começar" aparece só na última fala
  if (falaAtual === falasFase1.length - 1) {
    botaoComecar.show();
  } else {
    botaoComecar.hide();
  }
}

// Desenha a seta para avançar
function desenharSetaAvancar(x, y) {
  fill(0);
  noStroke();
  // Triângulo seta para direita
  triangle(x, y - 20, x, y + 20, x + 30, y);
}

// Desenhar personagem Maria simples com formas geométricas
function desenharMaria(x, y) {
  // Corpo
  fill(255, 192, 203); // rosa claro vestido
  rect(x - 110, y - 50, 60, 100, 20);

  // Cabeça
  fill(255, 224, 189); // cor de pele
  ellipse(x -83, y -80, 80, 80);

  // Olhos
  fill(255);
  ellipse(x -83 - 20, y - 90, 25, 15);
  ellipse(x -83 + 20, y - 90, 25, 15);
  fill(0);
  ellipse(x -83 - 20, y - 90, 10, 10);
  ellipse(x -83 + 20, y - 90, 10, 10);

  // Boca
  noFill();
  stroke(255, 0, 0);
  strokeWeight(3);
  arc(x -83, y - 65, 40, 30, 0, PI);

  // Cabelos simples (curto)
  noStroke();
  fill(139, 69, 19);
  arc(x -83, y - 110, 70, 70, PI, TWO_PI);

  stroke(0);
  strokeWeight(1);
}

// Desenhar prédios da cidade simples
function desenharPredios() {
  fill(70);
  for (let i = 0; i < width; i += 100) {
    rect(i, height - 300, 80, 300);
    fill(200, 200, 220);
    for (let j = height - 280; j < height; j += 40) {
      rect(i + 10, j, 20, 30);
      rect(i + 50, j, 20, 30);
    }
    fill(70);
  }
  
  // Adiciona calçada e árvore conforme solicitado
  fill(200);
  rect(0, height - 50, width, 20); // Calçada
  
  // Árvore
  fill(139, 69, 19);
  rect(650, height - 150, 30, 100); // Tronco
  fill(0, 100, 0);
  ellipse(665, height - 180, 100, 80); // Copa da árvore
}

// --- Funções da Fase 2 ---

function iniciarFase2() {
  pontos = 0;
  objetosCaindo = [];
  // Inicializa com alguns objetos caindo
  for (let i = 0; i < 5; i++) {
    criarObjetoCaindo();
  }
  cestoX = width / 2;
}

function criarObjetoCaindo() {
  let objTipo = random(objetoTipos);
  objetosCaindo.push({
    x: random(50, width - 50),
    y: random(-200, -50),
    tipo: objTipo.tipo,
    emoji: objTipo.emoji,
    pontos: objTipo.pontos,
    velocidade: velocidadeQueda + random(0, 2)
  });
}

function fase2() {
  background(100, 149, 237); // Fundo azul claro da cidade
  desenharPredios();

  // Desenha chão cinza (faixa na parte inferior)
  fill(150);
  rect(0, height - 100, width, 100);

  // Atualiza posição do cesto para o mouse (limitado na tela)
  cestoX = constrain(mouseX, cestoWidth / 2, width - cestoWidth / 2);

  // Desenha o cesto (emoji 🗑️)
  textSize(50);
  textAlign(CENTER, CENTER);
  text('🗑️', cestoX, cestoY);

  // Desenha e atualiza objetos caindo
  for (let i = objetosCaindo.length -1; i >= 0; i--) {
    let obj = objetosCaindo[i];
    textSize(40);
    text(obj.emoji, obj.x, obj.y);
    obj.y += obj.velocidade;

    // Checar colisão com o cesto
    if (obj.y > cestoY - cestoHeight/2 && obj.y < cestoY + cestoHeight/2) {
      if (obj.x > cestoX - cestoWidth/2 && obj.x < cestoX + cestoWidth/2) {
        // Capturou o objeto
        pontos += obj.pontos;
        // Limita o mínimo de pontos para 0
        if (pontos < 0) pontos = 0;

        // Remove objeto capturado
        objetosCaindo.splice(i, 1);

        // Cria um novo objeto para substituir
        criarObjetoCaindo();
      }
    } else if (obj.y > height) {
      // Remove objeto que caiu no chão
      objetosCaindo.splice(i, 1);
      criarObjetoCaindo();
    }
  }

  // Mostrar pontuação no canto superior esquerdo
  fill(0);
  rect(10, 10, 150, 50, 10);
  fill(255);
  textSize(24);
  textAlign(LEFT, CENTER);
  text("Pontos: " + pontos, 20, 35);

  // Se atingir 10 pontos, avança para fase 3
  if (pontos >= 10) {
    fase = 3;
    iniciarFase3();
  }
}

// Fase 3 - Transporte para o campo
function iniciarFase3() {
  falaAtual3 = 0;
  mostrandoFala3 = true;
  caminhaoX = -200;
  caminhaoVel = 3;
  fala3Terminou = false;
}

function fase3() {
  background(135, 206, 250); // Céu azul

  // Desenha chão preto com faixas brancas da estrada
  fill(0);
  rect(0, height - 160, width, 160);

  fill(255);
  let espacamento = 60;
  for(let i = 0; i < width / espacamento; i++) {
    rect(i * espacamento + (caminhaoX % espacamento), height - 120, 40, 20, 5);
  }

  // Desenhar caminhão como um retângulo vermelho simples com Maria dentro
  fill(255, 0, 0);
  rect(caminhaoX, caminhaoY, 150, 70, 10);
  fill(0);
  ellipse(caminhaoX + 30, caminhaoY + 70, 40, 40); // roda 1
  ellipse(caminhaoX + 120, caminhaoY + 70, 40, 40); // roda 2

  // Desenhar Maria dentro do caminhão (apenas quando estiver em movimento)
  if (!mostrandoFala3) {
    // Cabeça da Maria
    fill(255, 224, 189);
    ellipse(caminhaoX + 75, caminhaoY - 10, 30, 30);
    
    // Cabelo
    fill(139, 69, 19);
    arc(caminhaoX + 75, caminhaoY - 20, 30, 30, PI, TWO_PI);
    
    // Olhos
    fill(255);
    ellipse(caminhaoX + 65, caminhaoY - 15, 8, 5);
    ellipse(caminhaoX + 85, caminhaoY - 15, 8, 5);
    fill(0);
    ellipse(caminhaoX + 65, caminhaoY - 15, 3, 3);
    ellipse(caminhaoX + 85, caminhaoY - 15, 3, 3);
    
    // Boca sorrindo
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(caminhaoX + 75, caminhaoY - 5, 15, 10, 0, PI);
  }

  // Mostrar balão de fala da Maria (quando ela ainda não está no caminhão)
  if (mostrandoFala3) {
    // Desenha Maria parada no lado esquerdo
    desenharMaria(150, height - 150);
    
    // Balão de fala
    fill(255);
    rect(50, 50, 700, 100, 20);
    fill(0);
    textSize(22);
    textAlign(LEFT, TOP);
    text(falasFase3[falaAtual3], 70, 70, 660, 80);

    // Desenha seta para avançar fala (incluindo na última fala)
    desenharSetaAvancar(750, 130);
  }

  // Atualiza posição do caminhão para direita até sair da tela
  if (!mostrandoFala3 && !fala3Terminou) {
    caminhaoX += caminhaoVel;
  }

  // Se caminhão sair da tela, permite avançar para próxima fase
  if (caminhaoX > width) {
    fala3Terminou = true;
    fill(255);
    rect(width/2 - 150, height/2 - 40, 300, 80, 20);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(26);
    text("Campo", width/2, height/2);
  }
}

// Fase 3.5 - Maria no campo com Joaquim
function fase3_5() {
  // Animação do caminhão por 2 segundos
  if (tempoCaminhando < 120) { // 60 frames = 1 segundo
    background(135, 206, 250);
    fill(0);
    rect(0, height - 160, width, 160);
    
    fill(255);
    let espacamento = 60;
    for(let i = 0; i < width / espacamento; i++) {
      rect(i * espacamento + (caminhaoX % espacamento), height - 120, 40, 20, 5);
    }
    
    fill(255, 0, 0);
    rect(caminhaoX, caminhaoY, 150, 70, 10);
    fill(0);
    ellipse(caminhaoX + 30, caminhaoY + 70, 40, 40);
    ellipse(caminhaoX + 120, caminhaoY + 70, 40, 40);
    
    // Maria no caminhão
    fill(255, 224, 189);
    ellipse(caminhaoX + 75, caminhaoY - 10, 30, 30);
    fill(139, 69, 19);
    arc(caminhaoX + 75, caminhaoY - 20, 30, 30, PI, TWO_PI);
    
    caminhaoX += 3;
    tempoCaminhando++;
  } 
  else {
    if (!cenarioMudou) {
      // Muda o cenário após 2 segundos
      background(173, 216, 230); // Azul claro
      fill(34, 139, 34); // Verde
      rect(0, height - 100, width, 100);
      
      // Desenha árvores e estufa
      fill(139, 69, 19); // Marrom tronco
      rect(100, height - 200, 30, 100);
      rect(300, height - 180, 30, 80);
      fill(0, 100, 0); // Verde folhas
      ellipse(115, height - 220, 80, 80);
      ellipse(315, height - 200, 70, 70);
      
      // Estufa
      fill(200, 200, 200, 150);
      rect(500, height - 250, 150, 150);
      fill(150, 150, 150);
      line(500, height - 250, 575, height - 300);
      line(650, height - 250, 575, height - 300);
      
      // Desenha Maria e Joaquim
      desenharMaria(200, height - 150);
      desenharJoaquim(350, height - 150);
      
      cenarioMudou = true;
    }
    
    // Mostrar diálogos com Joaquim
    fill(255);
    rect(150, 100, 500, 120, 20);
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    
    let falaAtual = falasFase3_5[falaAtual3_5];
    if (typeof falaAtual === "string") {
      falaAtual = falaAtual.replace("[NOME]", nomeJogador);
    }
    text(falaAtual, 170, 120, 460, 100);
    
    // Mostrar seta para avançar
    if (falaAtual3_5 < falasFase3_5.length - 1) {
      desenharSetaAvancar(650, 190);
    } else {
      // Botão para começar fase 4
      fill(100, 200, 100);
      rect(width/2 - 100, 250, 200, 50, 10);
      fill(255);
      textAlign(CENTER, CENTER);
      text("Começar", width/2, 275);
    }
  }
}

function desenharJoaquim(x, y) {
  // Chapéu
  fill(139, 69, 19);
  rect(x - 20, y - 100, 40, 10);
  rect(x - 15, y - 120, 30, 20);
  
  // Cabeça
  fill(210, 180, 140);
  ellipse(x, y - 70, 50, 50);
  
  // Olhos
  fill(0);
  ellipse(x - 10, y - 80, 5, 5);
  ellipse(x + 10, y - 80, 5, 5);
  
  // Boca sorrindo
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(x, y - 60, 20, 10, 0, PI);
  
  // Corpo
  fill(70, 130, 180);
  rect(x - 25, y - 50, 50, 70, 5);
}

// Fase 4 - Colheita de verduras
function iniciarFase4() {
  verduras = [];
  verdurasColhidas = 0;
  
  // Cria 15 verduras em posições aleatórias
  for (let i = 0; i < 15; i++) {
    verduras.push({
      x: random(50, width - 50),
      y: random(50, height - 150),
      emoji: '🥬',
      colhida: false
    });
  }
}

function fase4() {
  background(144, 238, 144); // Fundo verde claro para campo
  
  // Desenha canteiros
  fill(139, 69, 19); // Marrom terra
  rect(100, height - 200, 200, 100, 10);
  rect(400, height - 180, 200, 80, 10);
  
  // Desenha cesto
  fill(150);
  rect(cestoVerduras.x, cestoVerduras.y, cestoVerduras.width, cestoVerduras.height, 5);
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text('🗑️', cestoVerduras.x + cestoVerduras.width/2, cestoVerduras.y + cestoVerduras.height/2);
  
  // Desenha verduras
  textSize(40);
  for (let verdura of verduras) {
    if (!verdura.colhida) {
      text(verdura.emoji, verdura.x, verdura.y);
    }
  }
  
  // Desenha contador
  fill(255);
  rect(10, 10, 200, 50, 5);
  fill(0);
  textSize(24);
  textAlign(LEFT, CENTER);
  text(`Verduras: ${verdurasColhidas}/10`, 20, 35);
  
  // Verifica se terminou
  if (verdurasColhidas >= 10) {
    fase = 5; // Vai para fase final
    tempoFinal = millis();
  }
}

// Fase Final - Feira
function faseFinal() {
  // Céu com fogos
  background(173, 216, 230);
  
  // Chão
  fill(34, 139, 34);
  rect(0, height - 100, width, 100);
  
  // Barracas de feira
  fill(200, 0, 0);
  rect(100, height - 200, 100, 100);
  rect(300, height - 180, 80, 80);
  rect(500, height - 220, 120, 120);
  
  // Pessoas (simplificado)
  fill(255);
  for (let i = 0; i < 5; i++) {
    ellipse(150 + i*100, height - 150, 20, 20); // Cabeças
  }
  
  // Desenha Maria e Joaquim
  desenharMaria(250, height - 150);
  desenharJoaquim(400, height - 150);
  
  // Mostra balão de fala atual
  if (falaAtualFinal < falasFaseFinal.length) {
    mostrarBalaoFalaFinal(falasFaseFinal[falaAtualFinal], 150);
    
    // Mostrar seta para avançar (exceto na última fala)
    if (falaAtualFinal < falasFaseFinal.length - 1) {
      desenharSetaAvancar(width - 100, 230);
    } else {
      // Na última fala, mostrar fogos de artifício
      if (random() < 0.1) {
        fogos.push({
          x: random(width),
          y: random(height/2),
          cor: color(random(255), random(255), random(255)),
          tamanho: random(20, 50),
          tempo: 0
        });
      }
      
      // Desenha fogos
      for (let fogo of fogos) {
        fill(fogo.cor);
        noStroke();
        ellipse(fogo.x, fogo.y, fogo.tamanho - fogo.tempo);
        fogo.tempo += 0.5;
      }
      
      // Remove fogos antigos
      fogos = fogos.filter(f => f.tempo < f.tamanho);
      
      // Mensagem final
      fill(255);
      textSize(40);
      textAlign(CENTER, CENTER);
      text("FIM! Obrigada.", width/2, height/2);
    }
  }
}

function mostrarBalaoFalaFinal(texto, y) {
  fill(255);
  rect(100, y, 600, 120, 20); // balão maior
  fill(0);
  textSize(22);
  textAlign(LEFT, TOP);
  text(texto, 120, y + 20, 560, 100); // texto dentro do balão
}

// Controle do Enter na fase 1 para captar nome
function keyPressed() {
  if (fase === 1 && falaAtual === 0) {
    if (keyCode === ENTER) {
      nomeJogador = inputNome.value().trim();
      if (nomeJogador.length > 0) {
        falaAtual++;
      }
    }
  }
}

// Avança fala no clique na fase 1 (quando estiver nas falas)
function mouseClicked() {
  // Fase 1 - Avançar diálogos
  if (fase === 1 && falaAtual > 0 && falaAtual < falasFase1.length - 1) {
    if (mouseX > width - 130 && mouseX < width - 70 && mouseY > 480 && mouseY < 520) {
      falaAtual++;
      if (falaAtual === 1) {
        nomeJogador = inputNome.value().trim();
        if (!nomeJogador) {
          falaAtual = 0; // fica na fala 0 se nome vazio
          alert("Por favor, digite seu nome para continuar.");
        }
      }
    }
  } 
  // Fase 3 - Avançar diálogos ou ir para fase 3.5
  else if (fase === 3) {
    if (mostrandoFala3) {
      if (mouseX > 750 && mouseX < 780 && mouseY > 110 && mouseY < 150) {
        falaAtual3++;
        if (falaAtual3 === falasFase3.length) {
          mostrandoFala3 = false; // comece animação caminhão
        }
      }
    } else if (fala3Terminou && mouseX > width/2 - 150 && mouseX < width/2 + 150 && 
               mouseY > height/2 - 40 && mouseY < height/2 + 40) {
      fase = 3.5; // Vai para fase 3.5
    }
  }
  // Fase 3.5 - Avançar diálogos ou começar fase 4
  else if (fase === 3.5 && cenarioMudou) {
    if (falaAtual3_5 < falasFase3_5.length - 1 && 
        mouseX > 650 && mouseX < 680 && mouseY > 170 && mouseY < 210) {
      falaAtual3_5++;
    } else if (falaAtual3_5 === falasFase3_5.length - 1 &&
               mouseX > width/2 - 100 && mouseX < width/2 + 100 && 
               mouseY > 250 && mouseY < 300) {
      fase = 4;
      iniciarFase4();
    }
  }
  // Fase Final - Avançar falas
  else if (fase === 5) {
    if (falaAtualFinal < falasFaseFinal.length) {
      if (mouseX > width - 130 && mouseX < width - 70 && mouseY > 200 && mouseY < 240) {
        falaAtualFinal++;
      }
    }
  }
}

function mouseDragged() {
  if (fase === 4 && arrastandoVerdura) {
    arrastandoVerdura.x = mouseX;
    arrastandoVerdura.y = mouseY;
  }
}

function mousePressed() {
  // Fase 4 - Selecionar verdura para arrastar
  if (fase === 4) {
    for (let verdura of verduras) {
      if (!verdura.colhida && dist(mouseX, mouseY, verdura.x, verdura.y) < 20) {
        arrastandoVerdura = verdura;
        break;
      }
    }
  }
}

function mouseReleased() {
  if (fase === 4 && arrastandoVerdura) {
    // Verifica se soltou no cesto
    if (mouseX > cestoVerduras.x && mouseX < cestoVerduras.x + cestoVerduras.width &&
        mouseY > cestoVerduras.y && mouseY < cestoVerduras.y + cestoVerduras.height) {
      arrastandoVerdura.colhida = true;
      verdurasColhidas++;
    }
    arrastandoVerdura = null;
  }
}
