import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeContainer from './widgets/HomeContainer'
import { AppStorage, AppStorageKeys } from '../settings/AppStorage'
import { AppAssets } from '../assets/AppAssets'
import HomeCalendar from './widgets/HomeCalendar'
import { AppointmentFilterList, HomeCardActionType } from '../settings/AppEnums'
import ButtonSelecter from './widgets/ButtonSelecter'
import { Spacing } from '../components/Container'
import AppointmentPatientList from './patient/widgets/AppointmentPatientList'
import { RouteKeys, push } from '../settings/routes/RouteActions'
import { DATA, DOCTORS_DATA } from '../settings/AppUtils'
import AppointmentList from './doctor/widgets/AppointmentList'
import CancelExamDialog from './doctor/dialogs/CancelExamDialog'
import SeeMedicalRecordDialog from './doctor/dialogs/SeeMedicalRecordDialog'
import { ActivityIndicator } from 'react-native-paper'

export default function HomeScreen({ navigation }) {
    const [userData, setUserData] = useState({})
    const [selectedTab, setSelectedTab] = useState(HomeCardActionType.scheduled);
    const [filteredList, setFilteredList] = useState([]);
    const [scheduleAppointmentModalIsVisible, setScheduleAppointmentModalIsVisible] = useState(false)
    const [seeAppointmentLocal, setSeeAppointmentLocal] = useState(false)
    const [cancelModalIsVisible, setCancelModalIsVisible] = useState(false)
    const [appointment, setSelectedAppointment] = useState({})
    const [seeMedicalRecordModalIsVisible, setSeeMedicalRecordIsVisible] = useState(false)
    const [loading, setUserIsLoading] = useState(false)


    const handleTabSelected = (value) => {
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
        push(navigation, RouteKeys.medicalRecordScreen, { appointment: appointment })
    }

    const handleInsertMedicalRecord = (appointment) => {
        setSelectedAppointment(appointment);
        setSeeMedicalRecordIsVisible(true);
    }

    function filterList() {
        const data = userData.role == "paciente" ? DOCTORS_DATA : DATA

        console.log('====================================');
        console.log(data);
        console.log('====================================');
        var newList = data.filter((data) => data.appointmentStatus == selectedTab)
        setFilteredList(newList);
    }

    async function getUserData() {
        setUserIsLoading(true)
        const data = await AppStorage.read(AppStorageKeys.userData)
        console.log(data);
        setUserData(data)
        setUserIsLoading(false)
    }

    useEffect(() => {
        getUserData();
    }, []); // Executa apenas uma vez ao montar o componente
    
    useEffect(() => {
        filterList();
    }, [selectedTab, userData]); 

    return (
        <HomeContainer name={userData.name} imagePath={AppAssets.placeholder}>
            <HomeCalendar />
            <Spacing height={20} />
            <ButtonSelecter
                selected={selectedTab}
                handleTabSelected={handleTabSelected}
                buttonList={AppointmentFilterList}
            />
            <Spacing height={20} />

             { loading ? <ActivityIndicator/> :
                userData.role == "paciente" ? (
                    <AppointmentPatientList
                        DATA={filteredList}
                        tapAction={selectedTab == HomeCardActionType.scheduled ? handleCancelAppointment : handleSeeMedicalRecord}
                        cardTapAction={selectedTab == HomeCardActionType.scheduled ? handleSeeAppointmentLocal : null}
                    />
                ) : (
                    <AppointmentList
                        DATA={filteredList}
                        tapAction={selectedTab == HomeCardActionType.scheduled ? handleCancelAppointment : handleInsertMedicalRecord} />
                )
            }

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

        </HomeContainer>
    )
}