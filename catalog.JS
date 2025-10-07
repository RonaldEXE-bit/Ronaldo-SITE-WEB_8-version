// --- DADOS DAS CARTAS ---
// Este é o lugar para personalizar suas cartas.
// Troque os valores de 'name', 'type', 'description', 'atk', 'def', 'image' e 'hint'.
const cardsData = [
    { 
        name: "Samurai Cibernético", 
        type: "Guerreiro / Mecha", 
        description: "Um guerreiro solitário que fundiu seu corpo com tecnologia antiga. Sua lâmina de energia é dita capaz de cortar a própria realidade.", 
        atk: 3000, 
        def: 2200, 
        // Coloque o link da sua imagem aqui
        image: "https://placehold.co/600x800/c70039/ffffff?text=Samurai", 
        // Coloque o comentário que o gato fará aqui
        hint: "Este guerreiro é letal no ataque, mas pode ser vulnerável a feitiços que ignoram a defesa." 
    },
    { 
        name: "Titã da Fagulha Divina", 
        type: "Divindade / Trovão", 
        description: "Uma entidade colossal nascida da primeira tempestade do universo. Seu poder abala os céus e a terra.", 
        atk: 3500, 
        def: 3000, 
        image: "https://placehold.co/600x800/ffc300/000000?text=Titã", 
        hint: "Seu poder bruto é incomparável, mas invocá-lo exige um grande sacrifício de recursos." 
    },
    { 
        name: "Guardiã do Oásis", 
        type: "Fada / Planta", 
        description: "Protege uma fonte de vida eterna. Suas bênçãos curam aliados, mas sua fúria transforma a floresta em um labirinto mortal.", 
        atk: 2000, 
        def: 2800, 
        image: "https://placehold.co/600x800/17a589/ffffff?text=Guardiã", 
        hint: "Sua força está em sua capacidade de suporte. Mantenha-a protegida para garantir a longevidade da sua equipe."
    },
    { 
        name: "Dragão de Neon", 
        type: "Dragão / Luz", 
        description: "Uma criatura lendária que habita a rede digital. Seus ataques são rajadas de dados que corrompem os inimigos.", 
        atk: 3200, 
        def: 1800, 
        image: "https://placehold.co/600x800/E94560/1a1a2e?text=Dragão", 
        hint: "Poder de ataque avassalador. Tente derrotar o inimigo rapidamente antes que ele possa revidar." 
    },
    { 
        name: "Sombra Ninja", 
        type: "Guerreiro / Trevas", 
        description: "Mestre da espionagem e do assassinato. Move-se sem ser visto e ataca nos pontos vitais com precisão letal.", 
        atk: 2700, 
        def: 1500, 
        image: "https://placehold.co/600x800/1a1a2e/00ffff?text=Ninja", 
        hint: "Perfeito para ataques surpresa. Sua baixa defesa o torna vulnerável em combates diretos e prolongados." 
    }
];

// --- Seleção de Elementos DOM ---
const catalogMenu = document.getElementById('catalog-menu');
const cardViewer = document.getElementById('card-viewer');

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

