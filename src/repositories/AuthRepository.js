import { jwtDecode } from "jwt-decode";
import apiClient, { LoginPath, _post } from "../settings/AppApi";
import { AppStorage } from "../settings/AppStorage";
import { RouteKeys, push } from "../settings/routes/RouteActions";
import { decode, encode } from 'base-64'
import { ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";
import { AppToast } from "../components/AppToast";

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export const AuthRepository = {
    tokenDecode : tokenDecode,
    login : login,
    logout: logout
}

async function tokenDecode() {

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



async function login(email, senha, navigation) {
    await apiClient.post(LoginPath, { email: email, senha: senha })
        .then(async function (response) {
            const data = response.data

            await AppStorage.write(AppStorage.token, data.token)

            const userData = await tokenDecode();

            push(navigation, userData.role == "paciente" ? RouteKeys.tabNavigationPatient : RouteKeys.tabNavigationDoctor, true)

        })
        .catch(function (error) {

            if (error.response) {

                console.log('=================Response Error===================');
                console.log(error.response);
                console.log('====================================');

                ToastAndroid.showWithGravity(
                    error.response.data.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            } else {

                console.log('=================Error===================');
                console.log(error);
                console.log('====================================');
                ToastAndroid.showWithGravity(
                    "Ocorreu um erro desconhecido",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }

        })
}

async function logout(navigation) {
    const response = AppStorage.clear(AppStorage.token)

    push(navigation, RouteKeys.loginScreen, true)
}

