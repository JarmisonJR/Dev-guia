// Base de Dados Expansível das Linguagens
const languagesData = [
    {
        id: "python",
        name: "Python",
        category: ["beginner", "backend", "data"],
        difficulty: "Fácil",
        paradigm: "Multiparadigma",
        description: "A linguagem mais amigável do mundo. Sintaxe limpa e leitura idêntica ao inglês.",
        pros: ["Sintaxe intuitiva e simples", "Líder global em Inteligência Artificial e Ciência de Dados", "Gigantesca comunidade"],
        cons: ["Velocidade de execução inferior a C/Java", "Pouco utilizada em aplicativos mobile nativos"],
        frameworks: ["Django", "FastAPI", "Pandas", "PyTorch"],
        codeExample: `# Código em Python
def saudar(nome):
    return f"Olá, {nome}! Seja bem-vindo à programação."

print(saudar("Dev"))`
    },
    {
        id: "javascript",
        name: "JavaScript",
        category: ["beginner", "frontend", "backend"],
        difficulty: "Fácil",
        paradigm: "Multiparadigma / Event-Driven",
        description: "A linguagem dona da Web. É a única que roda nativamente nos navegadores.",
        pros: ["Roda direto no navegador sem instalar nada", "Permite criar sites, APIs e apps mobile com o mesmo idioma", "Alta quantidade de vagas"],
        cons: ["Tipagem fraca pode causar imprevistos em sistemas grandes", "Comportamentos assíncronos requerem treino"],
        frameworks: ["React", "Node.js", "Vue.js", "Express"],
        codeExample: `// Código em JavaScript
function saudar(nome) {
    return \`Olá, \${nome}! Seja bem-vindo à programação.\`;
}

console.log(saudar("Dev"));`
    },
    {
        id: "typescript",
        name: "TypeScript",
        category: ["frontend", "backend"],
        difficulty: "Médio",
        paradigm: "Tipado Estaticamente",
        description: "Linguagem criada pela Microsoft que evolui o JavaScript adicionando tipagem estática e inteligência.",
        pros: ["Pega erros antes de rodar o código", "Padrão oficial da grande maioria das empresas hoje"],
        cons: ["Exige compilação prévia", "Precisa dominar JavaScript básico antes"],
        frameworks: ["Angular", "NestJS", "Next.js"],
        codeExample: `// Código em TypeScript
function saudar(nome: string): string {
    return \`Olá, \${nome}!\`;
}

console.log(saudar("Dev"));`
    },
    {
        id: "java",
        name: "Java",
        category: ["backend", "mobile", "systems"],
        difficulty: "Médio",
        paradigm: "Orientado a Objetos",
        description: "Linguagem corporativa ultra consolidada. É o motor de bancos, grandes e-commerces e Android.",
        pros: ["Extremamente segura, estável e escalável", "Infinidade de vagas corporativas bem pagas"],
        cons: ["Exige escrever mais linhas de código (prolixa)", "Configuração inicial um pouco burocrática"],
        frameworks: ["Spring Boot", "Quarkus", "Android SDK"],
        codeExample: `// Código em Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Olá, Dev!");
    }
}`
    },
    {
        id: "csharp",
        name: "C# (.NET)",
        category: ["backend", "systems"],
        difficulty: "Médio",
        paradigm: "Orientado a Objetos",
        description: "Evolução do ecossistema Microsoft. Excelente para APIs de alto desempenho e criação de jogos na Unity.",
        pros: ["Desempenho incrível", "Criação de jogos 2D/3D no motor Unity"],
        cons: ["Forte ligação histórica ao ecossistema Microsoft"],
        frameworks: [".NET Core", "ASP.NET", "Unity Engine"],
        codeExample: `// Código em C#
using System;

class Program {
    static void Main() {
        Console.WriteLine("Olá, Dev!");
    }
}`
    },
    {
        id: "kotlin",
        name: "Kotlin",
        category: ["mobile", "backend"],
        difficulty: "Médio",
        paradigm: "Multiparadigma Moderno",
        description: "Linguagem recomendada oficialmente pelo Google para o desenvolvimento moderno de aplicativos Android.",
        pros: ["Sintaxe bonita e muito segura contra erros nulos", "100% compatível com bibliotecas Java"],
        cons: ["Mercado focado predominantemente no desenvolvimento Android"],
        frameworks: ["Android Jetpack", "Ktor"],
        codeExample: `// Código em Kotlin
fun main() {
    println("Olá, Dev!")
}`
    }
];

// Dicionário de Termos Tech
const glossaryData = [
    { term: "API", desc: "Uma 'ponte' que permite que dois sistemas conversem entre si." },
    { term: "Backend", desc: "A parte invisível do sistema: servidores, lógica de negócios e bancos de dados." },
    { term: "Frontend", desc: "Tudo o que o usuário interage e enxerga na tela." },
    { term: "Bug", desc: "Um erro ou comportamento inesperado no código." },
    { term: "Deploy", desc: "O ato de publicar seu projeto local na internet para que todos acessem." },
    { term: "Git", desc: "Sistema de controle de versão que registra o histórico do seu código." },
    { term: "Framework", desc: "Um conjunto de ferramentas prontas que aceleram o desenvolvimento." },
    { term: "Database (Banco de Dados)", desc: "Lugar onde as informações do sistema ficam salvas com segurança." }
];

let selectedForCompare = [];
let quizAnswers = {};
let activeTab = 'js';

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderLanguages(languagesData);
    renderGlossary();
    setupEventListeners();
    loadProgress();
});

// Renderizar Linguagens
function renderLanguages(list) {
    const grid = document.getElementById("languages-grid");
    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">Nenhuma linguagem encontrada.</p>`;
        return;
    }

    list.forEach(lang => {
        const card = document.createElement("div");
        card.className = "lang-card";

        const difficultyClass = lang.difficulty === "Fácil" ? "badge-easy" : "badge-medium";
        const isChecked = selectedForCompare.includes(lang.id) ? "checked" : "";

        card.innerHTML = `
            <div>
                <div class="lang-header">
                    <div class="lang-title">
                        <h3>${lang.name}</h3>
                        <span class="paradigm">${lang.paradigm}</span>
                    </div>
                    <label class="checkbox-compare">
                        <input type="checkbox" class="compare-checkbox" value="${lang.id}" ${isChecked}>
                        Comparar
                    </label>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">${lang.description}</p>
                <div class="lang-tags">
                    <span class="badge-tag ${difficultyClass}">${lang.difficulty}</span>
                    ${lang.frameworks.slice(0, 2).map(f => `<span class="badge-tag">${f}</span>`).join("")}
                </div>
            </div>
            <button class="btn-details" onclick="openLangModal('${lang.id}')">Ver Ficha Técnica</button>
        `;

        grid.appendChild(card);
    });

    document.querySelectorAll(".compare-checkbox").forEach(cb => {
        cb.addEventListener("change", handleCompareSelect);
    });
}

// Renderizar Dicionário
function renderGlossary() {
    const grid = document.getElementById("glossary-grid");
    grid.innerHTML = glossaryData.map(item => `
        <div class="glossary-item">
            <h4>${item.term}</h4>
            <p>${item.desc}</p>
        </div>
    `).join("");
}

// Eventos de Filtro e Busca
function setupEventListeners() {
    document.getElementById("category-filters").addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-btn")) {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const cat = e.target.dataset.category;
            if (cat === "all") {
                renderLanguages(languagesData);
            } else {
                renderLanguages(languagesData.filter(l => l.category.includes(cat)));
            }
        }
    });

    document.getElementById("global-search").addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = languagesData.filter(l => 
            l.name.toLowerCase().includes(term) || 
            l.description.toLowerCase().includes(term)
        );
        renderLanguages(filtered);
    });

    document.getElementById("close-modal-btn").onclick = () => document.getElementById("lang-modal").classList.remove("active");
    document.getElementById("close-comparator-btn").onclick = () => document.getElementById("comparator-modal").classList.remove("active");
    document.getElementById("open-comparator-btn").onclick = openComparatorModal;

    document.querySelectorAll('input[type="checkbox"][data-task]').forEach(cb => {
        cb.addEventListener("change", updateProgress);
    });
}

// Quiz de Perfil
window.nextQuiz = function(step, choice) {
    quizAnswers[step] = choice;
    document.getElementById(`quiz-step-${step}`).classList.remove("active");

    if (step < 2) {
        document.getElementById(`quiz-step-${step + 1}`).classList.add("active");
    } else {
        showQuizResult();
    }
};

function showQuizResult() {
    const res = document.getElementById("quiz-result");
    const title = document.getElementById("quiz-title");
    const desc = document.getElementById("quiz-desc");
    const lang = document.getElementById("quiz-lang");

    const mainChoice = quizAnswers[1];

    if (mainChoice === "front") {
        title.textContent = "Seu perfil combina com: Desenvolvimento Frontend";
        desc.textContent = "Você gosta de dar vida a interfaces visuais, trabalhar com experiência do usuário e ver o resultado estético de imediato.";
        lang.textContent = "JavaScript (com HTML & CSS)";
    } else if (mainChoice === "back") {
        title.textContent = "Seu perfil combina com: Desenvolvimento Backend";
        desc.textContent = "Seu forte é a solução de problemas lógicos, organização de dados, segurança de sistemas e regras de negócio.";
        lang.textContent = "Python ou Java";
    } else if (mainChoice === "data") {
        title.textContent = "Seu perfil combina com: Ciência de Dados & Inteligência Artificial";
        desc.textContent = "Você tem curiosidade sobre dados, gosta de encontrar padrões e ensinar máquinas a tomar decisões inteligentes.";
        lang.textContent = "Python";
    } else {
        title.textContent = "Seu perfil combina com: Desenvolvimento Mobile";
        desc.textContent = "Sua paixão é criar soluções práticas para a palma da mão das pessoas em aplicativos de celular.";
        lang.textContent = "JavaScript (React Native) ou Kotlin";
    }

    res.classList.remove("hidden");
    lucide.createIcons();
}

window.resetQuiz = function() {
    quizAnswers = {};
    document.getElementById("quiz-result").classList.add("hidden");
    document.getElementById("quiz-step-1").classList.add("active");
};

// Playground Executável
window.switchTab = function(type) {
    activeTab = type;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");

    const editor = document.getElementById("code-editor");
    if (type === 'html') {
        editor.value = `<!-- Exemplo HTML + CSS -->\n<h1 style="color: #06b6d4;">Olá Mundo!</h1>\n<p>Este é seu primeiro componente Web vivo.</p>`;
    } else {
        editor.value = `// Digite seu código JavaScript aqui\nconsole.log("Executando JavaScript no navegador!");`;
    }
};

window.runCode = function() {
    const code = document.getElementById("code-editor").value;
    const output = document.getElementById("code-output");
    output.innerHTML = "";

    if (activeTab === 'js') {
        let logs = [];
        const originalLog = console.log;
        console.log = function(...args) {
            logs.push(args.join(" "));
            originalLog.apply(console, args);
        };

        try {
            eval(code);
            output.textContent = logs.length > 0 ? logs.join("\n") : "Código executado com sucesso (sem saídas em console.log).";
        } catch (err) {
            output.textContent = "Erro na execução: " + err.message;
        } finally {
            console.log = originalLog;
        }
    } else {
        output.innerHTML = code;
    }
};

// Comparador de Linguagens
function handleCompareSelect(e) {
    const id = e.target.value;
    if (e.target.checked) {
        if (selectedForCompare.length >= 3) {
            alert("Você pode comparar até 3 linguagens simultaneamente.");
            e.target.checked = false;
            return;
        }
        selectedForCompare.push(id);
    } else {
        selectedForCompare = selectedForCompare.filter(i => i !== id);
    }

    document.getElementById("compare-count").textContent = selectedForCompare.length;
    document.getElementById("open-comparator-btn").disabled = selectedForCompare.length < 2;
}

window.openLangModal = function(id) {
    const lang = languagesData.find(l => l.id === id);
    if (!lang) return;

    const body = document.getElementById("modal-body");
    body.innerHTML = `
        <h2>${lang.name}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">Nível: ${lang.difficulty} | ${lang.paradigm}</p>
        <p style="margin-bottom: 1rem;">${lang.description}</p>
        
        <h4 style="color: var(--accent-green);">Pontos Fortes</h4>
        <ul>${lang.pros.map(p => `<li>${p}</li>`).join("")}</ul>
        
        <h4 style="color: var(--accent-yellow); margin-top: 1rem;">Pontos de Atenção</h4>
        <ul>${lang.cons.map(c => `<li>${c}</li>`).join("")}</ul>

        <h4 style="margin-top: 1rem;">Exemplo Prático</h4>
        <code-block>${escapeHtml(lang.codeExample)}</code-block>
    `;

    document.getElementById("lang-modal").classList.add("active");
};

function openComparatorModal() {
    const table = document.getElementById("comparator-table");
    const langs = languagesData.filter(l => selectedForCompare.includes(l.id));

    let html = `
        <tr>
            <th>Atributo</th>
            ${langs.map(l => `<th>${l.name}</th>`).join("")}
        </tr>
        <tr>
            <td><strong>Dificuldade</strong></td>
            ${langs.map(l => `<td>${l.difficulty}</td>`).join("")}
        </tr>
        <tr>
            <td><strong>Paradigma</strong></td>
            ${langs.map(l => `<td>${l.paradigm}</td>`).join("")}
        </tr>
        <tr>
            <td><strong>Pontos Fortes</strong></td>
            ${langs.map(l => `<td><ul>${l.pros.map(p => `<li>${p}</li>`).join("")}</ul></td>`).join("")}
        </tr>
        <tr>
            <td><strong>Frameworks</strong></td>
            ${langs.map(l => `<td>${l.frameworks.join(", ")}</td>`).join("")}
        </tr>
    `;

    table.innerHTML = html;
    document.getElementById("comparator-modal").classList.add("active");
}

// Gerenciador de Progresso com LocalStorage
function updateProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][data-task]');
    const total = checkboxes.length;
    let checkedCount = 0;
    const state = {};

    checkboxes.forEach(cb => {
        state[cb.dataset.task] = cb.checked;
        if (cb.checked) checkedCount++;
    });

    const percent = Math.round((checkedCount / total) * 100);
    document.getElementById("global-progress").style.width = percent + "%";
    document.getElementById("progress-percentage").textContent = percent + "%";

    localStorage.setItem("devManual_progress", JSON.stringify(state));
}

function loadProgress() {
    const saved = localStorage.getItem("devManual_progress");
    if (!saved) return;

    const state = JSON.parse(saved);
    document.querySelectorAll('input[type="checkbox"][data-task]').forEach(cb => {
        if (state[cb.dataset.task] !== undefined) {
            cb.checked = state[cb.dataset.task];
        }
    });

    updateProgress();
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
