const cardsData = [
    { name: "Androide Ceifador", type: "Máquina / Cyber", description: "Uma unidade de combate autônoma, projetada para infiltração e eliminação. Suas lâminas de plasma cortam qualquer material.", atk: 2800, def: 2100, image: "https://placehold.co/600x800/16213e/E94560?text=Ceifador", hint: "Sua alta ofensiva é um trunfo, mas sua defesa pode ser um ponto fraco contra inimigos mais robustos." },
    { name: "Feiticeira Cósmica", type: "Mago / Espaço", description: "Manipula a gravidade e o tempo, tecendo feitiços com poeira estelar. Seus escudos são formados por matéria escura.", atk: 2500, def: 2500, image: "https://placehold.co/600x800/16213e/00ffff?text=Feiticeira", hint: "O equilíbrio é sua maior força. Use-a em duelos longos para cansar o oponente." },
    { name: "Golem de Éter", type: "Rocha / Elemental", description: "Um guardião ancestral forjado com a energia pura do Éter. É lento, mas sua força física é quase imensurável.", atk: 1800, def: 3500, image: "https://placehold.co/600x800/0f3460/ffffff?text=Golem", hint: "Uma muralha de defesa. Use-o para proteger seus pontos de vida enquanto prepara um ataque mais forte." },
    { name: "Dragão de Neon", type: "Dragão / Luz", description: "Uma criatura lendária que habita a rede digital. Seus ataques são rajadas de dados que corrompem os inimigos.", atk: 3200, def: 1800, image: "https://placehold.co/600x800/E94560/1a1a2e?text=Dragão", hint: "Poder de ataque avassalador. Tente derrotar o inimigo rapidamente antes que ele possa revidar." },
    { name: "Sombra Ninja", type: "Guerreiro / Trevas", description: "Mestre da espionagem e do assassinato. Move-se sem ser visto e ataca nos pontos vitais com precisão letal.", atk: 2700, def: 1500, image: "https://placehold.co/600x800/1a1a2e/00ffff?text=Ninja", hint: "Perfeito para ataques surpresa. Sua baixa defesa o torna vulnerável em combates diretos e prolongados." }
];

// --- Seleção de Elementos DOM ---
const mainMenu = document.getElementById('main-menu');
const gamesMenu = document.getElementById('games-menu');
const catalogMenu = document.getElementById('catalog-menu');
const cardViewer = document.getElementById('card-viewer');

const playBtn = document.getElementById('play-btn');
const catalogBtn = document.getElementById('catalog-btn');
const backToMainFromGamesBtn = document.getElementById('back-to-main-from-games-btn');
const backToMainMenuBtn = document.getElementById('back-to-main-menu-btn');
const openViewerBox = document.getElementById('open-viewer-box');
const backToCatalogBtn = document.getElementById('back-to-catalog-btn');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const cardImage = document.getElementById('card-image');
const cardDetails = document.getElementById('card-details');
const cardName = document.getElementById('card-name');
const cardType = document.getElementById('card-type');
const cardDescription = document.getElementById('card-description');
const cardAtk = document.getElementById('card-atk');
const cardDef = document.getElementById('card-def');

const gatoContainer = document.querySelector('.gato-container');
const catBoca = document.querySelector('.cat-boca');
const catHintBubble = document.getElementById('cat-hint-bubble');
let catFalando = false;

let currentCardIndex = 0;
let isAnimating = false;

// --- Funções ---
function displayCard(index) {
    const card = cardsData[index];
    cardName.textContent = card.name;
    cardType.textContent = card.type;
    cardDescription.textContent = card.description;
    cardAtk.textContent = card.atk;
    cardDef.textContent = card.def;
    cardImage.src = card.image;
    cardImage.alt = card.name;
    
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === cardsData.length - 1;
}

function navigateCards(direction) {
    if (isAnimating) return;
    const newIndex = direction === 'next' ? currentCardIndex + 1 : currentCardIndex - 1;

    if (newIndex >= 0 && newIndex < cardsData.length) {
        isAnimating = true;
        
        const exitAnim = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        const enterAnim = direction === 'next' ? 'slide-in-from-right' : 'slide-in-from-left';

        cardImage.classList.add(exitAnim);
        cardDetails.style.opacity = '0';

        setTimeout(() => {
            currentCardIndex = newIndex;
            displayCard(currentCardIndex);
            
            cardImage.classList.remove(exitAnim);
            cardImage.classList.add(enterAnim);
            
            setTimeout(() => {
                cardDetails.style.opacity = '1';
                cardImage.classList.remove(enterAnim);
                isAnimating = false;
            }, 500);
        }, 500);
    }
}

// --- Event Listeners (Ouvintes de Eventos) ---

// Navegação: Menu Principal -> Menu de Jogos
playBtn.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    gamesMenu.classList.remove('hidden');
});

// Navegação: Menu de Jogos -> Menu Principal
backToMainFromGamesBtn.addEventListener('click', () => {
    gamesMenu.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Navegação: Menu Principal -> Catálogo
catalogBtn.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    catalogMenu.classList.remove('hidden');
});

// Navegação: Catálogo -> Menu Principal
backToMainMenuBtn.addEventListener('click', () => {
    catalogMenu.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Navegação: Catálogo -> Visor de Cartas
openViewerBox.addEventListener('click', () => {
    catalogMenu.classList.add('hidden');
    cardViewer.classList.remove('hidden');
    displayCard(currentCardIndex);
});

// Navegação: Visor de Cartas -> Catálogo
backToCatalogBtn.addEventListener('click', () => {
    cardViewer.classList.add('hidden');
    catalogMenu.classList.remove('hidden');
});

// Navegação das Cartas
nextBtn.addEventListener('click', () => navigateCards('next'));
prevBtn.addEventListener('click', () => navigateCards('prev'));

// Navegação das Cartas com Teclado
document.addEventListener('keydown', (e) => {
    if (!cardViewer.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') nextBtn.click();
        else if (e.key === 'ArrowLeft') prevBtn.click();
    }
});

// Interação com o Gato
gatoContainer.addEventListener('click', () => {
    if (catFalando) return;
    
    catFalando = true;
    catBoca.classList.add('falando');
    
    catHintBubble.textContent = cardsData[currentCardIndex].hint;
    catHintBubble.classList.remove('hidden');

    setTimeout(() => {
        catBoca.classList.remove('falando');
        catHintBubble.classList.add('hidden');
        catFalando = false;
    }, 3500); // Duração da dica
});
