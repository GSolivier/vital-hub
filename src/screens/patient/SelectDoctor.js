import React, { useEffect, useState } from 'react'
import { Container, Spacing } from '../../components/Container'
import AppLocalizations from '../../settings/AppLocalizations'
import { TitleSemiBold } from '../../settings/AppFonts'
import t from '../../locale'
import AppButton, { LinkButton } from '../../components/AppButton'
import { RouteKeys, pop, push } from '../../settings/routes/RouteActions'
import { DOCTORS_DATA } from '../../settings/AppUtils'
import DoctorList from './widgets/DoctorList'
import { getDoctors } from '../../repositories/DoctorRepository'
import apiClient, { MedicoPath } from '../../settings/AppApi'

export default function SelectDoctor({ navigation }) {
  const [selected, setSelected] = useState({ id: 0 });
  const [doctorsList, setDoctorsList] = useState([])


  const selectDoctor = (doctor) => {
    setSelected(doctor)
  }

  useEffect(() => {
    (async () => {
      apiClient.get(MedicoPath)
      .then( response => {
        setDoctorsList(response.data)
      }
        
        )
      .catch( error => {
          console.log(error);
      })
    })();


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
      <AppButton textButton={t(AppLocalizations.continueButton).toUpperCase()} onTap={() => push(navigation, RouteKeys.selectDateScreen)} />
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={() => pop(navigation)} />
    </Container>
  )
}