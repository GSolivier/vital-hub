
import React from 'react'
import { TextMedium, TextSemiBold } from '../../../settings/AppFonts'
import { Row, Spacing } from '../../../components/Container'
import AppButton, { LinkButton } from '../../../components/AppButton'
import { Flex, TextAlign, TextDecoration } from '../../../settings/AppEnums'
import t from '../../../locale'
import styled from 'styled-components/native'
import AppDialog from '../../../components/AppDialog'
import { AppNavigation, RouteKeys } from '../../../settings/routes/RouteActions'
import AppLocalizations from '../../../settings/AppLocalizations'
import moment from 'moment'

const ImageModal = styled.Image`
    width: 100%;
    height: 40%;
    border-radius: 10px;
`

export default function SeeMedicalRecordDialog({ visible, onClose, appointment, navigation }) {

    if (!appointment) {
        return null
    }
    const handleInsertMedicalRecord = () => {
        AppNavigation.push(navigation, RouteKeys.insertMedicalRecordScreen, { appointment: appointment });
        onClose();
    };
    return (
        <AppDialog
            visible={visible}
            flex={0.6}
        >
            <ImageModal source={{ uri: appointment.imagePath }} />
            <Spacing height={20} />
            <TextSemiBold textAlign={TextAlign.center} size={20}>
                {appointment.paciente && appointment.paciente.idNavigation
                    ? appointment.paciente.idNavigation.nome
                    : ""
                }
            </TextSemiBold>
            <Spacing height={15} />
            <Row justifyContent={Flex.spaceAround} width={'100%'}>
                <TextMedium size={14} textAlign={TextAlign.center}>{appointment.paciente && appointment.paciente.idNavigation
                    ? moment(moment()).diff(appointment.paciente.dataNascimento, 'years')
                    : ""
                } {t(AppLocalizations.yearsOld)}</TextMedium>
                <TextMedium size={14} textAlign={TextAlign.center}>
                {appointment.paciente && appointment.paciente.idNavigation
                    ? appointment.paciente.idNavigation.email
                    : ""
                }
                </TextMedium>
            </Row>
            <Spacing height={30} />
            <AppButton textButton={t(AppLocalizations.insertMedicalRecordButton).toUpperCase()}
                onTap={handleInsertMedicalRecord} />
            <Spacing height={30} />
            <LinkButton
                text={t(AppLocalizations.cancel)}
                textDecoration={TextDecoration.underline}
                alignSelf={Flex.center}
                onTap={onClose}
            />
        </AppDialog>
    )
}