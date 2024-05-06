import { ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container, Row, Spacing } from '../../components/Container'
import styled from 'styled-components/native'
import { useRoute } from '@react-navigation/native'
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts'
import { Flex, TextDecoration } from '../../settings/AppEnums'
import AppInput from '../../components/AppInput'
import t from '../../locale'
import AppLocalizations from '../../settings/AppLocalizations'
import AppButton, { LinkButton } from '../../components/AppButton'
import { AppColors } from '../../settings/AppColors'
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions'
import PhotoSelector from './widgets/PhotoSelector'
import SeeImageModal from './widgets/dialogs/SeeImageModal'
import api from '../../settings/AppApi'

const HeaderImage = styled.Image`
    width: 100%;
    height: 40%;
`

const ButtonContainer = styled.View`
    flex: 0.5;
    justify-content: center;
    align-items: center;
`

const Line = styled.View`
    width: 100%;
    height: 2px;
    background-color: ${AppColors.grayV4};
`

const OcrText = styled.View`
    background-color: ${AppColors.whiteDarker};
    border-radius: 5px;
    height: 120px;
    padding: 16px;
`

export default function MedicalRecord({ navigation, navigation: { setParams } }) {
    const { params } = useRoute();
    const [photoList, setPhotoList] = useState([])
    const [selectedImage, setSelectedImage] = useState()
    const [imageModalIsVisible, setImageModalIsVisible] = useState(false)
    const [descricaoExame, setDescricaoExame] = useState('')
    const [ocrText, setOcrText] = useState()

    useEffect(() => {

        let descricaoCompleta = '';

        params.appointment.exames.forEach(element => {
            descricaoCompleta += element.descricao + "\n"; 
        });


        setOcrText(descricaoCompleta);
        
        if (params.image) {
            setPhotoList([...photoList, params.image])
            setParams({ image: undefined })
        }
    }, [params])

    const handleOpenImage = (photo) => {
        setSelectedImage(photo)
        setImageModalIsVisible(true)
    }

    const handleDeleteImage = () => {
        const index = photoList.indexOf(selectedImage)
        if (index != -1) {
            photoList.splice(index, 1)
        }
        setImageModalIsVisible(false)
    }

    async function InserirExame() {
        const formData = new FormData();

        formData.append("ConsultaId", params.appointment.id)
        formData.append("Imagem", {
            uri: photoList[0],
            name: `image.${photoList[0].split('.').pop()}`,
            type: `image/${photoList[0].split('.').pop()}`
        })

        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then(response => {
            console.log(response.data);
            setOcrText(ocrText => ocrText + response.data.descricao + "\n");

        }).catch(e => {
            console.log(e.request);
        })

    }

    return (
        <>
            <HeaderImage source={{ uri: params.appointment.medicoClinica.medico.idNavigation.foto }} />
            <ScrollView nestedScrollEnabled={true}>
                <Container justifyContent={Flex.flexStart}>
                    <TitleSemiBold>{`Dr.  ${params.appointment.medicoClinica.medico.idNavigation.nome}`}</TitleSemiBold>
                    <Spacing width={6} />
                    <Row>
                        <TextMedium size={14}>{params.appointment.medicoClinica.medico.especialidade.especialidade1}</TextMedium>
                        <Spacing width={20} />
                        <TextMedium size={14}>CRM-{params.appointment.medicoClinica.medico.crm}</TextMedium>
                    </Row>
                    <Spacing height={28} />
                    <AppInput
                        isEditable={false}
                        label={t(AppLocalizations.appointDescriptionLabel)}
                        isTextArea={true}
                        textValue={params.appointment.descricao ? params.appointment.descricao : "Nada cadastrado" } />
                    <Spacing height={20} />
                    <AppInput
                        isEditable={false}
                        label={t(AppLocalizations.patientDiagnosisLabel)}
                        textValue={params.appointment.diagnostico ? params.appointment.diagnostico : "Nada cadastrado"} />
                    <Spacing height={20} />
                    <AppInput
                        isEditable={false}
                        label={t(AppLocalizations.doctorPrescriptionLabel)}
                        isTextArea={true}
                        textValue={params.appointment.receita ? `${params.appointment.receita.medicamento}\n${params.appointment.receita.observacoes}` : "Nada cadastrado"} />
                    <Spacing height={20} />
                    <PhotoSelector
                        label={t(AppLocalizations.medicalExams)}
                        photoList={photoList}
                        openImage={handleOpenImage}
                        onTap={() => AppNavigation.push(navigation, RouteKeys.scanExamsScreen)}/>
                    <Spacing height={10} />
                    <Row>
                        <ButtonContainer>
                            <AppButton
                                textButton={t(AppLocalizations.send)}
                                isDisabled={photoList.length == 0}
                                mainColor={AppColors.primary}
                                onTap={()=> {InserirExame()}}
                            />
                        </ButtonContainer>
                        <ButtonContainer>
                            <LinkButton
                                onTap={() => {
                                    setPhotoList([])
                                    }}
                                textDecoration={TextDecoration.none}
                                text={t(AppLocalizations.cancel)}
                                color={AppColors.red} />
                        </ButtonContainer>
                    </Row>
                    <Spacing height={20} />
                    {ocrText ? <OcrText>
                        <ScrollView nestedScrollEnabled={true}>
                        <TextMedium>
                            {ocrText}
                        </TextMedium>
                        </ScrollView>
                    </OcrText> : <Spacing/>}
                    <Spacing height={20} />
                    <Line />
                    <Spacing height={20} />
                    {/* <AppInput
                        isEditable={false}
                        label={t(AppLocalizations.appointDescriptionLabel)}
                        isTextArea={true}
                        textValue={'Resultado do exame de sangue: tudo normal'} />
                    <Spacing height={30} /> */}
                    <LinkButton text={t(AppLocalizations.back)} onTap={() => AppNavigation.popWithData(navigation, RouteKeys.homeScreen, {reload: true})} />
                    <SeeImageModal
                        visible={imageModalIsVisible}
                        image={selectedImage}
                        onClose={() => setImageModalIsVisible(false)}
                        deleteImage={handleDeleteImage}
                    />
                </Container>
            </ScrollView>
        </>
    )
}