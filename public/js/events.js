document.addEventListener('DOMContentLoaded', () => {
    const buttonTheme = ['light', 'dark', 'auto']

    buttonTheme.forEach(buttonId => {
        const button = document.getElementById(buttonId)

        if (buttonId) {
            button.addEventListener('click', () => changeTheme(button))
        }
    })
})