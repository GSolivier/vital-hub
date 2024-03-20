import React, { useEffect, useState } from 'react'
import AppDialog from '../../../../components/AppDialog'
import {TitleSemiBold } from '../../../../settings/AppFonts'
import { AppointmentLevelsButtons, Flex} from '../../../../settings/AppEnums'
import AppButton, { LinkButton } from '../../../../components/AppButton'
import { Spacing } from '../../../../components/Container'
import AppInput from '../../../../components/AppInput'
import t from '../../../../locale'
import AppLocalizations from '../../../../settings/AppLocalizations'
import AppDropdown from '../../../../components/AppDropdown'
import { AppColors } from '../../../../settings/AppColors'
import ButtonSelecter from '../../../widgets/ButtonSelecter'
import { RouteKeys, push } from '../../../../settings/routes/RouteActions'

export default function ScheduleAppointmentDialog({ visible, onClose, navigation }) {
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');`
  `
  const datas = [
    { key: '1', value: 'Check-up' },
    { key: '2', value: 'Retorno' },
  ]

  useEffect(() => {
    if (visible) {
      setSelectedAppointmentType('');
    }
  }, [visible]);

  const handleTabSelected = (value) => {
    setSelectedAppointmentType(value);
  };

  const handleInsertMedicalRecord = () => {
    push(navigation, RouteKeys.selectClinicScreen);
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
      <Spacing height={30} />
      <AppDropdown
        data={datas}
        label={t(AppLocalizations.typeofAppointmentLabel)}
        placeholder={t(AppLocalizations.typeofAppointmentHint)}
        handleValueSelected={handleTabSelected}
      />
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
      label={t(AppLocalizations.desiredLocationLabel)} 
      hint={t(AppLocalizations.desiredLocationHint)} 
      onEdit={() => { }} />
      <Spacing height={30} />
      <AppButton textButton={t(AppLocalizations.continueButton).toUpperCase()} onTap={handleInsertMedicalRecord} />
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={onClose} />
    </AppDialog>
  )
}