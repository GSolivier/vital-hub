import { useRoute } from "@react-navigation/native";
import AuthContainer from "./widgets/AuthContainer";
import { Image } from "react-native";
import { Spacing } from "../../components/Container";
import { AppAssets } from "../../assets/AppAssets";
import { TextMedium, TitleSemiBold } from "../../settings/AppFonts";
import t from "../../locale";
import AppLocalizations from "../../settings/AppLocalizations";
import { AppColors } from "../../settings/AppColors";
import AppButton, { LinkButton } from "../../components/AppButton";
import { AppCodeInput } from "../../components/AppInput";
import { useEffect, useState } from "react";
import { TextAlign } from "../../settings/AppEnums";
import { AppNavigation, RouteKeys } from "../../settings/routes/RouteActions";
import api from "../../settings/AppApi";
import { AppToast } from "../../components/AppToast";

export default function EmailVerify({ navigation }) {
    const [codeValue, setCodeValue] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { params } = useRoute();

    async function ValidarCodigo() {
        

        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${params.email}&codigo=${codeValue}`)
        .then( ()=> {
            AppNavigation.push(navigation,RouteKeys.redefinePassword, {email: params.email});
        }).catch(error => {
            AppToast.showErrorToast(error.response.data)
        })
    }

    return (
        <AuthContainer hasLeading={true} isClosable={true} onTap={() => { AppNavigation.pop(navigation) }}>
            <Image source={AppAssets.appLogoDark} />
            <Spacing height={25}/>
            <TitleSemiBold size={20}>{t(AppLocalizations.emailVerify)}</TitleSemiBold>
            <Spacing height={15}/>
            <TextMedium textAlign={TextAlign.center}>{t(AppLocalizations.emailVerifyHint)} <TextMedium color={AppColors.secondary}>{params.email}</TextMedium></TextMedium>
            <Spacing height={20}/>
            <AppCodeInput onValueChange={setCodeValue}/>
            <Spacing height={30}/>
            <AppButton
            isDisabled={codeValue.length < 4}
             isLoading={isLoading} textButton={t(AppLocalizations.confirm).toUpperCase()} onTap={() => { ValidarCodigo()}}/>
            <Spacing height={30}/>
            <LinkButton text={t(AppLocalizations.resentCode)} color={AppColors.secondaryV1} />
        </AuthContainer>
    );
}