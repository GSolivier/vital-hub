import React, { useEffect, useState } from 'react'
import { Row, Spacing } from '../../components/Container'
import AppInput from '../../components/AppInput'
import { AppState, Image, Text } from 'react-native'
import { AppAssets } from '../../assets/AppAssets'
import { TitleSemiBold } from '../../settings/AppFonts'
import AppButton, { LinkButton } from '../../components/AppButton'
import { AppColors } from '../../settings/AppColors'
import AuthContainer from './widgets/AuthContainer'
import t from '../../locale'
import AppLocalizations from '../../settings/AppLocalizations'
import { Flex } from '../../settings/AppEnums'
import SvgIcon, { Icon } from '../../assets/icons/Icons'
import { RouteKeys, push } from '../../settings/routes/RouteActions'
import * as Auth from 'expo-local-authentication'
import { login, tokenDecode } from '../../repositories/AuthRepository'
import { AppStorage } from '../../settings/AppStorage'
import { userDecodeToken } from '../../Utils/Auth'


export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('senai123')

  const [isValidated, setIsValidated] = useState(true)
  const [userType, setUserType] = useState('patient')
  const [hasBio, setHasBio] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function CheckAuth() {

    const compatible = await Auth.hasHardwareAsync()

    setHasBio(compatible)
  }

  async function handleAuth() {
    const biometric = await Auth.isEnrolledAsync()

    if (!biometric) {
      return
    }

    const auth = await Auth.authenticateAsync({
      promptMessage: 'VitalHub'
    })

    setIsAuth(auth.success)

    
  }

  const handleEmailChange = (value) => {
    setEmail(value);
  }


  useEffect(() => {
    // CheckAuth()
    // handleAuth()
  }, [])


  return (
    <AuthContainer>

      <Image source={AppAssets.appLogoDark} />

      <Spacing height={25} />

      <TitleSemiBold size={20}>{t(AppLocalizations.loginOrSignUp)}</TitleSemiBold>

      <Spacing height={20} />

      <AppInput hint={t(AppLocalizations.emailPlacehoder)}
        /* onChangeText={handleEmailChange} */
        isValid={isValidated}
        textValue={email}
        onChangeText={(value) => setEmail(value)}
      />

      <Spacing height={15} />

      <AppInput hint={t(AppLocalizations.passwordPlaceholder)} isObscure={true} 

        textValue={senha}
        onChangeText={(value)=> setSenha(value)}
      />

      <Spacing height={10} />

      <LinkButton
        size={14}
        color={AppColors.grayV4}
        alignSelf={Flex.flexStart}
        text={t(AppLocalizations.forgotPassword)}
        onTap={() => {
          push(navigation, RouteKeys.forgotPassword)
        }}
        
      />

      <Spacing height={30} />

      <AppButton
        textButton={t(AppLocalizations.enterButton).toUpperCase()}
        isLoading={isLoading}
        onTap={async () => {

            try {
              setIsLoading(true)
              const data = await login(email, senha)
              console.log(data)

              await AppStorage.write(AppStorage.token, data)

              const userData = await tokenDecode();

              push(navigation, userData.role == "paciente" ? RouteKeys.tabNavigationPatient : RouteKeys.tabNavigationDoctor, true)

              console.log(await AppStorage.read(AppStorage.token))
              setIsLoading(false)
            } catch (e) {
              console.log(e);
              setIsLoading(false)
            }
        }} />

      <Spacing height={15} />

      <AppButton
        textButton={t(AppLocalizations.enterWithGoogle).toUpperCase()}
        isOutlined={true}
        SvgIcon={
          <SvgIcon
            name={Icon.google}
            color={AppColors.secondaryV6}
            size={15} />
        } />

      <Spacing height={30} />

      <Row alignItems={Flex.center} justifyContent={Flex.center} >
        <TitleSemiBold
          size={14}
          color={AppColors.grayV2}>
          {t(AppLocalizations.dontHaveAccount)}
        </TitleSemiBold>
        <Spacing width={5} />
        <LinkButton
          onTap={() => { push(navigation, RouteKeys.createAccount) }}
          color={AppColors.secondaryV6}
          text={t(AppLocalizations.createAccount)}
        />

      </Row>

    </AuthContainer>
  )
} 3