const apiBase = import.meta.env.VITE_API_BASE;

export const fetchDocuments = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${apiBase}/documents`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const documents = await response.json();
    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};