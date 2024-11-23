$(document).ready(function () {
    $('#toggle-open-menu').click(function () {
        $('#sidebar-container').animate({
            left: '0'
        })
    })

    $('#toggle-close-menu, #dashboard, #sidebar-submenu').click(function () {
        $('#sidebar-container').animate({
            left: '100%'
        })
    })
})