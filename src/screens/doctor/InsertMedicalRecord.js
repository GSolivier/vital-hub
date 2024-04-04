import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Row, Spacing } from '../../components/Container';
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts';
import { Flex, TextAlign } from '../../settings/AppEnums';
import AppInput from '../../components/AppInput';
import { ScrollView } from 'react-native';
import AppButton, { LinkButton } from '../../components/AppButton';
import { AppNavigation } from '../../settings/routes/RouteActions';
import t from '../../locale';
import AppLocalizations from '../../settings/AppLocalizations';
import moment from 'moment';

const HeaderImage = styled.Image`
    width: 100%;
    height: 30%;
`

export default function InsertMedicalRecord({ navigation }) {
    const { params } = useRoute();
    
    useEffect( ()=>{
        console.log(params.appointment.receita);
    }, [])
    return (
        <>
            <HeaderImage source={{ uri: params.appointment.imagePath }} />
            <ScrollView>
                <Container justifyContent={Flex.flexStart}>
                    <TitleSemiBold>{params.appointment.paciente.idNavigation.nome}</TitleSemiBold>
                    <Spacing height={10} />
                    <Row justifyContent={Flex.spaceAround} width={'85%'}>

                        <TextMedium size={14} textAlign={TextAlign.center}>{moment(moment()).diff(params.appointment.paciente.dataNascimento, 'years')} {t(AppLocalizations.yearsOld)}</TextMedium>
                        <TextMedium size={14}  textAlign={TextAlign.center}>{params.appointment.paciente.idNavigation.email}</TextMedium>
                    </Row>
                    <Spacing height={24} />
                    <AppInput  label={t(AppLocalizations.appointDescriptionLabel)} hint={params.appointment.descricao ? params.appointment.descricao : "NA" } isTextArea={true} onChangeText={() => { }} />
                    <Spacing height={20} />
                    <AppInput  label={t(AppLocalizations.patientDiagnosisLabel)} hint={params.appointment.diagnostico ? params.appointment.diagnostico : "NA" } onChangeText={() => { }} />
                    <Spacing height={20} />
                    <AppInput  label={t(AppLocalizations.doctorPrescriptionLabel)} hint={params.appointment.receita ? `Medicamento: ${params.appointment.receita.medicamento}\n${params.appointment.receita.observacoes}` : "NA"} isTextArea={true} onChangeText={() => { }} />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.saveButton).toUpperCase()} />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.editButton).toUpperCase()} isDisabled={true}/>
                    <Spacing height={25} />
                    <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />
                </Container>
            </ScrollView>
        </>
    )
}