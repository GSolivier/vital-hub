import api, { GetMedicoAppointmentPath, MedicoPath } from "../settings/AppApi";

export const DoctorRepository = {
  getDoctors: getDoctors,
  getDoctorAppointments: getDoctorAppointments
}

async function getDoctors(){

  try {
    const {data: response } = await api.get(MedicoPath)

    return response
  } catch (error) {
    console.log(error);
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