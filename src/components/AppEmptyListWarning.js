import { View, Text } from 'react-native'
import React from 'react'
import { Container, Spacing } from './Container'
import { TextMedium } from '../settings/AppFonts'
import SvgIcon, { Icon } from '../assets/icons/Icons'
import { AppColors } from '../settings/AppColors'

export default function AppEmptyListWarning({ description = '' }) {
    return (
        <Container>
            <TextMedium color={AppColors.grayV5} >
                {description}
            </TextMedium>
            <Spacing height={30}/>
            <SvgIcon name={Icon.warning} color={AppColors.grayV5} size={40}/>
        </Container>
    )
}