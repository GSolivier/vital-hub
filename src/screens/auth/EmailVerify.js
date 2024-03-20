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
import { useState } from "react";
import { TextAlign } from "../../settings/AppEnums";
import { RouteKeys, pop, push } from "../../settings/routes/RouteActions";

export default function EmailVerify({ navigation }) {
    const [codeValue, setCodeValue] = useState('');

    const { params } = useRoute();

    return (
        <AuthContainer hasLeading={true} isClosable={true} onTap={() => { pop(navigation) }}>
            <Image source={AppAssets.appLogoDark} />
            <Spacing height={25}/>
            <TitleSemiBold size={20}>{t(AppLocalizations.emailVerify)}</TitleSemiBold>
            <Spacing height={15}/>
            <TextMedium textAlign={TextAlign.center}>{t(AppLocalizations.emailVerifyHint)} <TextMedium color={AppColors.secondary}>{params.email}</TextMedium></TextMedium>
            <Spacing height={20}/>
            <AppCodeInput onValueChange={setCodeValue}/>
            <Spacing height={30}/>
            <AppButton textButton={t(AppLocalizations.enterButton).toUpperCase()} onTap={() => {push(navigation, RouteKeys.redefinePassword)}}/>
            <Spacing height={30}/>
            <LinkButton text={t(AppLocalizations.resentCode)} color={AppColors.secondaryV1} />
        </AuthContainer>
    );
}