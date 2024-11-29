const API_URL = "http://localhost:3000/api/slaves";

// v Obtener todos los productos v //
export const getAllSlaves = async () => {
    const response = await fetch(API_URL)
    return response.json();
};

// v Obtener un esclavo por ID v //
export const getSlaveByID = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    return response.json();
};

// v Crear un esclavo v //
export const createSlave = async (Product) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Product)
    });
    return response.json();
};

// v Actualizar el esclavo v //
export const updateSlave = async (id, Product) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Product)
    });
    return response.json();
};

// v Borrar un esclavo v //
export const deleteSlave = async (id) => {
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
};