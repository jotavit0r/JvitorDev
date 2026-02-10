const links = document.querySelectorAll('.secao__link');
const homeLink = document.querySelector('.secao__link.ativo');

let enterTimeout;
let leaveTimeout;

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    
    clearTimeout(leaveTimeout);

    
    enterTimeout = setTimeout(() => {
      links.forEach(l => l.classList.remove('ativo'));
      link.classList.add('ativo');
    }, 150); 
  });

  link.addEventListener('mouseleave', () => {
    
    clearTimeout(enterTimeout);

    
    leaveTimeout = setTimeout(() => {
      link.classList.remove('ativo');
      homeLink.classList.add('ativo');
    }, 300); 
  });
});

