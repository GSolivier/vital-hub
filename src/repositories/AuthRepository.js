import apiClient, { LoginPath, _post } from "../settings/AppApi";
import { AppStorage } from "../settings/AppStorage";
import { RouteKeys, push } from "../settings/routes/RouteActions";


export async function login(email, senha) {

    const response = await apiClient.post(LoginPath, {email:email, senha: senha})


    return response.data.token
}

export async function Logout(navigation) {
    const response = AppStorage.clear(AppStorage.token)

    push(navigation, RouteKeys.loginScreen, true)
}
