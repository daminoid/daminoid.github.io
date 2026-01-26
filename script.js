document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');

  function loadProjects(tag = "all") {
    container.innerHTML = "";

    fetch('projects.json', { cache: "no-cache" })
      .then(res => res.json())
      .then(projects => {
        projects.forEach(project => {
          const projectTags = project.tags || [];

          if (tag === "all" || projectTags.includes(tag)) {
            const div = document.createElement('div');
            div.className = 'masonry-item';
            div.dataset.tags = projectTags.join(" ");

            div.innerHTML = `
              <div class="box">
                <div class="banner shine" style="
                  --bg-color: ${project.banner.bgColor};
                  --bg-hover: ${project.banner.bgHover};
                  --img-normal: url('${project.banner.img}');
                  --img-hover: url('${project.banner.imgHover}');
                ">
                  <p class="title is-5">${project.title}</p>
                </div>
                <div class="p-4">
                  <p class="mb-3">#${projectTags.join(" #")}</p>
                  <p class="mb-3">${project.description}</p>
                  
                  ${project.note ? `
                    <div class="notification">
                      <i class="fas fa-triangle-exclamation"></i> ${project.note}
                    </div>
                  ` : ``}

                  <div class="buttons">
                    <a class="button is-info is-small" href="${project.link}" target="_blank">Voir le projet</a>
                    ${project.demo ? `<a class="button is-success is-small" href="${project.demo}" target="_blank">Démo</a>` : ``}
                  </div>
                </div>
              </div>
            `;

            container.appendChild(div);
          }
        });
      })
      .catch(err => console.error("Erreur lors du chargement des projets :", err));
  }

  loadProjects();

  window.filterProjects = function(tag) {
    loadProjects(tag);
  }
});
