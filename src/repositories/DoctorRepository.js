import api, { MedicoPath } from "../settings/AppApi";

export const DoctorRepository = {
  getDoctors: getDoctors
}

async function getDoctors(){

  try {
    const {data: response } = await api.get(MedicoPath)

    return response
  } catch (error) {
    console.log(error);
  }

}