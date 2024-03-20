import styled from "styled-components/native";
import { Container } from "../../../components/Container";
import { AppColors } from "../../../settings/AppColors";
import SvgIcon, { Icon } from "../../../assets/icons/Icons";

export const Leading = styled.TouchableOpacity`
    background-color: rgba(73, 179, 186, 0.15);
    border-radius: 999px;
    padding: 8px;
    position: absolute;
    top: 120px;
    left: 30px;
`

export default function AuthContainer({isClosable = false,hasLeading = false, children, onTap}){
    return(
        <Container>
            {hasLeading ? <Leading onPress={onTap} >{isClosable ? <SvgIcon  name={Icon.close} color={AppColors.primaryV1}></SvgIcon> : <SvgIcon  name={Icon.arrowLeft} color={AppColors.primaryV1}></SvgIcon>}</Leading> : null}
            {children}
        </Container>
    );
}