document.addEventListener('DOMContentLoaded', () => {

    /*  ANIMAÇÃO DE TÍTULOS AO ROLAR (INTERSECTION OBSERVER) */
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('run-animation');
            } else {
                entry.target.classList.remove('run-animation');
            }
        });
    }, {
        threshold: 0.1
    });

    const titlesToAnimate = document.querySelectorAll('h1, .contact-title');
    titlesToAnimate.forEach(title => animationObserver.observe(title));


    /* 
        BOTÃO BACK TO TOP */
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /*  DADOS DOS PROJETOS PRINCIPAIS */
    const projectsData = {
        mequi: [
            { type: 'image', src: 'images/mequi-the-town-galeria-ag.png', alt: 'Méqui + The Town' },
            { type: 'image', src: 'images/mequi-the-town-ponto-de-onibus-sp.png', alt: 'Méqui Abrigo de Ônibus' }
        ],
        bradesco: [
            { type: 'image', src: 'images/bradesco-fq-brasil.png', alt: 'Banco Bradesco - Desafie o Futuro' }
        ],
        bmg: [
            // { type: 'image', src: 'images/social-media-banco-bmg-ref-plus.png', alt: 'Social Media Banco Bmg' },
            // 1. Bloco de Imagens estáticas (posts)
            { type: 'image', src: 'images/luka-bmg-01-Antecipe-o-saldo-parado-na-sua-conta-do-FGTS-com-segurança-e-tranquilidade--_Contrate-online-pelo-link-da-bio-e-garanta-uma-das-melhores-taxas-do-mercado-no-Banco-Bmg!--BancoBmg-FGTS.png', alt: 'Posts Social Media Banco Bmg' },
            { type: 'image', src: 'images/luka-bmg-02-A-biometria-facial.png', alt: 'Posts Social Media Banco Bmg' },

            //segunda fileira
            { type: 'image', src: 'images/luka-bmg-03-golpe_01.png', alt: 'Posts Social Media Banco Bmg' },
            { type: 'image', src: 'images/luka-bmg-04-golpe_02.png', alt: 'Posts Social Media Banco Bmg' },
            { type: 'image', src: 'images/luka-bmg-05-golpe_03.png', alt: 'Posts Social Media Banco Bmg' },

            //terceira fileira
            { type: 'image', src: 'images/luka-bmg-06-apresenta-a-nova-taxa-Selic.png', alt: 'Posts Social Media Instagram Banco Bmg' },
            { type: 'image', src: 'images/luka-bmg-07-m,-apresenta-a-nova-taxa-Selic.png', alt: 'Posts Social Media Instagram Banco Bmg' },
            { type: 'image', src: 'luka-bmg-08-m,-apresenta-a-nova-taxa-Selic.png', alt: 'Posts Social Instagram Media Banco Bmg' },
            { type: 'image', src: 'images/luka-bmg-09-m,-apresenta-a-nova-taxa-Selic.png', alt: 'Posts Social Media Instagram Banco Bmg' },

            //quarta fileira
            { type: 'image', src: 'images/luka-bmg-10-3dicas.png', alt: 'Posts Social Media Banco Bmg' },
            { type: 'image', src: 'images/luka-bmg-11-cartao-limite-certo.png', alt: 'Posts Social Media Banco Bmg' },

            // 2. Título ou separador (opcional, pode ser feito via imagem ou texto no CSS)

            // 3. Reels/Vídeos
            { type: 'heading', text: 'Reels' },
            { type: 'video', src: 'videos/bmg-cofrinho.mp4' },
            { type: 'video', src: 'videos/bmg-reel-02.mp4' },
            { type: 'video', src: 'videos/bmg-reel-03.mp4' },
            { type: 'video', src: 'videos/bmg-reel-04.mp4' }
        ],
        tatuape: [
            { type: 'image', src: 'images/motion-tatuape-complex-fq-brasil.png', alt: 'Motion Complexo Tatuapé' }
        ],
        sp: [
            { type: 'image', src: 'images/motion-sao-paulo-aniversario-fq-brasil.png', alt: 'Motion Aniversário São Paulo' }
        ],
        qualidy: [
            { type: 'image', src: 'images/social-media-qualidy-atua-ag.png', alt: 'Social Media Qualidy' }
        ]
    };


    /*  LÓGICA DO MODAL (PROJETOS & GALERIA) */
    const modal = document.getElementById('imageModal');
    const modalBody = document.getElementById('modalBody');
    const closeModalBtn = document.getElementById('modalClose');

    // Seleciona cards com data-project E itens simples da galeria
    const clickableItems = document.querySelectorAll('[data-project], .gallery-item');

    if (modal && modalBody) {

        clickableItems.forEach(item => {
            item.addEventListener('click', () => {
                const projectId = item.getAttribute('data-project');
                const mediaList = projectsData[projectId];

                // Limpa o conteúdo anterior do modal
                modalBody.innerHTML = '';

                // SE: Projeto complexo cadastrado no JS (Méqui, BMG, etc.)
                if (mediaList) {
                    mediaList.forEach(media => {
                        if (media.type === 'image') {
                            const img = document.createElement('img');
                            img.src = media.src;
                            img.alt = media.alt || 'Imagem do projeto';
                            img.className = 'modal-content-item';
                            modalBody.appendChild(img);
                        } else if (media.type === 'video') {
                            const video = document.createElement('video');
                            video.src = media.src;
                            video.controls = true;
                            video.autoplay = true;
                            video.muted = true;
                            video.className = 'modal-content-item';
                            modalBody.appendChild(video);
                        }
                    });
                }
                // ELSE: Foto simples da galeria (Pega direto do HTML!)
                else {
                    const innerImg = item.querySelector('img');
                    if (innerImg) {
                        const img = document.createElement('img');
                        img.src = innerImg.src;
                        img.alt = innerImg.alt || 'Fotografia ampliada';
                        img.className = 'modal-content-item';
                        modalBody.appendChild(img);
                    }
                }

                // Abre o modal e trava a rolagem da página ao fundo
                modal.classList.add('open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        // Função para Fechar o Modal
        const closeModal = () => {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Destrava a rolagem

            // Pausa possíveis vídeos em execução ao fechar
            const videos = modalBody.querySelectorAll('video');
            videos.forEach(v => v.pause());
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });
    }

});