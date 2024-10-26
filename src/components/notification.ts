export function showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): HTMLElement {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);

    return notification;
}