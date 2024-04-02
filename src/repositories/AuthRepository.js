import { jwtDecode } from "jwt-decode";
import api, { LoginPath, _post } from "../settings/AppApi";
import { AppStorage, AppStorageKeys } from "../settings/AppStorage";
import { AppNavigation, RouteKeys, } from "../settings/routes/RouteActions";
import { decode, encode } from 'base-64'
import { ToastAndroid } from "react-native";
import { AppToast } from "../components/AppToast";

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export const AuthRepository = {
    tokenDecode: tokenDecode,
    login: login,
    logout: logout,
}



async function tokenDecode() {

    const token = await AppStorage.read(AppStorageKeys.token)

    if (token === null) {
        return;
    }

    const decoded = jwtDecode(token)

    return {
        email: decoded.email,
        name: decoded.name,
        id: decoded.jti,
        role: decoded.role
    }
}



export async function login(email, senha, navigation) {
    await api.post(LoginPath, { email: email, senha: senha })
        .then(async function (response) {

            const data = response.data

            await AppStorage.write(AppStorageKeys.token, data.token)

            const userData = await tokenDecode();

            console.log('====================================');
            console.log(userData);
            console.log('====================================');

            await AppStorage.write(AppStorageKeys.userData, userData)

            AppNavigation.push(navigation, RouteKeys.tabNavigation, true)

            AppToast.showSucessToast("Login efetuado com sucesso!")
        })
        .catch(function (error) {


            if (error.response) {

                console.log('=================Response Error===================');
                console.log(error.response);
                console.log('====================================');

                AppToast.showErrorToast(error.response.data.message)
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
    const response = AppStorage.clear(AppStorageKeys.token)

    AppNavigation.push(navigation, RouteKeys.loginScreen, true)
}

