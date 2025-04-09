const apiURL = "http://127.0.0.1:5000/incidents/";

fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("incident-list");
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerText = "No hay incidentes registrados.";
    } else {
      data.forEach(incident => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p><strong>${incident.reporter}</strong>: ${incident.description}</p>
          <p>Estado: ${incident.status}</p>
          <hr>
        `;
        container.appendChild(div);
      });
    }
  })
  .catch(error => {
    console.error("Error al obtener incidentes:", error);
    document.getElementById("incident-list").innerText = "No se pudieron cargar los incidentes.";
  });
