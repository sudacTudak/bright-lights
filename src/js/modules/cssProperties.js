const body = document.body;
const bodyStyles = window.getComputedStyle(body);
const transitionTime = parseFloat(bodyStyles.getPropertyValue('--transition-time')) * 1000;
const openMenuTime = parseFloat(bodyStyles.getPropertyValue('--open-menu-time')) * 1000;

export { transitionTime, openMenuTime };
