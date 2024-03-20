import React from 'react'
import { Container } from '../../components/Container'
import HomeHeader from './HomeHeader'
import { Flex } from '../../settings/AppEnums';

export default function HomeContainer({ children, name, imagePath, onTap }) {
    return (
        <>
            <HomeHeader name={name} imagePath={imagePath} onTapNotification={onTap} />
            <Container justifyContent={Flex.flexStart} paddingBottom={0} flex={1}>
                {children}
            </Container>
        </>
    )
}