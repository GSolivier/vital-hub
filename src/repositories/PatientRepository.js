import api, { AppointmentPath, GetPatientAppointmentPath, GetPatientByIdPath, PatientPath } from "../settings/AppApi"

export const PatientRepository = {
    getPatient: getPatient,
    getPatientAppointments: getPatientAppointments,
    putProfilePatient: putProfilePatient
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

async function putProfilePatient(dataNascimento, logradouro, numero, cep, cidade,id) {

  
        const response = await api.put(`${PatientPath}?idUsuario=${id}`, {
            dataNascimento: dataNascimento,
            logradouro: logradouro,
            numero: numero,
            cep: cep,
            cidade: cidade,
            
        }).then( response => console.log(response)).catch(error => console.log(error.request))

        return response
    } 
        
    
    
