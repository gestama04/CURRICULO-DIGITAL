// Script para o site de currículo digital com Bootstrap

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
   
    // Inicializar popovers do Bootstrap
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
   
    // Barra de progresso de leitura
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('readingProgressBar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
   
    // Botão de modo escuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Verificar preferência salva
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
       
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
           
            // Alternar ícone
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-moon')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
           
            // Salvar preferência
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
    }

    // Animações ao scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(function(section) {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
           
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animated');
            }
        });
    };
   
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez no carregamento
   
    // Adicionar botão voltar ao topo (se não existir)
    let backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) {
        backToTopButton = document.createElement('button');
        backToTopButton.id = 'backToTop';
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(backToTopButton);
    }
   
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
   
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
   
    // Relógio em tempo real
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }
   
    if (document.getElementById('clock')) {
        setInterval(updateClock, 1000);
        updateClock();
    }

        // Adicionar funcionalidade de filtro para projetos (para página de experiências)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adicionar classe active ao botão clicado
                this.classList.add('active');
               
                const filter = this.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project-card');
               
                projects.forEach(project => {
                    if (filter === 'all') {
                        project.style.display = 'block';
                    } else if (project.classList.contains(filter)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                   
                    // Adicionar animação
                    setTimeout(() => {
                        project.classList.add('animated');
                    }, 100);
                });
            });
        });
    }

    // Contador de estatísticas (para página de competências)
    const counters = document.querySelectorAll('.counter');
   
    if (counters.length > 0) {
        const countUp = function() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 100;
               
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(countUp, 10);
                } else {
                    counter.innerText = target;
                }
            });
        };
       
        // Iniciar contador quando a seção estiver visível
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    countUp();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
           
            observer.observe(statsSection);
        }
    }

    // Adicionar funcionalidade de pesquisa (para página de competências)
    const searchInput = document.getElementById('skillSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const skills = document.querySelectorAll('.skill-badge');
           
            skills.forEach(skill => {
                const text = skill.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    skill.style.display = 'inline-block';
                } else {
                    skill.style.display = 'none';
                }
            });
        });
    }

    // Adicionar funcionalidade de impressão
    const printButtons = document.querySelectorAll('.print-btn');
   
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });

    // CORREÇÃO: Ajustar layout responsivo dinamicamente
    function adjustMobileLayout() {
        const header = document.querySelector('header.py-5');
        const aboutSection = document.querySelector('section.py-5');
        
        if (window.innerWidth <= 768 && header && aboutSection) {
            // Garantir espaçamento adequado entre header e seção sobre
            const headerHeight = header.offsetHeight;
            aboutSection.style.marginTop = '1rem';
            
            // Ajustar cards no header
            const headerCard = header.querySelector('.p-4.bg-white.rounded.shadow');
            if (headerCard) {
                headerCard.style.marginBottom = '1.5rem';
                headerCard.style.position = 'relative';
                headerCard.style.zIndex = '1';
            }
        }
    }

    // Executar ajuste no carregamento e redimensionamento
    adjustMobileLayout();
    window.addEventListener('resize', adjustMobileLayout);
});

// Validação do formulário de contato
function validateForm() {
    let isValid = true;
   
    // Limpar mensagens de erro anteriores
    document.querySelectorAll('.invalid-feedback').forEach(function(el) {
        el.style.display = 'none';
    });
    document.querySelectorAll('.is-invalid').forEach(function(el) {
        el.classList.remove('is-invalid');
    });
   
    // Validar nome
    const name = document.getElementById('name');
    if (name) {
        if (!name.value.trim()) {
            name.classList.add('is-invalid');
            const nameError = document.getElementById('nameError');
            if (nameError) {
                nameError.style.display = 'block';
                nameError.textContent = 'Por favor, informe seu nome.';
            }
            isValid = false;
        } else if (name.value.trim().length < 3) {
            name.classList.add('is-invalid');
            const nameError = document.getElementById('nameError');
            if (nameError) {
                nameError.style.display = 'block';
                nameError.textContent = 'O nome deve ter pelo menos 3 caracteres.';
            }
            isValid = false;
        }
    }
   
    // Validar email
    const email = document.getElementById('email');
    if (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            email.classList.add('is-invalid');
            const emailError = document.getElementById('emailError');
            if (emailError) {
                emailError.style.display = 'block';
                emailError.textContent = 'Por favor, informe seu email.';
            }
            isValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            email.classList.add('is-invalid');
            const emailError = document.getElementById('emailError');
            if (emailError) {
                emailError.style.display = 'block';
                emailError.textContent = 'Por favor, informe um email válido.';
            }
            isValid = false;
        }
    }
   
    // Validar assunto
    const subject = document.getElementById('subject');
    if (subject) {
        if (!subject.value.trim()) {
            subject.classList.add('is-invalid');
            const subjectError = document.getElementById('subjectError');
            if (subjectError) {
                subjectError.style.display = 'block';
                subjectError.textContent = 'Por favor, informe o assunto.';
            }
            isValid = false;
        } else if (subject.value.trim().length < 5) {
            subject.classList.add('is-invalid');
            const subjectError = document.getElementById('subjectError');
            if (subjectError) {
                subjectError.style.display = 'block';
                subjectError.textContent = 'O assunto deve ter pelo menos 5 caracteres.';
            }
            isValid = false;
        }
    }
   
    // Validar mensagem
    const message = document.getElementById('message');
    if (message) {
        if (!message.value.trim()) {
            message.classList.add('is-invalid');
            const messageError = document.getElementById('messageError');
            if (messageError) {
                messageError.style.display = 'block';
                messageError.textContent = 'Por favor, escreva uma mensagem.';
            }
            isValid = false;
        } else if (message.value.trim().length < 10) {
            message.classList.add('is-invalid');
            const messageError = document.getElementById('messageError');
            if (messageError) {
                messageError.style.display = 'block';
                messageError.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
            }
            isValid = false;
        }
    }
   
    // Validar termos
    const terms = document.getElementById('terms');
    if (terms && !terms.checked) {
        terms.classList.add('is-invalid');
        const termsError = document.getElementById('termsError');
        if (termsError) {
            termsError.style.display = 'block';
            termsError.textContent = 'Você deve concordar com os termos de privacidade.';
        }
        isValid = false;
    }
   
    if (isValid && document.getElementById('contactForm')) {
        // Usando toast do Bootstrap em vez de alert
        const toastContainer = document.createElement('div');
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '11';
       
        toastContainer.innerHTML = `
            <div id="successToast" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas fa-check-circle me-2"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
       
        document.body.appendChild(toastContainer);
       
        const successToast = new bootstrap.Toast(document.getElementById('successToast'));
        successToast.show();
       
        // Resetar formulário
        document.getElementById('contactForm').reset();
    }
   
    return isValid;
}

// Função para melhorar a performance em dispositivos móveis
function optimizeForMobile() {
    // Detectar se é dispositivo móvel
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduzir animações em dispositivos móveis para melhor performance
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.transition = 'transform 0.2s ease';
        });
        
        // Otimizar scroll em dispositivos móveis
        let ticking = false;
        
        function updateScrollProgress() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            const progressBar = document.getElementById('readingProgressBar');
            if (progressBar) {
                progressBar.style.width = scrolled + '%';
            }
            
            ticking = false;
        }
        
        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
}

// Executar otimizações quando a página carregar
document.addEventListener('DOMContentLoaded', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);
