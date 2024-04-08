import axios from 'axios';
import { AppStorage, AppStorageKeys } from './AppStorage';

const apiPort = '4466';

// const ip = '192.168.19.137';

const ip = '192.168.0.4';

const BASE_URL_LOCAL = `http://${ip}:${apiPort}/api`;

export const LoginPath = '/Login'
export const MedicoPath = '/Medicos'
export const GetMedicoAppointmentPath = `${MedicoPath}/BuscarPorData`
export const GetClinicPath = '/Clinica/ListarTodas'

export const PatientPath = '/Pacientes'
export const GetPatientByIdPath = `${PatientPath}/BuscarPorId`
export const AppointmentPath = '/Consultas'
export const GetPatientAppointmentPath = `${PatientPath}/BuscarPorData`
export const PostAppointmentPath = `${AppointmentPath}/Cadastrar`

const api = axios.create({

  baseURL: BASE_URL_LOCAL,
  timeout: 10000
});

api.interceptors.request.use(async (config) => {
  const token = await AppStorage.read(AppStorageKeys.token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},
(error) => Promise.reject(error)
)

export default api;
