import { appendElement } from "../utils/append-elements.js"
import { fetchTask } from "./load-tasks.js"

/**
 * Retrieves and processes a specific task by its identifier.
 * @param {String} itemId - The identifier of the document to retrieve.
 * @param {String} prefix - The prefix used to create the element ID.
 * @param {String} inputTitleId - The ID of the element for the setting title.
 * @param {String} selectDropClasificationId - The ID of the element to setting the clasification.
 * @param {String} fieldsContainer - The ID of the fields container to add the fields with the values.
 * @param {Boolean} fieldsDisabled - Whether the fields should be disabled (true to disable, false to enable).
 * @returns {void}
 */
export async function loadTask(itemId, prefix, inputTitleId, selectDropClasificationId, fieldsContainer, fieldsDisabled) {
    if (!itemId || !prefix || !inputTitleId || !selectDropClasificationId || !fieldsContainer) return

    const data = await fetchTask(itemId)
    const title = document.getElementById(inputTitleId)
    const clasification = document.getElementById(selectDropClasificationId)
    const fields = document.getElementById(fieldsContainer)

    if (data || title || clasification || fields) {
        title.value = data[0].title
        clasification.value = data[0].clasification

        let objectConfig = []
        const subtasks = data[0].list
        subtasks.forEach((task, index) => {
            objectConfig.push(prepareConfigurationObjectForModal(task, prefix, index, fieldsDisabled))
        })

        objectConfig.forEach(element => {
            appendElement(element, fieldsContainer)
            optionSelected(element.children[1].children[0].id, element.children[1].children[0].value)
        })
    }
}

/**
 * Prepares the configuration object for rendering a subtask.
 * @param {Object} task - The subtask to be displayed.
 * @param {String} prefix - The prefix used as an identifier for the element.
 * @param {Number} index - The index to complement the identifier.
 * @returns {Object} A configuration object for the subtask.
 */
function prepareConfigurationObjectForModal(task, prefix, index, fieldsDisabled) {
    return {
        element: 'div',
        class: 'col-12 mt h-between v-center mb',
        id: `${prefix}-${index}`,
        dataAttributes: { input: `${prefix}-${index}` },
        children: [
            {
                element: 'div',
                class: 'col-8 display-flex v-center h-center',
                children: [
                    {
                        element: 'input',
                        class: 'border-radius-2 p',
                        type: 'text',
                        id: `${prefix}-${index}`,
                        name: `${prefix}-${index}`,
                        value: task.task,
                        placeholder: 'Tarea',
                        required: true,
                        off: fieldsDisabled,
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
                        name: `${prefix}-sel-${index}`,
                        id: `${prefix}-sel-${index}`,
                        value: task.done,
                        off: fieldsDisabled,
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
                        dataAttributes: { id: `${prefix}-${index}` },
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
    }
}

/**
 * Sets the default selected option in a select element based on database value.
 * @param {String} selectId - The ID of the select element.
 * @param {Boolean} selected - The value indicating wich option should be selected.
 * @returns {void}
 */
function optionSelected(selectId, selected) {
    const select = document.getElementById(selectId)
    select.value = String(selected)
}