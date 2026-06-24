const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async ({category = "",cursor = "",}) => 
    {
        const params = new URLSearchParams();
        if (category) { 
            params.append("category",category);
        }
        if (cursor) {
            params.append("cursor",cursor);
        }
        
        const response = await fetch(`${API_URL}?${params.toString()}`);
        return response.json();
    };

export const createProduct = async (productData) => 
    {
        const response = 
        await fetch(`${API_URL}/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(productData)
            });
            return response.json();
    };