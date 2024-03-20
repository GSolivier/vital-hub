import React from 'react'
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Row, Spacing } from '../../components/Container';
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts';
import { Flex, TextAlign } from '../../settings/AppEnums';
import AppInput from '../../components/AppInput';
import { ScrollView } from 'react-native';
import AppButton, { LinkButton } from '../../components/AppButton';
import { pop } from '../../settings/routes/RouteActions';
import t from '../../locale';
import AppLocalizations from '../../settings/AppLocalizations';

const HeaderImage = styled.Image`
    width: 100%;
    height: 30%;
`

export default function InsertMedicalRecord({ navigation }) {
    const { params } = useRoute();
    return (
        <>
            <HeaderImage source={{ uri: params.appointment.imagePath }} />
            <ScrollView>
                <Container justifyContent={Flex.flexStart}>
                    <TitleSemiBold>{params.appointment.name}</TitleSemiBold>
                    <Spacing height={10} />
                    <Row justifyContent={Flex.spaceAround} width={'85%'}>

                        <TextMedium size={14} textAlign={TextAlign.center}>{params.appointment.age} {t(AppLocalizations.yearsOld)}</TextMedium>
                        <TextMedium size={14}  textAlign={TextAlign.center}>{params.appointment.email}</TextMedium>
                    </Row>
                    <Spacing height={24} />
                    <AppInput  label={t(AppLocalizations.appointDescriptionLabel)} hint={t(AppLocalizations.descriptionHint)} isTextArea={true} onEdit={() => { }} />
                    <Spacing height={20} />
                    <AppInput  label={t(AppLocalizations.patientDiagnosisLabel)} hint={t(AppLocalizations.diagnosisLabel)} onEdit={() => { }} />
                    <Spacing height={20} />
                    <AppInput  label={t(AppLocalizations.doctorPrescriptionLabel)} hint={t(AppLocalizations.doctorPrescriptionLabel)} isTextArea={true} onEdit={() => { }} />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.saveButton).toUpperCase()} />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.editButton).toUpperCase()} isDisabled={true}/>
                    <Spacing height={25} />
                    <LinkButton text={t(AppLocalizations.cancel)} onTap={() => pop(navigation)} />
                </Container>
            </ScrollView>
        </>
    )
}