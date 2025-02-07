import { clearContainer } from "../utils/remove-elements.js"
import { loadTaskData } from "./load-tasks.js"
import { load } from "./load-tasks-cards.js"
import { loadData } from "./analyze-tasks.js"

let modalTitle
let modalMessage
const containersId = ['taskList', 'onc', 'uns', 'com', 'course-cards', 'uncompleted-cards', 'completed-cards']

document.addEventListener('DOMContentLoaded', () => {
    modalTitle = document.getElementById('title-alert-modal')
    modalMessage = document.getElementById('message-alert-modal')
})

/**
 * Reloads the data.
 * Fetches and updates the data in the application.
 * @returns {void}
 */
export function reload() {
    if (!modalTitle || !modalMessage) return

    containersId.forEach(containerId => {
        clearContainer(containerId)
    })

    // Reload table data
    loadTaskData(modalTitle, modalMessage)

    // Reload cards
    load()

    // Reload statistics
    loadData()
}