import React from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Column, Row, Spacing } from '../../components/Container'
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts'
import { AppColors } from '../../settings/AppColors'
import { TouchableOpacity } from 'react-native'
import { Flex } from '../../settings/AppEnums'
import t from '../../locale'
import AppLocalizations from '../../settings/AppLocalizations'
import SvgIcon, { Icon } from '../../assets/icons/Icons'

export const HeaderBox = styled(LinearGradient)`
    width: 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    flex: 0.2;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 20px;
`

export const ProfileImage = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 5px;
`


export default function HomeHeader({ imagePath, name, onTapNotification }) {
    return (

        <HeaderBox colors={['#60BFC5', '#496BBA']} start={{ x: 0.2, y: 0.1 }} locations={[0.1, 1]}>

            <Row 
            alignItems={Flex.center} 
            alignSelf={Flex.flexEnd} 
            justifyContent={Flex.spaceBetween} 
            width={'100%'}>
                <Row alignItems={Flex.center}>
                    <ProfileImage source={imagePath} />
                    <Spacing width={10} />
                    <Column>
                        <TextMedium size={14}>{t(AppLocalizations.welcome)}</TextMedium>
                        <TitleSemiBold size={16} color={AppColors.white}>{name}</TitleSemiBold>
                    </Column>
                </Row>
                <TouchableOpacity onPress={onTapNotification}><SvgIcon name={Icon.notifications} color={AppColors.white}/></TouchableOpacity>

            </Row>

        </HeaderBox>

    )
}