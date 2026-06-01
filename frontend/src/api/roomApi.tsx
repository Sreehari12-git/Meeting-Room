import api from "./axios"

export const createRoom = async(name:string, status: string, capacity:number, amenities: string[]) => {
    try {
        const response = await api.post("/admin/create-rooms", {
            name,status,capacity,amenities
        });
        return response;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

