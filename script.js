document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }


    /* =========================================
       BLOG DATA
    ========================================= */

    const articleData = {

        1: {
            tag: "01 / AI",
            title: "Getting Started with Machine Learning in Python",
            body: `
                <p>
                    Machine learning begins with a clear question, useful data,
                    and a repeatable process.
                </p>

                <p>
                    Start by collecting a small dataset, removing missing or
                    incorrect values, and separating the data into training
                    and testing sets.
                </p>

                <p>
                    Python libraries such as pandas can be used for data
                    preparation while scikit-learn provides tools for creating
                    a first machine learning model.
                </p>

                <p>
                    The important part is not simply creating a model.
                    Evaluate the result with a suitable metric and understand
                    where the model performs well and where it fails.
                </p>
            `
        },

        2: {
            tag: "02 / WEB",
            title: "Modern Web Development",
            body: `
                <p>
                    A modern website should be fast, accessible, responsive,
                    and easy to maintain.
                </p>

                <p>
                    Begin with semantic HTML, organize the design using CSS
                    Grid and Flexbox, and use JavaScript where interaction
                    is actually needed.
                </p>

                <p>
                    Responsive design should be considered from the beginning
                    instead of being added at the end of development.
                </p>

                <p>
                    Optimize images, keep components reusable, and test the
                    website on different screen sizes.
                </p>
            `
        },

        3: {
            tag: "03 / CODE",
            title: "JavaScript Projects That Actually Teach You Something",
            body: `
                <p>
                    Small JavaScript projects are useful because each project
                    can focus on a practical programming concept.
                </p>

                <p>
                    A to-do application teaches DOM manipulation and events.
                    A weather dashboard teaches API requests. A quiz app
                    teaches state management and validation.
                </p>

                <p>
                    Start with the smallest working version and then add
                    features such as local storage, validation and error
                    handling.
                </p>
            `
        },

        4: {
            tag: "04 / TECH",
            title: "Inside the Tools We Use",
            body: `
                <p>
                    Every project benefits from choosing tools for a clear
                    reason.
                </p>

                <p>
                    A code editor improves productivity, Git tracks changes,
                    browser developer tools help debug layouts, and package
                    managers simplify dependencies.
                </p>

                <p>
                    Instead of collecting many tools, focus on understanding
                    the basic workflow of the tools you actually use.
                </p>
            `
        },

        5: {
            tag: "05 / AI",
            title: "Artificial Intelligence in Everyday Products",
            body: `
                <p>
                    Artificial intelligence appears in recommendation systems,
                    search, translation, spam filtering and smart assistants.
                </p>

                <p>
                    Most useful AI features combine data, a model, a user
                    interface and monitoring.
                </p>

                <p>
                    Good AI product design should make the system useful
                    while clearly communicating its limitations.
                </p>
            `
        },

        6: {
            tag: "06 / BUILD",
            title: "From Idea to Finished Project",
            body: `
                <p>
                    Turning an idea into a finished project becomes easier
                    when the work is divided into stages.
                </p>

                <p>
                    Define the problem, identify the target user, sketch
                    the experience, build a minimum viable version, test it,
                    and publish it.
                </p>

                <p>
                    A finished small project can teach more than a perfect
                    project that never leaves the planning stage.
                </p>
            `
        }

    };


    /* =========================================
       ARTICLE MODAL
    ========================================= */

    const articleModal =
        document.getElementById("articleModal");

    const articleModalTitle =
        document.getElementById("articleModalTitle");

    const articleModalTag =
        document.getElementById("articleModalTag");

    const articleModalBody =
        document.getElementById("articleModalBody");

    const closeArticle =
        document.getElementById("closeArticle");


    function openArticle(articleId) {

        const article = articleData[articleId];

        if (!article || !articleModal) {
            return;
        }

        articleModalTitle.textContent = article.title;
        articleModalTag.textContent = article.tag;
        articleModalBody.innerHTML = article.body;

        articleModal.classList.add("show");
        articleModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");
    }


    function closeArticleModal() {

        if (!articleModal) {
            return;
        }

        articleModal.classList.remove("show");
        articleModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");
    }


    document.querySelectorAll(".read-article")
        .forEach(button => {

            button.addEventListener("click", () => {

                const articleId =
                    button.dataset.article;

                openArticle(articleId);
            });

        });


    if (closeArticle) {

        closeArticle.addEventListener(
            "click",
            closeArticleModal
        );

    }


    document.querySelectorAll("[data-close-article]")
        .forEach(element => {

            element.addEventListener(
                "click",
                closeArticleModal
            );

        });


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            articleModal &&
            articleModal.classList.contains("show")
        ) {

            closeArticleModal();

        }

    });


    /* =========================================
       BLOG FILTER + SEARCH
    ========================================= */

    const filters =
        document.querySelectorAll(".filter");

    const blogSearch =
        document.getElementById("blogSearch");

    const blogCards =
        document.querySelectorAll(".post-card");

    const noResults =
        document.getElementById("noResults");

    let activeFilter = "all";


    function filterBlog() {

        const query =
            blogSearch ?
            blogSearch.value.trim().toLowerCase() :
            "";

        let visibleCount = 0;


        blogCards.forEach(card => {

            const category =
                card.dataset.category || "";

            const title =
                card.dataset.title || "";

            const content =
                card.textContent || "";


            const categoryMatch =
                activeFilter === "all" ||
                category === activeFilter;


            const searchMatch =
                query === "" ||
                title.toLowerCase().includes(query) ||
                content.toLowerCase().includes(query);


            const shouldShow =
                categoryMatch && searchMatch;


            card.style.display =
                shouldShow ? "flex" : "none";


            if (shouldShow) {
                visibleCount++;
            }

        });


        if (noResults) {

            noResults.classList.toggle(
                "show",
                visibleCount === 0
            );

        }

    }


    filters.forEach(button => {

        button.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            activeFilter =
                button.dataset.filter || "all";

            filterBlog();

        });

    });


    if (blogSearch) {

        blogSearch.addEventListener(
            "input",
            filterBlog
        );

    }


    /* =========================================
       PREDICTION SYSTEM
    ========================================= */

    const predictionForm =
        document.getElementById("predictionForm");

    const predictionInput =
        document.getElementById("predictionInput");

    const predictionLabel =
        document.getElementById("predictionLabel");

    const predictionConfidence =
        document.getElementById("predictionConfidence");

    const predictionExplanation =
        document.getElementById("predictionExplanation");

    const confidenceBar =
        document.getElementById("confidenceBar");

    const predictionStatus =
        document.getElementById("predictionStatus");

    const predictionTableBody =
        document.getElementById("predictionTableBody");

    const clearPredictions =
        document.getElementById("clearPredictions");

    let predictionData = [];
    let predictionHistory = [];

    let predictionChart = null;


    /* =========================================
       LOAD JSON
    ========================================= */

    async function loadPredictionData() {

        try {

            const response =
                await fetch("prediction-data.json");

            if (!response.ok) {
                throw new Error(
                    "Could not load prediction-data.json"
                );
            }

            predictionData =
                await response.json();


            if (predictionStatus) {

                predictionStatus.textContent =
                    "Prediction data loaded successfully.";

            }

        } catch (error) {

            console.error(error);

            if (predictionStatus) {

                predictionStatus.textContent =
                    "Unable to load prediction data.";

            }

        }

    }


    loadPredictionData();


    /* =========================================
       PREDICTION FUNCTION
    ========================================= */

    function makePrediction(text) {

        const input =
            text.toLowerCase();


        if (!Array.isArray(predictionData) ||
            predictionData.length === 0) {

            return {
                label: "Unknown",
                confidence: 0,
                explanation:
                    "Prediction data is not available."
            };

        }


        let bestMatch = null;
        let bestScore = 0;


        predictionData.forEach(item => {

            const keywords =
                item.keywords || [];

            let score = 0;


            keywords.forEach(keyword => {

                if (
                    input.includes(
                        keyword.toLowerCase()
                    )
                ) {

                    score++;

                }

            });


            if (score > bestScore) {

                bestScore = score;
                bestMatch = item;

            }

        });


        if (!bestMatch) {

            return {
                label: "General Technology",
                confidence: 0.50,
                explanation:
                    "No strong keyword match was found."
            };

        }


        const confidence =
            Math.min(
                0.98,
                0.55 +
                bestScore * 0.12
            );


        return {

            label:
                bestMatch.label ||
                bestMatch.category ||
                "Technology",

            confidence:

                typeof bestMatch.confidence ===
                "number"

                    ? bestMatch.confidence

                    : confidence,

            explanation:

                bestMatch.explanation ||
                bestMatch.description ||
                "Prediction generated from matching keywords."

        };

    }


    /* =========================================
       UPDATE RESULT
    ========================================= */

    function updatePredictionResult(
        input,
        result
    ) {

        if (predictionLabel) {

            predictionLabel.textContent =
                result.label;

        }


        const percentage =
            Math.round(
                result.confidence * 100
            );


        if (predictionConfidence) {

            predictionConfidence.textContent =
                percentage + "%";

        }


        if (confidenceBar) {

            confidenceBar.style.width =
                percentage + "%";

        }


        if (predictionExplanation) {

            predictionExplanation.textContent =
                result.explanation;

        }


        predictionHistory.push({

            input: input,

            label: result.label,

            confidence:
                result.confidence,

            time:
                new Date().toLocaleTimeString()

        });


        savePredictionHistory();
        renderPredictionHistory();
        updatePredictionChart();

    }


    /* =========================================
       FORM SUBMIT
    ========================================= */

    if (predictionForm) {

        predictionForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const input =
                    predictionInput.value.trim();


                if (!input) {

                    predictionInput.focus();

                    return;

                }


                const result =
                    makePrediction(input);


                updatePredictionResult(
                    input,
                    result
                );


                predictionInput.value = "";

            }
        );

    }


    /* =========================================
       LOCAL STORAGE
    ========================================= */

    function savePredictionHistory() {

        localStorage.setItem(
            "lakshPredictionHistory",
            JSON.stringify(
                predictionHistory
            )
        );

    }


    function loadPredictionHistory() {

        try {

            const saved =
                localStorage.getItem(
                    "lakshPredictionHistory"
                );


            if (saved) {

                predictionHistory =
                    JSON.parse(saved);

            }

        } catch (error) {

            console.error(
                "History loading error:",
                error
            );

            predictionHistory = [];

        }

    }


    loadPredictionHistory();


    /* =========================================
       HISTORY TABLE
    ========================================= */

    function renderPredictionHistory() {

        if (!predictionTableBody) {
            return;
        }


        if (
            !predictionHistory ||
            predictionHistory.length === 0
        ) {

            predictionTableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        No predictions yet.
                    </td>
                </tr>
            `;

            return;

        }


        predictionTableBody.innerHTML = "";


        predictionHistory
            .slice()
            .reverse()
            .forEach((item, reverseIndex) => {

                const originalIndex =
                    predictionHistory.length -
                    1 -
                    reverseIndex;


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${escapeHTML(item.input)}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(item.label)}
                        </strong>
                    </td>

                    <td>
                        ${Math.round(
                            item.confidence * 100
                        )}%
                    </td>

                    <td>
                        <button
                            class="delete-prediction"
                            data-index="${originalIndex}"
                            type="button"
                        >
                            Delete
                        </button>
                    </td>

                `;


                predictionTableBody.appendChild(row);

            });


        document
            .querySelectorAll(".delete-prediction")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        predictionHistory.splice(
                            index,
                            1
                        );


                        savePredictionHistory();
                        renderPredictionHistory();
                        updatePredictionChart();

                    }
                );

            });

    }


    renderPredictionHistory();


    /* =========================================
       CLEAR HISTORY
    ========================================= */

    if (clearPredictions) {

        clearPredictions.addEventListener(
            "click",
            () => {

                predictionHistory = [];

                savePredictionHistory();

                renderPredictionHistory();

                updatePredictionChart();

            }
        );

    }


    /* =========================================
       CHART
    ========================================= */

    function updatePredictionChart() {

        const canvas =
            document.getElementById(
                "predictionChart"
            );


        if (!canvas ||
            typeof Chart === "undefined") {

            return;

        }


        const labels =
            predictionHistory.map(
                (item, index) =>
                    "P" + (index + 1)
            );


        const values =
            predictionHistory.map(
                item =>
                    Math.round(
                        item.confidence * 100
                    )
            );


        if (predictionChart) {

            predictionChart.destroy();

        }


        predictionChart =
            new Chart(canvas, {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [{

                        label:
                            "Confidence %",

                        data: values,

                        tension: 0.35,

                        borderWidth: 2,

                        pointRadius: 4,

                        fill: false

                    }]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        y: {

                            min: 0,

                            max: 100,

                            ticks: {
                                callback:
                                    value =>
                                        value + "%"
                            }

                        }

                    }

                }

            });

    }


    updatePredictionChart();


    /* =========================================
       HTML ESCAPE
    ========================================= */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =========================================
       APPLICATION FORM
    ========================================= */

    const applicationForm =
        document.getElementById(
            "applicationForm"
        );


    if (applicationForm) {

        applicationForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                let valid = true;


                const name =
                    document.getElementById("name");

                const email =
                    document.getElementById("email");

                const skill =
                    document.getElementById("skill");

                const experience =
                    document.getElementById(
                        "experience"
                    );

                const certificate =
                    document.getElementById(
                        "certificate"
                    );


                clearErrors();


                /* NAME */

                if (
                    !name ||
                    name.value.trim().length < 2
                ) {

                    showError(
                        "name",
                        "Please enter your full name."
                    );

                    valid = false;

                }


                /* EMAIL */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !email ||
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    showError(
                        "email",
                        "Please enter a valid email address."
                    );

                    valid = false;

                }


                /* SKILL */

                if (
                    !skill ||
                    skill.value.trim().length < 2
                ) {

                    showError(
                        "skill",
                        "Please enter your primary skill."
                    );

                    valid = false;

                }


                /* EXPERIENCE */

                const years =
                    Number(
                        experience?.value
                    );


                if (
                    !experience ||
                    experience.value === "" ||
                    years < 0 ||
                    years > 50
                ) {

                    showError(
                        "experience",
                        "Enter experience between 0 and 50 years."
                    );

                    valid = false;

                }


                /* CERTIFICATE */

                if (
                    !certificate ||
                    !certificate.files ||
                    certificate.files.length === 0
                ) {

                    showError(
                        "certificate",
                        "Please upload a certificate."
                    );

                    valid = false;

                } else {

                    const file =
                        certificate.files[0];

                    const maxSize =
                        5 * 1024 * 1024;


                    const allowedTypes = [
                        "application/pdf",
                        "image/jpeg",
                        "image/png"
                    ];


                    if (
                        file.size > maxSize
                    ) {

                        showError(
                            "certificate",
                            "File size must be below 5 MB."
                        );

                        valid = false;

                    }


                    if (
                        !allowedTypes.includes(
                            file.type
                        )
                    ) {

                        showError(
                            "certificate",
                            "Only PDF, JPG, JPEG or PNG files are allowed."
                        );

                        valid = false;

                    }

                }


                /* SUCCESS */

                if (valid) {

                    const success =
                        document.getElementById(
                            "successMessage"
                        );


                    if (success) {

                        success.textContent =
                            "Application validated successfully.";

                        success.classList.add(
                            "show"
                        );

                    }


                    applicationForm.reset();

                }

            }
        );

    }


    /* =========================================
       FORM ERROR HELPERS
    ========================================= */

    function showError(
        fieldName,
        message
    ) {

        const field =
            document.getElementById(
                fieldName
            );


        const error =
            document.getElementById(
                fieldName + "Error"
            );


        if (field) {

            field.classList.add(
                "invalid"
            );

        }


        if (error) {

            error.textContent =
                message;

        }

    }


    function clearErrors() {

        document
            .querySelectorAll(".error")
            .forEach(error => {

                error.textContent = "";

            });


        document
            .querySelectorAll(
                ".application-form input"
            )
            .forEach(input => {

                input.classList.remove(
                    "invalid"
                );

            });


        const success =
            document.getElementById(
                "successMessage"
            );


        if (success) {

            success.classList.remove(
                "show"
            );

            success.textContent = "";

        }

    }

});