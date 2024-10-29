const apiBase = import.meta.env.VITE_API_BASE;

export const fetchDocuments = async (): Promise<any[]> => {
    const response = await fetch(`${apiBase}/documents`);
    return response.json();
};

const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

export const useWebSocket = (url: string, onMessage: (data: any) => void): (() => void) => {
    const socket = new WebSocket(url);

    const debouncedOnMessage = debounce((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    }, 500); // Ajusta el tiempo de debounce según tus necesidades

    socket.onmessage = debouncedOnMessage;

    return () => {
        socket.close();
    };
};