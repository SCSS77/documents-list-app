const apiBase = import.meta.env.VITE_API_BASE;

export const fetchDocuments = async (): Promise<any[]> => {
  const response = await fetch(`${apiBase}/documents`);
  return response.json();
};