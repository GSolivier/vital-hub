import axios from 'axios';

const apiPort = '4466';


const ip = '192.168.19.137';

//const ip = '172.16.39.113';


const BASE_URL_LOCAL = `http://${ip}:${apiPort}/api`;

export const LoginPath = '/Login'
export const MedicoPath = '/Medicos'
export const GetClinicPath = '/Clinica/ListarTodas'

export const PatientPath = '/Pacientes'
export const GetPatientByIdPath = `${PatientPath}/BuscarPorID`

const api = axios.create({

  baseURL: BASE_URL_LOCAL,
  timeout: 10000
});

export default api;
