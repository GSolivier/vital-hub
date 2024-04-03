import React from 'react'
import AppDialog from '../../../../components/AppDialog'
import { AppNavigation, RouteKeys } from '../../../../settings/routes/RouteActions';
import { Row, Spacing } from '../../../../components/Container';
import { TextMedium, TitleSemiBold } from '../../../../settings/AppFonts';
import { Flex, TextAlign, TextDecoration } from '../../../../settings/AppEnums';
import AppLocalizations from '../../../../settings/AppLocalizations';
import t from '../../../../locale';
import AppButton, { LinkButton } from '../../../../components/AppButton';
import styled from 'styled-components';

const ImageModal = styled.Image`
    width: 100%;
    height: 40%;
    border-radius: 10px;
`

export default function SeeAppointmentLocalDialog({ visible, onClose, appointment, navigation }) {

  if (!appointment) {
    return null;
  }
  const handleInsertMedicalRecord = () => {
    AppNavigation.push(navigation, RouteKeys.seeAppointmentLocalScreen, { appointment: appointment });
    onClose();
  };
  return (
    <AppDialog
      visible={visible}
      flex={0.6}
    >
      <ImageModal source={{ uri: appointment.imagePath }} />
      <Spacing height={20} />
      <TitleSemiBold textAlign={TextAlign.center} size={20}>
        {appointment.medicoClinica && appointment.medicoClinica.medico.idNavigation
          ? appointment.medicoClinica.medico.idNavigation.nome
          : ""
        }
      </TitleSemiBold>
      <Spacing height={15} />
      <Row >

        <TextMedium size={14} textAlign={TextAlign.center}>
          {appointment.medicoClinica && appointment.medicoClinica.medico.especialidade
            ? appointment.medicoClinica.medico.especialidade.especialidade1
            : ""
          }
        </TextMedium>
        <Spacing width={20} />
        <TextMedium size={14} textAlign={TextAlign.center}>
          CRM-{appointment.medicoClinica && appointment.medicoClinica.medico
            ? appointment.medicoClinica.medico.crm
            : ""
          }
        </TextMedium>
      </Row>
      <Spacing height={30} />
      <AppButton textButton={t(AppLocalizations.seeAppointmentLocal).toUpperCase()}
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