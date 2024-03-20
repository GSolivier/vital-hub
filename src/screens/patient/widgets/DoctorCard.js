import React from 'react'
import styled from 'styled-components/native'
import { Column, Spacing } from '../../../components/Container'
import { TextMedium, TitleSemiBold } from '../../../settings/AppFonts'
import { AppColors } from '../../../settings/AppColors'
import { Flex } from '../../../settings/AppEnums'

export const DoctorCardBox = styled.TouchableOpacity`
    width: 100%;
    elevation: ${({ selected = false }) => selected ? '0px' : '5px'};;
    padding: 10px;
    background-color: ${AppColors.white};
    border-radius: 5px;
    border-width: ${({ selected = false }) => selected ? '2px' : '0px'};
    border-color: ${({ selected = false }) => selected ? AppColors.secondary : AppColors.white};
    flex-direction: row;
`

export const DoctorImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 5px;
`

export default function DoctorCard({ selected, item, onTap }) {

    if (!item) {
        return null;
    }

    return (
        <DoctorCardBox
            selected={selected.id == item.id}
            onPress={onTap}
            activeOpacity={0.9}
        >
            <DoctorImage source={{ uri: item.imagePath }} />
            <Spacing width={10} />

            <Column justifyContent={Flex.center}>
                <TitleSemiBold size={16}>{item.name}</TitleSemiBold>
                <Spacing height={10} />
                <TextMedium size={14} color={AppColors.grayV4}>{item.specialty}</TextMedium>
            </Column>


        </DoctorCardBox>
    )
}