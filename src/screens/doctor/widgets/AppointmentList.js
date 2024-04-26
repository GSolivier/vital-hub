import { FlatList } from 'react-native'
import React from 'react'
import PatientCard from './PatientCard';
import styled from 'styled-components/native';
import { Spacing } from '../../../components/Container';
import { AppColors } from '../../../settings/AppColors';
import moment from 'moment';
import { decodePriority } from '../../../settings/AppUtils';

export const List = styled.View`
    flex: 0.9;
    width: 100%;
`

export default function AppointmentList({ DATA, tapAction, cardTapAction }) {

  return (
    <List>
      <FlatList
        endFillColor={AppColors.white}
        data={DATA}
        renderItem={({ item }) =>
        (
          <PatientCard
            imagePath={item.paciente.idNavigation.foto}
            name={item.paciente.idNavigation.nome}
            age={moment(moment()).diff(item.paciente.dataNascimento, 'years')}
            examType={decodePriority(item.prioridade.prioridade)}
            actionType={item.situacao.situacao}
            isTappable={item.situacao.situacao == "agendada" ? true : false}
            schedule={moment(item.dataConsulta).format('HH:mm')}
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