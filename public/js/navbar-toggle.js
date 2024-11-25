$(document).ready(function () {
    var $sidebarContainer = $('#sidebar-container')
    var $toggleOpenMenu = $('#toggle-open-menu')
    var $toggleCloseMenu = $('#toggle-close-menu')
    var $dashboard = $('#dashboard')
    var $sidebarSubMenu = $('#sidebar-submenu')

    $toggleOpenMenu.click(function () {
        $sidebarContainer.addClass('open')
    })

    $toggleCloseMenu.add($dashboard).add($sidebarSubMenu).click(function () {
        $sidebarContainer.removeClass('open')
    })
})