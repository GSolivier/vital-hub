import React from 'react'
import AppDialog from '../../../../components/AppDialog'
import { Flex } from '../../../../settings/AppEnums'
import styled from 'styled-components/native'
import AppButton, { LinkButton } from '../../../../components/AppButton'
import t from '../../../../locale'
import AppLocalizations from '../../../../settings/AppLocalizations'
import { AppColors } from '../../../../settings/AppColors'
import { Spacing } from '../../../../components/Container'

const ImageModal = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`

const Box = styled.View`
    width: 100%;
    height: 75%;
`

export default function SeeImageModal({ visible, onClose, image, deleteImage }) {
    return (
        <AppDialog
            visible={visible}
            onClose={onClose}
            justifyContentBox={Flex.flexStart}
            padding={20}
            paddingInside={30}
            
        >
            <Box><ImageModal source={{ uri: image }} /></Box>

            <Spacing height={30} />
            <AppButton onTap={onClose} textButton={t(AppLocalizations.confirmPhoto).toUpperCase()} mainColor={AppColors.primary} />
            <Spacing height={30} />
            <AppButton onTap={deleteImage} textButton={t(AppLocalizations.deleteImage).toUpperCase()} mainColor={AppColors.red} />
        </AppDialog>
    )
}