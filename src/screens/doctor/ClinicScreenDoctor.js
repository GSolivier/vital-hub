import { View, Text } from 'react-native'
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