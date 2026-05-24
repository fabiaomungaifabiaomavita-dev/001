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

// ========== SISTEMA DE RESULTADOS DE PROVAS ==========

// Dados de múltiplas disciplinas (mais de 10)
const disciplinesData = [
  { id: 1, name: 'Matemática Básica', score: 85, maxScore: 100, status: 'aprovado', date: '2024-10-15' },
  { id: 2, name: 'Português I', score: 92, maxScore: 100, status: 'aprovado', date: '2024-10-10' },
  { id: 3, name: 'História do Brasil', score: 78, maxScore: 100, status: 'aprovado', date: '2024-10-08' },
  { id: 4, name: 'Ciências Naturais', score: 45, maxScore: 100, status: 'reprovado', date: '2024-10-05' },
  { id: 5, name: 'Inglês Intermediário', score: 88, maxScore: 100, status: 'aprovado', date: '2024-09-28' },
  { id: 6, name: 'Educação Física', score: 95, maxScore: 100, status: 'aprovado', date: '2024-09-25' },
  { id: 7, name: 'Artes Visuais', score: 73, maxScore: 100, status: 'aprovado', date: '2024-09-20' },
  { id: 8, name: 'Química Orgânica', score: 60, maxScore: 100, status: 'pendente', date: '2024-09-18' },
  { id: 9, name: 'Física Aplicada', score: 82, maxScore: 100, status: 'aprovado', date: '2024-09-15' },
  { id: 10, name: 'Geografia Política', score: 91, maxScore: 100, status: 'aprovado', date: '2024-09-10' },
  { id: 11, name: 'Biologia Molecular', score: 55, maxScore: 100, status: 'pendente', date: '2024-09-05' },
  { id: 12, name: 'Literatura Clássica', score: 87, maxScore: 100, status: 'aprovado', date: '2024-08-30' },
  { id: 13, name: 'Programação em Python', score: 79, maxScore: 100, status: 'aprovado', date: '2024-08-25' },
  { id: 14, name: 'Estatística Avançada', score: 68, maxScore: 100, status: 'pendente', date: '2024-08-20' }
];

const resultContainer = document.getElementById('results-container');
const searchInput = document.getElementById('search-discipline');
const filterSelect = document.getElementById('filter-status');

if (resultContainer) {
  function renderResults(disciplines) {
    resultContainer.innerHTML = '';
    
    if (disciplines.length === 0) {
      resultContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #475569; padding: 2rem;">Nenhuma disciplina encontrada.</p>';
      return;
    }

    disciplines.forEach(discipline => {
      const percentage = (discipline.score / discipline.maxScore) * 100;
      const resultCard = document.createElement('div');
      resultCard.className = 'result-card';
      
      resultCard.innerHTML = `
        <div class="result-header">
          <h3 class="result-title">${discipline.name}</h3>
          <span class="result-status ${discipline.status}">${discipline.status.toUpperCase()}</span>
        </div>
        <div class="result-details">
          <div class="result-item">
            <span class="result-label">Pontuação</span>
            <span class="result-value">${discipline.score}/${discipline.maxScore}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Percentual</span>
            <span class="result-value">${percentage.toFixed(1)}%</span>
          </div>
          <div class="result-item">
            <span class="result-label">Data da Prova</span>
            <span class="result-value">${new Date(discipline.date).toLocaleDateString('pt-BR')}</span>
          </div>
          <div style="margin-top: 0.5rem;">
            <div class="result-progress">
              <div class="result-progress-bar" style="width: ${percentage}%"></div>
            </div>
          </div>
        </div>
      `;
      
      resultContainer.appendChild(resultCard);
    });
  }

  function filterResults() {
    let filtered = disciplinesData;

    // Filtrar por status
    if (filterSelect.value) {
      filtered = filtered.filter(d => d.status === filterSelect.value);
    }

    // Filtrar por busca
    if (searchInput.value.trim()) {
      const searchTerm = searchInput.value.toLowerCase();
      filtered = filtered.filter(d => d.name.toLowerCase().includes(searchTerm));
    }

    renderResults(filtered);
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener('input', filterResults);
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', filterResults);
  }

  // Renderizar resultados iniciais
  renderResults(disciplinesData);

  // Log de estatísticas gerais
  const totalDisciplines = disciplinesData.length;
  const approved = disciplinesData.filter(d => d.status === 'aprovado').length;
  const pending = disciplinesData.filter(d => d.status === 'pendente').length;
  const failed = disciplinesData.filter(d => d.status === 'reprovado').length;
  const averageScore = (disciplinesData.reduce((sum, d) => sum + d.score, 0) / totalDisciplines).toFixed(1);

  console.log(`📚 Resumo Acadêmico:`);
  console.log(`Total de disciplinas: ${totalDisciplines}`);
  console.log(`Aprovadas: ${approved}`);
  console.log(`Pendentes: ${pending}`);
  console.log(`Reprovadas: ${failed}`);
  console.log(`Média geral: ${averageScore}%`);
}
