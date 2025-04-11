const apiURL = "http://127.0.0.1:5000/incidents/";

let editingIncidentId = null; // Variable to track the incident being edited

// Crea la estructura de la pagina
document.addEventListener("DOMContentLoaded", () => {
  // Crear y agregar el titulo
  const title = document.createElement("h1");
  title.textContent = "Gestion de Incidentes";
  title.style.textAlign = "center"; // Centrar el titulo
  title.style.marginBottom = "20px";
  document.body.appendChild(title);

  // Crear y agregar la seccion de lista de incidentes
  const incidentSection = document.createElement("section");
  incidentSection.id = "incident-section";
  incidentSection.style.width = "80%";
  incidentSection.style.maxWidth = "600px";
  incidentSection.style.margin = "0 auto 20px"; // Centrar horizontalmente y agregar margen inferior
  incidentSection.style.padding = "20px";
  incidentSection.style.backgroundColor = "#ffffff";
  incidentSection.style.border = "1px solid #ddd";
  incidentSection.style.borderRadius = "8px";
  incidentSection.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

  const incidentTitle = document.createElement("h2");
  incidentTitle.textContent = "Lista de Incidentes";
  incidentTitle.style.textAlign = "center"; // Centrar el titulo de la seccion
  incidentSection.appendChild(incidentTitle);

  const incidentList = document.createElement("div");
  incidentList.id = "incident-list";
  incidentSection.appendChild(incidentList);
  document.body.appendChild(incidentSection);

  // Crear y agregar la seccion del formulario
  const formSection = document.createElement("section");
  formSection.id = "form-section";
  formSection.style.width = "80%";
  formSection.style.maxWidth = "600px";
  formSection.style.margin = "0 auto 20px"; // Centrar horizontalmente y agregar margen inferior
  formSection.style.padding = "20px";
  formSection.style.backgroundColor = "white";
  formSection.style.border = "1px solid #ddd";
  formSection.style.borderRadius = "8px";
  formSection.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

  const formTitle = document.createElement("h2");
  formTitle.textContent = "Registrar Incidente";
  formTitle.style.textAlign = "center"; // Centrar el titulo del formulario
  formSection.appendChild(formTitle);

  // Crear el formulario
  const form = document.createElement("form");
  form.id = "incident-form";
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "15px";

  // Agregar los campos del formulario
  form.innerHTML = `
    <div>
      <label for="reporter">Reportero:</label>
      <input type="text" id="reporter" name="reporter" required style="width: 80%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
    </div>
    <div>
      <label for="description">Descripcion:</label>
      <textarea id="description" name="description" required style="width: 80%; height: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; resize: none;"></textarea>
    </div>
    <div>
      <label for="status">Estado:</label>
      <select id="status" name="status" required style="width: 80%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
        <option value="Pendiente">Pendiente</option>
        <option value="En progreso">En progreso</option>
        <option value="Resuelto">Resuelto</option>
      </select>
    </div>
    <button type="submit" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;">Enviar</button>
  `;
  formSection.appendChild(form);
  document.body.appendChild(formSection);

  // Obtener y renderizar los incidentes
  fetch(apiURL)
    .then(response => response.json())
    .then(data => renderIncidents(data))
    .catch(error => {
      console.error("Error al obtener incidentes:", error);
      document.getElementById("incident-list").innerText = "No se pudieron cargar los incidentes.";
    });

  // Agregar manejador de envio del formulario
  document.getElementById("incident-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir que el formulario recargue la pagina

    const reporter = document.getElementById("reporter").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    const incidentData = {
      reporter,
      description,
      status,
    };

    if (editingIncidentId) {
      // Si se esta editando un incidente, enviar una solicitud PUT
      fetch(`${apiURL}${editingIncidentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al actualizar el incidente");
          }
          return response.json();
        })
        .then(() => {
          alert("Incidente actualizado con exito");
          editingIncidentId = null; // Reiniciar el ID de edicion
          document.getElementById("incident-form").reset(); // Limpiar el formulario
          // Actualizar la lista de incidentes
          return fetch(apiURL)
            .then(response => response.json())
            .then(updatedData => renderIncidents(updatedData));
        })
        .catch(error => {
          console.error("Error al actualizar el incidente:", error);
          alert("No se pudo actualizar el incidente.");
        });
    } else {
      // Si no se esta editando, crear un nuevo incidente
      fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al enviar el incidente");
          }
          return response.json();
        })
        .then(() => {
          alert("Incidente enviado con exito");
          document.getElementById("incident-form").reset(); // Limpiar el formulario
          // Actualizar la lista de incidentes
          return fetch(apiURL)
            .then(response => response.json())
            .then(updatedData => renderIncidents(updatedData));
        })
        .catch(error => {
          console.error("Error al enviar el incidente:", error);
          alert("No se pudo enviar el incidente.");
        });
    }
  });
});

// Funcion para renderizar los incidentes
function renderIncidents(data) {
  const container = document.getElementById("incident-list");
  container.innerHTML = ""; // Limpiar el contenedor

  if (data.length === 0) {
    container.innerText = "No hay incidentes registrados.";
  } else {
    data.forEach(incident => {
      // Crear el contenedor principal del incidente
      const div = document.createElement("div");
      div.classList.add("incident-item");
      div.style.position = "relative";
      div.style.padding = "10px";
      div.style.border = "1px solid #ccc";
      div.style.borderRadius = "5px";
      div.style.marginBottom = "10px";
      div.style.backgroundColor = "#fefefe";

      // Crear y agregar el elemento del reportero
      const reporter = document.createElement("p");
      reporter.innerHTML = `<strong>${incident.reporter}</strong>: ${incident.description}`;
      div.appendChild(reporter);

      // Crear y agregar el elemento del estado
      const status = document.createElement("p");
      status.textContent = `Estado: ${incident.status}`;
      div.appendChild(status);

      // Crear y agregar el boton de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.style.position = "absolute";
      deleteButton.style.top = "5px";
      deleteButton.style.right = "10px";
      deleteButton.style.background = "red";
      deleteButton.style.color = "white";
      deleteButton.style.border = "none";
      deleteButton.style.borderRadius = "50%";
      deleteButton.style.width = "20px";
      deleteButton.style.height = "20px";
      deleteButton.style.cursor = "pointer";
      deleteButton.addEventListener("click", function () {
        deleteIncident(incident.id);
      });
      div.appendChild(deleteButton);

      // Crear y agregar el boton de editar
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.style.marginTop = "10px";
      editButton.style.background = "blue";
      editButton.style.color = "white";
      editButton.style.border = "none";
      editButton.style.borderRadius = "4px";
      editButton.style.padding = "5px 10px";
      editButton.style.cursor = "pointer";
      editButton.addEventListener("click", function () {
        populateFormForEdit(incident);
      });
      div.appendChild(editButton);

      // Agregar el contenedor del incidente a la lista principal
      container.appendChild(div);
    });
  }
}

// Funcion para llenar el formulario con los datos del incidente a editar
function populateFormForEdit(incident) {
  document.getElementById("reporter").value = incident.reporter;
  document.getElementById("description").value = incident.description;
  document.getElementById("status").value = incident.status;
  editingIncidentId = incident.id; // Guardar el ID del incidente que se esta editando
}

// Funcion para eliminar un incidente
function deleteIncident(id) {
  fetch(`${apiURL}${id}`, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al eliminar el incidente");
      }
      return response.json();
    })
    .then(() => {
      alert("Incidente eliminado con exito");
      // Actualizar la lista de incidentes
      return fetch(apiURL)
        .then(response => response.json())
        .then(updatedData => renderIncidents(updatedData));
    })
    .catch(error => {
      console.error("Error al eliminar el incidente:", error);
      alert("No se pudo eliminar el incidente.");
    });
}

