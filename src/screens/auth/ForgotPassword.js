import React, { useState } from 'react'
import AuthContainer from './widgets/AuthContainer'
import { AppAssets } from '../../assets/AppAssets'
import { Image } from 'react-native'
import { Spacing } from '../../components/Container';
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts';
import t from '../../locale';
import AppLocalizations from '../../settings/AppLocalizations';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { TextAlign } from '../../settings/AppEnums';
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions';
import { AppColors } from '../../settings/AppColors';

export default function ForgotPassword({ navigation }) {

    const [email, setEmail] = useState('')

    return (
        <AuthContainer hasLeading={true} onTap={() => { AppNavigation.pop(navigation) }}>
            <Image source={AppAssets.appLogoDark} />
            <Spacing height={25} />
            <TitleSemiBold size={20} >{t(AppLocalizations.recoveryPassword)}</TitleSemiBold>
            <Spacing height={15} />
            <TextMedium color={AppColors.grayV3} textAlign={TextAlign.center}>{t(AppLocalizations.recoveryPasswordHint)}</TextMedium>
            <Spacing height={20} />
            <AppInput
                hint={t(AppLocalizations.emailPlacehoder)}
                textValue={email}
                onChangeText={setEmail} />
            <Spacing height={30} />
            <AppButton
                textButton={t(AppLocalizations.continueButton).toUpperCase()}
                onTap={() => { AppNavigation.push(navigation, RouteKeys.emailVerify, { email: email }) }}
            />

        </AuthContainer>
    )
}