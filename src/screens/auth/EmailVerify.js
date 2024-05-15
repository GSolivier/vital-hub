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
import { ActivityIndicator } from "react-native-paper";

export default function EmailVerify({ navigation }) {
    const [codeValue, setCodeValue] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingResent, setIsLoadingResent] = useState(false)
    const [timeStarted, setTimeStarded] = useState(false)
    const [timer, setTimer] = useState({time: 40})
    const { params } = useRoute();

    useEffect(()=> {
       if (timeStarted) {
        if (timer.time == 0) {
            stopTimer()
        }
       }
    },[timer])

    const startTimer = () => {
        setTimeStarded(true)
        this.interval = setInterval(() => {
            setTimer(state => ({
            time: state.time - 1,
          }));
        }, 1000);
      };
      
    const stopTimer = () => {
        setTimeStarded(false)
        setTimer({
            time: 40,
          })
        clearInterval(this.interval);
      };

    async function ValidarCodigo() {
        console.log(codeValue);

        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${params.email}&codigo=${codeValue}`)
        .then(()=> {
            AppNavigation.push(navigation,RouteKeys.redefinePassword, {email: params.email}, true);
        }).catch(error => {
            AppToast.showErrorToast(error.response.data)
        })
    }

    async function EnviarEmail() {
        setIsLoadingResent(true)
        await api.post(`/RecuperarSenha?email=${params.email}`)

        .then((response) => {
            startTimer()
            AppToast.showSucessToast(response.data)
        }).catch(error => {
            AppToast.showErrorToast(error.response.data)
        })
        setIsLoadingResent(false)
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
            {isLoadingResent ?
            <ActivityIndicator/> : !timeStarted ?
            <LinkButton text={t(AppLocalizations.resentCode)} color={AppColors.secondaryV1} onTap={() => {
                EnviarEmail()
            }} /> : <Spacing/>}
            {timeStarted ? <TextMedium>{t(AppLocalizations.tryAgainResentCodeHint, {seconds: timer.time})}</TextMedium>: null}
        </AuthContainer>
    );
}