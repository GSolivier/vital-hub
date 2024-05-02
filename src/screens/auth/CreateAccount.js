import { Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthContainer from './widgets/AuthContainer'
import { AppAssets } from '../../assets/AppAssets'
import { Spacing } from '../../components/Container'
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts'
import t from '../../locale'
import AppLocalizations from '../../settings/AppLocalizations'
import AppInput from '../../components/AppInput'
import AppButton, { LinkButton } from '../../components/AppButton'
import { TextAlign } from '../../settings/AppEnums'
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions'
import { validateEmail, validatePassword } from '../../settings/AppUtils'

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  useEffect
  return (
    <AuthContainer>
      <Image source={AppAssets.appLogoDark} />
      <Spacing height={25} />
      <TitleSemiBold size={20}>{t(AppLocalizations.createAccountTitle)}</TitleSemiBold>
      <Spacing height={15} />
      <TextMedium textAlign={TextAlign.center}>{t(AppLocalizations.createAccountHint)}</TextMedium>
      <Spacing height={20} />
      <AppInput
        isValid={validateEmail(email)}
        keyboardType='email-address'
        hint={t(AppLocalizations.emailPlacehoder)}
        onChangeText={(value) => setEmail(value)}
        textValue={email}
      />
      <Spacing height={15} />

      <AppInput

        isObscure
        hint={t(AppLocalizations.passwordPlaceholder)}
        onChangeText={(value) => setPassword(value)}
        textValue={password}
      />

      <Spacing height={15} />

      <AppInput
        isValid={confirmPassword ? validatePassword(password, confirmPassword) : true}
        errorMessage={'As senhas não coincidem'}
        isObscure
        onChangeText={(value) => setConfirmPassword(value)}
        hint={t(AppLocalizations.confirmPassword)}
        textValue={confirmPassword} />

      <Spacing height={30} />

      <AppButton
        isDisabled={!validateEmail(email) || !validatePassword(password, confirmPassword) || !email || !password || !confirmPassword}
        textButton={t(AppLocalizations.continueButton).toUpperCase()}
        onTap={() => {
          AppNavigation.push(navigation, RouteKeys.createAccountAdditionalInfo, { email: email, password: password })
        }} />
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={() => AppNavigation.pop(navigation)} />
    </AuthContainer>
  )
}