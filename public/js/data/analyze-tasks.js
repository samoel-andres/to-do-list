import { fetchTaskData } from "./load-tasks.js"

document.addEventListener('DOMContentLoaded', () => {
    const onc = document.getElementById('onc')
    const uns = document.getElementById('uns')
    const com = document.getElementById('com')

    /**
     * Sets values to the specified HTML elements.
     * @param {HTMLElement} onc - The element to set the "in progress" value.
     * @param {HTMLElement} uns - The element to set the "not started" value.
     * @param {HTMLElement} com - The element to set the "completed" value.
     * @returns {Promise<void>}
     */
    async function loadData(onc, uns, com) {
        const data = await analyzeTasks()

        onc.innerText = data.course || 0
        uns.innerText = data.uncompleted || 0
        com.innerText = data.completed || 0
    }

    loadData(onc, uns, com)
})

/**
 * Retrieves the task list and counts the elements based on their status.
 * @returns {Promise<Object>} An object containing the task statistics, including counts for "in progress", "not started", "completed" tasks.
 */
async function analyzeTasks() {
    const data = await fetchTaskData()
    if (!data) return { course: 0, uncompleted: 0, completed: 0 }

    const tasks = {
        course: 0,
        uncompleted: 0,
        completed: 0,
    }

    data.forEach(task => {
        const doneCount = task.list.filter(subtask => subtask.done).length
        const totalCount = task.list.length

        if (doneCount === totalCount) {
            tasks.completed++
        } else if (doneCount > 0) {
            tasks.course++
        } else {
            tasks.uncompleted++
        }
    })

    return tasks
}