/* STATE MANAGEMENT */

const state = {
    personal: {},
    about: {},
    skills: [],
    projects: [],
    education: [],
    contact: {},
    footer: {},
    loading: true,
};

/* DOM ELEMENTS */

const heroContainer = document.getElementById("heroContainer");
const aboutContainer = document.getElementById("aboutContainer");
const skillsContainer = document.getElementById("skillsContainer");
const projectsContainer = document.getElementById("projectsContainer");
const educationContainer = document.getElementById("educationContainer");
const contactContainer = document.getElementById("contactContainer");
const footerContainer = document.getElementById("footerContainer");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navBrandName = document.getElementById("navBrandName");

/* FETCH & LOAD DATA */

async function loadData() {
    state.loading = true;
    console.log("Loading portfolio data...");

    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        state.personal = data.personal || {};
        state.about = data.about || {};
        state.skills = data.skills || [];
        state.projects = data.projects || [];
        state.education = data.education || [];
        state.contact = data.contact || {};
        state.footer = data.footer || {};
        state.loading = false;

        console.log("Data loaded successfully");
    } catch (error) {
        state.loading = false;
        console.error("Failed to load data:", error);
        showError(error.message);
    }

    render();
}

/* RENDER FUNCTIONS */

function renderHero() {
    if (!heroContainer || !state.personal.profileImage) return;

    heroContainer.innerHTML = `
        <img src="${state.personal.profileImage}" alt="${state.personal.fullName} - Profile Photo" class="profile-image">
        <h2>Hello, I'm ${state.personal.fullName}</h2>
        <p class="tagline">${state.personal.tagline}</p>
        <a href="#projects" class="cta-button">View My Projects</a>
    `;

    console.log("Hero section rendered");
}

function renderAbout() {
    if (!aboutContainer || !state.about.content) return;

    aboutContainer.innerHTML = `<p>${state.about.content}</p>`;
    console.log("About section rendered");
}

function renderSkills() {
    if (!skillsContainer) return;

    if (state.skills.length === 0) {
        skillsContainer.innerHTML = `<p class="error">No skills data available.</p>`;
        return;
    }

    skillsContainer.innerHTML = state.skills
        .map(
            (skill) => `
        <div class="skill-card">
            <span class="skill-category">${skill.category}</span>
            <h3>${skill.name}</h3>
            <div class="progress-bar">
                <div class="progress" style="width: ${skill.proficiency}%"></div>
            </div>
            <span class="proficiency">${skill.proficiency}%</span>
        </div>
    `
        )
        .join("");

    console.log(`${state.skills.length} skills rendered`);
}

function renderProjects() {
    if (!projectsContainer) return;

    if (state.projects.length === 0) {
        projectsContainer.innerHTML = `<p class="error">No projects data available.</p>`;
        return;
    }

    projectsContainer.innerHTML = state.projects
        .map(
            (project) => `
        <article class="project-card">
            <div class="project-image">
                ${
                    project.image
                        ? `<img src="${project.image}" alt="${project.title}">`
                        : `<span>${project.type.charAt(0)}</span>`
                }
            </div>
            <div class="project-content">
                <span class="project-type">${project.type}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tools.map((tool) => `<span class="tag">${tool}</span>`).join("")}
                </div>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                    View Project
                </a>
            </div>
        </article>
    `
        )
        .join("");

    console.log(`${state.projects.length} projects rendered`);
}

function renderEducation() {
    if (!educationContainer) return;

    if (state.education.length === 0) {
        educationContainer.innerHTML = `<p class="error">No education data available.</p>`;
        return;
    }

    educationContainer.innerHTML = state.education
        .map(
            (item) => `
        <div class="timeline-item">
            <span class="year">${item.year}</span>
            <span class="education-type">${item.type}</span>
            <h3>${item.title}</h3>
            <p class="institution">${item.institution}</p>
            <p>${item.description}</p>
        </div>
    `
        )
        .join("");

    console.log(`${state.education.length} education items rendered`);
}

function renderContact() {
    if (!contactContainer || !state.contact) return;

    const socialLinksHTML = (state.contact.socialLinks || [])
        .map((link) => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a></li>`)
        .join("");

    contactContainer.innerHTML = `
        <div class="contact-info">
            <p>
                <strong>Phone:</strong>
                <a href="tel:${state.contact.phone}">${state.contact.phone}</a>
            </p>
            <p>
                <strong>Email:</strong>
                <a href="mailto:${state.contact.email}">${state.contact.email}</a>
            </p>
        </div>
        <div class="social-links">
            <h3>Connect With Me</h3>
            <ul>
                ${socialLinksHTML}
            </ul>
        </div>
    `;

    console.log("Contact section rendered");
}

function renderFooter() {
    if (!footerContainer || !state.footer) return;

    footerContainer.innerHTML = `
        <p>${state.footer.copyright}</p>
        <p>${state.footer.credit}</p>
    `;

    console.log("Footer rendered");
}

function updateNavBrand() {
    if (navBrandName && state.personal.fullName) {
        navBrandName.textContent = state.personal.fullName;
    }
}

/* MAIN RENDER */

function render() {
    updateNavBrand();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderEducation();
    renderContact();
    renderFooter();
    console.log("All sections rendered");
}

/* EVENT LISTENERS */

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        console.log("Mobile menu toggled");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

/* ERROR HANDLING */

function showError(message) {
    console.error("Error:", message);
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-banner";
    errorMsg.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ef4444;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
    `;
    errorMsg.textContent = `Error: ${message}`;
    document.body.prepend(errorMsg);

    setTimeout(() => {
        errorMsg.remove();
    }, 5000);
}

/* INITIALIZATION */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio initializing...");
    loadData();
});

window.addEventListener("load", () => {
    console.log("Page fully loaded");
});