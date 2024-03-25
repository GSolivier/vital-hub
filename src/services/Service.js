import axios from "axios";

//declarar a porta da api
const portaApi = '4466'

// declarar o Ip da maquina
const ip =  '192.168.19.137' 

//Definir a base da url de acesso da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//configurar o axios
const api = axios.create({
    baseURL : apiUrlLocal
})

export default api