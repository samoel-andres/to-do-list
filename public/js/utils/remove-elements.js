document.addEventListener('DOMContentLoaded', () => {
    const parentContainerTasksNewModal = document.getElementById('dinamicFieldsNewModal')
    const parentContainerTasksUpdateModal = document.getElementById('container-fields-update-modal')

    // Function to remove an element
    function removeElement(element) {
        const removeElement = document.querySelector(`[data-input=${element}]`)
        if (removeElement) {
            removeElement.remove()
        }
    }

    // Use event delegation
    parentContainerTasksNewModal.addEventListener('click', (event) => {
        const id = event.target.parentNode?.id
        const dropElementDataInput = event.target.closest('[data-input]').dataset.input
        if (dropElementDataInput && id === 'remove-sub-task') {
            removeElement(dropElementDataInput)
        }
    })

    // Use event delegation
    parentContainerTasksUpdateModal.addEventListener('click', (event) => {
        const id = event.target.parentNode?.id
        const dropElementDataInput = event.target.closest('[data-input]').dataset.input
        if (dropElementDataInput && id === 'remove-sub-task') {
            removeElement(dropElementDataInput)
        }
    })
})

/**
 * Removes the subtask list from the modals.
 * @param {String} fieldsContainerId - The ID of the container holding the fields to be removed.
 * @returns {void}
 */
export function removeTaskFromModal(fieldsContainerId) {
    if (fieldsContainerId) {
        const fields = document.getElementById(fieldsContainerId)
        if (fields) {
            while (fields.firstChild) {
                fields.removeChild(fields.firstChild)
            }
        }
    }
}
