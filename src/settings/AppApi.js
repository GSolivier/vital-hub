import axios from 'axios';
import { AppStorage, AppStorageKeys } from './AppStorage';
import { AppToast } from '../components/AppToast';
import t from '../locale';
import AppLocalizations from './AppLocalizations';

const apiPort = '4466';

//const ip = '172.16.39.113'; /* Gui */
const ip = '172.16.39.113'; /* Everton */

//const ip = '192.168.0.4';

const BASE_URL_LOCAL = `http://${ip}:${apiPort}/api`;

export const LoginPath = '/Login'
export const MedicoPath = '/Medicos'
export const GetMedicoByIdClinicPath = '/Medicos/BuscarPorIdClinica'
export const GetMedicoAppointmentPath = `${MedicoPath}/BuscarPorData`
export const GetMedicoByIdPath = `${MedicoPath}/BuscarPorId`
export const GetClinicPath = '/Clinica/ListarTodas'
export const GetClinicByCityPath = '/Clinica/BuscarPorCidade'

export const PatientPath = '/Pacientes'
export const GetPatientByIdPath = `${PatientPath}/BuscarPorId`
export const AppointmentPath = '/Consultas'
export const PutAppointment = '/Consultas/Prontuario'
export const AppointmentInsertPath = '/Consultas/Cadastrar'
export const GetPatientAppointmentPath = `${PatientPath}/BuscarPorData`
export const PostAppointmentPath = `${AppointmentPath}/Cadastrar`

export const GetUserById = `/Usuario/BuscarPorID`

export const apiViaCep = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})

const api = axios.create({

  baseURL: BASE_URL_LOCAL,
  timeout: 10000
});

export function handleApiErrors(error) {
  console.log('====================================');
  console.log(error);
  console.log('====================================');
  if (error.request) {
    if (error.request.response == "Email ou senha inválidos!") {
      AppToast.showErrorToast(
        t(AppLocalizations.emailOrPasswordIncorrect),
      );
    } else {
      AppToast.showErrorToast(
        error.request.response,
      );
    }
  } else if (error.response) {

    AppToast.showErrorToast(
      error.response.data.message,
    );

  } else {
    AppToast.showErrorToast(
     t(AppLocalizations.unknownError),
    );
  }
}

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
