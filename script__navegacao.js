document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('section[id]');
    
    
    const navLinks = document.querySelectorAll('.dot-navigation li a');

    if (sections.length === 0 || navLinks.length === 0) {
        console.warn('Scrollspy: Seções ou links de navegação não encontrados.');
        return;
    }

    const changeActiveLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`.dot-navigation li a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };

   const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                changeActiveLink(entry.target.id);
            }
        });
    }, { 
        rootMargin: "-50% 0px -50% 0px", 
        
        threshold: 0 
        
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-hamburger');
    const navMenu = document.querySelector('.cabecalho__nav');


    menuButton.addEventListener('click', () => {
        
        navMenu.classList.toggle('ativo');
        
        menuButton.classList.toggle('ativo');

        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });

    const navLinks = document.querySelectorAll('.cabecalho__secoes a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('ativo');
            menuButton.classList.remove('ativo');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });

});
