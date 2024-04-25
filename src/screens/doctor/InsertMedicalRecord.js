import React, { useEffect, useState } from 'react'
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
import { DoctorRepository } from '../../repositories/DoctorRepository';

const HeaderImage = styled.Image`
    width: 100%;
    height: 30%;
`

export default function InsertMedicalRecord({ navigation }) {
    const { params } = useRoute();
    const [isLoading, setIsLoading] = useState(false)

    const [descricao, setDescricao] = useState(params.appointment.descricao ? params.appointment.descricao : "NA" )
    const [diagnostico, setDiagnostico] = useState(params.appointment.diagnostico ? params.appointment.diagnostico : "NA")
    const [medicamento, setMedicamento] = useState(params.appointment.medicamento ? `Medicamento: ${params.appointment.medicamento}\n${params.appointment.medicamento}` : "NA")
    

    useEffect( ()=>{
        console.log(params.appointment);
        console.log(params.appointment.receitaId);
        
    }, [])
    return (
        <>
            <HeaderImage source={{ uri: params.appointment.paciente.idNavigation.foto }} />
            <ScrollView>
                <Container justifyContent={Flex.flexStart}>
                    <TitleSemiBold>{params.appointment.paciente.idNavigation.nome}</TitleSemiBold>
                    <Spacing height={10} />
                    <Row justifyContent={Flex.spaceAround} width={'85%'}>

                        <TextMedium size={14} textAlign={TextAlign.center}>{moment(moment()).diff(params.appointment.paciente.dataNascimento, 'years')} {t(AppLocalizations.yearsOld)}</TextMedium>
                        <TextMedium size={14} textAlign={TextAlign.center}>{params.appointment.paciente.idNavigation.email}</TextMedium>
                    </Row>
                    <Spacing height={24} />
                    <AppInput  label={t(AppLocalizations.appointDescriptionLabel)} textValue={descricao} isTextArea={true} onChangeText={(value) => { setDescricao(value) }} />
                    <Spacing height={20} />
                    <AppInput  label={t(AppLocalizations.patientDiagnosisLabel)} textValue={diagnostico} onChangeText={(value) => { setDiagnostico(value) }} />
                    <Spacing height={20} />
                    <AppInput  label={t(AppLocalizations.doctorPrescriptionLabel)} textValue={medicamento} isTextArea={true} onChangeText={(value) => { setMedicamento(value) }} />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.saveButton).toUpperCase()} 
                    />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.editButton).toUpperCase()} 
                    isLoading={isLoading} 
                    onTap={async () => {

                        try {
                          setIsLoading(true)
              
                          await DoctorRepository.PutAppointmentMedicalRecord(params.appointment.id, descricao, diagnostico, medicamento)  
              
                          setIsLoading(false)
                        } catch (e) {
                          console.log(e.message);
                          setIsLoading(false)
                        }
                      }} 
                    />
                    <Spacing height={25} />
                    <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />
                </Container>
            </ScrollView>
        </>
    )
}