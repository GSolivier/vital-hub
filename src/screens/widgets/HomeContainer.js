import React from 'react'
import { Container } from '../../components/Container'
import HomeHeader from './HomeHeader'
import { Flex } from '../../settings/AppEnums';

export default function HomeContainer({ children, name, imagePath, onTapNotification, onTapProfileImage }) {
    return (
        <>
            <HomeHeader name={name} imagePath={imagePath} onTapNotification={onTapNotification} onTapProfileImage={onTapProfileImage} />
            <Container justifyContent={Flex.flexStart} paddingBottom={0} flex={1}>
                {children}
            </Container>
        </>
    )
}