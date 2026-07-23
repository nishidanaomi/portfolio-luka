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


    /* BOTÃO BACK TO TOP */
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
            { 
                type: 'vimeo',
                src: 'https://player.vimeo.com/video/515484105?h=cc1941a109&loop=1&autopause=0&muted=1&autoplay=1',
                alt: 'Banco Bradesco - Desafie o Futuro' }
        ],
        bmg: [
            //primeira fileira
            {   
                type: 'grid-row',
                columns: 2,
                images: [
                    { src: 'images/luka-bmg-01-Antecipe-o-saldo-parado-na-sua-conta-do-FGTS.png', alt: 'Antecipe seu saque-aniversário Banco BMG' },
                    { src: 'images/luka-bmg-02-A-biometria-facial.png', alt: 'Biometria facial Banco BMG' }
                ]
            },

            //segunda fileira
            {
                 type: 'grid-row',
                 columns: 3,
                 images: [
                    { src: 'images/luka-bmg-03-golpe_01.png', alt: 'Alerta de golpe Banco Bmg' },
                    { src: 'images/luka-bmg-04-golpe_02.png', alt: 'Pedido de senhas Banco Bmg' },
                    { src: 'images/luka-bmg-05-golpe_03.png', alt: 'Mensagem estranha Banco Bmg' },
                 ]
            },

            //terceira fileira
            {
                 type: 'grid-row',
                 columns: 4,
                 images: [
                    { src: 'images/luka-bmg-06-apresenta-a-nova-taxa-Selic.png', alt: 'Posts Social Media Instagram Taxa Selic 1 Banco Bmg' },
                    { src: 'images/luka-bmg-07-m,-apresenta-a-nova-taxa-Selic.png', alt: 'Posts Social Media Instagram Taxa Selic 2 Banco Bmg' },
                    { src: 'images/luka-bmg-08-m,-apresenta-a-nova-taxa-Selic.png', alt: 'Posts Social Media Instagram Taxa Selic 3 Banco Bmg' },
                    { src: 'images/luka-bmg-09-m,-apresenta-a-nova-taxa-Selic.png', alt: 'Posts Social Media Instagram Taxa Selic 4 Banco Bmg' },
                 ]
            },

            //quarta fileira
            {
                type: 'grid-row',
                columns: 2, // Fileira 4: 2 colunas
                images: [
                    { src: 'images/luka-bmg-10-3dicas.png', alt: 'Posts Social Media Banco Bmg' },
                    { src: 'images/luka-bmg-11-cartao-limite-certo.jpg', alt: 'Posts Social Media Banco Bmg' },
                ]
            },

            // 2. Título ou separador (opcional, pode ser feito via imagem ou texto no CSS)

            // 3. Reels/Vídeos
            { type: 'heading', text: 'Reels' },
            { type: 'video', src: 'videos/bmg-cofrinho.mp4' },
            { type: 'video', src: 'videos/bmg-reel-02.mp4' },
            { type: 'video', src: 'videos/bmg-reel-03.mp4' },
            { type: 'video', src: 'videos/bmg-reel-04.mp4' }
        ],
        tatuape: [
            {
                type: 'grid-row',
                columns: 2,
                vimeos: [
                    { src: 'https://player.vimeo.com/video/515514947?h=942d83090b&loop=1&autopause=0&muted=1&autoplay=1', alt: 'Motion Complexo Tatuapé' },
                    { src: 'https://player.vimeo.com/video/515514947?h=942d83090b&loop=1&autopause=0&muted=1&autoplay=1', alt: 'Motion Complexo Tatuapé' },
                ]
            },
        ],
        sp: [
            { type: 'vimeo', src: 'https://player.vimeo.com/video/515520889?h=687beb297b&loop=1&autopause=0&muted=1&autoplay=1', alt: 'Motion Aniversário São Paulo' }
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
                        if (media.type === 'grid-row') {
                        const rowDiv = document.createElement('div');
                        rowDiv.className = `bmg-row cols-${media.columns}`;

                        media.images.forEach(imgData => {
                            const img = document.createElement('img');
                            img.src = imgData.src;
                            img.alt = imgData.alt || 'Imagem BMG';
                            rowDiv.appendChild(img);
                        });

                        modalBody.appendChild(rowDiv);

                    } else if (media.type === 'vimeo') {
                        const iframe = document.createElement('iframe');
                        iframe.src = media.src;
                        iframe.title = media.alt || 'Vídeo do Vimeo';
                        iframe.className = 'modal-vimeo-player';
                        iframe.setAttribute('frameborder', '0');
                        iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                        iframe.setAttribute('allowfullscreen', '');
                        
                        modalBody.appendChild(iframe);

                    } else if (media.type === 'image') {
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
                } else if(media.type === 'video') {
                    const video = document.createElement('video');
                    video.src = media.src;
                    video.controls = true;
                    video.autoplay = true;
                    video.muted = true;
                    video.className = 'modal-content-item';
                    modalBody.appendChild(video);
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