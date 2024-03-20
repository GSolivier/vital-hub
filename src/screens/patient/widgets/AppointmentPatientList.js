import { FlatList } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';
import { Spacing } from '../../../components/Container';
import { AppColors } from '../../../settings/AppColors';
import AppointmentPatientCard from './AppointmentPatientCard';
import { HomeCardActionType } from '../../../settings/AppEnums';

export const List = styled.View`
    flex: 0.9;
    width: 100%;
`

export default function AppointmentPatientList({ DATA, tapAction, cardTapAction }) {

    return (
        <List>
            <FlatList
                endFillColor={AppColors.white}
                data={DATA}
                renderItem={({ item }) =>
                (
                    <AppointmentPatientCard 
                    imagePath={item.imagePath}
                    name={item.name}
                    age={item.age}
                    examType={item.examType}
                    schedule={item.time}
                    actionType={item.appointmentStatus}
                    isTappable={item.appointmentStatus == HomeCardActionType.scheduled ? true : false}
                    actionTap={() => tapAction(item)}
                    cardTap={() => cardTapAction(item)}
                    />
                )
                }
                keyExtractor={item => item.id}
                ItemSeparatorComponent={<Spacing height={10} />}
                contentContainerStyle={{ paddingVertical: 5, paddingHorizontal: 5 }}
                showsVerticalScrollIndicator={false}
            />
        </List>
    )
}