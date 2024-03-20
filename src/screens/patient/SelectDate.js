import React, { useState } from 'react'
import { Container, Spacing } from '../../components/Container'
import AppLocalizations from '../../settings/AppLocalizations'
import { TitleSemiBold } from '../../settings/AppFonts'
import t from '../../locale'
import AppButton, { LinkButton } from '../../components/AppButton'
import { pop } from '../../settings/routes/RouteActions'
import AppDropdown from '../../components/AppDropdown'
import SelectDateCalendar from './widgets/SelectDateCalendar'
import ConfirmAppointmentDialog from './widgets/dialogs/ConfirmAppointmentDialog'


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
  const [confirmDialog,setConfirmDialog] = useState(false)

  return (
    <Container>
      <TitleSemiBold>{t(AppLocalizations.selectDate)}</TitleSemiBold>
      <Spacing height={35} />
      <SelectDateCalendar />
      <Spacing height={30} />

      <AppDropdown
        handleValueSelected={setTime}
        label={t(AppLocalizations.selectAvailableTimeLabel)}
        placeholder={t(AppLocalizations.selectAvailableTimeHint)}
        data={datas}
      />

      <Spacing height={42} />
      <AppButton textButton={t(AppLocalizations.confirm).toUpperCase()} onTap={() => setConfirmDialog(true)} />
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={() => pop(navigation)} />
      <ConfirmAppointmentDialog visible={confirmDialog}   onClose={() => setConfirmDialog(false)} navigation={navigation}/>
    </Container>
  )
}