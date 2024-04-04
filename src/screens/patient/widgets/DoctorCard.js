import React from 'react'
import styled from 'styled-components/native'
import { Column, Spacing } from '../../../components/Container'
import { TextMedium, TitleSemiBold } from '../../../settings/AppFonts'
import { AppColors } from '../../../settings/AppColors'
import { Flex } from '../../../settings/AppEnums'
import { AppAssets } from '../../../assets/AppAssets'

export const DoctorCardBox = styled.TouchableOpacity`
    width: 100%;
    elevation: ${({ selected = false }) => selected ? '0' : '5'};;
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
            <DoctorImage source={AppAssets.placeholder} />
            <Spacing width={10} />


            <Column width={'80%'} justifyContent={Flex.center}>

                <TitleSemiBold size={16}>{item.idNavigation.nome}</TitleSemiBold>
                <Spacing height={10} />
                <TextMedium size={14} color={AppColors.grayV4}>{item.especialidade.especialidade1}</TextMedium>
            </Column>


        </DoctorCardBox>
    )
}