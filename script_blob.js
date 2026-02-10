document.addEventListener('DOMContentLoaded', () => {
    const cursorBlob = document.querySelector('.cursor-blob');
    const projectCards = document.querySelectorAll('.card__projeto');

    if (!cursorBlob || !projectCards.length === 0) {
        console.warn('Elemento .cursor-blob ou .card__projeto não encontrado. Verifique as classes.');
        return;
    }

    projectCards.forEach(card => {
        
        card.addEventListener('mouseenter', () => {
            cursorBlob.style.opacity = '1'; 
        });

        card.addEventListener('mouseleave', () => {
            cursorBlob.style.opacity = '0';
        });
        
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            cursorBlob.style.left = `${x}px`;
            cursorBlob.style.top = `${y}px`;
        });
    });

});
