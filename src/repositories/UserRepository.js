import api, { GetUserById } from "../settings/AppApi";

export const UserRepository = {
    getUserById: getUserById
}

async function getUserById(id) {
    try {
        const response = await api.get(GetUserById, {
            params: {
                id: id
            }
        })
        return response
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}