import { FlatList } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import DoctorCard from './DoctorCard'
import { Spacing } from '../../../components/Container'

export const ListDoctor = styled.View`
    flex: 0.9;
    width: 100%;
`
export default function DoctorList({DATA, tapAction, selected}) {
  return (
    <ListDoctor>
      <FlatList
        data={DATA}
        renderItem={({item}) =>(
            <DoctorCard
                item={item}
                onTap={() => tapAction(item)}
                selected={selected}
            />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<Spacing height={12}/>}
        contentContainerStyle={{ paddingVertical: 5, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </ListDoctor>
  )
}