import { Image, ScrollView, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react'
import AuthContainer from './widgets/AuthContainer'
import { AppAssets } from '../../assets/AppAssets'
import { Row, Spacing } from '../../components/Container'
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts'
import AppLocalizations from '../../settings/AppLocalizations'
import { TextAlign } from '../../settings/AppEnums'
import AppInput, { AppDatePicker } from '../../components/AppInput'
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions'
import t from '../../locale'
import AppButton, { LinkButton } from '../../components/AppButton'
import styled from 'styled-components/native'
import api, { apiViaCep } from '../../settings/AppApi'
import { useRoute } from '@react-navigation/native'
import { Masks } from 'react-native-mask-input';
import { AppToast } from '../../components/AppToast';
import SvgIcon, { Icon } from '../../assets/icons/Icons';
import { AppColors } from '../../settings/AppColors';
import { ValidarCPF } from '../../settings/AppUtils';

const InputContainer = styled.View`
    flex: 0.5;
`

const HeaderImage = styled.Image`
    width: 100%;
    height: 40%;
`

const CameraIconBox = styled.TouchableOpacity`
    position: absolute;
    background-color: ${AppColors.secondary};
    padding: 12px;
    border-radius: 5px;
    border-color: ${AppColors.white};
    border-width: 1px;
    top: 37%;
    left: 75%;
    z-index: 9999;
`


export default function CreateAccountAdditionalInfo({ navigation }) {

    const [image, setImage] = useState()
    const [date, setDate] = useState()
    const [open, setOpen] = useState(false)
    const [nome, setNome] = useState()
    const [rg, setRg] = useState()
    const [cpf, setCpf] = useState()
    const [cep, setCep] = useState()
    const [street, setStreet] = useState()
    const [number, setNumber] = useState()
    const [city, setCity] = useState()
    const [endereco, setEndereco] = useState({})

    const { params } = useRoute()

    useEffect(() => {
        if (params.image) {
            setImage(params.image)
        }
    }, [params, date])

    async function getAdress() {

        try {

            const retorno = await apiViaCep.get(`${cep}/json`)

            const dados = retorno.data
            setEndereco(dados)
            setStreet(dados.logradouro)
            setCity(dados.localidade)
        } catch (error) {
            showToast()
        }
    }

    const toggleDatePicker = () => {
        setOpen(!open);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate)

            if (Platform.OS === "android") {
                setOpen(false)

                setDateOfBirth(formatDate(currentDate));
            }
        } else {
            setOpen(false)
        }
        aceEditorRef.current.blur()
    }

    const submitForm = async () => {
        const form = new FormData()
        var datestr = (new Date(date)).toUTCString();
        form.append("Arquivo", {
            uri: image, name: 'image.jpg', type: 'image/jpg'
        })
        form.append("Nome", nome)
        form.append("Email", params.email)
        form.append("Senha", params.password)
        form.append("Rg", rg)
        form.append("Cpf", cpf)
        form.append("DataNascimento", datestr)
        form.append("Cep", cep)
        form.append("Logradouro", street)
        form.append("Numero", number)
        form.append("Cidade", city)
        // v    WVBHNJKL
        4
        UYTFform.append("IdTipoUsuario", "1990EBA5-E406-4594-AF63-3B1DFE478CF1")//Gui
        form.append("IdTipoUsuario", "E3881E56-B13E-4916-9382-C2582FB96EE1")//Everton

        await api.post("/Pacientes", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                AppNavigation.push(navigation, RouteKeys.loginScreen, true)
            }).catch(error => {
                console.log(error.request);

            })
    }

    const aceEditorRef = useRef();
    return (
        <>
            <HeaderImage source={image ? { uri: image } : AppAssets.placeholder} />
            <CameraIconBox
                onPress={() => {
                    AppNavigation.push(navigation, RouteKeys.createAccountTakePicScreen)
                }}
            >
                <SvgIcon name={Icon.cameraPlus} color={AppColors.white} />
            </CameraIconBox>

            <ScrollView>
                <AuthContainer>
                    <TitleSemiBold size={20}>{"Quase lá"}</TitleSemiBold>
                    <Spacing height={15} />
                    <TextMedium textAlign={TextAlign.center}>{"Insira as últimas informações para a criação da sua conta."}</TextMedium>
                    <Spacing height={20} />
                    <AppInput hint={"Nome completo"} textValue={nome} onChangeText={(value) => setNome(value)} />
                    <Spacing height={15} />
                    <AppInput hint={"RG"} textValue={rg} keyboardType='numeric' onChangeText={(value) => setRg(value)} />
                    <Spacing height={15} />
                    <AppInput
                        hint={"CPF"}
                        keyboardType='numeric'
                        isValid={cpf ? ValidarCPF(cpf) : true}
                        isMasked
                        mask={Masks.BRL_CPF}
                        textValue={cpf}
                        onChangeText={(masked, unmasked) => {
                            setCpf(masked);
                        }} />
                    <Spacing height={15} />
                    <AppDatePicker textValue={date} toggleDatePicker={() => toggleDatePicker()} hasLabel={false} />
                    <Spacing height={15} />
                    <AppInput
                        keyboardType='numeric'
                        hint={"CEP"}
                        isMasked
                        mask={Masks.ZIP_CODE}
                        onChangeText={(masked, unmasked) => setCep(masked)}
                        textValue={cep}
                        onEndEditing={async () => await getAdress()}
                    />
                    <Spacing height={15} />
                    <AppInput hint={"Logradouro"} textValue={street} onChangeText={(value) => setStreet(value)} />
                    <Spacing height={15} />
                    <Row width={'100%'}>
                        <InputContainer>
                            <AppInput textValue={number} hint={"Número"} onChangeText={(value) => setNumber(value)} keyboardType='numeric' />
                        </InputContainer>
                        <Spacing width={15} />
                        <InputContainer>
                            <AppInput hint={"Cidade"} textValue={city} onChangeText={(value) => setCity(value)} />
                        </InputContainer>
                    </Row>
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.signUp).toUpperCase()}
                        onTap={() => {
                            if (nome && rg && ValidarCPF(cpf) && date && cep && street && city && number) {
                                submitForm()
                            }
                        }} />
                    <Spacing height={30} />
                    <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />

                    {open ? <DateTimePicker
                        display='calendar'
                        onChange={onChange}
                        value={date}

                    /> : <Spacing />}
                </AuthContainer>
            </ScrollView>
        </>
    )
}