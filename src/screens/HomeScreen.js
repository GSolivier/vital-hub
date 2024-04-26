import React, { useEffect, useState } from 'react'
import HomeContainer from './widgets/HomeContainer'
import { AppAssets } from '../assets/AppAssets'
import HomeCalendar from './widgets/HomeCalendar'
import { AppointmentFilterList, TextAlign } from '../settings/AppEnums'
import ButtonSelecter from './widgets/ButtonSelecter'
import { Spacing } from '../components/Container'
import AppointmentPatientList from './patient/widgets/AppointmentPatientList'
import { AppNavigation, RouteKeys } from '../settings/routes/RouteActions'
import AppointmentList from './doctor/widgets/AppointmentList'
import CancelExamDialog from './doctor/dialogs/CancelExamDialog'
import SeeMedicalRecordDialog from './doctor/dialogs/SeeMedicalRecordDialog'
import { ActivityIndicator } from 'react-native-paper'
import SeeAppointmentLocalDialog from './patient/widgets/dialogs/SeeAppointmentLocalDialog'
import { AppColors } from '../settings/AppColors'
import styled from 'styled-components'
import SvgIcon, { Icon } from '../assets/icons/Icons'
import ScheduleAppointmentDialog from './patient/widgets/dialogs/ScheduleAppointmentDialog'
import { PatientRepository } from '../repositories/PatientRepository'
import { DoctorRepository } from '../repositories/DoctorRepository'
import { AppToast } from '../components/AppToast'
import { TextMedium } from '../settings/AppFonts'
import { useRoute } from '@react-navigation/native'
import { UserRepository } from '../repositories/UserRepository'


const FixedButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${AppColors.primary};
  border-radius: 7px;
  elevation: 5;
  position: absolute;
  bottom: 10px;
  right: 20px;
`

export default function HomeScreen({ navigation }) {
    const [selectedTab, setSelectedTab] = useState("agendada");
    const [rawList, setRawList] = useState([])
    const [filteredList, setFilteredList] = useState([]);
    const [scheduleAppointmentModalIsVisible, setScheduleAppointmentModalIsVisible] = useState(false)
    const [seeAppointmentLocal, setSeeAppointmentLocal] = useState(false)
    const [cancelModalIsVisible, setCancelModalIsVisible] = useState(false)
    const [appointment, setSelectedAppointment] = useState({})
    const [seeMedicalRecordModalIsVisible, setSeeMedicalRecordIsVisible] = useState(false)
    const [listIsLoading, setListIsLoading] = useState(false)
    const [date, setDate] = useState()

    const { params } = useRoute()


    const handleTabSelected = async (value) => {
        setSelectedTab(value);
    };

    const handleSeeAppointmentLocal = (appointment) => {
        setSelectedAppointment(appointment);
        setSeeAppointmentLocal(true);
    }

    const handleCancelAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setCancelModalIsVisible(true);
    };

    const handleSeeMedicalRecord = (appointment) => {
        setSelectedAppointment(appointment);

        if (appointment.receitaId) {
            AppNavigation.push(navigation, RouteKeys.medicalRecordScreen, { appointment: appointment })
        } else {
            AppToast.showInfoToast("Prontuário não cadastrado pelo médico")
        }

    }

    const handleInsertMedicalRecord = (appointment) => {
        setSelectedAppointment(appointment);
        setSeeMedicalRecordIsVisible(true);
    }

    async function getAppointmentList() {
        setListIsLoading(true)
        const data = params.userData.role == "paciente" ? await PatientRepository.getPatientAppointments(params.userData.id, date ? date : new Date()) : await DoctorRepository.getDoctorAppointments(params.userData.id, date ? date : new Date())
        setRawList(data.data)
        setListIsLoading(false)
    }

    async function filterAppointmentList() {
        setFilteredList(rawList.filter((data) => data.situacao.situacao == selectedTab));
    }

    async function getUserData() {
        await getAppointmentList();
    }

    useEffect(() => {
        getUserData()
    }, [date]);

    useEffect(() => {
        filterAppointmentList()
    }, [rawList, selectedTab]);



    return (
        <>
            <HomeContainer name={params.userData.name} imagePath={params.userData.foto}>
                <HomeCalendar setDate={setDate} />
                <Spacing height={20} />
                <ButtonSelecter
                    selected={selectedTab}
                    handleTabSelected={handleTabSelected}
                    buttonList={AppointmentFilterList}
                />
                <Spacing height={20} />


                {listIsLoading ?
                    <ActivityIndicator color={AppColors.primary} /> :
                    filteredList.length == 0 ? <TextMedium textAlign={TextAlign.center}>{`Nenhuma consulta ${selectedTab} cadastrada na data atual`}</TextMedium>
                        : params.userData.role == "paciente" ? (
                            <AppointmentPatientList
                                DATA={filteredList}
                                tapAction={selectedTab == "agendada" ? handleCancelAppointment : handleSeeMedicalRecord}
                                cardTapAction={selectedTab == "agendada" ? handleSeeAppointmentLocal : null}
                            />
                        ) : (
                            <AppointmentList
                                DATA={filteredList}
                                tapAction={selectedTab == "agendada" ? handleCancelAppointment : handleInsertMedicalRecord} />
                        )
                }

                {params.userData.role == "paciente" ? (
                    <FixedButton onPress={() => setScheduleAppointmentModalIsVisible(true)}>
                        <SvgIcon name={Icon.stethoscope} color={AppColors.white} />
                    </FixedButton>) : null}


                {appointment.paciente || appointment.medicoClinica ? (
                    <>
                        <CancelExamDialog
                            visible={cancelModalIsVisible}
                            onClose={() => setCancelModalIsVisible(false)}
                            appointment={appointment} />

                        <SeeMedicalRecordDialog
                            visible={seeMedicalRecordModalIsVisible}
                            onClose={() => setSeeMedicalRecordIsVisible(false)}
                            appointment={appointment}
                            navigation={navigation}
                        />

                        <SeeAppointmentLocalDialog
                            visible={seeAppointmentLocal}
                            onClose={() => setSeeAppointmentLocal(false)}
                            appointment={appointment}
                            navigation={navigation}
                        />
                    </>
                ) : null}

                <ScheduleAppointmentDialog
                    visible={scheduleAppointmentModalIsVisible}
                    onClose={() => setScheduleAppointmentModalIsVisible(false)}
                    navigation={navigation}
                    userId={params.userData.id}
                />

            </HomeContainer>

        </>
    )
}