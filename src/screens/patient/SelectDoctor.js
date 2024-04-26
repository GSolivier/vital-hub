import React, { useEffect, useState } from 'react'
import { Container, Spacing } from '../../components/Container'
import AppLocalizations from '../../settings/AppLocalizations'
import { TitleSemiBold } from '../../settings/AppFonts'
import t from '../../locale'
import AppButton, { LinkButton } from '../../components/AppButton'
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions'
import DoctorList from './widgets/DoctorList'
import { getDoctors } from '../../repositories/DoctorRepository'
import apiClient, { GetMedicoByIdClinicPath, MedicoPath } from '../../settings/AppApi'
import { useRoute } from '@react-navigation/native'

export default function SelectDoctor({ navigation }) {
  const [selected, setSelected] = useState({ id: 0 });
  const [doctorsList, setDoctorsList] = useState([])

  const { params } = useRoute()


  const selectDoctor = (doctor) => {
    setSelected(doctor)
  }

  useEffect(() => {
    (async () => {
      apiClient.get(GetMedicoByIdClinicPath, {
        params: {
          id: params.clinica.id
        }
      })
        .then(response => {
          setDoctorsList(response.data)
        }

        )
        .catch(error => {
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
      <AppButton textButton={t(AppLocalizations.continueButton).toUpperCase()} isDisabled={selected.id == 0} onTap={() => AppNavigation.push(navigation, RouteKeys.selectDateScreen, {
        clinica: params.clinica,
        prioridadeTipo: params.prioridadeTipo,
        medico: selected,
        pacienteId: params.pacienteId
      }, true)} />
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />
    </Container>
  )
}