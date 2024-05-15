import { FlatList } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import ClinicCard from './ClinicCard'
import { Spacing } from '../../../components/Container'
import AppEmptyListWarning from '../../../components/AppEmptyListWarning'

export const ListClinic = styled.View`
    flex: 0.9;
    width: 100%;
`
export default function ClinicList({DATA, tapAction, selected}) {
  return (
    <ListClinic>
      <FlatList
        data={DATA}
        renderItem={({item}) =>(

            <ClinicCard
                item={item}
                onTap={() => {
                tapAction(item)
                }}
                selected={selected}
            />
        )}
        ListEmptyComponent={<AppEmptyListWarning description='Nenhuma clinica encontrada'/>}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<Spacing height={12}/>}
        contentContainerStyle={{ paddingVertical: 5, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </ListClinic>
  )
}