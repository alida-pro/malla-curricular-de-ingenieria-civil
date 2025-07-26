document.addEventListener('DOMContentLoaded', () => {
    const mallaCurricularDiv = document.getElementById('malla-curricular');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');

    // Definición de la malla curricular con sus requisitos
    const semesters = {
        "1er ciclo": [
            { id: "MAT1", name: "MATEMÁTICA I", requirements: ["Nivelación de matemática"] },
            { id: "IVU", name: "INTRODUCCIÓN A LA VIDA UNIVERSITARIA", requirements: [] },
            { id: "L_QG", name: "LABORATORIO DE QUÍMICA GENERAL", requirements: [] },
            { id: "QG", name: "QUÍMICA GENERAL", requirements: [] },
            { id: "IMA", name: "INDIVIDUO Y MEDIO AMBIENTE", requirements: ["Nivelación de redacción"] },
            { id: "ING1", name: "INGLÉS I", requirements: [] },
            { id: "CRT1", name: "COMPRENSIÓN Y REDACCIÓN DE TEXTOS I", requirements: ["Nivelación de redacción"] }
        ],
        "2do ciclo": [
            { id: "MAT2", name: "MATEMÁTICA II", requirements: ["MAT1"] },
            { id: "CRE", name: "CIUDADANÍA Y REFLEXIÓN ÉTICA", requirements: [] },
            { id: "ING2", name: "INGLÉS II", requirements: ["ING1"] },
            { id: "CRT2", name: "COMPRENSIÓN Y REDACCIÓN DE TEXTOS II", requirements: ["CRT1"] },
            { id: "EDP", name: "ESTADÍSTICA DESCRIPTIVA Y PROBABILIDADES", requirements: ["MAT1"] },
            { id: "PA", name: "PRINCIPIOS DE ALGORITMOS", requirements: [] },
            { id: "DI", name: "DIBUJO PARA INGENIERÍA", requirements: ["MAT1", "IVU"] }
        ],
        "3er ciclo": [
            { id: "L_MC", name: "LABORATORIO DE MECÁNICA CLÁSICA", requirements: ["MAT2"] },
            { id: "MC", name: "MECÁNICA CLÁSICA", requirements: ["MAT2"] },
            { id: "C1", name: "CÁLCULO I", requirements: ["MAT2"] },
            { id: "IA", name: "INVESTIGACIÓN ACADÉMICA", requirements: ["IMA", "CRT1"] },
            { id: "G", name: "GEOLOGÍA", requirements: ["DI"] },
            { id: "PMOC", name: "PLANOS Y METRADOS DE OBRAS DE CONSTRUCCIÓN", requirements: ["DI"] },
            { id: "ING3", name: "INGLÉS III", requirements: ["ING2"] },
            { id: "PDPA", name: "PROBLEMAS Y DESAFÍOS EN EL PERÚ ACTUAL", requirements: ["IMA", "CRT1"] }
        ],
        "4to ciclo": [
            { id: "L_MC_CONST", name: "LABORATORIO DE MATERIALES DE CONSTRUCCIÓN", requirements: ["MC", "C1", "L_MC"] }, // Corregido ID
            { id: "MC_CONST", name: "MATERIALES DE CONSTRUCCIÓN", requirements: ["MC", "C1", "L_MC"] },
            { id: "FT", name: "FLUIDOS Y TERMODINÁMICA", requirements: ["MC", "C1", "L_MC"] },
            { id: "L_FT", name: "LABORATORIO DE FLUIDOS Y TERMODINÁMICA", requirements: ["MC", "C1", "L_MC"] },
            { id: "C2", name: "CÁLCULO II", requirements: ["C1"] },
            { id: "T_IC", name: "TOPOGRAFÍA - INGENIERIA CIVIL", requirements: ["EDP", "PMOC"] },
            { id: "E", name: "ESTÁTICA", requirements: ["MC", "C1", "L_MC"] },
            { id: "ING4", name: "INGLÉS IV", requirements: ["ING3"] }
        ],
        "5to ciclo": [
            { id: "CONST", name: "CONSTRUCCIÓN", requirements: ["MC_CONST", "PMOC"] },
            { id: "FD", name: "FUNDAMENTOS DE DINÁMICA", requirements: ["E"] },
            { id: "GM", name: "GEOMÁTICA", requirements: ["G", "T_IC"] },
            { id: "TC", name: "TECNOLOGÍA DEL CONCRETO", requirements: ["MC_CONST"] },
            { id: "CAI", name: "CÁLCULO AVANZADO PARA INGENIERÍA", requirements: ["C2"] },
            { id: "CTD", name: "CÁLCULO PARA LA TOMA DE DECISIONES", requirements: ["C2"] },
            { id: "HITD", name: "HERRAMIENTAS INFORMÁTICAS PARA LA TOMA DE DECISIONES", requirements: [] }
        ],
        "6to ciclo": [
            { id: "L_ERM", name: "LABORATORIO DE ELASTICIDAD Y RESISTENCIA DE MATERIALES", requirements: ["CAI", "CTD", "FD"] },
            { id: "ERM", name: "ELASTICIDAD Y RESISTENCIA DE MATERIALES", requirements: ["CAI", "CTD", "FD"] },
            { id: "L_MF", name: "LABORATORIO DE MECÁNICA DE FLUIDOS", requirements: ["FD"] },
            { id: "MF", name: "MECÁNICA DE FLUIDOS", requirements: ["FD"] },
            { id: "HCE", name: "HERRAMIENTAS PARA LA COMUNICACIÓN EFECTIVA", requirements: ["IA"] },
            { id: "CE", name: "CONSTRUCCIONES ESPECIALES", requirements: ["CONST"] },
            { id: "MS", name: "MECÁNICA DE SUELOS", requirements: ["GM", "FD"] },
            { id: "CI1_CIVIL", name: "CURSO INTEGRADOR I - CIVIL", requirements: ["TC", "CONST", "GM"] }
        ],
        "7mo ciclo": [
            { id: "L_HC", name: "LABORATORIO DE HIDRÁULICA DE CANALES", requirements: ["CI1_CIVIL", "MF"] },
            { id: "HC", name: "HIDRÁULICA DE CANALES", requirements: ["CI1_CIVIL", "MF"] },
            { id: "IG", name: "INGENIERÍA GEOTÉCNICA", requirements: ["CI1_CIVIL", "MS"] },
            { id: "BIM", name: "MODELADO DE INFORMACIÓN DE EDIFICACIONES - BIM", requirements: ["CE"] },
            { id: "IC_CIVIL", name: "INGENIERÍA DE CARRETERAS", requirements: ["MS", "GM"] }, // Cambiado ID para evitar duplicidad con Ing. Cimentaciones
            { id: "IE", name: "INSTALACIONES EN EDIFICACIONES", requirements: ["CE", "MF"] },
            { id: "AE1", name: "ANÁLISIS ESTRUCTURAL I", requirements: ["ERM", "CI1_CIVIL"] },
            { id: "FE", name: "FORMACIÓN PARA LA EMPLEABILIDAD", requirements: ["HCE"] }
        ],
        "8vo ciclo": [
            { id: "AE2", name: "ANÁLISIS ESTRUCTURAL II", requirements: ["AE1"] },
            { id: "HA", name: "HIDROLOGÍA APLICADA", requirements: ["HC"] },
            { id: "SIC", name: "SEMINARIO DE INGENIERÍA CIVIL", requirements: ["AE1", "HC", "IG"] },
            { id: "MSA", name: "MECÁNICA DE SUELOS APLICADA", requirements: ["IG"] },
            { id: "ECPO", name: "ESTIMACIÓN DE COSTOS Y PLANIFICACIÓN DE OBRA", requirements: ["IE"] },
            { id: "AOEC", name: "ADMINISTRACIÓN Y ORGANIZACIÓN DE EMPRESAS CONSTRUCTORAS", requirements: ["IE", "BIM"] },
            { id: "CC_CIVIL", name: "CONSTRUCCIÓN DE CARRETERAS", requirements: ["IC_CIVIL"] }, // Cambiado ID
            { id: "EP", name: "ÉTICA PROFESIONAL", requirements: ["HITD", "FE"] }
        ],
        "9no ciclo": [
            { id: "GPC", name: "GESTIÓN DE PROYECTOS DE CONSTRUCCIÓN", requirements: ["AOEC", "ECPO"] },
            { id: "IC", name: "INGENIERÍA DE CIMENTACIONES", requirements: ["MSA"] }, // ID original, distinto de IC_CIVIL
            { id: "P", name: "PAVIMENTOS", requirements: ["CC_CIVIL", "MSA"] }, // Usando el nuevo ID
            { id: "IRH", name: "INGENIERÍA DE LOS RECURSOS HIDRÁULICOS", requirements: ["HA"] },
            { id: "SIGC", name: "SISTEMA INTEGRADO DE GESTIÓN EN LA CONSTRUCCIÓN", requirements: ["ECPO"] },
            { id: "FI_CIVIL", name: "FORMACIÓN PARA LA INVESTIGACIÓN - CIVIL", requirements: ["SIC"] },
            { id: "CA", name: "CONCRETO ARMADO", requirements: ["AE2"] }
        ],
        "10mo ciclo": [
            { id: "IS", name: "INGENIERIA SISMORRESISTENTE", requirements: ["CA", "IC"] },
            { id: "GP_IP", name: "GESTIÓN DE PROYECTOS DE INVERSIÓN PÚBLICA", requirements: ["GPC"] },
            { id: "TI_CIVIL", name: "TALLER DE INVESTIGACIÓN - CIVIL", requirements: ["FI_CIVIL"] },
            { id: "CI2_CIVIL", name: "CURSO INTEGRADOR II - CIVIL", requirements: ["CI1_CIVIL", "IC", "GPC"] },
            { id: "FMVDC", name: "FUNDAMENTOS DE METODOLOGÍA VDC EN EDIFICACIONES", requirements: ["BIM", "GPC"] },
            { id: "SSOEC", name: "SEGURIDAD Y SALUD OCUPACIONAL EN OBRAS DE CONSTRUCCIÓN", requirements: ["SIGC", "GPC"] },
            { id: "SAC", name: "SOSTENIBILIDAD AMBIENTAL EN LA CONSTRUCCIÓN", requirements: ["HA"] },
            { id: "AEF", name: "ANÁLISIS DE ESTRUCTURAS POR ELEMENTOS FINITOS", requirements: ["CA"] },
            { id: "MN", name: "MÉTODOS NUMÉRICOS", requirements: ["CAI"] },
            { id: "EBE", name: "ELEMENTARY BUSINESS ENGLISH", requirements: ["ING4"] }
        ]
    };

    // --- REQUISITOS ADICIONALES Y CORRECCIONES EN IDs ---
    // NOTA: He hecho algunas correcciones en los IDs de los ramos en la definición de 'semesters'
    // para asegurar que sean únicos (ej: IC_CIVIL vs IC).
    // También he añadido los requisitos para las nivelaciones si necesitas que sean "cursos" aprobables.
    // Si "Nivelación de matemática" y "Nivelación de redacción" no son ramos, se asume que están cubiertos.
    // Por ahora, se asume que "Nivelación de matemática" y "Nivelación de redacción"
    // son condiciones pre-universitarias o que se cumplen implícitamente.
    // Si necesitas que sean clickeables, se tendrían que añadir como "ramos" ficticios al primer ciclo.
    // Por simplicidad en esta implementación, las ignoro en el chequeo `isCourseApproved`.

    // Almacena el estado de los ramos aprobados en localStorage
    let approvedCourses = JSON.parse(localStorage.getItem('approvedCourses')) || {};

    // Función para mostrar el modal
    const showModal = (message) => {
        modalMessage.textContent = message;
        modal.style.display = 'flex'; // Usar flex para centrar
    };

    // Función para ocultar el modal
    const hideModal = () => {
        modal.style.display = 'none';
    };

    // Cerrar modal al hacer clic en la 'x'
    closeButton.addEventListener('click', hideModal);

    // Cerrar modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    // Función para verificar si un ramo está aprobado
    const isCourseApproved = (courseId) => {
        return approvedCourses[courseId];
    };

    // Función para verificar si los requisitos de un ramo están cumplidos
    const areRequirementsMet = (course) => {
        if (!course.requirements || course.requirements.length === 0) {
            return true; // No tiene requisitos
        }

        const missingRequirements = [];
        for (const reqId of course.requirements) {
            // Manejo especial para las nivelaciones si no son ramos clickeables
            if (reqId.startsWith("Nivelación de")) {
                continue; // Asumimos que las nivelaciones están cubiertas
            }

            if (!isCourseApproved(reqId)) {
                // Buscar el nombre del requisito por su ID
                let reqName = reqId;
                // Buscamos el nombre del ramo en la lista de todos los ramos
                let found = false;
                for (const semKey in semesters) {
                    const foundCourse = semesters[semKey].find(c => c.id === reqId);
                    if (foundCourse) {
                        reqName = foundCourse.name;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    reqName = `(ID: ${reqId})`; // Si no se encuentra el ID, mostrar el ID
                }
                missingRequirements.push(reqName);
            }
        }
        return missingRequirements.length === 0 ? true : missingRequirements;
    };

    // Función para actualizar el estado visual de los ramos
    const updateCourseStates = () => {
        // Primero, eliminar todas las clases 'blocked' para recalcular y evitar estados incorrectos
        document.querySelectorAll('.course-card').forEach(card => {
            card.classList.remove('approved', 'blocked');
        });

        // Iterar sobre todos los ramos para aplicar las clases correctas
        // Se hace en dos pasadas para asegurar que los requisitos se evalúen correctamente
        // una vez que todos los 'approved' están marcados.

        // Primera pasada: marcar todos los aprobados
        for (const semesterKey in semesters) {
            semesters[semesterKey].forEach(course => {
                const courseElement = document.getElementById(course.id);
                if (courseElement) {
                    if (isCourseApproved(course.id)) {
                        courseElement.classList.add('approved');
                    }
                }
            });
        }

        // Segunda pasada: marcar los bloqueados (después de que los aprobados ya estén visiblemente marcados)
        for (const semesterKey in semesters) {
            semesters[semesterKey].forEach(course => {
                const courseElement = document.getElementById(course.id);
                if (courseElement && !isCourseApproved(course.id)) {
                    const requirementsStatus = areRequirementsMet(course);
                    if (requirementsStatus !== true) {
                        courseElement.classList.add('blocked');
                    }
                }
            });
        }
    };


    // Función para renderizar la malla
    const renderMalla = () => {
        mallaCurricularDiv.innerHTML = ''; // Limpiar cualquier contenido previo

        for (const semesterTitle in semesters) {
            const semesterColumn = document.createElement('div');
            semesterColumn.classList.add('semester-column');

            const titleElement = document.createElement('h2');
            titleElement.classList.add('semester-title');
            titleElement.textContent = semesterTitle;
            semesterColumn.appendChild(titleElement);

            semesters[semesterTitle].forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');
                courseCard.setAttribute('data-course-id', course.id);
                courseCard.textContent = course.name;
                courseCard.id = course.id; // Asignar un ID único al elemento HTML

                // Adjuntar el evento de clic
                courseCard.addEventListener('click', () => {
                    // Si el ramo ya está aprobado, no se puede desaprobar (comportamiento actual)
                    if (courseCard.classList.contains('approved')) {
                        return;
                    }

                    const requirementsStatus = areRequirementsMet(course);
                    if (requirementsStatus === true) {
                        approvedCourses[course.id] = true;
                        localStorage.setItem('approvedCourses', JSON.stringify(approvedCourses));
                        updateCourseStates(); // Actualizar el estado de todos los ramos
                    } else {
                        const missingNames = requirementsStatus.join(', ');
                        showModal(`Para aprobar "${course.name}", primero debes aprobar: ${missingNames}.`);
                    }
                });
                semesterColumn.appendChild(courseCard);
            });
            mallaCurricularDiv.appendChild(semesterColumn);
        }
        updateCourseStates(); // Actualizar estados iniciales después de renderizar
    };

    // Inicializar la malla al cargar la página
    renderMalla();
});
