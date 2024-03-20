import React from 'react'
import AppDialog from '../../../../components/AppDialog'
import AppButton, { LinkButton } from '../../../../components/AppButton'
import t from '../../../../locale'
import AppLocalizations from '../../../../settings/AppLocalizations'
import { Column, Spacing } from '../../../../components/Container'
import { TextSemiBold, TextMedium, TitleSemiBold } from '../../../../settings/AppFonts'
import { Flex, TextAlign } from '../../../../settings/AppEnums'
import { RouteKeys, push } from '../../../../settings/routes/RouteActions'

export default function ConfirmAppointmentDialog({ visible, onClose, navigation }) {

  const handleConfirm = () => {
    push(navigation, RouteKeys.tabNavigationPatient)
    onClose()
  }
  return (
    <AppDialog
      visible={visible}
      onClose={onClose}
      justifyContentBox={Flex.center}
      justifyContentContainer={Flex.center}
      padding={13}
    >
      <TitleSemiBold>{t(AppLocalizations.scheduleAppointment)}</TitleSemiBold>
      <Spacing height={16} />
      <TextMedium textAlign={TextAlign.center}>{t(AppLocalizations.scheduleAppointmentHint)}</TextMedium>
      <Spacing height={30} />
      <Column alignItems={Flex.flexStart} width={'100%'}>
        <TextSemiBold size={16}>{t(AppLocalizations.appoitmentDate)}</TextSemiBold>
        <TextMedium size={14}>1 de Novembro de 2024</TextMedium>
        <Spacing height={20} />
        <TextSemiBold size={16}>{t(AppLocalizations.appoitmentDoctor)}</TextSemiBold>
        <TextMedium size={14}>Dra Alessandra</TextMedium>
        <Spacing height={6} />
        <TextMedium size={14}>Dermatologista</TextMedium>
        <Spacing height={20} />
        <TextSemiBold size={16}>{t(AppLocalizations.appointmentLocal)}</TextSemiBold>
        <TextMedium size={14}>São Paulo - SP</TextMedium>
        <Spacing height={20} />
        <TextSemiBold size={16}>{t(AppLocalizations.typeofAppointmentHint)}</TextSemiBold>
        <TextMedium size={14}>Rotina</TextMedium>
      </Column>
      <Spacing height={30} />
      <AppButton textButton={t(AppLocalizations.confirm).toUpperCase()} onTap={handleConfirm}/>
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={onClose} />
    </AppDialog>
  )
}