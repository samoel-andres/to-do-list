import { loadTask } from "../data/load-task-modal.js"
import { removeTaskFromModal } from "./remove-elements.js"

let modal = null
let isAnimating = false
let modals = null
let modalOverlay = null

document.addEventListener('DOMContentLoaded', () => {

    modalOverlay = document.getElementById('modal-overlay')
    modals = ['#new-task-modal', '#edit-task-modal', '#drop-task-modal', '#alert-modal']
    const toggleCloseModal = document.querySelectorAll('[name="close-modal"]')
    const toggleOpenNewTaskModal = document.querySelector('#new-item')
    const parentToggleUpdateModal = document.getElementById('taskList')
    const dinamicFieldContainer = ['#dinamicFieldsNewModal', '#dinamicFieldsUpdateModal']
    const forms = ['#form-new-task-modal', '#form-update-task-modal', '#form-drop-task-modal']

    /**
     * Removes the dynamic fields and resets the form values.
     * @returns {void}
     */
    function cleanFormModal() {
        // Remove the dynamic fields
        dinamicFieldContainer.forEach(containerId => {
            const fieldsContainer = document.querySelector(containerId)
            if (fieldsContainer) {
                while (fieldsContainer.firstChild) {
                    fieldsContainer.removeChild(fieldsContainer.firstChild)
                }
            }
        })

        // Reset the form values
        forms.forEach(formId => {
            const resetForm = document.querySelector(formId)
            if (resetForm) {
                resetForm.reset()
            }
        })
    }

    // Find all elements and add the function to hide the active modal.
    toggleCloseModal.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (modal) {
                modal.classList.remove('active')

                // Animate the modal
                setTimeout(() => {
                    modalOverlay.classList.remove('active')
                    modal = null
                    cleanFormModal()
                    removeTaskFromModal('fields-drop-modal')
                    removeTaskFromModal('fields-update-modal')
                }, 200)
            }
        })
    })

    // Hide the active modal when the overlay is clicked.
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay && modal) {
            modal.classList.remove('active')

            // Animate the modal
            setTimeout(() => {
                modalOverlay.classList.remove('active')
                modal = null
                cleanFormModal()
                removeTaskFromModal('fields-drop-modal')
                removeTaskFromModal('fields-update-modal')
            }, 200)
        }
    })

    // Hide the active modal when the 'ESC' key is pressed.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal) {
            modal.classList.remove('active')

            // Animate the modal
            setTimeout(() => {
                modalOverlay.classList.remove('active')
                modal = null
                cleanFormModal()
                removeTaskFromModal('fields-drop-modal')
                removeTaskFromModal('fields-update-modal')
            }, 200)
        }
    })

    // Open the modal to update or delete an activity.
    parentToggleUpdateModal.addEventListener('click', (event) => {
        const parentElement = event.target.parentNode
        if (parentElement) {
            const id = parentElement.id
            const dataId = parentElement.getAttribute('data-id')
            if (id && dataId) {
                if (id === 'update-item') {
                    loadTask(dataId, 'update-input-group', 'update-title-task', 'update-clasification', 'fields-update-modal', false)
                    showModal('#edit-task-modal')
                } else if (id === 'drop-item') {
                    loadTask(dataId, 'drop-input-group', 'drop-title-task', 'drop-clasification', 'fields-drop-modal', true)
                    showModal('#drop-task-modal')
                }
            }
        }
    })

    // Open the modal to create a new activity.
    if (toggleOpenNewTaskModal) {
        toggleOpenNewTaskModal.addEventListener('click', () => {
            showModal('#new-task-modal')
        })
    }
})

/**
     * Displays the required modal.
     * @param {String} modalSelector - The identifier of the modal to display.
     * @returns {void}
     */
export function showModal(modalSelector) {
    if (isAnimating) return
    isAnimating = true

    // Hide all displayed modals
    modals.forEach(modalId => {
        const modalElement = document.querySelector(modalId)
        if (modalElement) {
            modalElement.style.display = 'none'
            modalElement.classList.remove('active')
        }
    })

    modal = document.querySelector(modalSelector)

    if (modal) {
        modal.style.display = 'flex'
        modalOverlay.classList.add('active')

        // Animate the modal
        setTimeout(() => {
            modal.classList.add('active')
            isAnimating = false
        }, 50)
    }
}