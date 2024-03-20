import { FlatList } from 'react-native'
import React from 'react'
import PatientCard from './PatientCard';
import styled from 'styled-components/native';
import { Spacing } from '../../../components/Container';
import { AppColors } from '../../../settings/AppColors';

export const List = styled.View`
    flex: 0.9;
    width: 100%;
`

export default function AppointmentList({DATA, tapAction}) {

  return (
    <List>
      <FlatList
        endFillColor={AppColors.white}
        data={DATA}
        renderItem={({item}) =>
        (
          <PatientCard
          imagePath={item.imagePath}
          name={item.name} 
          age={item.age} 
          examType={item.examType} 
          actionType={item.appointmentStatus} 
          schedule={item.time} 
          actionTap={() => tapAction(item)} 

          />
          )
          }
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<Spacing height={10}/>}
        contentContainerStyle={{ paddingVertical: 5, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
      />
      </List>
  )
}