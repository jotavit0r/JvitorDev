// script-blob.js

document.addEventListener('DOMContentLoaded', () => {
    const cursorBlob = document.querySelector('.cursor-blob');
    const projectCards = document.querySelectorAll('.card__projeto'); // <--- CLASSE DO SEU CARD DE PROJETO (Versatil Store)

    if (!cursorBlob || !projectCards.length === 0) {
        console.warn('Elemento .cursor-blob ou .card__projeto não encontrado. Verifique as classes.');
        return;
    }

// --- 1. PERCORRER TODOS OS CARDS ---
    projectCards.forEach(card => {
        
        // --- 2. MOSTRAR/ESCONDER O BLOB ---
        card.addEventListener('mouseenter', () => {
            cursorBlob.style.opacity = '1'; 
        });

        card.addEventListener('mouseleave', () => {
            cursorBlob.style.opacity = '0';
        });
        
        // --- 3. ACOMPANHAR O MOUSE DENTRO DE CADA CARD ---
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Mover o blob para a posição global do cursor
            cursorBlob.style.left = `${x}px`;
            cursorBlob.style.top = `${y}px`;
        });
    });
});