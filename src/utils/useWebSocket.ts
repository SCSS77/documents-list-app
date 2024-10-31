const apiBase = import.meta.env.VITE_API_BASE;

export const fetchDocuments = async (): Promise<any[]> => {
    const response = await fetch(`${apiBase}/documents`);
    return response.json();
};

export const debounce = (func: Function, delay: number) => {
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

export const useWebSocket = (url: string, onMessage: (data: any) => void, debounceDelay: number = 500): (() => void) => {
    const socket = new WebSocket(url);

    const debouncedOnMessage = debounce((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    }, debounceDelay);

    socket.onmessage = debouncedOnMessage;

    return () => {
        socket.close();
    };
};