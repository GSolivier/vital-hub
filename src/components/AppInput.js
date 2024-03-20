import React, { useState } from 'react'
import styled from 'styled-components/native'
import { AppColors } from '../settings/AppColors'
import { FontFamily, TextSemiBold } from '../settings/AppFonts'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { Spacing } from './Container'

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

const InputBox = styled.View`
        width: 100%;
        gap: 10px;
`

const IconBox = styled.View`
    position: absolute;
    right: 5%;
    top: 55%;
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
    textValue,
    onEdit = null,
    focus = null,
    focusOut = null,
    isValid = true,
    onChange = null,
    ...rest
}) {
    const handleInputChange = (value) => {
        onEdit === null ? null : onEdit(value);
    };



    return (
        <InputBox>
            {label ? (<TextSemiBold size={16}>{label}</TextSemiBold>) : null}
            <Input
                placeholder={hint}
                placeholderTextColor={isEditable ? textColor : AppColors.grayV2}
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
                {...rest}
            />
            <IconBox>
                {Icon ? Icon : <Spacing />}
            </IconBox>
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
