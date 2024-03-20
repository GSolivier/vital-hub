import styled from "styled-components/native";
import { AppColors } from "./AppColors";
import { TextDecoration } from "./AppEnums";


export const FontFamily = {
    montSerratBold: 'MontserratAlternates_700Bold',
    montSerratSemiBold: 'MontserratAlternates_600SemiBold',
    montSerratMedium: 'MontserratAlternates_500Medium',
    quicSandSemiBold: 'Quicksand_600SemiBold',
    quicSandMedium: 'Quicksand_500Medium',
    quickSandRegular: 'Quicksand_400Regular'
}

export const TitleSemiBold = styled.Text`
    font-family: ${FontFamily.montSerratSemiBold};
    font-size: ${({ size = 20 }) => `${size}px`};
    color: ${({ color = AppColors.grayV1 }) => color};
    text-align: ${({ textAlign = 'auto' }) => textAlign};
`

export const TitleBold = styled.Text`
font-family: ${FontFamily.montSerratBold};
font-size: ${({ size = 20 }) => `${size}px`};
color: ${({ color = AppColors.grayV1 }) => color};
text-align: ${({ textAlign = 'auto' }) => textAlign};
`
export const TitleMedium = styled.Text`
font-family: ${FontFamily.montSerratMedium};
font-size: ${({ size = 20 }) => `${size}px`};
color: ${({ color = AppColors.grayV1 }) => color};
text-align: ${({ textAlign = 'auto' }) => textAlign};
`

export const TextMedium = styled.Text`
    font-family: ${FontFamily.quicSandMedium};
    font-size: ${({ size = 16 }) => `${size}px`};
    color: ${({ color = AppColors.grayV1 }) => color};
    text-align: ${({ textAlign = 'auto' }) => textAlign};
`
export const TextRegular = styled.Text`
    font-family: ${FontFamily.quickSandRegular};
    font-size: ${({ size = 16 }) => `${size}px`};
    color: ${({ color = AppColors.grayV1 }) => color};
    text-align: ${({ textAlign = 'auto' }) => textAlign};
`

export const TextSemiBold = styled.Text`
    font-family: ${FontFamily.quicSandSemiBold};
    font-size: ${({ size = 18 }) => `${size}px`};
    color: ${({ color = AppColors.grayV1 }) => color};
    text-align: ${({ textAlign = 'auto' }) => textAlign};
    align-self: ${({ alignSelf = 'auto' }) => alignSelf};
`

export const Link = styled.Text`
    font-family: ${FontFamily.montSerratSemiBold};
    text-decoration: ${({ textDecoration = TextDecoration.underline }) => textDecoration};
    color: ${({ color = AppColors.secondary }) => color};
    font-size: ${({ size = 14 }) => `${size}px`};
`
