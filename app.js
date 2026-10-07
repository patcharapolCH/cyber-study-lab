'use strict';
// Cyber Study Lab - Main Application Controller

const state = {
    view: 'plan',
    chapter: 6,
    lessonMode: 'full', // 'full' or 'quick'
    answers: {},
    bookmarks: new Set(),
    graded: false,
    quizFilter: 'all', // 'all', 'wrong', or module id
    cardIndex: 0,
    cardMastered: new Set(),
    timerSeconds: 0,
    timerRunning: false,
    timerInterval: null
};

// Storage keys
const STORAGE_KEY = 'cyber_study_lab_v2_state';

function loadStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            if (data.answers) state.answers = data.answers;
            if (data.bookmarks) state.bookmarks = new Set(data.bookmarks);
            if (data.cardMastered) state.cardMastered = new Set(data.cardMastered);
            if (data.lessonMode) state.lessonMode = data.lessonMode;
            if (data.chapter) state.chapter = data.chapter;
        }
    } catch (e) {
        console.warn('LocalStorage error:', e);
    }
}

function saveStorage() {
    try {
        const data = {
            answers: state.answers,
            bookmarks: Array.from(state.bookmarks),
            cardMastered: Array.from(state.cardMastered),
            lessonMode: state.lessonMode,
            chapter: state.chapter
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('LocalStorage save error:', e);
    }
}

const el = id => document.getElementById(id);
const escapeHTML = str => String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const letters = ['ก', 'ข', 'ค', 'ง'];

document.addEventListener('DOMContentLoaded', () => {
    loadStorage();
    initApp();
});

function initApp() {
    if (!window.LESSONS || !window.QUESTIONS || !window.ESSAYS) {
        console.error('Core data missing!');
        return;
    }

    // Render Dashboard Grid
    renderDashboard();

    // Render Navigation
    renderChapterNav();

    // Render Quiz
    renderQuiz();

    // Render Essays
    renderEssays();

    // Render Flashcards
    renderFlashcards();

    // Init Tools
    if (window.initSecurityTools) window.initSecurityTools();

    // Setup Global Search
    setupSearch();

    // Setup Event Listeners
    setupEvents();

    // Initial Routing
    route(false);
}

function renderDashboard() {
    const grid = el('chapter-grid');
    if (!grid) return;

    grid.innerHTML = LESSONS.map(l => `
        <a class="chapter-card" href="#learn/${l.id}" style="--chapter-color:${l.color}">
            <div class="card-top">
                <span class="num">MODULE ${String(l.id).padStart(2, '0')}</span>
                <span class="slide-badge">📄 ${l.slideCount || 30} หน้า</span>
            </div>
            <h3>${escapeHTML(l.title)}</h3>
            <p>${escapeHTML(l.description)}</p>
            <div class="card-footer">
                <span class="pill-action">เริ่มอ่านบทเรียน →</span>
            </div>
        </a>
    `).join('');

    const studyMethodEl = el('study-method');
    if (studyMethodEl && window.STUDY_METHOD) {
        studyMethodEl.innerHTML = window.STUDY_METHOD;
    }
}

function renderChapterNav() {
    const nav = el('chapter-nav');
    if (nav) {
        nav.innerHTML = LESSONS.map(l => `
            <a href="#learn/${l.id}" data-chapter="${l.id}" class="chapter-nav-item">
                <span class="dot" style="background:${l.color}"></span>
                <span>บท ${l.id}</span>
            </a>
        `).join('');
    }

    const quizJumps = el('quiz-jumps');
    if (quizJumps) {
        quizJumps.innerHTML = `
            <button type="button" class="quiz-filter-btn active" data-filter="all">ทั้งหมด (70 ข้อ)</button>
            ${LESSONS.map(l => `
                <button type="button" class="quiz-filter-btn" data-filter="${l.id}">บท ${l.id} (10 ข้อ)</button>
            `).join('')}
            <button type="button" class="quiz-filter-btn" data-filter="wrong">เฉพาะที่ผิด ❌</button>
            <button type="button" class="quiz-filter-btn" data-filter="bookmarked">ที่ติดดาว ⭐</button>
        `;
    }
}

function setupEvents() {
    // Reading mode buttons
    document.querySelectorAll('[data-reading-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
            state.lessonMode = btn.dataset.readingMode;
            saveStorage();
            route(false);
        });
    });

    // Quiz action buttons
    const gradeBtn = el('grade-quiz');
    if (gradeBtn) gradeBtn.addEventListener('click', () => gradeQuiz());

    const resetBtn = el('reset-quiz');
    if (resetBtn) resetBtn.addEventListener('click', () => resetQuiz());

    const timerToggle = el('quiz-timer-toggle');
    if (timerToggle) timerToggle.addEventListener('click', toggleTimer);

    // Quiz filter jump buttons
    el('quiz-jumps')?.addEventListener('click', e => {
        const btn = e.target.closest('.quiz-filter-btn');
        if (!btn) return;
        document.querySelectorAll('.quiz-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.quizFilter = btn.dataset.filter;
        filterQuizDisplay();
    });

    // Next chapter button in lesson footer
    el('next-chapter')?.addEventListener('click', () => {
        const idx = LESSONS.findIndex(l => l.id === state.chapter);
        if (idx === LESSONS.length - 1) {
            location.hash = '#quiz';
        } else {
            location.hash = `#learn/${LESSONS[idx + 1].id}`;
        }
    });

    // Hash change router
    window.addEventListener('hashchange', () => route());
}

function route(moveFocus = true) {
    const rawHash = location.hash.slice(1) || 'plan';
    const parts = rawHash.split('/');
    const validViews = ['plan', 'learn', 'quiz', 'essay', 'tools', 'cards'];
    let view = validViews.includes(parts[0]) ? parts[0] : 'plan';

    state.view = view;

    validViews.forEach(v => {
        const section = el(`view-${v}`);
        if (section) section.hidden = (v !== view);
    });

    // Update Topbar Nav highlights
    document.querySelectorAll('[data-view]').forEach(a => {
        const active = a.dataset.view === view;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
    });

    if (view === 'learn') {
        const requestedId = parseInt(parts[1], 10);
        if (LESSONS.some(l => l.id === requestedId)) {
            state.chapter = requestedId;
            saveStorage();
        }

        const lesson = LESSONS.find(l => l.id === state.chapter) || LESSONS[0];
        
        // Topic anchor check
        if (parts[2] && moveFocus) state.lessonMode = 'full';

        const content = el('lesson-content');
        if (content) {
            content.innerHTML = (state.lessonMode === 'full' && lesson.fullHTML) ? lesson.fullHTML : lesson.html;
        }

        const sourceLink = el('source-slides');
        if (sourceLink) {
            sourceLink.href = lesson.source || `slides/${String(state.chapter).padStart(2, '0')}.pdf`;
        }

        // Toggle buttons appearance
        document.querySelectorAll('[data-reading-mode]').forEach(btn => {
            btn.setAttribute('aria-pressed', String(btn.dataset.readingMode === state.lessonMode));
            btn.classList.toggle('active', btn.dataset.readingMode === state.lessonMode);
        });

        // Update chapter nav
        document.querySelectorAll('[data-chapter]').forEach(a => {
            const active = parseInt(a.dataset.chapter, 10) === state.chapter;
            a.classList.toggle('active', active);
        });

        const nextBtn = el('next-chapter');
        if (nextBtn) {
            nextBtn.textContent = (state.chapter === LESSONS[LESSONS.length - 1].id) ? 'ทำข้อสอบปรนัย (70 ข้อ) →' : 'อ่านบทถัดไป →';
        }
    }

    // Page titles
    const titles = {
        plan: 'แผนอ่านและสรุปภาพรวม',
        learn: `บทที่ ${state.chapter} · ${LESSONS.find(l => l.id === state.chapter)?.title || ''}`,
        quiz: 'ข้อสอบปรนัย 70 ข้อ',
        essay: 'ข้อสอบอัตนัย 7 ข้อ',
        tools: 'เครื่องมือและโปรแกรมคำนวณความปลอดภัย',
        cards: 'บัตรคำช่วยจำ (Flashcards)'
    };
    document.title = `${titles[view]} | Cyber Study Lab Pro`;

    if (moveFocus) {
        if (view === 'learn' && parts[2]) {
            const topic = el(`lesson-topic-${state.chapter}-${parts[2]}`);
            if (topic) {
                topic.scrollIntoView({ block: 'start', behavior: 'smooth' });
                topic.focus({ preventScroll: true });
                return;
            }
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        el('content')?.focus({ preventScroll: true });
    }
}

// ==========================================
// QUIZ ENGINE
// ==========================================
function renderQuiz() {
    const container = el('quiz-questions');
    if (!container) return;

    container.innerHTML = LESSONS.map(l => `
        <section class="quiz-module-section" id="quiz-chapter-${l.id}">
            <div class="module-section-header">
                <span class="mod-pill" style="background:${l.color}22; color:${l.color}; border-color:${l.color}">MODULE ${l.id}</span>
                <h2>บท ${l.id} · ${escapeHTML(l.title)}</h2>
            </div>
            ${QUESTIONS.filter(q => q.chapter === l.id).map(q => renderQuestionCard(q)).join('')}
        </section>
    `).join('');

    // Restore selected answers & bookmarks
    Object.entries(state.answers).forEach(([qId, optIdx]) => {
        const radio = document.querySelector(`input[data-question="${qId}"][value="${optIdx}"]`);
        if (radio) radio.checked = true;
    });

    state.bookmarks.forEach(qId => {
        const starBtn = document.querySelector(`.star-btn[data-question="${qId}"]`);
        if (starBtn) starBtn.classList.add('starred');
    });

    updateQuizProgress();

    // Event delegation on container
    container.addEventListener('change', e => {
        if (e.target.matches('input[type="radio"]')) {
            const qId = parseInt(e.target.dataset.question, 10);
            const val = parseInt(e.target.value, 10);
            state.answers[qId] = val;
            saveStorage();
            updateQuizProgress();
        }
    });

    container.addEventListener('click', e => {
        const starBtn = e.target.closest('.star-btn');
        if (starBtn) {
            const qId = parseInt(starBtn.dataset.question, 10);
            if (state.bookmarks.has(qId)) {
                state.bookmarks.delete(qId);
                starBtn.classList.remove('starred');
            } else {
                state.bookmarks.add(qId);
                starBtn.classList.add('starred');
            }
            saveStorage();
            if (state.quizFilter === 'bookmarked') filterQuizDisplay();
        }
    });
}

function renderQuestionCard(q) {
    const isStarred = state.bookmarks.has(q.id);
    return `
        <article id="question-${q.id}" class="question-card" data-chapter="${q.chapter}">
            <fieldset>
                <legend>
                    <span class="q-num">ข้อ ${q.id}.</span>
                    <span class="q-text">${escapeHTML(q.question)}</span>
                    <button type="button" class="star-btn ${isStarred ? 'starred' : ''}" data-question="${q.id}" title="บันทึกข้อที่สงสัย (Bookmark)">⭐</button>
                </legend>
                <div class="options">
                    ${q.options.map((opt, i) => `
                        <label id="option-${q.id}-${i}" class="option">
                            <input type="radio" name="question-${q.id}" value="${i}" data-question="${q.id}" aria-label="${letters[i]}. ${escapeHTML(opt)}">
                            <span class="letter">${letters[i]}.</span>
                            <span class="opt-label">${escapeHTML(opt)}</span>
                        </label>
                    `).join('')}
                </div>
            </fieldset>
            <div class="q-footer">
                <details class="question-hint">
                    <summary>💡 ขอคำใบ้</summary>
                    <p>${escapeHTML(q.hint)}</p>
                </details>
                <div id="feedback-${q.id}" class="q-feedback" hidden></div>
            </div>
        </article>
    `;
}

function updateQuizProgress() {
    const count = Object.keys(state.answers).length;
    const answeredCountEl = el('answered-count');
    if (answeredCountEl) answeredCountEl.textContent = `ตอบแล้ว ${count} / ${QUESTIONS.length}`;

    const progBar = el('quiz-progress');
    if (progBar) progBar.value = count;

    const gradeBtn = el('grade-quiz');
    if (gradeBtn) {
        gradeBtn.disabled = state.graded;
        gradeBtn.textContent = state.graded ? 'ตรวจคะแนนแล้ว ✅' : 'ตรวจคะแนน 🚀';
    }
}

function gradeQuiz() {
    if (state.graded) return;
    state.graded = true;

    let score = 0;
    const chapterScores = {};
    LESSONS.forEach(l => chapterScores[l.id] = { correct: 0, total: 0 });

    QUESTIONS.forEach(q => {
        chapterScores[q.chapter].total++;
        const selected = state.answers[q.id];
        const isCorrect = (selected === q.answer);
        if (isCorrect) {
            score++;
            chapterScores[q.chapter].correct++;
        }

        const card = el(`question-${q.id}`);
        if (card) {
            card.classList.add(isCorrect ? 'correct' : 'wrong');
            const correctOpt = el(`option-${q.id}-${q.answer}`);
            if (correctOpt) correctOpt.classList.add('correct-option');

            if (selected !== undefined && !isCorrect) {
                const wrongOpt = el(`option-${q.id}-${selected}`);
                if (wrongOpt) wrongOpt.classList.add('wrong-option');
            }

            // Lock radio buttons
            card.querySelectorAll('input[type="radio"]').forEach(inp => inp.disabled = true);

            // Show detailed feedback for all 4 options
            const fbBox = el(`feedback-${q.id}`);
            if (fbBox) {
                fbBox.hidden = false;
                fbBox.innerHTML = `
                    <div class="feedback-heading ${isCorrect ? 'fb-correct' : 'fb-wrong'}">
                        <strong>${isCorrect ? 'ถูกต้องเยี่ยมมาก! 🎉' : 'ยังไม่ถูกต้อง ❌'}</strong>
                    </div>
                    <ul class="feedback-list">
                        ${q.feedback.map((f, idx) => `
                            <li class="${idx === q.answer ? 'is-correct' : ''}">
                                <b>${letters[idx]}.</b> ${escapeHTML(f)}
                            </li>
                        `).join('')}
                    </ul>
                `;
            }
        }
    });

    // Render Result Scoreboard
    renderQuizResultScoreboard(score, chapterScores);
    updateQuizProgress();
    el('quiz-result')?.scrollIntoView({ behavior: 'smooth' });
}

function renderQuizResultScoreboard(score, chapterScores) {
    const resBox = el('quiz-result');
    if (!resBox) return;

    resBox.hidden = false;
    const percent = Math.round((score / QUESTIONS.length) * 100);
    let grade = 'พยายามอีกนิด ทบทวนรอบสอง';
    let gradeColor = '#ff6b6b';
    if (percent >= 80) {
        grade = 'ยอดเยี่ยมมาก! พร้อมสอบแน่นอน';
        gradeColor = '#5cedd0';
    } else if (percent >= 60) {
        grade = 'ผ่านเกณฑ์ดี แนะนำทวนจุดที่ยังผิด';
        gradeColor = '#ffd28a';
    }

    resBox.innerHTML = `
        <div class="result-banner">
            <div class="result-score-circle" style="border-color:${gradeColor}">
                <strong>${score}</strong>
                <small>/ ${QUESTIONS.length}</small>
            </div>
            <div class="result-meta">
                <h2>คะแนนรวม: ${percent}%</h2>
                <p style="color:${gradeColor}"><strong>${grade}</strong></p>
                <div class="result-actions">
                    <button class="button secondary" onclick="filterWrongQuestions()">ดูเฉพาะข้อที่ตอบผิด (${QUESTIONS.length - score} ข้อ) ❌</button>
                    <button class="button primary" onclick="resetQuiz()">ทำข้อสอบใหม่อีกครั้ง 🔄</button>
                </div>
            </div>
        </div>
        <div class="chapter-breakdown-grid">
            ${LESSONS.map(l => {
                const s = chapterScores[l.id];
                const p = Math.round((s.correct / s.total) * 100);
                return `
                    <div class="chap-score-card">
                        <div class="chap-score-header">
                            <span>บท ${l.id} · ${escapeHTML(l.title)}</span>
                            <strong>${s.correct} / ${s.total}</strong>
                        </div>
                        <progress max="${s.total}" value="${s.correct}"></progress>
                        <small class="muted">${p}% ถูกต้อง</small>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

window.filterWrongQuestions = function() {
    state.quizFilter = 'wrong';
    document.querySelectorAll('.quiz-filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === 'wrong');
    });
    filterQuizDisplay();
};

function filterQuizDisplay() {
    const f = state.quizFilter;
    document.querySelectorAll('.question-card').forEach(card => {
        const qId = parseInt(card.id.replace('question-', ''), 10);
        const q = QUESTIONS.find(item => item.id === qId);
        let show = true;

        if (f === 'all') {
            show = true;
        } else if (f === 'wrong') {
            show = (state.answers[qId] !== q.answer);
        } else if (f === 'bookmarked') {
            show = state.bookmarks.has(qId);
        } else {
            show = (q.chapter === parseInt(f, 10));
        }

        card.hidden = !show;
    });

    document.querySelectorAll('.quiz-module-section').forEach(sec => {
        const hasVisible = Array.from(sec.querySelectorAll('.question-card')).some(c => !c.hidden);
        sec.hidden = !hasVisible;
    });
}

function resetQuiz() {
    state.graded = false;
    state.answers = {};
    saveStorage();

    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('correct', 'wrong');
        card.querySelectorAll('.option').forEach(opt => opt.classList.remove('correct-option', 'wrong-option'));
        card.querySelectorAll('input[type="radio"]').forEach(inp => {
            inp.checked = false;
            inp.disabled = false;
        });
        const fb = card.querySelector('.q-feedback');
        if (fb) fb.hidden = true;
    });

    const resBox = el('quiz-result');
    if (resBox) resBox.hidden = true;

    state.quizFilter = 'all';
    document.querySelectorAll('.quiz-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
    filterQuizDisplay();
    updateQuizProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Optional Exam Timer
function toggleTimer() {
    const btn = el('quiz-timer-toggle');
    const display = el('quiz-timer-display');
    if (!state.timerRunning) {
        state.timerRunning = true;
        btn.textContent = 'หยุดเวลา ⏸️';
        state.timerInterval = setInterval(() => {
            state.timerSeconds++;
            const m = String(Math.floor(state.timerSeconds / 60)).padStart(2, '0');
            const s = String(state.timerSeconds % 60).padStart(2, '0');
            display.textContent = `⏱️ ${m}:${s}`;
        }, 1000);
    } else {
        state.timerRunning = false;
        clearInterval(state.timerInterval);
        btn.textContent = 'เริ่มจับเวลา ▶️';
    }
}

// ==========================================
// ESSAYS ENGINE
// ==========================================
function renderEssays() {
    const container = el('essay-questions');
    if (!container) return;

    container.innerHTML = ESSAYS.map(q => `
        <article class="essay-card">
            <div class="essay-card-header">
                <span class="essay-tag">SCENARIO ${String(q.id).padStart(2, '0')} · ${escapeHTML(q.chapters)}</span>
                <h2>${q.id}. ${escapeHTML(q.title)}</h2>
            </div>
            <div class="essay-prompt-box">
                <p>${escapeHTML(q.prompt).replace(/\\n/g, '<br>')}</p>
            </div>
            <div class="essay-input-area">
                <label for="essay-text-${q.id}"><b>✍️ ลองเขียนคำตอบด้วยคำของตัวเองก่อนเปิดดูแนวตอบ:</b></label>
                <textarea id="essay-text-${q.id}" placeholder="เขียนโครงสร้าง: 1. ความหมาย/นิยาม → 2. กลไกการทำงานหรือการเปรียบเทียบ → 3. ยกตัวอย่างจริง..."></textarea>
            </div>
            <details class="essay-answer-accordion">
                <summary>🔍 เปิดดูแนวทางการตอบที่สมบูรณ์และเกณฑ์ประเมิน (Rubric)</summary>
                <div class="essay-model-answer">
                    <h4>แนวคำตอบมาตรฐานตามสไลด์:</h4>
                    <ul>
                        ${q.answer.map(a => `<li>${escapeHTML(a)}</li>`).join('')}
                    </ul>
                    <div class="rubric-box">
                        <strong>🎯 เกณฑ์เช็กความสมบูรณ์ 4 จุด (Rubric):</strong>
                        <ol>
                            ${q.rubric.map(r => `<li>${escapeHTML(r)}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            </details>
        </article>
    `).join('');

    // Restore saved essay answers from localStorage
    ESSAYS.forEach(q => {
        const txt = el(`essay-text-${q.id}`);
        if (txt) {
            const saved = localStorage.getItem(`cyber_essay_${q.id}`);
            if (saved) txt.value = saved;
            txt.addEventListener('input', () => {
                localStorage.setItem(`cyber_essay_${q.id}`, txt.value);
            });
        }
    });
}

// ==========================================
// FLASHCARDS ENGINE
// ==========================================
function renderFlashcards() {
    const cardBox = el('flashcard-display');
    const counterEl = el('card-counter');
    const prevBtn = el('card-prev');
    const nextBtn = el('card-next');
    const flipBtn = el('card-flip');
    const masterBtn = el('card-master');
    const resetBtn = el('card-reset');

    if (!cardBox || !window.FLASHCARDS || FLASHCARDS.length === 0) return;

    function updateCard() {
        const item = FLASHCARDS[state.cardIndex];
        const isMastered = state.cardMastered.has(state.cardIndex);

        cardBox.classList.remove('is-flipped');
        cardBox.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <span class="card-cat">บท ${item.ch} · ${escapeHTML(item.cat)}</span>
                    <h3 class="card-q">${escapeHTML(item.q)}</h3>
                    <p class="card-hint-click">👆 แตะหรือกดเพื่อพลิกดูคำตอบ</p>
                </div>
                <div class="flashcard-back">
                    <span class="card-cat">เฉลย / คำอธิบาย</span>
                    <div class="card-a">${escapeHTML(item.a)}</div>
                </div>
            </div>
        `;

        if (counterEl) {
            counterEl.textContent = `ใบที่ ${state.cardIndex + 1} / ${FLASHCARDS.length} (จำได้แล้ว: ${state.cardMastered.size})`;
        }

        if (masterBtn) {
            masterBtn.textContent = isMastered ? 'จำได้แล้ว ✅' : 'ทำเครื่องหมายว่าจำได้ ✨';
            masterBtn.classList.toggle('active', isMastered);
        }
    }

    cardBox.addEventListener('click', () => {
        cardBox.classList.toggle('is-flipped');
    });

    flipBtn?.addEventListener('click', () => {
        cardBox.classList.toggle('is-flipped');
    });

    prevBtn?.addEventListener('click', () => {
        state.cardIndex = (state.cardIndex - 1 + FLASHCARDS.length) % FLASHCARDS.length;
        updateCard();
    });

    nextBtn?.addEventListener('click', () => {
        state.cardIndex = (state.cardIndex + 1) % FLASHCARDS.length;
        updateCard();
    });

    masterBtn?.addEventListener('click', () => {
        if (state.cardMastered.has(state.cardIndex)) {
            state.cardMastered.delete(state.cardIndex);
        } else {
            state.cardMastered.add(state.cardIndex);
        }
        saveStorage();
        updateCard();
    });

    resetBtn?.addEventListener('click', () => {
        state.cardMastered.clear();
        state.cardIndex = 0;
        saveStorage();
        updateCard();
    });

    updateCard();
}

// ==========================================
// GLOBAL SEARCH
// ==========================================
function setupSearch() {
    const input = el('global-search-input');
    const resultBox = el('search-results');
    if (!input || !resultBox) return;

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (q.length < 2) {
            resultBox.hidden = true;
            resultBox.innerHTML = '';
            return;
        }

        const matches = [];

        // Search Lessons
        LESSONS.forEach(l => {
            if (l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || (l.html && l.html.toLowerCase().includes(q))) {
                matches.push({
                    type: 'บทเรียน',
                    title: `บท ${l.id} · ${l.title}`,
                    link: `#learn/${l.id}`
                });
            }
        });

        // Search Quiz questions
        QUESTIONS.forEach(item => {
            if (item.question.toLowerCase().includes(q) || item.options.some(opt => opt.toLowerCase().includes(q))) {
                matches.push({
                    type: 'ข้อสอบปรนัย',
                    title: `ข้อ ${item.id} (บท ${item.chapter}): ${item.question.slice(0, 50)}...`,
                    link: `#quiz`
                });
            }
        });

        // Search Flashcards
        if (window.FLASHCARDS) {
            FLASHCARDS.forEach(card => {
                if (card.q.toLowerCase().includes(q) || card.a.toLowerCase().includes(q)) {
                    matches.push({
                        type: 'Flashcard',
                        title: `${card.q}`,
                        link: `#cards`
                    });
                }
            });
        }

        if (matches.length === 0) {
            resultBox.hidden = false;
            resultBox.innerHTML = '<div class="search-item muted">ไม่พบผลลัพธ์ที่ตรงกับคำค้นหา</div>';
        } else {
            resultBox.hidden = false;
            resultBox.innerHTML = matches.slice(0, 8).map(m => `
                <a class="search-item" href="${m.link}">
                    <span class="search-tag">${m.type}</span>
                    <span class="search-title">${escapeHTML(m.title)}</span>
                </a>
            `).join('');
        }
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.search-container')) {
            resultBox.hidden = true;
        }
    });
}
