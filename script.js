const links = document.querySelectorAll('.secao__link');
const homeLink = document.querySelector('.secao__link.ativo');

let enterTimeout;
let leaveTimeout;

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    // cancela qualquer saída pendente
    clearTimeout(leaveTimeout);

    // aguarda um pequeno tempo antes de ativar o hover
    enterTimeout = setTimeout(() => {
      links.forEach(l => l.classList.remove('ativo'));
      link.classList.add('ativo');
    }, 150); // tempo de delay ao entrar (ms)
  });

  link.addEventListener('mouseleave', () => {
    // cancela o tempo de entrada se o mouse sair antes
    clearTimeout(enterTimeout);

    // aguarda um pequeno tempo antes de restaurar o link fixo
    leaveTimeout = setTimeout(() => {
      link.classList.remove('ativo');
      homeLink.classList.add('ativo');
    }, 300); // tempo de delay ao sair (ms)
  });
});
