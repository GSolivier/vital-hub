import React from 'react'
import AppButton, { LinkButton } from '../../../components/AppButton';
import { Flex, TextDecoration } from '../../../settings/AppEnums';
import { Spacing } from '../../../components/Container';
import { TextMedium, TitleSemiBold } from '../../../settings/AppFonts';
import t from '../../../locale';
import AppLocalizations from '../../../settings/AppLocalizations';
import AppDialog from '../../../components/AppDialog';
import api from '../../../settings/AppApi';


export default function CancelExamDialog({ visible, onClose, appointment }) {

    async function cancelExam() {
        try {
            const response = await api.put('/Consultas/Status', {}, {
                params: {
                    idConsulta: appointment.id,
                    status: "cancelada"
                }
            });
            onClose(true)
        } catch (error) {
            console.log(error.response ? error.response.data : error.request.response);
        }
    }

    return (
        <AppDialog
        visible={visible}
        justifyContentContainer={Flex.center}
        >
            <TitleSemiBold textAlign={Flex.center} size={20}>{t(AppLocalizations.cancelExam)}</TitleSemiBold>
            <Spacing height={15} />
            <TextMedium textAlign={Flex.center}>{t(AppLocalizations.cancelExamHint)}</TextMedium>
            <Spacing height={30} />
            <AppButton 
            textButton={t(AppLocalizations.confirm).toUpperCase()} 
            onTap={() => {
                cancelExam()
            }}       
            />
            <Spacing height={30} />
            <LinkButton
                text={t(AppLocalizations.cancel)}
                textDecoration={TextDecoration.underline}
                alignSelf={Flex.center}
                onTap={() => onClose(false)}
            />
        </AppDialog>
    )
}