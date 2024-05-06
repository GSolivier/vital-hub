import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'
import { AppColors } from '../settings/AppColors'
import { FontFamily, TextMedium, TextSemiBold } from '../settings/AppFonts'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { Spacing } from './Container'
import AppLocalizations from '../settings/AppLocalizations'
import SvgIcon, { Icon } from '../assets/icons/Icons'
import { Pressable, View } from 'react-native'
import t from '../locale'
import MaskInput from 'react-native-mask-input'

const Input = styled.TextInput`
    width: 100%;
    height: ${({ isTextArea = false }) => isTextArea ? '120px' : '60px'};
    border-radius: 5px;
    border-width: 2px;
    border-color: ${({ borderColor = AppColors.primary, isValid = true, isEditable = true }) => isValid ? borderColor : AppColors.red};
    padding: 16px;
    font-family: ${FontFamily.montSerratSemiBold};
    color: ${({ color = AppColors.primaryV1, isValid = true, isEditable = true }) => !isEditable ? AppColors.grayV2 : isValid ? color : AppColors.red};
    background-color: ${({ isEditable = true }) => isEditable ? AppColors.transparent : AppColors.whiteDarker};
    `


const AppMaskInput = styled(MaskInput)`
    width: 100%;
    height: ${({ isTextArea = false }) => isTextArea ? '120px' : '60px'};
    border-radius: 5px;
    border-width: 2px;
    border-color: ${({ borderColor = AppColors.primary, isValid = true, isEditable = true }) => isValid ? borderColor : AppColors.red};
    padding: 16px;
    font-family: ${FontFamily.montSerratSemiBold};
    color: ${({ color = AppColors.primaryV1, isValid = true, isEditable = true }) => !isEditable ? AppColors.grayV2 : isValid ? color : AppColors.red};
    background-color: ${({ isEditable = true }) => isEditable ? AppColors.transparent : AppColors.whiteDarker};
`

const InputBox = styled.View`
        width: 100%;
        gap: 10px;
`

const IconBox = styled.View`
    position: absolute;
    right: 5%;
    top: ${({ label }) => label ? '55%' : '35%'};
`

export default function AppInput({
    label,
    hint,
    Icon,
    textColor = AppColors.primaryV1,
    borderColor,
    isObscure = false,
    isTextArea = false,
    isEditable = true,
    isMasked = false,
    mask = isMasked ? mask : null,
    textValue,
    onChangeText = null,
    focus = null,
    focusOut = null,
    isValid = true,
    errorMessage,
    onChange = null,
    keyboardType = 'default',
    maxLength = null,
    onEndEditing = null,
    numberOfLines = 5,
    ...rest
}) {
    const handleInputChange = (value) => {
        onChangeText === null ? null : onChangeText(value);
    };

    const handleInputChangeMasked = (masked, unmasked) => {
        onChangeText === null ? null : onChangeText(masked, unmasked);
    }


    return (
        <InputBox>
            {label ? (<TextSemiBold size={16}>{label}</TextSemiBold>) : null}
            {
                isMasked ?
                    <AppMaskInput
                        placeholder={hint}
                        placeholderTextColor={!isValid ? AppColors.red : isEditable ? textColor : AppColors.grayV2}
                        color={isValid ? textColor : AppColors.red}
                        secureTextEntry={isObscure}
                        multiline={isTextArea}
                        numberOfLines={isTextArea ? numberOfLines : 1}
                        isTextArea={isTextArea}
                        textAlignVertical={isTextArea ? 'top' : 'center'}
                        value={textValue}
                        onChangeText={handleInputChange}
                        onChange={onChange}
                        borderColor={isEditable ? borderColor : AppColors.transparent}
                        onFocus={focus}
                        onBlur={focusOut}
                        isValid={isValid}
                        editable={isEditable}
                        isEditable={isEditable}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        onEndEditing={onEndEditing}
                        mask={mask}
                        {...rest}
                    />
                    :
                    <Input
                        placeholder={hint}
                        placeholderTextColor={!isValid ? AppColors.red : isEditable ? textColor : AppColors.grayV2}
                        color={isValid ? textColor : AppColors.red}
                        secureTextEntry={isObscure}
                        multiline={isTextArea}
                        numberOfLines={isTextArea ? 5 : 1}
                        isTextArea={isTextArea}
                        textAlignVertical={isTextArea ? 'top' : 'center'}
                        value={textValue}
                        onChangeText={handleInputChange}
                        onChange={onChange}
                        borderColor={isEditable ? borderColor : AppColors.transparent}
                        onFocus={focus}
                        onBlur={focusOut}
                        isValid={isValid}
                        editable={isEditable}
                        isEditable={isEditable}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        onEndEditing={onEndEditing}
                        {...rest}
                    />
            }
            <IconBox label={label}>
                {Icon ? Icon : <Spacing />}
            </IconBox>

            {!isValid && errorMessage ? <TextSemiBold size={14} color={AppColors.red}>{errorMessage}</TextSemiBold> : null}
        </InputBox>
    )
}

const CELL_COUNT = 4;

const Cell = styled.Text`
  width: 20%;
  height: 62px;
  font-size: 40px;
  border-width: 2px;
  border-color: ${({ isFocused }) => isFocused ? AppColors.primaryV1 : AppColors.primaryV3};
  text-align: center;
  border-radius: 5px;
  color: ${AppColors.primaryV1};
  margin: 0 11px;
`;

export function AppCodeInput({ onValueChange }) {
    const [value, setValue] = useState('');

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    const handleValueChange = (newValue) => {
        setValue(newValue);
        setTimeout(() => {
            onValueChange(newValue);
        }, 0);
    };


    return (
        <CodeField
            ref={ref}
            value={value}
            onChangeText={handleValueChange}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => {
                return (
                    <Cell
                        key={index}
                        isFocused={isFocused}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Cell>);
            }}
        />

    );
}

export function AppDatePicker({ hasLabel = true, isEditable = true, textValue, toggleDatePicker }) {

    const formatDate = (rawDate) => {
        let date = new Date(rawDate)

        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        day = day < 10 ? `0${day}` : day
        month = month < 10 ? `0${month}` : month

        return `${day}/${month}/${year}`
    }



    return (
        <Pressable style={{ width: '100%' }} onPress={isEditable ? toggleDatePicker : null}>
            <View style={{ width: '100%' }} pointerEvents='none'>
                <AppInput
                    isEditable={isEditable}
                    label={hasLabel ? t(AppLocalizations.dateOfBirth) : undefined}
                    textValue={textValue ? formatDate(textValue) : "Data de nascimento"}
                    showSoftInputOnFocus={false}
                    Icon={<SvgIcon name={Icon.calendar} color={isEditable ? AppColors.primary : AppColors.gray} />}
                />
            </View>
        </Pressable>
    );
}
