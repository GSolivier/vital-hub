import { HomeCardActionType } from "./AppEnums";

export const DATA = [
    {
        id: '1',
        name: 'Guilherme Sousa',
        age: '22',
        examType: 'Urgente',
        time: '11:00',
        date: '16/02/2024',
        appointmentStatus: HomeCardActionType.carriedOut,
        imagePath: "https://github.com/gsolivier.png",
        email: "guilherme.sousa@example.com"
    },
    {
        id: '2',
        name: 'Guilherme Amorim',
        age: '35',
        examType: 'Rotina',
        time: '09:30',
        date: '17/02/2024',
        appointmentStatus: HomeCardActionType.scheduled,
        imagePath: "https://github.com/G648.png",
        email: "guilherme.amorim@example.com"
    },
    {
        id: '3',
        name: 'Luiz Henrique',
        age: '45',
        examType: 'Emergência',
        time: '14:15',
        date: '18/02/2024',
        appointmentStatus: HomeCardActionType.carriedOut,
        imagePath: "https://github.com/LuizHen527.png",
        email: "luiz.henrique@example.com"
    },
    {
        id: '4',
        name: 'Danilo',
        age: '28',
        examType: 'Agendado',
        time: '10:45',
        date: '19/02/2024',
        appointmentStatus: HomeCardActionType.canceled,
        imagePath: "https://github.com/FofuxoSibov.png",
        email: "danilo@example.com"
    },
    {
        id: '5',
        name: 'Richard Almeida',
        age: '50',
        examType: 'Urgente',
        time: '13:30',
        date: '20/02/2024',
        appointmentStatus: HomeCardActionType.scheduled,
        imagePath: "https://github.com/RichardRichk.png",
        email: "richard.almeida@example.com"
    },
    {
        id: '6',
        name: 'Paulo',
        age: '40',
        examType: 'Rotina',
        time: '08:00',
        date: '21/02/2024',
        appointmentStatus: HomeCardActionType.scheduled,
        imagePath: "https://github.com/MagiLogus.png",
        email: "paulo@example.com"
    },
    {
        id: '7',
        name: 'Eduardo Costa',
        age: '32',
        examType: 'Emergência',
        time: '15:45',
        date: '22/02/2024',
        appointmentStatus: HomeCardActionType.carriedOut,
        imagePath: "https://github.com/eduardocostaprofessor.png",
        email: "eduardo.costa@example.com"
    },
    {
        id: '8',
        name: 'Carlos Augusto Roque',
        age: '25',
        examType: 'Agendado',
        time: '09:15',
        date: '23/02/2024',
        appointmentStatus: HomeCardActionType.canceled,
        imagePath: "https://github.com/Carlos-Augusto-Roque.png",
        email: "carlos.augusto.roque@example.com"
    },
    {
        id: '9',
        name: 'Fernando Gonçalves',
        age: '55',
        examType: 'Urgente',
        time: '12:20',
        date: '24/02/2024',
        appointmentStatus: HomeCardActionType.scheduled,
        imagePath: "https://github.com/gsolivier.png",
        email: "fernando.goncalves@example.com"
    },
    {
        id: '10',
        name: 'Lucas Castro',
        age: '30',
        examType: 'Rotina',
        time: '16:00',
        date: '25/02/2024',
        appointmentStatus: HomeCardActionType.scheduled,
        imagePath: "https://github.com/MagiLogus.png",
        email: "lucas.castro@example.com"
    }
];

export const ClinicListData = [
    {
        id: 1,
        name: 'Clinica dos marajós',
        rating: '4,5',
        local: 'São Paulo, SP',
        schedule: 'Seg-Sex'
    },
    {
        id: 2,
        name: 'Outra Clínica',
        rating: '4,8',
        local: 'Rio de Janeiro, RJ',
        schedule: 'Seg-Sex'
    },
    {
        id: 3,
        name: 'Clínica Central',
        rating: '4,2',
        local: 'Belo Horizonte, MG',
        schedule: 'Seg-Sex'
    },
    {
        id: 4,
        name: 'Clínica Saúde Plena',
        rating: '4,6',
        local: 'Curitiba, PR',
        schedule: 'Seg-Sex'
    },
    {
        id: 5,
        name: 'Clínica da Família',
        rating: '4,3',
        local: 'Brasília, DF',
        schedule: 'Seg-Sex'
    },
    {
        id: 6,
        name: 'Clínica Esperança',
        rating: '4,7',
        local: 'Salvador, BA',
        schedule: 'Seg-Sex'
    },
    {
        id: 7,
        name: 'Clínica Vida Nova',
        rating: '4,4',
        local: 'Fortaleza, CE',
        schedule: 'Seg-Sex'
    },
    {
        id: 8,
        name: 'Clínica Bem Estar',
        rating: '4,9',
        local: 'Recife, PE',
        schedule: 'Seg-Sex'
    },
    {
        id: 9,
        name: 'Clínica Feliz Idade',
        rating: '4,1',
        local: 'Manaus, AM',
        schedule: 'Seg-Sex'
    },
    {
        id: 10,
        name: 'Clínica Ser Saudável',
        rating: '4,8',
        local: 'Porto Alegre, RS',
        schedule: 'Seg-Sex'
    }
];

export const DOCTORS_DATA = [
    {
        id: '1',
        name: 'Dr. Guilherme Oliveira',
        age: '40',
        specialty: 'Cardiologista',
        examType: 'Eletrocardiograma',
        appointmentStatus: HomeCardActionType.carriedOut,
        time: '08:30',
        date: '16/02/2024',
        imagePath: "https://github.com/gsolivier.png",
        email: "guilherme.oliveira@example.com",
        crm: '1234567'
    },
    {
        id: '2',
        name: 'Dra. Ana Santos',
        age: '35',
        specialty: 'Dermatologista',
        examType: 'Exame de Pele',
        appointmentStatus: HomeCardActionType.scheduled,
        time: '09:00',
        date: '17/02/2024',
        imagePath: "https://github.com/ana_santos.png",
        email: "ana.santos@example.com",
        crm: '2345678'
    },
    {
        id: '3',
        name: 'Dr. Luiz Henrique Pereira',
        age: '50',
        specialty: 'Ortopedista',
        examType: 'Raio-X',
        appointmentStatus: HomeCardActionType.scheduled,
        time: '10:30',
        date: '18/02/2024',
        imagePath: "https://github.com/LuizHen527.png",
        email: "luiz.pereira@example.com",
        crm: '3456789'
    },
    {
        id: '4',
        name: 'Dra. Fernanda Costa',
        age: '45',
        specialty: 'Ginecologista',
        examType: 'Ultrassom Obstétrico',
        appointmentStatus: HomeCardActionType.carriedOut,
        time: '11:15',
        date: '19/02/2024',
        imagePath: "https://github.com/fernanda_costa.png",
        email: "fernanda.costa@example.com",
        crm: '4567890'
    },
    {
        id: '5',
        name: 'Dr. Ricardo Almeida',
        age: '55',
        specialty: 'Oftalmologista',
        examType: 'Consulta de Rotina',
        appointmentStatus: HomeCardActionType.carriedOut,
        time: '14:00',
        date: '20/02/2024',
        imagePath: "https://github.com/RichardRichk.png",
        email: "ricardo.almeida@example.com",
        crm: '5678901'
    },
    {
        id: '6',
        name: 'Dra. Juliana Ribeiro',
        age: '38',
        specialty: 'Pediatra',
        examType: 'Consulta Pediátrica',
        appointmentStatus: HomeCardActionType.carriedOut,
        time: '15:45',
        date: '21/02/2024',
        imagePath: "https://github.com/juliana_ribeiro.png",
        email: "juliana.ribeiro@example.com",
        crm: '6789012'
    },
    {
        id: '7',
        name: 'Dr. Marcos Silva',
        age: '42',
        specialty: 'Neurologista',
        examType: 'Ressonância Magnética',
        appointmentStatus: HomeCardActionType.canceled,
        time: '16:30',
        date: '22/02/2024',
        imagePath: "https://github.com/marcos_silva.png",
        email: "marcos.silva@example.com",
        crm: '7890123'
    },
    {
        id: '8',
        name: 'Dra. Camila Oliveira',
        age: '37',
        specialty: 'Endocrinologista',
        examType: 'Dosagem de Hormônios',
        appointmentStatus: HomeCardActionType.canceled,
        time: '09:45',
        date: '23/02/2024',
        imagePath: "https://github.com/camila_oliveira.png",
        email: "camila.oliveira@example.com",
        crm: '8901234'
    },
    {
        id: '9',
        name: 'Dr. Rodrigo Santos',
        age: '48',
        specialty: 'Urologista',
        examType: 'Exame de Próstata',
        appointmentStatus: HomeCardActionType.canceled,
        time: '11:30',
        date: '24/02/2024',
        imagePath: "https://github.com/rodrigo_santos.png",
        email: "rodrigo.santos@example.com",
        crm: '9012345'
    },
    {
        id: '10',
        name: 'Dra. Patrícia Lima',
        age: '41',
        specialty: 'Pneumologista',
        examType: 'Tomografia Pulmonar',
        appointmentStatus: HomeCardActionType.scheduled,
        time: '13:15',
        date: '25/02/2024',
        imagePath: "https://github.com/patricia_lima.png",
        email: "patricia.lima@example.com",
        crm: '0123456'
    }
];

export const USER_LOGGED = {
    id: '1',
    name: 'Guilherme Sousa',
    age: '22',
    examType: 'Urgente',
    time: '11:00',
    date: '16/02/2024',
    appointmentStatus: HomeCardActionType.carriedOut,
    imagePath: "https://github.com/gsolivier.png",
    email: "guilherme.sousa@example.com"
}

export const mapskey = "AIzaSyAqIF5MN4yo8ZHwg9WsKP14I-fAK6hpKWY";


