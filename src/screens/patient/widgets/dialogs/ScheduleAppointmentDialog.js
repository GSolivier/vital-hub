import React, { useEffect, useState } from 'react'
import AppDialog from '../../../../components/AppDialog'
import { TitleSemiBold } from '../../../../settings/AppFonts'
import { AppointmentLevelsButtons, Flex } from '../../../../settings/AppEnums'
import AppButton, { LinkButton } from '../../../../components/AppButton'
import { Spacing } from '../../../../components/Container'
import AppInput from '../../../../components/AppInput'
import t from '../../../../locale'
import AppLocalizations from '../../../../settings/AppLocalizations'
import AppDropdown from '../../../../components/AppDropdown'
import { AppColors } from '../../../../settings/AppColors'
import ButtonSelecter from '../../../widgets/ButtonSelecter'
import { AppNavigation, RouteKeys } from '../../../../settings/routes/RouteActions'
import { KeyboardAvoidingView } from 'react-native'

export default function ScheduleAppointmentDialog({ visible, onClose, navigation, userId }) {
  const [selectedAppointmentType, setSelectedAppointmentType] = useState();
  const [local, setLocal] = useState('São Caetano do Sul')

  const handleTabSelected = (value) => {
    setSelectedAppointmentType(value);
  };

  const handleInsertMedicalRecord = () => {
    AppNavigation.push(navigation, RouteKeys.selectClinicScreen, { prioridadeTipo: selectedAppointmentType, cidade: local, pacienteId: userId });
    setSelectedAppointmentType()
    setLocal()
    onClose();
  };
  return (
    <AppDialog
      visible={visible}
      animationType='slide'
      padding={0}
      isFaded={true}
      justifyContentBox={Flex.flexStart}
      onClose={onClose}

    >

        <TitleSemiBold alignSelf={Flex.center}>{t(AppLocalizations.scheduleAppointment)}</TitleSemiBold>
        <Spacing height={20} />
        <ButtonSelecter
          selected={selectedAppointmentType}
          handleTabSelected={handleTabSelected}
          mainColor={AppColors.primary}
          mainTextColor={AppColors.primaryV1}
          label={t(AppLocalizations.appointmenteLevelLabel)}
          buttonList={AppointmentLevelsButtons}
          spacing={21}
        />
        <Spacing height={20} />

        <AppInput
          textValue={local}
          label={t(AppLocalizations.desiredLocationLabel)}
          hint={t(AppLocalizations.desiredLocationHint)}
          onChangeText={(value) => { setLocal(value) }} />
        <Spacing height={30} />
        <AppButton textButton={t(AppLocalizations.continueButton).toUpperCase()} onTap={handleInsertMedicalRecord} isDisabled={!selectedAppointmentType || !local} />
        <Spacing height={30} />
        <LinkButton text={t(AppLocalizations.cancel)} onTap={() => {
          setSelectedAppointmentType()
          onClose()
          setLocal()
        }} />
    </AppDialog>
  )
}