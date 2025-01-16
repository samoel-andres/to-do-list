document.addEventListener('DOMContentLoaded', () => {
    const addSubtaskField = document.getElementById('add-sub-task-new-modal')
    const addSubTaskFieldUpdating = document.getElementById('add-sub-task-update-modal')

    /**
     * Creates an HTML element based on a configuration object.
     * @param {Object} config - The configuration object with the required structure.
     * @returns {HTMLElement} The created HTML element.
     */
    function createElement(config) {
        const element = document.createElement(config.element)

        // Add the specified attribute to the created element
        if (config.class) element.className = config.class
        if (config.id) element.id = config.id
        if (config.type) element.type = config.type
        if (config.name) element.name = config.name
        if (config.placeholder) element.placeholder = config.placeholder
        if (config.required) element.required = config.required

        if (config.dataAttributes) {
            for (const [key, value] of Object.entries(config.dataAttributes)) {
                element.dataset[key] = value
            }
        }

        // If the element has children, they are recursively created
        if (config.children && Array.isArray(config.children)) {
            config.children.forEach(childConfig => {
                const childElement = createElement(childConfig)
                element.appendChild(childElement)
            })
        }

        return element
    }

    /**
     * Adds an element to the DOM.
     * @param {Object} objectConfig - The configuration object with the required structure.
     * @param {String} parentId - The identifier of the parent element where the created element will be added.
     * @returns {void}
     */
    function appendElement(objectConfig, parentId) {
        const parent = document.getElementById(parentId)
        const elementCreated = createElement(objectConfig)
        if (parent && elementCreated) {
            parent.appendChild(elementCreated)
        }
    }

    /**
     * Adds a dynamic field to the spcified container when the button is clicked.
     * @param {HTMLElement} button - The button to trigger the action.
     * @param {String} prefix - The prefix for unique field identifiers.
     * @param {String} parentId - The ID of the parent container.
     * @returns {void}
     */
    function addDynamicField(button, prefix, parentId) {
        let n = 0
        button.addEventListener('click', () => {
            const value = `${prefix}-${n++}`
            // Configuration object with the required structure
            const objectConfig = {
                element: {
                    element: 'div',
                    class: 'col-12 mt mb h-between v-center',
                    id: value,
                    dataAttributes: { input: value },
                    children: [
                        {
                            element: 'div',
                            class: 'col-10 display-flex v-center h-center',
                            children: [
                                {
                                    element: 'input',
                                    class: 'border-radius-2 p',
                                    type: 'text',
                                    id: 'sub-task',
                                    name: 'sub-task',
                                    placeholder: 'Tarea',
                                    required: true
                                }
                            ]
                        },
                        {
                            element: 'div',
                            class: 'col h-center v-center border border-radius-2',
                            children: [
                                {
                                    element: 'a',
                                    id: 'remove-sub-task',
                                    name: 'remove-sub-task',
                                    dataAttributes: { id: value },
                                    children: [
                                        {
                                            element: 'i',
                                            class: 'bi bi-x-lg fs-2'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            }
            appendElement(objectConfig.element, parentId)
        })
    }

    // Add an HTML element to the DOM when the button is clicked.
    if (addSubtaskField) addDynamicField(addSubtaskField, 'input-group', 'dinamicFieldsNewModal')
    if (addSubTaskFieldUpdating) addDynamicField(addSubTaskFieldUpdating, 'update-input-group', 'dinamicFieldsUpdateModal')
})
