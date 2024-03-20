import { Image } from 'react-native'
import React from 'react'
import AuthContainer from './widgets/AuthContainer'
import { AppAssets } from '../../assets/AppAssets';
import { Spacing } from '../../components/Container';
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts';
import AppLocalizations from '../../settings/AppLocalizations';
import t from '../../locale';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { pop } from '../../settings/routes/RouteActions';

export default function RedefinePassword({ navigation }) {
    return (
        <AuthContainer hasLeading={true} isClosable={true} onTap={() => { pop(navigation) }}>
            <Image source={AppAssets.appLogoDark} />
            <Spacing height={25} />
            <TitleSemiBold size={20}>{t(AppLocalizations.redefinePassword)}</TitleSemiBold>
            <Spacing height={15} />
            <TextMedium>{t(AppLocalizations.redefinePasswordHint)}</TextMedium>
            <Spacing height={20} />
            <AppInput isObscure hint={t(AppLocalizations.newPasswordPlaceHolder)}/>
            <Spacing height={15} />
            <AppInput isObscure hint={t(AppLocalizations.confirmNewPasswordPlaceHolder)}/>
            <Spacing height={30} />
            <AppButton textButton={t(AppLocalizations.confirmNewPasswordPlaceHolder).toUpperCase()}/>
        </AuthContainer>
    )
}