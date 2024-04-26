import React, { useEffect, useState } from 'react'
import { Container, Spacing } from '../../components/Container'
import AppLocalizations from '../../settings/AppLocalizations'
import { TitleSemiBold } from '../../settings/AppFonts'
import t from '../../locale'
import AppButton, { LinkButton } from '../../components/AppButton'
import { AppNavigation } from '../../settings/routes/RouteActions'
import AppDropdown from '../../components/AppDropdown'
import SelectDateCalendar from './widgets/SelectDateCalendar'
import ConfirmAppointmentDialog from './widgets/dialogs/ConfirmAppointmentDialog'
import { useRoute } from '@react-navigation/native'


export default function SelectDate({ navigation }) {
  const datas = [
    { key: '1', value: '10:00' },
    { key: '2', value: '11:00' },
    { key: '3', value: '12:00' },
    { key: '4', value: '13:00' },
    { key: '5', value: '14:00' },
    { key: '6', value: '15:00' },
    { key: '7', value: '16:00' },
    { key: '8', value: '17:00' },
  ]

  const [time, setTime] = useState()
  const [date, setDate] = useState()
  const [dateTime, setDateTime] = useState()
  const [confirmDialog,setConfirmDialog] = useState(false)

  const {params} = useRoute()

  useEffect(() => {
    if (date && time) {
      formatDateTime()
    }
} , [date, time])

function formatDateTime(){
  setDateTime(`${date}T${time}:00`)
}

  return (
    <Container>
      <TitleSemiBold>{t(AppLocalizations.selectDate)}</TitleSemiBold>
      <Spacing height={35} />
      <SelectDateCalendar setDate={setDate} />
      <Spacing height={30} />

      <AppDropdown
        handleValueSelected={setTime}
        label={t(AppLocalizations.selectAvailableTimeLabel)}
        placeholder={t(AppLocalizations.selectAvailableTimeHint)}
        data={datas}
      />

      <Spacing height={42} />
      <AppButton textButton={t(AppLocalizations.confirm).toUpperCase()}isDisabled={!date || !time} onTap={() => setConfirmDialog(true)} />
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />
      <ConfirmAppointmentDialog
      appointment={{
        clinica: params.clinica,
        medico: params.medico,
        prioridadeTipo: params.prioridadeTipo,
        pacienteId: params.pacienteId,
        dataConsulta: dateTime
      }}
       visible={confirmDialog} onClose={() => setConfirmDialog(false)} navigation={navigation}

      />
    </Container>
  )
}