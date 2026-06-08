const botaoWhatsapp = document.getElementById("btnWhatsapp");

        botaoWhatsapp.addEventListener("click", function () {
            // Get Valores
            const nome = document.getElementById("nome").value;
            const duvida = document.getElementById("duvida").value;

            // Validação
            if (nome.trim() !== "" && duvida.trim() !== "") {
                
                const mensagem = `Olá, meu nome é ${nome} e tenho uma dúvida: ${duvida}`;
                const mensagemCodificada = encodeURIComponent(mensagem);

                const numero = "5511999999999"; 
                const linkWhatsapp = `https://wa.me/${numero}?text=${mensagemCodificada}`;

                window.open(linkWhatsapp, "_blank");
                
            } else {
                // Alerta caso o usuário esqueça de preencher algo
                alert("Por favor, preencha seu nome e sua dúvida antes de enviar.");
            }
        });