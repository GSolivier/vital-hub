import { Image } from 'react-native'
import React from 'react'
import AuthContainer from './widgets/AuthContainer'
import { AppAssets } from '../../assets/AppAssets'
import { Spacing } from '../../components/Container'
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts'
import t from '../../locale'
import AppLocalizations from '../../settings/AppLocalizations'
import AppInput from '../../components/AppInput'
import AppButton, { LinkButton } from '../../components/AppButton'
import { TextAlign } from '../../settings/AppEnums'
import { pop } from '../../settings/routes/RouteActions'

export default function CreateAccount({ navigation }) {
  return (
    <AuthContainer>
      <Image source={AppAssets.appLogoDark} />
      <Spacing height={25} />
      <TitleSemiBold size={20}>{t(AppLocalizations.createAccountTitle)}</TitleSemiBold>
      <Spacing height={15} />
      <TextMedium textAlign={TextAlign.center}>{t(AppLocalizations.createAccountHint)}</TextMedium>
      <Spacing height={20} />
      <AppInput hint={t(AppLocalizations.emailPlacehoder)} />
      <Spacing height={15} />
      <AppInput isObscure hint={t(AppLocalizations.passwordPlaceholder)} />
      <Spacing height={15} />
      <AppInput isObscure hint={t(AppLocalizations.confirmPassword)} />
      <Spacing height={30} />
      <AppButton textButton={t(AppLocalizations.signUp).toUpperCase()} />
      <Spacing height={30} />
      <LinkButton text={t(AppLocalizations.cancel)} onTap={() => pop(navigation)}/>
    </AuthContainer>
  )
}