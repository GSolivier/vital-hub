import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Container, Row, Spacing } from '../../components/Container';
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts';
import { Flex, TextAlign } from '../../settings/AppEnums';
import AppInput from '../../components/AppInput';
import { ScrollView } from 'react-native';
import AppButton, { LinkButton } from '../../components/AppButton';
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions';
import t from '../../locale';
import AppLocalizations from '../../settings/AppLocalizations';
import moment from 'moment';
import { DoctorRepository } from '../../repositories/DoctorRepository';
import api from '../../settings/AppApi';
import TabNavigation from '../../settings/routes/TabNavigation';
import { AppToast } from '../../components/AppToast';
import { AppColors } from '../../settings/AppColors';

const HeaderImage = styled.Image`
  width: 100%;
  height: 30%;
`;
const OcrText = styled.View`
  background-color: ${AppColors.whiteDarker};
  border-radius: 5px;
  height: 120px;
  padding: 16px;
  width: 100%;
`;
const Line = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${AppColors.grayV4};
`;

const ViewLabel = styled.View`
  align-items: "start";
  width: 100%;
`;

export default function InsertMedicalRecord({
  navigation,
  navigation: { setParams },
}) {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(false);

  const [descricao, setDescricao] = useState(params.appointment.descricao);
  const [diagnostico, setDiagnostico] = useState(
    params.appointment.diagnostico
  );
  const [medicamento, setMedicamento] = useState(
    params.appointment.receita.medicamento
  );
  const [ocrText, setOcrText] = useState();

  useEffect(() => {
    console.log(params.appointment.exames);

    let descricaoCompleta = "";

    params.appointment.exames.forEach((element) => {
      descricaoCompleta += element.descricao + "\n";
    });

    setOcrText(descricaoCompleta);
  }, [params]);

  async function EditStatus() {
    await api
      .put(
        `/Consultas/Status`,
        {},
        {
          params: {
            idConsulta: params.appointment.id,
            status: "realizada",
          },
        }
      )
      .then((response) => {
        AppNavigation.popWithData(navigation, RouteKeys.homeScreen, {
          reload: true,
        });
      })
      .catch((error) => console.log(error.request.data));
  }

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
                    <AppInput  label={t(AppLocalizations.appointDescriptionLabel)} hint={"Descreva os sintomas do paciente..."}textValue={descricao} isTextArea={true} onChangeText={(value) => { setDescricao(value) }} />
                    <Spacing height={20} />
                    <AppInput  label={t(AppLocalizations.patientDiagnosisLabel)} hint={"Descreva o diagnóstico do paciente..."}textValue={diagnostico} onChangeText={(value) => { setDiagnostico(value) }} />
                    <Spacing height={20} />
                    <AppInput  label={t(AppLocalizations.doctorPrescriptionLabel)} hint={"Descreva o tratamento..."}textValue={medicamento} isTextArea={true} onChangeText={(value) => { setMedicamento(value) }} />
                    <Spacing height={30} />
                    {params.appointment.situacao.situacao == "agendada" ? (
                    <AppButton textButton={t(AppLocalizations.saveButton).toUpperCase()}
                    isLoading={isLoading} 
                    onTap={async () => {

                        try {
                          setIsLoading(true)
              
                          await DoctorRepository.PutAppointmentMedicalRecord(params.appointment.id, descricao, diagnostico, medicamento)
                       
                          await EditStatus()
                          setIsLoading(false)

                          AppToast.showSucessToast('Prontuário cadastrado!')
                          
                        } catch (e) {
                          console.log(e.request);
                          setIsLoading(false)
                        }
                      }} 
                    /> ) : (<AppButton textButton={t(AppLocalizations.editButton).toUpperCase()} 
                    isLoading={isLoading} 
                    onTap={async () => {

                        try {
                          setIsLoading(true)
              
                          await DoctorRepository.PutAppointmentMedicalRecord(params.appointment.id, descricao, diagnostico, medicamento)  
                          AppNavigation.popWithData(navigation, RouteKeys.homeScreen, {reload:true})
                          setIsLoading(false)
                          

                        } catch (e) {
                          console.log(e.request);
                          setIsLoading(false)
                        }
                      }} 
                    />
                    )}
                    
                    <Spacing height={25} />
                    <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />
                </Container>
            </ScrollView>
        </>
    )
}
