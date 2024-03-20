import React, { useEffect, useState } from 'react'
import HomeContainer from '../widgets/HomeContainer'
import { AppAssets } from '../../assets/AppAssets'
import HomeCalendar from '../widgets/HomeCalendar'
import CancelExamDialog from './dialogs/CancelExamDialog'
import { Spacing } from '../../components/Container'
import AppointmentList from './widgets/AppointmentList'
import { DATA } from '../../settings/AppUtils'
import { AppointmentFilterList, HomeCardActionType } from '../../settings/AppEnums'
import SeeMedicalRecordDialog from './dialogs/SeeMedicalRecordDialog'
import ButtonSelecter from '../widgets/ButtonSelecter'

export default function HomeScreenDoctor({ navigation }) {
  const [selectedTab, setSelectedTab] = useState(HomeCardActionType.scheduled);
  const [filteredList, setFilteredList] = useState([]);
  const [cancelModalIsVisible, setCancelModalIsVisible] = useState(false)
  const [seeMedicalRecordModalIsVisible, setSeeMedicalRecordIsVisible] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    filterList()
  }, [selectedTab])

  function filterList() {
    var newList = DATA.filter((data) => data.appointmentStatus == selectedTab)

    setFilteredList(newList);
  }

  const handleTabSelected = (value) => {
    setSelectedTab(value);
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setCancelModalIsVisible(true);
  };

  const handleSeeMedicalRecord = (appointment) => {
    setSelectedAppointment(appointment);
    setSeeMedicalRecordIsVisible(true);
  }


  return (
    <HomeContainer name={'Dr. Claudio'} imagePath={AppAssets.placeholder}>

      <HomeCalendar />

      <Spacing height={20} />

      <ButtonSelecter 
      selected={selectedTab} 
      handleTabSelected={handleTabSelected} 
      buttonList={AppointmentFilterList} />
      
      <Spacing height={20} />

      <AppointmentList 
      DATA={filteredList} 
      tapAction={selectedTab == HomeCardActionType.scheduled ? handleCancelAppointment : handleSeeMedicalRecord} />

      <CancelExamDialog 
      visible={cancelModalIsVisible} 
      onClose={() => setCancelModalIsVisible(false)} 
      appointment={selectedAppointment} />

      <SeeMedicalRecordDialog
       visible={seeMedicalRecordModalIsVisible} 
       onClose={() => setSeeMedicalRecordIsVisible(false)} 
       appointment={selectedAppointment}
        navigation={navigation}
       />
    </HomeContainer>
  )
}