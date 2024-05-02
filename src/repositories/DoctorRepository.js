import api, { GetMedicoAppointmentPath, GetMedicoByIdPath, MedicoPath, PutAppointment } from "../settings/AppApi";

export const DoctorRepository = {
  getDoctorById: getDoctorById,
  getDoctors: getDoctors,
  getDoctorAppointments: getDoctorAppointments,
  PutAppointmentMedicalRecord: PutAppointmentMedicalRecord,
  putProfileDoctor:putProfileDoctor,
}

async function getDoctors() {

  try {
    const { data: response } = await api.get(MedicoPath)

    return response
  } catch (error) {
    console.log(error);
  }

}

async function getDoctorById(id) {
  try {

    const response = await api.get(GetMedicoByIdPath, {
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

async function getDoctorAppointments(id, data) {
  try {
    const response = await api.get(GetMedicoAppointmentPath, {
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

async function PutAppointmentMedicalRecord(id, descricao, diagnostico, medicamento){
   
 
    const response = await api.put(PutAppointment, {
      
        consultaId: id,
        descricao: descricao,
        diagnostico: diagnostico,
        medicamento: medicamento
      
    }).then( response => console.log(response)).catch(error => console.log(error.request.data))
    

    return response
  
}
async function putProfileDoctor(dataNascimento, logradouro, numero, cep, cidade,especialidade) {

  
  const response = await api.put(MedicoPath, {
      especialidade1: especialidade,
      dataNascimento: dataNascimento,
      logradouro: logradouro,
      numero: numero,
      cep: cep,
      cidade: cidade,
      
  }).then( response => console.log(response)).catch(error => console.log(error.request))

  return response
} 