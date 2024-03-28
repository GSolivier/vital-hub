import React, { useState } from 'react'
import { Container, Spacing } from '../../components/Container'
import { TitleSemiBold } from '../../settings/AppFonts'
import AppButton, { LinkButton } from '../../components/AppButton'
import t from '../../locale'
import AppLocalizations from '../../settings/AppLocalizations'
import { ClinicListData } from '../../settings/AppUtils'
import ClinicList from './widgets/ClinicList'
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions'

export default function SelectClinic({navigation}) {
  const [selected, setSelected] = useState({ id: 0});

    const selectClinic = (clinic) => {
      setSelected(clinic)
    }
  return (
    <Container paddingTop={30}>
      <TitleSemiBold>{t(AppLocalizations.selectClinic)}</TitleSemiBold>
      <Spacing height={35}/>
      <ClinicList
        DATA={ClinicListData}
        tapAction={selectClinic}
        selected={selected}
      />
      <Spacing height={30}/>
      <AppButton textButton={t(AppLocalizations.continueButton).toUpperCase()} onTap={() => AppNavigation.push(navigation, RouteKeys.selectDoctorScreen)}/>
      <Spacing height={30}/>
      <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)}/>
    </Container>
  )
}