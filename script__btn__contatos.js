document.addEventListener('DOMContentLoaded', () => {

    
    const form = document.querySelector('.contato-form form');
    const submitButton = document.querySelector('#btn-submit');
    const buttonText = document.querySelector('#btn-submit .btn-text');
    const originalButtonText = buttonText.innerText;

    
    if (!form || !submitButton || !buttonText) {
        console.warn('Formulário ou botão não encontrados.');
        return;
    }

    
    async function handleSubmit(event) {
        event.preventDefault(); 

        buttonText.innerText = 'Enviando...';
        submitButton.disabled = true; 
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
                buttonText.innerText = 'Enviado!';
                submitButton.classList.remove('is-loading');
                submitButton.classList.add('is-success');
                form.reset(); 
                
                setTimeout(() => {
                    buttonText.innerText = originalButtonText; 
                    submitButton.disabled = false; 
                    submitButton.classList.remove('is-success'); 
                }, 3000); 

            } else {
                buttonText.innerText = 'Opa, algo deu errado.';
                submitButton.classList.remove('is-loading');
                submitButton.disabled = false;
            }
        } catch (error) {
            buttonText.innerText = 'Erro de conexão.';
            submitButton.classList.remove('is-loading');
            submitButton.disabled = false;
        }
    }

    // Adiciona o "listener" ao formulário
    form.addEventListener("submit", handleSubmit);

});
