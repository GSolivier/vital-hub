import { useEffect, useState } from "react";
import { DOCTORS_DATA } from "../../settings/AppUtils";
import HomeContainer from "../widgets/HomeContainer";
import { AppAssets } from "../../assets/AppAssets";
import HomeCalendar from "../widgets/HomeCalendar";
import { Spacing } from "../../components/Container";
import { AppointmentFilterList, HomeCardActionType } from "../../settings/AppEnums";
import styled from "styled-components/native";
import { AppColors } from "../../settings/AppColors";
import SvgIcon, { Icon } from "../../assets/icons/Icons";
import ScheduleAppointmentDialog from "./widgets/dialogs/ScheduleAppointmentDialog";
import ButtonSelecter from "../widgets/ButtonSelecter";
import AppointmentPatientList from "./widgets/AppointmentPatientList";
import CancelExamDialog from "../doctor/dialogs/CancelExamDialog";
import { RouteKeys, push } from "../../settings/routes/RouteActions";
import SeeAppointmentLocalDialog from "./widgets/dialogs/SeeAppointmentLocalDialog";

export const FixedButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${AppColors.primary};
  border-radius: 7px;
  elevation: 5px;
  position: absolute;
  bottom: 10px;
  right: 20px;
`

export default function HomeScreenPatient({ navigation }) {
  const [selectedTab, setSelectedTab] = useState(HomeCardActionType.scheduled);
  const [filteredList, setFilteredList] = useState([]);
  const [scheduleAppointmentModalIsVisible, setScheduleAppointmentModalIsVisible] = useState(false)
  const [seeAppointmentLocal, setSeeAppointmentLocal] = useState(false)
  const [cancelModalIsVisible, setCancelModalIsVisible] = useState(false)
  const [appointment, setSelectedAppointment] = useState({})

  useEffect(() => {
    filterList()
  }, [selectedTab])

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
    push(navigation, RouteKeys.medicalRecordScreen, {appointment: appointment})
  }

  function filterList() {
    var newList = DOCTORS_DATA.filter((data) => data.appointmentStatus == selectedTab)
    setFilteredList(newList);
  }

  return (
    <HomeContainer name={'Guilherme Sousa'} imagePath={AppAssets.placeholder}>

      <HomeCalendar />

      <Spacing height={20} />

      <ButtonSelecter 
      selected={selectedTab} 
      handleTabSelected={handleTabSelected}
      buttonList={AppointmentFilterList}
      />
      
      <Spacing height={20} />

      <AppointmentPatientList 
      DATA={filteredList}
      tapAction={selectedTab == HomeCardActionType.scheduled ? handleCancelAppointment : handleSeeMedicalRecord}
      cardTapAction={selectedTab == HomeCardActionType.scheduled ? handleSeeAppointmentLocal : null}
      />

      <FixedButton onPress={() => setScheduleAppointmentModalIsVisible(true)}>
      <SvgIcon name={Icon.stethoscope} color={AppColors.white}/>
      </FixedButton>

      <ScheduleAppointmentDialog 
      visible={scheduleAppointmentModalIsVisible} 
      onClose={() => setScheduleAppointmentModalIsVisible(false)}
      navigation={navigation}
      />
      <CancelExamDialog 
      visible={cancelModalIsVisible} 
      onClose={() => setCancelModalIsVisible(false)} 
      appointment={appointment}/>
      <SeeAppointmentLocalDialog
        visible={seeAppointmentLocal}
        onClose={() => setSeeAppointmentLocal(false)}
        appointment={appointment}
        navigation={navigation}
      />
    </HomeContainer>
  )
}