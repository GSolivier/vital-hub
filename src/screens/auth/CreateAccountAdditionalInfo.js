import { View, Text, Image, ScrollView, Platform } from 'react-native'
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
import styled from 'styled-components'
import { apiViaCep } from '../../settings/AppApi'
import { useRoute } from '@react-navigation/native'
import { Masks } from 'react-native-mask-input';

const InputContainer = styled.View`
    flex: 0.5;
`

export default function CreateAccountAdditionalInfo({ navigation }) {

    const [date, setDate] = useState(new Date())
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
    function cepMascara(cep) {
        if (cep.length == 5) {
            cep = cep + '-'
        }
        setCep(cep)
    }

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

    useEffect(() => {
        if (cep) {
            cepMascara(cep)
        }
    }, [cep])

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

    const aceEditorRef = useRef();
    return (
        <ScrollView>
            <AuthContainer>
                <Image source={AppAssets.appLogoDark} />
                <Spacing height={0} />
                <TitleSemiBold size={20}>{"Quase lá"}</TitleSemiBold>
                <Spacing height={15} />
                <TextMedium textAlign={TextAlign.center}>{"Insira as últimas informações para a criação da sua conta."}</TextMedium>
                <Spacing height={20} />
                <AppInput hint={"Nome completo"} textValue={nome} onChangeText={(value) => setNome(value)} />
                <Spacing height={15} />
                <AppInput hint={"RG"} isMasked={true} textValue={rg} onChangeText={(value) => setRg(value)} />
                <Spacing height={15} />
                <AppInput hint={"CPF"} isMasked mask={Masks.BRL_CPF} textValue={cpf} onChangeText={(masked, unmasked) => {
                    setCpf(unmasked);
                }} />
                <Spacing height={15} />
                <AppDatePicker textValue={date} toggleDatePicker={() => toggleDatePicker()} hasLabel={false} />
                <Spacing height={15} />
                <AppInput
                    keyboardType='numeric'
                    hint={"CEP"}
                    maxLength={9}
                    onChangeText={(value) => setCep(value)}
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
                    onTap={() => console.log({ rg: rg, cpf: cpf, dataNascimento: date, cep: cep, logradouro: street, numero: number, cidade: city, nome: nome, email: params.email, senha: params.password, idTipoUsuario: '1990EBA5-E406-4594-AF63-3B1DFE478CF1' })} />
                <Spacing height={30} />
                <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />

                {open ? <DateTimePicker
                    display='calendar'
                    onChange={onChange}
                    value={date}

                /> : <Spacing />}
            </AuthContainer>
        </ScrollView>
    )
}