import React from 'react'
import { TextSemiBold } from '../../settings/AppFonts'
import { Row, Spacing } from '../../components/Container'
import { Flex } from '../../settings/AppEnums'
import AppButton from '../../components/AppButton'

export default function ButtonSelecter({
    selected,
    handleTabSelected,
    mainColor,
    mainTextColor,
    label,
    buttonList = [],
    spacing = 10
 }) {
    return (
        <>
            {label ? (
                <>
                    <TextSemiBold alignSelf={Flex.flexStart} size={16}>{label}</TextSemiBold>
                    <Spacing height={10} />
                </>
            ) : (<Spacing />)}
            <Row justifyContent={Flex.spaceBetween} width={'100%'}>
                {buttonList.map((buttonPreferences, index) => {
                    const isLastItem = index === buttonList.length - 1;
                    return <>

                        <AppButton
                            isOutlined={selected !== buttonPreferences.type}
                            textButton={buttonPreferences.text}
                            flex={1}
                            isCompact={true}
                            onTap={() => {
                                handleTabSelected(buttonPreferences.type)
                            }}
                            mainColor={mainColor}
                            mainTextColor={mainTextColor}
                        />
                        {!isLastItem && <Spacing width={spacing} />}
                    </>
                })}
            </Row>
        </>
    )
}