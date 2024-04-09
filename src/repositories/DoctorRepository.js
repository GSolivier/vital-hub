import api, { GetMedicoAppointmentPath, GetMedicoByIdPath, MedicoPath } from "../settings/AppApi";

export const DoctorRepository = {
  getDoctorById: getDoctorById,
  getDoctors: getDoctors,
  getDoctorAppointments: getDoctorAppointments
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