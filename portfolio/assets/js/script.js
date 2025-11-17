// Load projects dynamically from external JSON file
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projectsContainer");

  fetch("data/projects.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load projects data");
      return response.json();
    })
    .then(projects => {
      projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <img src="${project.image}" alt="${project.title}" class="project-img">
          <div class="project-info">
            <div class="project-header">
              <h3 class="project-title">${project.title}</h3>
              <span class="project-status ${project.status.toLowerCase()}">${project.status}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
              <a href="${project.link}" class="btn btn-primary">View Details</a>
              ${project.githubLink ? `<a href="${project.githubLink}" class="btn btn-secondary" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
              ${project.liveDemoLink ? `<a href="${project.liveDemoLink}" class="btn btn-outline" target="_blank">Live Demo</a>` : ''}
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      container.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Error loading projects: ${error.message}</p>
          <button onclick="location.reload()" class="btn">Try Again</button>
        </div>
      `;
    });
});