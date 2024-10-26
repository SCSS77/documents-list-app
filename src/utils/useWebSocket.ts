export const useWebSocket = (url: string, onMessage: (data: any) => void): (() => void) => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    return () => {
        socket.close();
    };
};