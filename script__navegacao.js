// Função global para atualizar o link ativo
let changeActiveLink = null;

document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('section[id]');
    
    
    const navLinks = document.querySelectorAll('.dot-navigation li a');
    const headerLinks = document.querySelectorAll('.cabecalho__secoes .secao__link');

    if (sections.length === 0 || navLinks.length === 0) {
        console.warn('Scrollspy: Seções ou links de navegação não encontrados.');
        return;
    }

    changeActiveLink = (id) => {
        // Atualiza os pontos de navegação
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`.dot-navigation li a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Atualiza os links do cabeçalho (balão branco)
        headerLinks.forEach(link => {
            link.classList.remove('ativo');
        });

        const activeHeaderLink = document.querySelector(`.cabecalho__secoes .secao__link[href="#${id}"]`);
        if (activeHeaderLink) {
            activeHeaderLink.classList.add('ativo');
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

    // Verifica a seção inicial ao carregar a página
    const checkInitialSection = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                currentSection = section.id;
            }
        });
        
        // Se não encontrou nenhuma seção, usa a primeira (home)
        if (!currentSection && sections.length > 0) {
            currentSection = sections[0].id;
        }
        
        if (currentSection) {
            changeActiveLink(currentSection);
        }
    };

    // Executa ao carregar e após um pequeno delay para garantir que o DOM está pronto
    checkInitialSection();
    setTimeout(checkInitialSection, 100);

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
        link.addEventListener('click', (e) => {
            // Fecha o menu mobile
            navMenu.classList.remove('ativo');
            menuButton.classList.remove('ativo');
            menuButton.setAttribute('aria-expanded', 'false');
            
            // Atualiza o balão branco ao clicar no link
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const sectionId = targetId.substring(1);
                if (changeActiveLink) {
                    changeActiveLink(sectionId);
                }
            }
        });
    });

});
