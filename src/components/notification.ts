let notificationCount = 0;
const maxNotifications = 1;
const activeNotifications: number[] = [];

export function showNotification(message: string, type: 'info' | 'success' | 'error' = 'info') {
    notificationCount++;
    activeNotifications.push(notificationCount);

    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.classList.add('notification-container');
        document.body.appendChild(container);
    }

    if (container.childElementCount >= maxNotifications) {
        const firstChild = container.firstElementChild;
        if (firstChild) {
            const firstNotificationNumber = activeNotifications.shift();
            if (firstNotificationNumber !== undefined) {
                firstChild.classList.add('fade-out');
                firstChild.addEventListener('animationend', () => {
                    firstChild.remove();
                });
            }
        }
    }

    const notificationBox = document.createElement('div');
    notificationBox.classList.add('notification-box', type);

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    const notificationIcon = document.createElement('span');
    notificationIcon.classList.add('notification-icon', 'fas', 'fa-bell');
    iconContainer.appendChild(notificationIcon);

    const countElement = document.createElement('span');
    countElement.classList.add('notification-count');
    countElement.textContent = `${notificationCount}`;
    iconContainer.appendChild(countElement);

    const notificationMessage = document.createElement('div');
    notificationMessage.classList.add('notification-message');
    notificationMessage.innerHTML = message;

    notificationBox.appendChild(iconContainer);
    notificationBox.appendChild(notificationMessage);
    
    container.appendChild(notificationBox);

    setTimeout(() => {
        notificationBox.classList.add('fade-out');
        notificationBox.addEventListener('animationend', () => {
            notificationBox.remove();
            activeNotifications.shift();
        });
    }, 5000);

    return notificationBox;
}