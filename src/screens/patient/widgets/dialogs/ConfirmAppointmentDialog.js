import React from 'react'
import AppDialog from '../../../../components/AppDialog'
import AppButton, { LinkButton } from '../../../../components/AppButton'
import t from '../../../../locale'
import AppLocalizations from '../../../../settings/AppLocalizations'
import { Column, Spacing } from '../../../../components/Container'
import { TextSemiBold, TextMedium, TitleSemiBold } from '../../../../settings/AppFonts'
import { Flex, TextAlign } from '../../../../settings/AppEnums'
import { AppNavigation, RouteKeys } from '../../../../settings/routes/RouteActions'
import { decodePriority } from '../../../../settings/AppUtils'
import moment from 'moment'
import api, { AppointmentInsertPath } from '../../../../settings/AppApi'
import { AppToast } from '../../../../components/AppToast'

export default function ConfirmAppointmentDialog({ visible, onClose, navigation, appointment }) {

  const handleConfirm = async () =>  {

    await api.post(AppointmentInsertPath, {
      pacienteId: appointment.pacienteId,
      clinicaId: appointment.clinica.id,
      medicoId: appointment.medico.idNavigation.id,
      prioridadeTipo: appointment.prioridadeTipo,
      dataConsulta: appointment.dataConsulta
    }).then(response => {
      AppNavigation.pop(navigation, 1)
      AppToast.showSucessToast(t(AppLocalizations.appointmenteRegisteredLabel))
      onClose()
    }).catch(error => {

      console.log(error.request);

    })
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
        <TextMedium size={14}>{moment(appointment.dataConsulta).format('LL')}</TextMedium>
        <Spacing height={20} />
        <TextSemiBold size={16}>{t(AppLocalizations.appoitmentDoctor)}</TextSemiBold>
        <TextMedium size={14}>{appointment.medico.idNavigation.nome}</TextMedium>
        <Spacing height={6} />
        <TextMedium size={14}>{appointment.medico.especialidade.especialidade1}</TextMedium>
        <Spacing height={20} />
        <TextSemiBold size={16}>{t(AppLocalizations.appointmentLocal)}</TextSemiBold>
        <TextMedium size={14}>{appointment.clinica.endereco.cidade}</TextMedium>
        <Spacing height={20} />
        <TextSemiBold size={16}>{t(AppLocalizations.typeofAppointmentHint)}</TextSemiBold>
        <TextMedium size={14}>{decodePriority(appointment.prioridadeTipo)}</TextMedium>
      </Column>
      <Spacing height={30} />
      <AppButton textButton={t(AppLocalizations.confirm).toUpperCase()} onTap={handleConfirm}/>
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={onClose} />
    </AppDialog>
  )
}