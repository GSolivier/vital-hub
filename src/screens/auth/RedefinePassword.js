import { Image } from 'react-native'
import React, { useState } from 'react'
import AuthContainer from './widgets/AuthContainer'
import { AppAssets } from '../../assets/AppAssets';
import { Spacing } from '../../components/Container';
import { TextMedium, TitleSemiBold } from '../../settings/AppFonts';
import AppLocalizations from '../../settings/AppLocalizations';
import t from '../../locale';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { AppNavigation, RouteKeys } from '../../settings/routes/RouteActions';
import api from '../../settings/AppApi';
import { AppToast } from '../../components/AppToast';
import { useRoute } from '@react-navigation/native';

export default function RedefinePassword({ navigation }) {

    const [novaSenha, setNovaSenha] = useState('')
    const [confirmaSenha, setConfirmaSenha] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { params } = useRoute();

    async function ValidarSenha() {

        if (novaSenha == confirmaSenha) {
            setIsLoading(true)
            await api.put(`/Usuario/AlterarSenha?email=${params.email}`, {senhaNova: novaSenha})
            .then(response => {
                AppNavigation.push(navigation, RouteKeys.loginScreen, {email: params.email}, true)
            })
        } else {
            AppToast.showErrorToast(t(AppLocalizations.passNotEqual))
        }
        setIsLoading(false)
    }
    

    return (
        <AuthContainer hasLeading={true} isClosable={true} onTap={() => { AppNavigation.pop(navigation) }}>
            <Image source={AppAssets.appLogoDark} />
            <Spacing height={25} />
            <TitleSemiBold size={20}>{t(AppLocalizations.redefinePassword)}</TitleSemiBold>
            <Spacing height={15} />
            <TextMedium>{t(AppLocalizations.redefinePasswordHint)}</TextMedium>
            <Spacing height={20} />
            <AppInput isObscure hint={t(AppLocalizations.newPasswordPlaceHolder)}
            textValue={novaSenha}
            onChangeText={(value)=>setNovaSenha(value)}
            />
            <Spacing height={15} />
            <AppInput isObscure hint={t(AppLocalizations.confirmNewPasswordPlaceHolder)}
            textValue={confirmaSenha}
            onChangeText={(value)=>setConfirmaSenha(value)}
            />
            <Spacing height={30} />
            <AppButton isDisabled={(!confirmaSenha && !novaSenha) && confirmaSenha != novaSenha} isLoading={isLoading} textButton={t(AppLocalizations.confirmNewPasswordPlaceHolder).toUpperCase()}
            onTap={() =>{ValidarSenha()}}
            />
        </AuthContainer>
    )
}