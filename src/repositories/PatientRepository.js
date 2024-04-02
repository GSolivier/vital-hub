import api, { AppointmentPath, GetPatientAppointmentPath, GetPatientByIdPath } from "../settings/AppApi"

export const PatientRepository = {
    getPatient: getPatient,
    getPatientAppointments: getPatientAppointments
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

async function getPatientAppointments(id, data) {
    try {
        const response = await api.get(GetPatientAppointmentPath, {
            params: {
                id: id,
                data: data
            }
        })

        return response
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}