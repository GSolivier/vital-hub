import styled from 'styled-components/native'
import { AppColors } from '../settings/AppColors'
import { Flex } from '../settings/AppEnums'

export const Container = styled.SafeAreaView`
    padding: ${({
        paddingTop = 20, 
        paddingRight = 20, 
        paddingBottom = 20, 
        paddingLeft = 20}) => `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px `};
    align-items: ${({ alignItems = Flex.center }) => alignItems};
    justify-content: ${({ justifyContent = Flex.center }) => justifyContent};
    background-color: ${AppColors.white};
    flex: ${({flex = 1}) => flex};
    width: 100%;
`

export const Spacing = styled.View`
    width: ${({ width = 0 }) => `${width}px`};
    height: ${({ height = 0 }) => `${height}px`};
`

export const Column = styled.View`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    flex-direction: column;
    align-items: ${({ alignItems }) => alignItems};
    justify-content: ${({ justifyContent }) => justifyContent};
    align-self: ${({ alignSelf }) => alignSelf};
`
export const Row = styled.View`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    flex-direction: row;
    flex-wrap: ${({isWrap = false})=> isWrap ? 'wrap' : 'nowrap'};
    align-items: ${({ alignItems }) => alignItems};
    justify-content: ${({ justifyContent }) => justifyContent};
    align-self: ${({ alignSelf }) => alignSelf};
    gap: ${({gap = 0}) => `${gap}px`}
`
