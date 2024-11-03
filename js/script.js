// Esperar a que el DOM esté completamente cargado

const API_URL = '//54.224.83.57/app-intro-connection/Getrecorsd.PHP';

document.addEventListener("DOMContentLoaded", () => {
    

    // Referencias a elementos del DOM
    const tbody = document.querySelector("tbody");
    const btnMostrarRegistros = document.getElementById("btnMostrarRegistros");
    const btnBuscar = document.getElementById("btnBuscar");
    const inputBuscarID = document.getElementById("buscarID");
    const btnCrear = document.getElementById("btnCrear");

    // Función para obtener todos los datos de la API
    const obtenerDatos = async () => {
        try {
            const response = await fetch(API_URL); // Hacer petición a la API
            const data = await response.json(); // Convertir respuesta a JSON

            // Limpiar el tbody
            tbody.innerHTML = '';

            // Recorrer los datos y agregarlos a la tabla
            data.forEach(record => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <th scope="row">${record.Code}</th>
                    <td>${record.Name}</td>
                    <td>${record.Continent}</td>
                    <td>${record.Region}</td>
                    <td>
                        <div class="d-flex">
                            <!-- Contenedor para el icono de editar -->
                            <div class="me-2">
                                <img src="img/editar.png" alt="Editar" width="30" height="30" class="img-fluid btnEditar" data-id="${record.id}">
                            </div>
                            <!-- Contenedor para el icono de eliminar -->
                            <div>
                                <img src="img/eliminar.png" alt="Eliminar" width="30" height="30" class="img-fluid btnEliminar" data-id="${record.id}">
                            </div>
                        </div>
                    </td>
                `;

                // Agregar la fila al tbody
                tbody.appendChild(fila);
            });

            // Agregar eventos a los botones de editar y eliminar
            agregarEventosEliminar();
            agregarEventosEditar();

        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    // Función para eliminar un registro por ID
    const eliminarRegistro = async (id, fila) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE' // Método de eliminación
            });

            if (response.ok) {
                // Eliminar la fila de la tabla
                fila.remove();
                alert(`Registro con ID ${id} eliminado exitosamente.`);
            } else {
                throw new Error('Error al eliminar el registro');
            }
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            alert("No se pudo eliminar el registro. Intenta de nuevo.");
        }
    };

    // Función para agregar el evento de eliminar a los botones
    const agregarEventosEliminar = () => {
        const botonesEliminar = document.querySelectorAll(".btnEliminar");

        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", () => {
                const id = boton.getAttribute("data-id");
                const fila = boton.closest("tr"); // Obtener la fila correspondiente

                if (confirm(`¿Estás seguro de que deseas eliminar el registro con ID ${id}?`)) {
                    eliminarRegistro(id, fila);
                }
            });
        });
    };

    // Función para buscar un registro por ID
    const buscarPorID = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error("Registro no encontrado");
            }
            const record = await response.json();

            // Limpiar el tbody
            tbody.innerHTML = '';

            // Crear fila con el resultado
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <th scope="row">${record.id}</th>
                <td>${record.Code}</td>
                <td>${record.Name}</td>
                <td>${record.Country}</td>
                <td>${record.Region}</td>
                <td>
                    <div class="d-flex">
                        <div class="me-2">
                            <img src="img/editar.png" alt="Editar" width="30" height="30" class="img-fluid btnEditar" data-id="${record.id}">
                        </div>
                        <div>
                            <img src="img/eliminar.png" alt="Eliminar" width="30" height="30" class="img-fluid btnEliminar" data-id="${record.id}">
                        </div>
                    </div>
                </td>
            `;

            // Agregar la fila al tbody
            tbody.appendChild(fila);

            // Agregar eventos a los botones de editar y eliminar
            agregarEventosEliminar();
            agregarEventosEditar();

        } catch (error) {
            console.error("Error al buscar el registro:", error);
            alert("Registro no encontrado");
        }
    };

    // Función para agregar el evento de editar a los botones
    const agregarEventosEditar = () => {
        const botonesEditar = document.querySelectorAll(".btnEditar");
        botonesEditar.forEach(boton => {
            boton.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                window.location.href = `formularioPut.html?id=${id}`; // Redirigir al formulario de edición
            });
        });
    };

    // Evento para mostrar todos los registros
    btnMostrarRegistros.addEventListener("click", obtenerDatos);

    // Evento para buscar un registro por ID
    btnBuscar.addEventListener("click", () => {
        const id = inputBuscarID.value;
        if (id) {
            buscarPorID(id);
        } else {
            alert("Por favor, ingresa un ID válido.");
        }
    });

    // Evento para redirigir al formulario de creación de registros
    btnCrear.addEventListener("click", () => {
        window.location.href = "formulario.html";
    });
});
