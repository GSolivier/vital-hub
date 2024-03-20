import React from 'react'
import styled from 'styled-components/native'
import { AppColors } from '../settings/AppColors'
import { Flex } from '../settings/AppEnums'

export const Dialog = styled.Modal`
`

export const DialogContainer = styled.SafeAreaView`
    justify-content: ${({ justifyContentContainer = Flex.center, isFaded = false }) => isFaded ? Flex.flexEnd : justifyContentContainer};
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    padding: ${({ padding = 30 }) => `${padding}px`};
`

export const DialogBox = styled.View`
    padding: ${({ paddingInside = 27 }) => `${paddingInside}px`};
    background-color: ${AppColors.white};
    border-radius: 10px;
    flex: ${({ flex = '0 1 auto' }) => flex};
    justify-content: ${({ justifyContentBox = Flex.center }) => justifyContentBox};
    align-items: ${({ alignItemsBox = Flex.center }) => alignItemsBox};
`

export default function AppDialog({
    visible, onClose, children, animationType = "fade", justifyContentContainer, justifyContentBox, flex, padding, isFaded, paddingInside
}) {
    return (
        <Dialog
            visible={visible}
            animationType={animationType}
            transparent={true}
            onRequestClose={() => onClose}
            statusBarTranslucent
        >
            <DialogContainer
                padding={padding}
                justifyContent={justifyContentContainer}
                isFaded={isFaded}
            >
                <DialogBox justifyContentBox={justifyContentBox} flex={flex} paddingInside={paddingInside}>
                    {children}
                </DialogBox>
            </DialogContainer>
        </Dialog>
    )
}