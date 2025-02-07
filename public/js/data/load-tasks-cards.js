import { fetchTaskData } from "./load-tasks.js"
import { appendElement } from "../utils/append-elements.js"

document.addEventListener('DOMContentLoaded', load())

/**
 * Retrieves task data and generates the corresponding cards in the UI.
 * @returns {void}
 */
export async function load() {
    const data = await fetchTaskData()
    if (!data) return

    const tasks = {
        course: [],
        uncompleted: [],
        completed: [],
    }

    data.forEach(task => {
        const doneCount = task.list.filter(subtask => subtask.done).length
        const totalCount = task.list.length

        if (doneCount === totalCount) {
            tasks.completed.push(task)
        } else if (doneCount > 0) {
            tasks.course.push(task)
        } else {
            tasks.uncompleted.push(task)
        }
    })

    renderTasks(tasks.course, 'course-cards')
    renderTasks(tasks.uncompleted, 'uncompleted-cards')
    renderTasks(tasks.completed, 'completed-cards')
}

/**
 * Renders task cards inside a specified container.
 * @param {Array<Object>} data - An array containing the task data, including subtasks.
 * @param {String} containerId - The ID of the container where the cards will be rendered.
 * @returns {void}
 */
function renderTasks(data, containerId) {
    const configurationObjects = prepareconfigurationObjectCards(data)
    configurationObjects.forEach(configurationObject => {
        appendElement(configurationObject.element, containerId)
    })
}

/**
 * Creates and returns an array of configuration objects based on the provided data.
 * @param {Array<Object>} data - An array containing information retrived from the database.
 * @returns {Array<Object>} An array containing the configuration objects generated from the provided data.
 */
function prepareconfigurationObjectCards(data) {
    return data.map(item => ({
        element: {
            element: 'div',
            class: 'card p m border border-radius bg-gradient',
            id: 'card',
            children: [
                {
                    element: 'form',
                    id: 'card-form-update-task',
                    name: 'card-form-update-task',
                    dataAttributes: { clasification: item.clasification },
                    children: [
                        {
                            element: 'div',
                            class: 'col-12',
                            id: 'card-header',
                            children: [
                                {
                                    element: 'h3',
                                    text: item.title,
                                }
                            ]
                        },
                        {
                            element: 'div',
                            class: 'col-12 column',
                            id: 'card-body',
                            children: prepareConfigurationSubtaskList(item.list),
                        },
                        {
                            element: 'div',
                            class: 'col-12 mt-2 mb-2',
                            id: 'card-footer',
                            children: [
                                {
                                    element: 'div',
                                    class: 'row h-between',
                                    children: [
                                        {
                                            element: 'div',
                                            class: 'col-11 mt mb',
                                            children: [
                                                {
                                                    element: 'textarea',
                                                    class: 'border-radius-2 p input-field',
                                                    rows: 2,
                                                    cols: 20,
                                                    id: 'observation',
                                                    name: 'observation',
                                                    placeholder: 'Observación',
                                                    value: item.observation,
                                                    required: false
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    element: 'div',
                                    class: 'col-2 mt mb',
                                    children: [
                                        {
                                            element: 'button',
                                            class: 'border-radius-2 p v-center h-center',
                                            name: 'update-card',
                                            dataAttributes: { id: item._id },
                                            children: [
                                                {
                                                    element: 'svg',
                                                    xmlns: 'http://www.w3.org/2000/svg',
                                                    width: 25,
                                                    height: 25,
                                                    fill: 'currentColor',
                                                    class: 'bi bi-send',
                                                    viewBox: '0 0 16 16',
                                                    children: [
                                                        {
                                                            element: 'path',
                                                            d: 'M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z',
                                                        }
                                                    ]
                                                },
                                                {
                                                    element: 'span',
                                                    class: 'ps-1',
                                                    text: 'Enviar',
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }))
}

/**
 * Creates and returns an array of configuration objects based on the provided ssubtask data.
 * @param {Array<Object>} list - An array containing information the subtask information from a task.
 * @returns {Array<Object>} An array containing the configuration objects generated from the provided subtask data.
 */
function prepareConfigurationSubtaskList(list) {
    return list.map(item => ({
        element: 'div',
        class: 'col-12 item pt pb v-start',
        id: 'input-group',
        children: [
            {
                element: 'input',
                type: 'checkbox',
                id: `item-${item._id}`,
                name: `item-${item._id}`,
                checked: item.done,
            },
            {
                class: 'ms',
                element: 'label',
                for: `item-${item._id}`,
                text: item.task,
            }
        ]
    }))
}