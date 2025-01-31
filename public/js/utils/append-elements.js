document.addEventListener('DOMContentLoaded', () => {
    const addSubtaskField = document.getElementById('add-sub-task-new-modal')
    const addSubTaskFieldUpdating = document.getElementById('add-sub-task-update-modal')

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
            const nIncremented = n++
            // Configuration object with the required structure
            const objectConfig = {
                element: {
                    element: 'div',
                    class: 'col-12 mt h-between v-center mb',
                    id: `${prefix}-${nIncremented}`,
                    dataAttributes: { input: `${prefix}-${nIncremented}` },
                    children: [
                        {
                            element: 'div',
                            class: 'col-8 display-flex v-center h-center',
                            children: [
                                {
                                    element: 'input',
                                    class: 'border-radius-2 p',
                                    type: 'text',
                                    id: `${prefix}-${nIncremented}`,
                                    name: `${prefix}-${nIncremented}`,
                                    placeholder: 'Tarea',
                                    required: true
                                }
                            ]
                        },
                        {
                            element: 'div',
                            class: 'col-2 display-flex v-center h-center mt',
                            children: [
                                {
                                    element: 'select',
                                    class: 'border-radius-2 p',
                                    name: `${prefix}-sel-${nIncremented}`,
                                    id: `${prefix}-sel-${nIncremented}`,
                                    children: [
                                        {
                                            element: 'option',
                                            value: 'false',
                                            text: 'Pendiente',
                                        },
                                        {
                                            element: 'option',
                                            value: 'true',
                                            text: 'Realizada',
                                        }
                                    ]
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
                                    dataAttributes: { id: `${prefix}-${nIncremented}` },
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
    if (addSubTaskFieldUpdating) addDynamicField(addSubTaskFieldUpdating, 'update-input-group-new', 'dinamicFieldsUpdateModal')
})

/**
 * Creates an HTML element based on a configuration object.
 * @param {Object} config - The configuration object with the required structure.
 * @returns {HTMLElement} The created HTML element.
 */
export function createElement(config) {
    const element = document.createElement(config.element)

    // Add the specified attribute to the created element
    if (config.class) element.className = config.class
    if (config.id) element.id = config.id
    if (config.type) element.type = config.type
    if (config.name) element.name = config.name
    if (config.placeholder) element.placeholder = config.placeholder
    if (config.required) element.required = config.required
    if (config.text) element.innerText = config.text
    if (config.value) element.value = config.value
    if (config.off) element.disabled = config.off
    if (config.for) element.htmlFor = config.for
    if (config.checked) element.checked = config.checked
    if (config.rows) element.rows = config.rows
    if (config.cols) element.cols = config.cols
    if (config.xmlns) element.xmlns = config.xmlns
    if (config.width) element.width = config.width
    if (config.height) element.height = config.height
    if (config.fill) element.fill = config.fill
    if (config.viewBox) element.viewBox = config.viewBox
    if (config.d) element.d = config.d
    if (config.action) element.action = config.action
    if (config.method) element.method = config.method

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
export function appendElement(objectConfig, parentId) {
    const parent = document.getElementById(parentId)
    const elementCreated = createElement(objectConfig)
    if (parent && elementCreated) {
        parent.appendChild(elementCreated)
    }
}