// Aguarda a página carregar
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o formulário e o botão
    const form = document.querySelector('.contato-form form');
    const submitButton = document.querySelector('#btn-submit');
    const buttonText = document.querySelector('#btn-submit .btn-text');
    const originalButtonText = buttonText.innerText;

    // Se não encontrar os elementos, para aqui
    if (!form || !submitButton || !buttonText) {
        console.warn('Formulário ou botão não encontrados.');
        return;
    }

    // Função que será chamada no envio
    // SUBSTITUA A FUNÇÃO ANTIGA POR ESTA
    async function handleSubmit(event) {
        event.preventDefault(); // Impede o recarregamento da página

        // 1. MUDAR PARA "ENVIANDO..."
        buttonText.innerText = 'Enviando...';
        submitButton.disabled = true; // Desabilita o botão
        submitButton.classList.add('is-loading');

        const data = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // 2. MUDAR PARA "ENVIADO!"
                buttonText.innerText = 'Enviado!';
                submitButton.classList.remove('is-loading');
                submitButton.classList.add('is-success');
                form.reset(); // Limpa o formulário
                
                // --- NOVO CÓDIGO AQUI ---
                // Após 10 segundos, reabilita o botão
                setTimeout(() => {
                    buttonText.innerText = originalButtonText; // Volta ao texto original
                    submitButton.disabled = false; // Reabilita o botão
                    submitButton.classList.remove('is-success'); // Remove a cor de sucesso
                }, 3000); // 10000 milissegundos = 10 segundos
                // --- FIM DO NOVO CÓDIGO ---

            } else {
                // 3. MUDAR SE DER ERRO
                buttonText.innerText = 'Opa, algo deu errado.';
                submitButton.classList.remove('is-loading');
                submitButton.disabled = false;
            }
        } catch (error) {
            // 3. MUDAR SE DER ERRO DE REDE
            buttonText.innerText = 'Erro de conexão.';
            submitButton.classList.remove('is-loading');
            submitButton.disabled = false;
        }
    }

    // Adiciona o "listener" ao formulário
    form.addEventListener("submit", handleSubmit);
});