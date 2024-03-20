import React from 'react'
import AppButton, { LinkButton } from '../../../components/AppButton';
import { Flex, TextDecoration } from '../../../settings/AppEnums';
import { Spacing } from '../../../components/Container';
import { TextMedium, TitleSemiBold } from '../../../settings/AppFonts';
import t from '../../../locale';
import AppLocalizations from '../../../settings/AppLocalizations';
import AppDialog from '../../../components/AppDialog';


export default function CancelExamDialog({ visible, onClose, appointment }) {

    return (
        <AppDialog
        visible={visible}
        justifyContentContainer={Flex.center}
        >
            <TitleSemiBold textAlign={Flex.center} size={20}>{t(AppLocalizations.cancelExam)}</TitleSemiBold>
            <Spacing height={15} />
            <TextMedium textAlign={Flex.center}>{t(AppLocalizations.cancelExamHint)}</TextMedium>
            <Spacing height={30} />
            <AppButton textButton={t(AppLocalizations.confirm).toUpperCase()} onTap={() => console.log(appointment)} />
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