import api, { GetPatientByIdPath } from "../settings/AppApi"

export const PatientRepository = {
    getPatient: getPatient
}

async function getPatient(id) {

    try {

        const response = await api.get(GetPatientByIdPath, {
            params: {
                id: id
            }
        })

        return response;
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}