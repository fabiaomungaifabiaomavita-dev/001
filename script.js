const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');
const yearElement = document.querySelector('#year');
const quizAction = document.querySelector('#quiz-action');
const quizStatus = document.querySelector('#quiz-status');
const quizPrompt = document.querySelector('.quiz-prompt');
const quizOptions = document.querySelector('#quiz-options');
const quizResult = document.querySelector('#quiz-result');

const quizQuestions = [
  {
    question: 'Qual é o principal benefício de uma avaliação em tempo real?',
    options: [
      'Permite correção imediata e foco no aprendizado',
      'Gera relatórios apenas no final do curso',
      'Exige presença física na sala de aula',
      'Substitui todos os exercícios práticos'
    ],
    answer: 0,
    feedback: 'A correção imediata ajuda a ajustar o aprendizado enquanto o conteúdo ainda está fresco na memória.'
  },
  {
    question: 'O que faz uma avaliação inteligente parecer alinhada à IA?',
    options: [
      'Oferece resposta instantânea e sugestões personalizadas',
      'Sempre utiliza apenas perguntas de múltipla escolha',
      'Evita qualquer tipo de feedback',
      'Somente avalia frequência de acesso'
    ],
    answer: 0,
    feedback: 'A IA dá maior valor à personalização e ao retorno rápido para cada aluno.'
  },
  {
    question: 'Qual destas ações melhora seu desempenho em avaliações?',
    options: [
      'Rever o conteúdo e receber feedback constante',
      'Ignorar comentários do instrutor',
      'Responder sem ler as opções',
      'Estudar somente na véspera'
    ],
    answer: 0,
    feedback: 'Aprender com feedback contínuo fortalece a retenção e prepara melhor para avaliações reais.'
  }
];

let currentQuestionIndex = -1;
let selectedOptionIndex = null;
let score = 0;
let quizActive = false;

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

smoothScrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (targetId.startsWith('#') && targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

function resetQuiz() {
  currentQuestionIndex = -1;
  selectedOptionIndex = null;
  score = 0;
  quizActive = false;
  quizStatus.textContent = 'Pronto para começar?';
  quizPrompt.textContent = 'Clique em iniciar para receber a primeira pergunta.';
  quizOptions.innerHTML = '';
  quizResult.textContent = '';
  quizAction.textContent = 'Iniciar avaliação';
}

function renderQuestion() {
  const questionData = quizQuestions[currentQuestionIndex];
  quizStatus.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
  quizPrompt.textContent = questionData.question;
  quizOptions.innerHTML = '';
  selectedOptionIndex = null;

  questionData.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-option';
    button.textContent = option;
    button.addEventListener('click', () => {
      document.querySelectorAll('.quiz-option').forEach((btn) => btn.classList.remove('selected'));
      button.classList.add('selected');
      selectedOptionIndex = index;
    });
    quizOptions.appendChild(button);
  });

  quizAction.textContent = currentQuestionIndex < quizQuestions.length - 1 ? 'Enviar resposta' : 'Ver resultado final';
}

function handleQuizAction() {
  if (!quizActive) {
    quizActive = true;
    currentQuestionIndex = 0;
    renderQuestion();
    return;
  }

  if (selectedOptionIndex === null) {
    quizResult.textContent = 'Selecione uma opção antes de enviar.';
    return;
  }

  quizResult.textContent = 'Avaliando resposta...';
  quizAction.disabled = true;

  setTimeout(() => {
    const questionData = quizQuestions[currentQuestionIndex];
    const correct = selectedOptionIndex === questionData.answer;
    if (correct) {
      score += 1;
      quizResult.textContent = `Resposta correta! ${questionData.feedback}`;
    } else {
      quizResult.textContent = `Resposta incorreta. ${questionData.feedback}`;
    }
    quizAction.disabled = false;
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex += 1;
      renderQuestion();
    } else {
      quizStatus.textContent = 'Avaliação concluída';
      quizPrompt.textContent = `Você acertou ${score} de ${quizQuestions.length} perguntas.`;
      quizOptions.innerHTML = '';
      quizAction.textContent = 'Reiniciar avaliação';
      quizActive = false;
      selectedOptionIndex = null;
    }
  }, 800);
}

if (quizAction) {
  quizAction.addEventListener('click', handleQuizAction);
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      formMessage.textContent = 'Por favor, preencha todos os campos antes de enviar.';
      return;
    }

    formMessage.textContent = 'Enviando mensagem...';

    setTimeout(() => {
      formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
      contactForm.reset();
    }, 900);
  });
}

resetQuiz();
