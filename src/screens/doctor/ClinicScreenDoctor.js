import React from 'react'
import AppButton from '../../components/AppButton'
import { pop } from '../../settings/routes/RouteActions'

export default function ClinicScreenDoctor({navigation}) {
  return (
    <>
    <AppButton onTap={() => pop(navigation)}/>
    </>
  )
}