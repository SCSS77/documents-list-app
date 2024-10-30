import { useWebSocket } from '../../utils/useWebSocket';

describe('useWebSocket', () => {
    let mockWebSocket: {
        send: jest.Mock;
        close: jest.Mock;
        onmessage: (event: MessageEvent) => void;
    };
    let onMessageMock: jest.Mock;

    beforeEach(() => {
        onMessageMock = jest.fn();
        mockWebSocket = {
            send: jest.fn(),
            close: jest.fn(),
            onmessage: jest.fn(),
        };

        (window as any).WebSocket = jest.fn(() => ({
            ...mockWebSocket,
            onmessage: (event: MessageEvent) => {
                if (mockWebSocket.onmessage) {
                    mockWebSocket.onmessage(event);
                }
            },
            readyState: 1,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a WebSocket connection with the specified URL', () => {
        const url = 'ws://localhost:8080/notifications';
        useWebSocket(url, onMessageMock);
        expect((window as any).WebSocket).toHaveBeenCalledWith(url);
    });

    it('should invoke onMessage with parsed data when a message is received', () => {
        const testData = { DocumentTitle: 'Test Document', UserName: 'Test User' };
        const event = { data: JSON.stringify(testData) } as MessageEvent;

        useWebSocket('ws://localhost:8080/notifications', onMessageMock);
        mockWebSocket.onmessage(event);

        expect(onMessageMock).toHaveBeenCalledWith(testData);
    });

    it('should close the WebSocket when cleanup is called', () => {
        const closeWebSocket = useWebSocket('ws://localhost:8080/notifications', onMessageMock);
        closeWebSocket();
        expect(mockWebSocket.close).toHaveBeenCalled();
    });
});