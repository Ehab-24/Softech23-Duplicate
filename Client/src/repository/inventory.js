import { appAPI } from ".";

export async function getInventoryItems(limit = 20, page = 1) {
    try {
        const response = await appAPI.get('/inventory', {
            params: { limit, page }
        });
        return response.data;
    }
    catch (error) {
        console.warn(error);
        return null;
    }
}

export async function getInventoryItemById(id) {
    try {
        const response = await appAPI.get(`/inventory/${id}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function createInventoryItem(item) {
    try {
        const response = await appAPI.post('/inventory', [item]);
        return response;
    }
    catch(error) {
        console.warn(error);
        return null;
    }
}

export async function updateInventoryItem(item) {
    try {
        const response = await appAPI.patch(`/inventory/${item.id}`, [item]);
        return response;
    }
    catch(error) {
        console.warn(error);
        return null;
    }
}