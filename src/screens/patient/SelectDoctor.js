import React, { useEffect, useState } from 'react'
import { Container, Spacing } from '../../components/Container'
import AppLocalizations from '../../settings/AppLocalizations'
import { TitleSemiBold } from '../../settings/AppFonts'
import t from '../../locale'
import AppButton, { LinkButton } from '../../components/AppButton'
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions'
import DoctorList from './widgets/DoctorList'
import api, { MedicoPath } from '../../settings/AppApi'
import { DoctorRepository } from '../../repositories/DoctorRepository'

export default function SelectDoctor({ navigation }) {
  const [selected, setSelected] = useState({ id: 0 });
  const [doctorsList, setDoctorsList] = useState([])


  const selectDoctor = (doctor) => {
    setSelected(doctor)
  }

  async function listDoctors() {
    const responseDoctorList = await DoctorRepository.getDoctors()

    setDoctorsList(responseDoctorList)
  }

  useEffect(() => {
    listDoctors()
  }, [])


  return (
    <Container>
      <TitleSemiBold>{t(AppLocalizations.selectDoctor)}</TitleSemiBold>
      <Spacing height={35} />
      <DoctorList
        DATA={doctorsList}
        tapAction={selectDoctor}
        selected={selected}
      />
      <Spacing height={30} />
      <AppButton textButton={t(AppLocalizations.continueButton).toUpperCase()} onTap={() => AppNavigation.push(navigation, RouteKeys.selectDateScreen)} />
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />
    </Container>
  )
}