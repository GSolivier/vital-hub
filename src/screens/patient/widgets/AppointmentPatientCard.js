import React from 'react'
import styled from 'styled-components/native'
import { AppColors } from '../../../settings/AppColors'
import { Column, Row, Spacing } from '../../../components/Container'
import { TextRegular, TextSemiBold, TitleSemiBold } from '../../../settings/AppFonts'
import { Flex, TextDecoration } from '../../../settings/AppEnums'
import { LinkButton } from '../../../components/AppButton'
import t from '../../../locale'
import AppLocalizations from '../../../settings/AppLocalizations'
import SvgIcon, { Icon } from '../../../assets/icons/Icons'
import { TouchableOpacity, View } from 'react-native'
import { AppAssets } from '../../../assets/AppAssets'

const CardBox = styled.View`
    width: 100%;
    elevation: 5;
    padding: 11px 20px 11px 10px;
    border-radius: 5px;
    background-color: ${AppColors.white};
`

const CardImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 5px;
`

const SchedulesBox = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 4px;
    width: 100px;
    border-radius: 5px;
    background-color: ${({ actionCard = "agendada" }) => actionCard == "agendada" ? AppColors.lightGreen : AppColors.whiteGray};
`

export default function AppointmentPatientCard({
    imagePath,
    name,
    crm,
    examType,
    schedule,
    actionType = "agendada",
    isTappable = false,
    cardTap,
    actionTap }) {
    const CardContainer = isTappable ? TouchableOpacity : View;
    return (
        <CardContainer activeOpacity={1} onPress={isTappable ? cardTap : null}>
            <CardBox>
                <Row justifyContent={Flex.spaceBetween} alignItems={Flex.center}>
                    <CardImage source={imagePath ? { uri: imagePath } : AppAssets.placeholder} />
                    <Spacing width={10} />
                    <Column justifyContent={Flex.spaceBetween}>
                        <Column width={'80%'}>
                            <TitleSemiBold size={16}>Dr. {name}</TitleSemiBold>
                            <Row justifyContent={Flex.flexStart} alignItems={Flex.center}>
                                <TextRegular size={14}>CRM - {crm}</TextRegular>
                                <Spacing width={7} />
                                <TextSemiBold size={14} color={AppColors.grayV6}>•</TextSemiBold>
                                <Spacing width={7} />
                                <TextSemiBold size={14} color={AppColors.grayV4}>{examType}</TextSemiBold>
                            </Row>
                        </Column>
                        <Spacing height={5} />
                        <Row
                            width={"85%"}
                            justifyContent={Flex.spaceBetween}
                            alignItems={Flex.center}
                        >
                            <SchedulesBox actionCard={actionType}>
                                <SvgIcon name={Icon.clock} size={15} color={actionType == "agendada" ? AppColors.primary : AppColors.grayV1} />
                                <Spacing width={6} />
                                <TextSemiBold alignSelf={Flex.center} color={actionType == "agendada" ? AppColors.primary : AppColors.grayV1} size={14}>{schedule}</TextSemiBold>
                            </SchedulesBox>
                            {
                                actionType == "agendada" ?
                                    (
                                        <LinkButton
                                            color={AppColors.red}
                                            text={t(AppLocalizations.cancel)}
                                            textDecoration={TextDecoration.none}
                                            alignSelf={Flex.flexEnd}

                                            onTap={actionTap}
                                        />
                                    )
                                    :
                                    actionType == "realizada" ?
                                        (
                                            <LinkButton
                                                color={AppColors.secondaryV1}
                                                text={t(AppLocalizations.seeMedicalRecord)}
                                                textDecoration={TextDecoration.none}
                                                alignSelf={Flex.flexEnd}
                                                justifySelf={Flex.flexEnd}
                                                size={12}
                                                onTap={actionTap}
                                            />
                                        ) :
                                        (<Spacing />)}

                        </Row>
                    </Column>
                </Row>
            </CardBox>
        </CardContainer>
    )
}