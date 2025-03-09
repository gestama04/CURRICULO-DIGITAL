// Script para o site de currículo digital

document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Fechar menu ao redimensionar a página para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });
    
    // Animação suave ao rolar para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Validação do formulário de contato
function validateForm() {
    let isValid = true;
    
    // Limpar mensagens de erro anteriores
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(errorMsg) {
        errorMsg.style.display = 'none';
    });
    
    // Validar nome
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        document.getElementById('nameError').textContent = 'Por favor, informe seu nome.';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else if (name.value.trim().length < 3) {
        document.getElementById('nameError').textContent = 'O nome deve ter pelo menos 3 caracteres.';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Validar email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        document.getElementById('emailError').textContent = 'Por favor, informe seu email.';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        document.getElementById('emailError').textContent = 'Por favor, informe um email válido.';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validar assunto
    const subject = document.getElementById('subject');
    if (!subject.value.trim()) {
        document.getElementById('subjectError').textContent = 'Por favor, informe o assunto.';
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
    } else if (subject.value.trim().length < 5) {
        document.getElementById('subjectError').textContent = 'O assunto deve ter pelo menos 5 caracteres.';
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
    }
    
    // Validar mensagem
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        document.getElementById('messageError').textContent = 'Por favor, escreva uma mensagem.';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    } else if (message.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    // Validar termos
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        document.getElementById('termsError').textContent = 'Você deve concordar com os termos de privacidade.';
        document.getElementById('termsError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Aqui você poderia enviar o formulário para um servidor
        // Como é apenas uma demonstração, exibiremos um alerta
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        document.getElementById('contactForm').reset();
    }
    
    return isValid;
}

// Animações ao scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 300;
        
        if (scrollPosition >= sectionTop) {
            section.classList.add('animated');
        }
    });
});
