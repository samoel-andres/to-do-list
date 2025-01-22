document.addEventListener('DOMContentLoaded', () => {
    const parentContainerTasksNewModal = document.getElementById('dinamicFieldsNewModal')
    const parentContainerTasksUpdateModal = document.getElementById('dinamicFieldsUpdateModal')

    // Function to remove an element
    function removeElement(element) {
        const removeElement = document.querySelector(`[data-input=${element}]`)
        if (removeElement) {
            removeElement.remove()
        }
    }

    // Use event delegation
    parentContainerTasksNewModal.addEventListener('click', (event) => {
        const id = event.target.parentNode?.dataset?.id
        if (id) {
            removeElement(id)
        }
    })

    // Use event delegation
    parentContainerTasksUpdateModal.addEventListener('click', (event) => {
        const id = event.target.parentNode?.dataset?.id
        if (id) {
            removeElement(id)
        }
    })
})