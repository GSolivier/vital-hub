import api, { GetMedicoAppointmentPath, GetMedicoByIdPath, MedicoPath, PutAppointment } from "../settings/AppApi";

export const DoctorRepository = {
  getDoctorById: getDoctorById,
  getDoctors: getDoctors,
  getDoctorAppointments: getDoctorAppointments,
  PutAppointmentMedicalRecord: PutAppointmentMedicalRecord
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

async function PutAppointmentMedicalRecord(id, descricao, diagnostico, receita){
  console.log({
    id:id,
    descricao: descricao,
    diagnostico: diagnostico,
    receita: receita
  });
  
  try {
    const response = await api.put(PutAppointment, {
      params: {
        id:id,
        descricao: descricao,
        diagnostico: diagnostico,
        receita: receita
      }
    })

    return response
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
}