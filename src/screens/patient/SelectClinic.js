import React, { useEffect, useState } from 'react'
import { Container, Spacing } from '../../components/Container'
import { TitleSemiBold } from '../../settings/AppFonts'
import AppButton, { LinkButton } from '../../components/AppButton'
import t from '../../locale'
import AppLocalizations from '../../settings/AppLocalizations'
import { ClinicListData } from '../../settings/AppUtils'
import ClinicList from './widgets/ClinicList'
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions'
import api, { GetClinicPath } from '../../settings/AppApi'

export default function SelectClinic({navigation}) {
  const [selected, setSelected] = useState({ id: 0});
  const [clinicList, setClinicList] = useState([]);

    const selectClinic = (clinic) => {
      setSelected(clinic)
    }

    useEffect(() => {
      (async () => {
        api.get(GetClinicPath)
        .then( response => {
          setClinicList(response.data)
          
        }
          
          )
        .catch( error => {
            console.log(error);
        })
      })();
      
      
  
    }, [])
  return (
    <Container paddingTop={30}>
      <TitleSemiBold>{t(AppLocalizations.selectClinic)}</TitleSemiBold>
      <Spacing height={35}/>
      <ClinicList
        DATA={clinicList}
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