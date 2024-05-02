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
import moment from 'moment'
import { ActivityIndicator } from 'react-native'


export default function SelectDate({ navigation }) {

  const [time, setTime] = useState()
  const [date, setDate] = useState()
  const [dateTime, setDateTime] = useState()
  const [confirmDialog, setConfirmDialog] = useState(false)

  const actualDate = moment().format('YYYY-MM-DD')

  const [arrayOptions, setArrayOptions] = useState(null)

  function loadOptions() {
    const horasRestantes = moment(actualDate).add(24, 'hours').diff(moment(), 'hours')

    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1)

      return {
        label: `${valor}:00`, value: `${valor}:00`
      }
    })

    setArrayOptions(options)
  }

  useEffect(() => {
    loadOptions()
  }, [])

  const { params } = useRoute()

  useEffect(() => {
    if (date && time) {
      formatDateTime()
    }
  }, [date, time])

  function formatDateTime() {
    setDateTime(`${date}T${time}:00`)
  }

  return (
    <Container>
      <TitleSemiBold>{t(AppLocalizations.selectDate)}</TitleSemiBold>
      <Spacing height={35} />
      <SelectDateCalendar setDate={setDate} />
      <Spacing height={30} />
      {arrayOptions != null ? <AppDropdown
        handleValueSelected={setTime}
        label={t(AppLocalizations.selectAvailableTimeLabel)}
        placeholder={t(AppLocalizations.selectAvailableTimeHint)}
        data={arrayOptions}
      /> : <ActivityIndicator />}


      <Spacing height={42} />
      <AppButton textButton={t(AppLocalizations.confirm).toUpperCase()} isDisabled={!date || !time} onTap={() => setConfirmDialog(true)} />
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