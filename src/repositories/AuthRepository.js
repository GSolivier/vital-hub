import apiClient, { LoginPath, _post } from "../settings/AppApi";


export async function login(email, senha) {

    const response = await apiClient.post(LoginPath, {email:email, senha: senha})


    return response.data.token
}
