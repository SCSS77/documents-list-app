// notification.ts
class Notification {
    private notificationCount: number = 0;
    private readonly maxNotifications: number;
    private activeNotifications: number[] = [];
    private container: HTMLElement;

    constructor(maxNotifications = 1) {
        this.maxNotifications = maxNotifications;
        this.container = this.getOrCreateContainer();
    }

    private getOrCreateContainer(): HTMLElement {
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.classList.add('notification-container');
            document.body.appendChild(container);
        }
        return container as HTMLElement;
    }

    private removeFirstNotification(): void {
        if (this.container.childElementCount >= this.maxNotifications) {
            const firstChild = this.container.firstElementChild;
            if (firstChild) {
                firstChild.classList.add('fade-out');
                firstChild.addEventListener('animationend', () => firstChild.remove());
                this.activeNotifications.shift();
            }
        }
    }

    private createNotificationBox(message: string, type: 'info' | 'success' | 'error'): HTMLElement {
        const notificationBox = document.createElement('div');
        notificationBox.classList.add('notification-box', type);

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container');

        const notificationIcon = document.createElement('span');
        notificationIcon.classList.add('notification-icon', 'fas', 'fa-bell');
        iconContainer.appendChild(notificationIcon);

        const countElement = document.createElement('span');
        countElement.classList.add('notification-count');
        countElement.textContent = `${this.notificationCount}`;
        iconContainer.appendChild(countElement);

        const notificationMessage = document.createElement('div');
        notificationMessage.classList.add('notification-message');
        notificationMessage.innerHTML = message;

        notificationBox.appendChild(iconContainer);
        notificationBox.appendChild(notificationMessage);

        return notificationBox;
    }

    public showNotification(message: string, type: 'info' | 'success' | 'error' = 'info'): HTMLElement {
        this.notificationCount++;
        this.activeNotifications.push(this.notificationCount);

        this.removeFirstNotification();

        const notificationBox = this.createNotificationBox(message, type);
        this.container.appendChild(notificationBox);

        setTimeout(() => {
            notificationBox.classList.add('fade-out');
            notificationBox.addEventListener('animationend', () => {
                notificationBox.remove();
                this.activeNotifications.shift();
            });
        }, 5000);

        return notificationBox;
    }
}

const notificationInstance = new Notification();
export const showNotification = notificationInstance.showNotification.bind(notificationInstance);