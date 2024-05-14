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
import * as ImagePicker from 'expo-image-picker'
import { AppToast } from "../components/AppToast"
import AppLocalizations from "../settings/AppLocalizations"
import { useRoute } from "@react-navigation/native"

const AppCameraView = styled(Camera)`
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
    width: 63px;
    height: 63px;
    border-radius: 5px;
`


export default function AppCamera({ navigation }) {
    const cameraRef = useRef(null)
    const [facing, setFacing] = useState(CameraType.back);
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [latestPhoto, setLatestPhoto] = useState(null) //salva a ultima foto na galeria
    const [galeryImage, setGaleryImage] = useState([])
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    const { params } = useRoute()

    useEffect(() => {
        if (params.screenToPop == RouteKeys.medicalRecordScreen) {
            navigation.setOptions({ headerShown: true});
        } else {
            navigation.setOptions({ headerShown: false});
        }

        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();

            setHasCameraPermission(cameraStatus.status === 'granted');
        })();

     
            GetLastPhoto();
    
    }, []);

    async function SelectImageGallery() {

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });
    
        if (!result.canceled) {
            setImage( result.assets[0].uri)
        }
        
    }

    async function GetLastPhoto() {
        const {assets} = await MediaLibrary.getAssetsAsync({sortBy : [[MediaLibrary.SortBy.creationTime, false]], first: 1 })
        setGaleryImage(assets)

    }

    const takePicture = async () => {
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync(null)
            setImage(data.uri);
        }
    }

    if (hasCameraPermission === false) {
        AppToast.showErrorToast(
            t(AppLocalizations.cameraAccessDeniedTitle),
            t(AppLocalizations.cameraAccessDeniedDescription)
        );
        AppNavigation.pop(navigation)
    }
    return (
        <Container paddingTop={0} paddingRight={0} paddingLeft={0} paddingBottom={0} alignItems={Flex.flexStart}>

            {image == null ? (
                <AppCameraView
                    ratio='16:9'
                    ref={cameraRef}
                    type={facing}
                >
                    <CameraBox>

                        <ButtonBox>
                           {galeryImage && galeryImage.map ((assets) => ( <TouchableOpacity key={Math.random()} onPress= {() => (SelectImageGallery())}><LastPhoto
                                source ={{uri: assets.uri}}
                               
                            /></TouchableOpacity>))}

                            <ButtonCamera activeOpacity={0.5} onPress={() => takePicture()}>
                                <SvgIcon name={Icon.camera} color={AppColors.primary} size={30} />
                            </ButtonCamera>

                            <ButtonCamera activeOpacity={0.5} onPress={() => setFacing(facing == CameraType.front ? CameraType.back : CameraType.front)}>
                                <SvgIcon name={Icon.rotateCamera} color={AppColors.primary} size={30} />
                            </ButtonCamera>
                      
                        </ButtonBox>

                    </CameraBox>

                </AppCameraView>
            ) :
                (
                    <>
                        <ImageBox>
                            <RenderedImage source={{ uri: image }} resizeMode="cover" >

                                <ButtonBox isWhite={false}>
                                    <ButtonCamera activeOpacity={0.5} onPress={() => setImage(null)}>
                                        <SvgIcon name={Icon.wrong} color={AppColors.primary} size={35} />
                                    </ButtonCamera>

                                    <ButtonCamera
                                    getMediaLibrary = {true}
                                    onPress={() => {
                                        AppNavigation.popWithData(navigation, params.screenToPop, {image: image})
                                    }}
                                    activeOpacity={0.5}>
                                        <SvgIcon name={Icon.check} color={AppColors.primary} size={35} />
                                    </ButtonCamera>
                                </ButtonBox>

                            </RenderedImage>
                        </ImageBox>
                    </>

                )}

        </Container>
    );
}
