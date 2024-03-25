import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {decode, encode} from "base-64";

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

//funcao de decodificar o token
export const userDecodeToken = async () => {

    //capturar token
    const token = await AsyncStorage.getItem('token');

    if (token === null) {
        console.log("teste");
        return null;
    }

    //descriptografando
    const decoded = jwtDecode(token)

    return{
        role: decoded.role,
        name: decoded.name,
        email: decoded.email,
        jti: decoded.jti
    }
}