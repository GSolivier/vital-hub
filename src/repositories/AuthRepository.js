import { jwtDecode } from "jwt-decode";
import apiClient, { LoginPath, _post } from "../settings/AppApi";
import { AppStorage } from "../settings/AppStorage";
import { decode, encode } from 'base-64'

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export async function tokenDecode(){

    const token = await AppStorage.read(AppStorage.token)

    if (token === null) {
        return;
    }

    const decoded = jwtDecode(token)

    return {
        email: decoded.name,
        name: decoded.email,
        id: decoded.jti,
        role: decoded.role
    }
}


export async function login(email, senha) {

    const response = await apiClient.post(LoginPath, { email: email, senha: senha })

    console.log(response);
    return response.data.token
}


