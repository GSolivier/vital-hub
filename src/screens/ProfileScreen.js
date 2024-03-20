import React, { useRef, useState } from 'react'
import { Container, Row, Spacing } from '../components/Container'
import styled from 'styled-components/native'
import { USER_LOGGED } from '../settings/AppUtils'
import { TextMedium, TitleSemiBold } from '../settings/AppFonts'
import { AppColors } from '../settings/AppColors'
import AppInput from '../components/AppInput'
import { Flex, JustifyContent } from '../settings/AppEnums'
import t, { changeLanguage } from '../locale'
import AppLocalizations from '../settings/AppLocalizations'
import { Platform, Pressable, ScrollView, View } from 'react-native'
import AppButton from '../components/AppButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import SvgIcon, { Icon } from '../assets/icons/Icons'

const HeaderImage = styled.Image`
    width: 100%;
    height: 40%;
`

const InfoBox = styled.View`
    width: 80%;
    padding: 25px;
    elevation: 5px;
    align-items: center;
    background-color: ${AppColors.white};
    border-radius: 5px;
    position: absolute;
    z-index: 9999;
    top: 35%;
    align-self: center;
`

const InputContainer = styled.View`
    flex: 0.5;
`

export default function ProfileScreen({ user, navigation }) {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [isEditable, setIsEditable] = useState(false)

    const formatDate = (rawDate) => {
        let date = new Date(rawDate)

        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        day = day < 10 ? `0${day}` : day
        month = month < 10 ? `0${month}` : month

        return `${day}/${month}/${year}`
    }

    const toggleDatePicker = () => {
        setOpen(!open);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate)

            if (Platform.OS === "android") {
                toggleDatePicker()

                setDateOfBirth(formatDate(currentDate));
            }
        } else {
            toggleDatePicker()
        }
        aceEditorRef.current.blur()
    }

    const aceEditorRef = useRef();

    return (
        <>
            <HeaderImage source={{ uri: USER_LOGGED.imagePath }} />
            <InfoBox>
                <TitleSemiBold size={16}>{USER_LOGGED.name}</TitleSemiBold>
                <Spacing height={10} />
                <TextMedium size={14}>{USER_LOGGED.email}</TextMedium>
            </InfoBox>
            <ScrollView>
                <Container justifyContent={Flex.flexStart}>
                    <Spacing height={80} />

                    <Pressable style={{width: '100%'}} onPress={isEditable ? toggleDatePicker : null}>
                        <View style={{width: '100%'}} pointerEvents='none'>
                            <AppInput
                                isEditable={isEditable}
                                label={t(AppLocalizations.dateOfBirth)}
                                textValue={formatDate(date)}
                                showSoftInputOnFocus={false}
                                Icon={<SvgIcon name={Icon.calendar} color={isEditable ? AppColors.primary : AppColors.gray} />}
                            />
                        </View>
                    </Pressable>
                    <Spacing height={24} />
                    <AppInput
                        isEditable={isEditable}
                        label={t(AppLocalizations.cpf)}
                        textValue={'426********'} />
                    <Spacing height={20} />
                    <AppInput
                        isEditable={isEditable}
                        label={t(AppLocalizations.adress)}
                        textValue={'Rua Vicenzo da Silva, 181'} />
                    <Spacing height={24} />
                    <Row justifyContent={Flex.spaceBetween} width={'100%'}>
                        <InputContainer>
                            <AppInput isEditable={isEditable} label={t(AppLocalizations.cep)} hint={'09586-754'} />
                        </InputContainer>
                        <Spacing width={32} />
                        <InputContainer>
                            <AppInput isEditable={isEditable} label={t(AppLocalizations.city)} hint={'Moema-SP'} />
                        </InputContainer>
                    </Row>
                    <Spacing height={32} />
                    <AppButton textButton={t(AppLocalizations.saveButton).toUpperCase()} onTap={() => setIsEditable(false)}  />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.editButton).toUpperCase()} onTap={() => setIsEditable(true)} />
                    <Spacing height={30} />
                    <AppButton textButton={t(AppLocalizations.logOut).toUpperCase()} mainColor={AppColors.red} />
                </Container>
            </ScrollView>

            {open ? <DateTimePicker
                display='calendar'
                onChange={onChange}
                value={date}

            /> : <Spacing />}

        </>
    )
}