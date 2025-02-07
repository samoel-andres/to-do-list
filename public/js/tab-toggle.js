document.addEventListener('DOMContentLoaded', function () {
    const sections = ['#content-dashboard', '#content-on-course', '#content-unstarted', '#content-completed']
    const sidebarShortcuts = ['#go-to-course', '#go-to-unstarted', '#go-to-completed']

    function showSection(section) {
        sections.forEach(id => {
            document.querySelector(id).style.display = 'none'
        })

        document.querySelector(section).style.display = 'block'
        document.querySelector(section).style.opacity = 0

        setTimeout(() => {
            document.querySelector(section).style.opacity = 1
            document.querySelector(section).style.transition = 'opacity 0.5s'
        }, 10)
    }

    sidebarShortcuts.forEach(id => {
        document.querySelector(id).addEventListener('click', function () {
            document.querySelector('.sidebar #activities').checked = true
        })
    })

    document.querySelector('#dashboard').addEventListener('click', function () {
        showSection('#content-dashboard')
    })

    document.querySelector('#btn-course').addEventListener('click', function () {
        showSection('#content-on-course')
    })

    document.querySelector('#go-to-course').addEventListener('click', function () {
        showSection('#content-on-course')
    })

    document.querySelector('#btn-unstarted').addEventListener('click', function () {
        showSection('#content-unstarted')
    })

    document.querySelector('#go-to-unstarted').addEventListener('click', function () {
        showSection('#content-unstarted')
    })

    document.querySelector('#btn-completed').addEventListener('click', function () {
        showSection('#content-completed')
    })

    document.querySelector('#go-to-completed').addEventListener('click', function () {
        showSection('#content-completed')
    })
})
