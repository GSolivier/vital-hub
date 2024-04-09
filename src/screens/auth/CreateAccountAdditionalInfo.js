import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthContainer from './widgets/AuthContainer'
import { AppAssets } from '../../assets/AppAssets'
import { Row, Spacing } from '../../components/Container'
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts'
import AppLocalizations from '../../settings/AppLocalizations'
import { TextAlign } from '../../settings/AppEnums'
import AppInput from '../../components/AppInput'
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions'
import t from '../../locale'
import AppButton, { LinkButton } from '../../components/AppButton'
import styled from 'styled-components'
import { apiViaCep } from '../../settings/AppApi'

const InputContainer = styled.View`
    flex: 0.5;
`

export default function CreateAccountAdditionalInfo({ navigation }) {
    const [cep, setCep] = useState()
    const [endereco, setEndereco] = useState({})
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
    
        } catch (error) {
          showToast()
        }
      }

    useEffect(() => {
        if (cep) {
            cepMascara(cep)
        }
    }, [cep])
    return (
        <ScrollView>
            <AuthContainer>
                <Image source={AppAssets.appLogoDark} />
                <Spacing height={0} />
                <TitleSemiBold size={20}>{"Quase lá"}</TitleSemiBold>
                <Spacing height={15} />
                <TextMedium textAlign={TextAlign.center}>{"Insira as últimas informações para a criação da sua conta."}</TextMedium>
                <Spacing height={20} />
                <AppInput hint={"Nome completo"} />
                <Spacing height={15} />
                <AppInput  hint={"RG"} />
                <Spacing height={15} />
                <AppInput  hint={"CPF"} />
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
                <AppInput  hint={"Logradouro"} textValue={endereco.logradouro}/>
                <Spacing height={15} />
                <Row width={'100%'}>
                    <InputContainer>
                        <AppInput  hint={"Número"} keyboardType='numeric'/>
                    </InputContainer>
                    <Spacing width={15} />
                    <InputContainer>
                        <AppInput  hint={"Cidade"} textValue={endereco.localidade} />
                    </InputContainer>
                </Row>
                <Spacing height={30} />
                <AppButton textButton={t(AppLocalizations.signUp).toUpperCase()} onTap={() => AppNavigation.push(navigation, RouteKeys.createAccountAdditionalInfo)} />
                <Spacing height={30} />
                <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />
            </AuthContainer>
        </ScrollView>
    )
}