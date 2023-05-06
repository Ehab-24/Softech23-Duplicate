import { appAPI } from ".";

export async function getInventoryItems(limit = 20, page = 1) {
    try {
        const response = await appAPI.get('/item', {
            params: { limit, page }
        });
        console.log('axios', response.data.items);
        return response.data.items;
    }
    catch (error) {
        console.warn(error);
        return null;
    }
}

export async function getInventoryItemById(id) {
    try {
        const response = await appAPI.get(`/item/${id}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function createInventoryItem(item) {
    try {
        const response = await appAPI.post('/item', item);
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

export async function deleteInventoryItem(item) {
    try {
        const response = await appAPI.delete(`/inventory/${item.id}`);
        return response;
    }
    catch(error) {
        console.warn(error);
        return null;
    }
}