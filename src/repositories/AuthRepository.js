import { jwtDecode } from "jwt-decode";
import api, { LoginPath, _post, handleApiErrors } from "../settings/AppApi";
import { AppStorage, AppStorageKeys } from "../settings/AppStorage";
import { AppNavigation, RouteKeys, } from "../settings/routes/RouteActions";
import { decode, encode } from 'base-64'
import { AppToast } from '../components/AppToast'
import { UserRepository } from "./UserRepository";
import t from "../locale";
import AppLocalizations from "../settings/AppLocalizations";
if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export const AuthRepository = {
    tokenDecode: tokenDecode,
    login: login,
    logout: Logout
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
        role: decoded.role,
        photo: decoded.photo
    }
}



export async function login(email, senha, navigation, updateUserData) {
    try {
        const response = await api.post(LoginPath, { email: email, senha: senha });
        const data = response.data;
        await AppStorage.write(AppStorageKeys.token, data.token);

        const userData = await tokenDecode();
        const userExtraData = await UserRepository.getUserById(userData.id);

        const completeUserData = {
            ...userData,
            ...userExtraData.data
        };

        await updateUserData(completeUserData); 

        AppNavigation.push(navigation, RouteKeys.tabNavigation, {
            userData: completeUserData
        });

        AppToast.showSucessToast(t(AppLocalizations.loginSucessfuly));
    } catch (error) {
        handleApiErrors(error);
    }
}

export async function Logout(navigation) {
    const response = AppStorage.clear(AppStorageKeys.token)

    AppNavigation.push(navigation, RouteKeys.loginScreen, true)
}

