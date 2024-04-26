import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Spacing } from '../components/Container'
import styled from 'styled-components/native'
import { TextMedium, TitleSemiBold } from '../settings/AppFonts'
import { AppColors } from '../settings/AppColors'
import AppInput from '../components/AppInput'
import { Flex, TextAlign } from '../settings/AppEnums'
import t from '../locale'
import AppLocalizations from '../settings/AppLocalizations'
import { Platform, Pressable, ScrollView, View } from 'react-native'
import AppButton from '../components/AppButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import SvgIcon, { Icon } from '../assets/icons/Icons'
import { AuthRepository } from '../repositories/AuthRepository'
import { PatientRepository } from "../repositories/PatientRepository";
import { useRoute } from '@react-navigation/native'
import { DoctorRepository } from '../repositories/DoctorRepository'
import { ActivityIndicator } from 'react-native-paper'
import { AppNavigation, RouteKeys } from '../settings/routes/RouteActions'
import api from '../settings/AppApi'
import { AppToast } from '../components/AppToast'

const HeaderImage = styled.Image`
    width: 100%;
    height: 40%;
`

const InfoBox = styled.View`
    width: 80%;
    padding: 25px;
    elevation: 5;
    align-items: center;
    background-color: ${AppColors.white};
    border-radius: 5px;
    position: absolute;
    z-index: 9999;
    top: 35%;
    align-self: center;
`

const InputContainer = styled.View`
    flex: 0.5;
`
const CameraIconBox = styled.TouchableOpacity`
    position: absolute;
    background-color: ${AppColors.secondary};
    padding: 12px;
    border-radius: 5px;
    border-color: ${AppColors.white};
    border-width: 1px;
    top: 32%;
    left: 83%;
    z-index: 10000;

`

export default function ProfileScreen({ user, navigation }) {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const [userData, setUserData] = useState({})
    const [dataUser, setDataUser] = useState()
    const [image, setImage] = useState()
    const { params } = useRoute()


    useEffect(() => {

        if (params.image) {
            setImage(params.image)
           
            AlterarFotoPerfil()
            
        }
        getDataUser()
    }, [userData, params])

    async function AlterarFotoPerfil() {

        const formData = new FormData();
        formData.append("Arquivo", {
            uri: params.image,
            name: `image.${params.image.split(".")[1]}`,
            type: `image/${params.image.split(".")[1]}`

        })
        
        await api.put(`/Usuario/AlterarFotoPerfil?id=${params.userData.id}`, formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }).then( response => {

            AppToast.showSucessToast("Foto alterada com sucesso!")
           
        }).catch( error => {
            console.log(error.request);
        })
    }


    async function getDataUser() {
        const dataUser = params.userData.role == "paciente" ? await PatientRepository.getPatient(params.userData.id) : await DoctorRepository.getDoctorById(params.userData.id)
        setDataUser(dataUser.data)
        setDate(dataUser.data.dataNascimento)
    }

    const formatCPF = (cpf) => {
        if (!cpf) return '';
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    const formatDate = (rawDate) => {
        let date = new Date(rawDate)

        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        day = day < 10 ? `0${day}` : day
        month = month < 10 ? `0${month}` : month

        return `${day}/${month}/${year}`
    }

    const toggleDatePicker = () => {
        setOpen(!open);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatePicker()

                setDateOfBirth(formatDate(currentDate));
            }
        } else {
            toggleDatePicker()
        }
        aceEditorRef.current.blur()
    }

    const aceEditorRef = useRef();

    return (
    dataUser ?  <>
            <HeaderImage source={{ uri: image? image : params.userData.foto }} />
            <CameraIconBox
                onPress={() => {
                    AppNavigation.push(navigation, RouteKeys.changeProfileImage)
                }}
            >
                <SvgIcon name={Icon.cameraPlus} color={AppColors.white} />
            </CameraIconBox>

            <InfoBox>
                <TitleSemiBold textAlign={TextAlign.center} size={16}>{params.userData.name}</TitleSemiBold>
                <Spacing height={10} />
                <TextMedium size={14}>{params.userData.email}</TextMedium>
            </InfoBox>
            <ScrollView>
                <Container justifyContent={Flex.flexStart}>
                    <Spacing height={80} />

                    {
                    params.userData.role == "paciente" ? 
                    <Pressable style={{ width: '100%' }} onPress={isEditable ? toggleDatePicker : null}>
                        <View style={{ width: '100%' }} pointerEvents='none'>
                            <AppInput
                                isEditable={isEditable}
                                label={t(AppLocalizations.dateOfBirth)}
                                textValue={formatDate(date)}
                                showSoftInputOnFocus={false}
                                Icon={<SvgIcon name={Icon.calendar} color={isEditable ? AppColors.primary : AppColors.gray} />}
                            />
                        </View>
                    </Pressable>
                    :
                    <AppInput 
                    isEditable={isEditable} 
                    label={"Especialidade"}
                    textValue={dataUser.especialidade ? dataUser.especialidade.especialidade1 : ""}    
                    />
                    }
                    <Spacing height={24} />
                    {
                        
                    params.userData.role == "paciente" ? 
                    <AppInput
                        isEditable={isEditable}
                        label={t(AppLocalizations.cpf)}
                        textValue={formatCPF(dataUser.cpf)} />
                    :
                    <AppInput
                    isEditable={isEditable}
                    label={"CRM"}
                    textValue={`SP-${dataUser.crm}`}
                    />
                    }
                    <Spacing height={20} />
                    <AppInput
                        isEditable={isEditable}
                        label={t(AppLocalizations.adress)}
                        textValue={dataUser.endereco ? `${dataUser.endereco.logradouro}, ${dataUser.endereco.numero}` : "N/A"} />
                    <Spacing height={24} />
                    <Row justifyContent={Flex.spaceBetween} width={'100%'}>
                        <InputContainer>
                            <AppInput isEditable={isEditable} label={t(AppLocalizations.cep)} hint={dataUser.endereco ? dataUser.endereco.cep : "N/A"} />
                        </InputContainer>
                        <Spacing width={32} />
                        <InputContainer>
                            <AppInput isEditable={isEditable} label={t(AppLocalizations.city)} hint={dataUser.endereco ? dataUser.endereco.cidade : "N/A"} />
                        </InputContainer>
                    </Row>
                    <Spacing height={32} />
                    <AppButton textButton={t(AppLocalizations.saveButton).toUpperCase()} onTap={() => setIsEditable(false)} />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.editButton).toUpperCase()} onTap={() => setIsEditable(true)} />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.logOut).toUpperCase()} mainColor={AppColors.red} onTap={() => AuthRepository.logout(navigation)} />
                </Container>
            </ScrollView>

            {open ? <DateTimePicker
                display='calendar'
                onChange={onChange}
                value={new Date()}

            /> : <Spacing />}

        </>
        :
        <>
            <ActivityIndicator/>
        </>
    )
}