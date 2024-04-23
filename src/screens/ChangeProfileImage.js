import { Camera, CameraType } from "expo-camera"
import styled from "styled-components/native"
import { AppColors } from "../settings/AppColors"
import { useEffect, useRef, useState } from "react"
import { Image, ToastAndroid, TouchableOpacity } from "react-native"
import { AppNavigation, RouteKeys } from "../settings/routes/RouteActions"
import { Container, Spacing } from "../components/Container"
import SvgIcon, { Icon } from "../assets/icons/Icons"
import { Flex } from "../settings/AppEnums"
import * as MediaLibrary from 'expo-media-library'

const AppCamera = styled(Camera)`
    flex: 1;
    width: 100%;

`

const CameraBox = styled.View`
flex: 1;
width: 100%;
justify-content: flex-end;
`

const ButtonBox = styled.View`
    flex: 0.15;
    width: 100%;
    background-color: ${({isWhite = false}) => !isWhite ? AppColors.transparent : AppColors.white};
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    padding: 20px;
    z-index: 2;
`

const ButtonCamera = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${AppColors.white};
    border-radius: 10px;
`

const ImageBox = styled.View`
    flex: 1;
    position: relative;
`

const RenderedImage = styled.ImageBackground`
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
`
const LastPhoto = styled.Image`
    width: 50px;
    height: 50px;
`


export default function ChangeProfileImage({ navigation , getMediaLibrary = true}) {
    const cameraRef = useRef(null)
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [latestPhoto, setLatestPhoto] = useState(null) //salva a ultima foto na galeria
    const [galeryImage, setGaleryImage] = useState([])

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraStatus.status === 'granted');
        })();

        if (getMediaLibrary) {
            GetLastPhoto();
        }
    }, []);

    async function GetLastPhoto() {
        const assets = await MediaLibrary.getAssetsAsync({sortBy : [[MediaLibrary.SortBy.creationTime, false]], first: 1 })
        setGaleryImage(assets.assets)
        console.log(assets);
    }

    const takePicture = async () => {
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync(null)
            setImage(data.uri);
        }
    }

    if (hasCameraPermission === false) {
        ToastAndroid.showWithGravity(
            'Acesso a camera nao permitido',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
        AppNavigation.pop(navigation)
    }
    return (
        <Container paddingTop={0} paddingRight={0} paddingLeft={0} paddingBottom={0} alignItems={Flex.flexStart}>

            {image == null ? (
                <AppCamera
                    ratio='16:9'
                    ref={cameraRef}
                    type={CameraType.back}
                    
                >
                    <CameraBox>

                        <ButtonBox>
                           {galeryImage && galeryImage.map ((assets) => ( <LastPhoto
                                source ={{uri: assets.uri}}
                            />))}
                            <ButtonCamera activeOpacity={0.5} onPress={() => takePicture()}>
                                <SvgIcon name={Icon.camera} color={AppColors.primary} size={30} />
                            </ButtonCamera>
                        
                        </ButtonBox>

                    </CameraBox>

                </AppCamera>
            ) :
                (
                    <>
                        <ImageBox>
                            <RenderedImage source={{ uri: image }} resizeMode="cover" >

                                <ButtonBox isWhite={true}>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => setImage(null)}>
                                        <SvgIcon name={Icon.wrong} color={AppColors.primary} size={80} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    getMediaLibrary = {true}
                                    onPress={() => {
                                        AppNavigation.popWithData(navigation, RouteKeys.profileScreen, {image: image})
                                    }}
                                    activeOpacity={0.5}>
                                        <SvgIcon name={Icon.check} color={AppColors.primary} size={80} />
                                    </TouchableOpacity>
                                </ButtonBox>

                            </RenderedImage>
                        </ImageBox>
                    </>

                )}

        </Container>
    );
}
