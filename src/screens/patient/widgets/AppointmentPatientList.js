import { FlatList } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';
import { Spacing } from '../../../components/Container';
import { AppColors } from '../../../settings/AppColors';
import AppointmentPatientCard from './AppointmentPatientCard';
import moment from 'moment';
import { decodePriority } from '../../../settings/AppUtils';

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
                    imagePath={item.medicoClinica.medico.idNavigation.foto}
                    name={item.medicoClinica.medico.idNavigation.nome}
                    crm={item.medicoClinica.medico.crm}
                    examType={decodePriority(item.prioridade.prioridade)}
                    schedule={moment(item.dataConsulta).format('HH:mm')}
                    actionType={item.situacao.situacao}
                    isTappable={item.situacao.situacao == "agendada" ? true : false}
                    actionTap={() => tapAction(item)}
                    cardTap={() => cardTapAction(item)}
                    />
                )
                }
                keyExtractor={item => item.id}
                ItemSeparatorComponent={<Spacing height={10} />}
                contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5} }
                showsVerticalScrollIndicator={false}
            />
        </List>
    )
}