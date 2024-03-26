import { jwtDecode } from "jwt-decode";
import apiClient, { LoginPath, _post } from "../settings/AppApi";
import { AppStorage } from "../settings/AppStorage";
import { RouteKeys, push } from "../settings/routes/RouteActions";
import { decode, encode } from 'base-64'
import { ToastAndroid } from "react-native";

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export async function tokenDecode() {

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
    await apiClient.post(LoginPath, { email: email, senha: senha })
        .then(async function (response) {
            const data = response.data

            await AppStorage.write(AppStorage.token, data.token)

            const userData = await tokenDecode();
            
            push(navigation, userData.role == "paciente" ? RouteKeys.tabNavigationPatient : RouteKeys.tabNavigationDoctor, true)

        })
        .catch(function (error) {

            if (error.request) {
                ToastAndroid.showWithGravity(
                    "Houve um problema desconhecido. Tente novamente mais tarde",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            } else if (error.response) {

                ToastAndroid.showWithGravity(
                    error.response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            } else {
                ToastAndroid.showWithGravity(
                    "Ocorreu um erro desconhecido",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }

        })
}

export async function Logout(navigation) {
    const response = AppStorage.clear(AppStorage.token)

    push(navigation, RouteKeys.loginScreen, true)
}

