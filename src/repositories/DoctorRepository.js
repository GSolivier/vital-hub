import apiClient, { MedicoPath } from "../settings/AppApi";


export async function getDoctors(){

    var data = {};

    apiClient.get(MedicoPath)
        .then( response => data = response.data )
        .catch( error => {
            console.log(error);
        })

    return data;
}