import api from "./axios"

export const loginUser = async(email : string,password:string) => {
    try {
        const response = await api.post("/auth/login", {
            email,
            password
        })
        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

export const logoutUser = async() => {
    return await api.post("/auth/logout");
}

