import Toast, { ErrorToast } from "react-native-toast-message";
import { FontFamily } from "../settings/AppFonts";
import { AppColors } from "../settings/AppColors";


export const AppToast = {
    showErrorToast: showErrorToast,
    showSucessToast: showSucessToast,
    showInfoToast: showInfoToast
}

export const toastConfig = {
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 15,
                color: AppColors.red
            }}
            style={{height: undefined, maxHeight: 200, paddingVertical: 5, borderLeftColor: AppColors.red,}}
            text2Style={{
                fontSize: 12
            }}
        />
    ),
}

async function showErrorToast(title = '', message = '') {
    Toast.show({
        type: 'error',
        text1: title,
        text2: message,
    })
}
async function showSucessToast(title = '', message = '') {
    Toast.show({
        type: 'sucess',
        text1: title,
        text1Style: {
            fontFamily: FontFamily.montSerratBold,
            fontSize: 16
        },
        text2: message,
        text2Style: {
            fontFamily: FontFamily.quicSandMedium,
            fontSize: 14
        }
    })
}
async function showInfoToast(title = '', message = '') {
    Toast.show({
        type: 'info',
        text1: title,
        text1Style: {
            fontFamily: FontFamily.montSerratBold,
            fontSize: 14
        },
        text2: message,
        text2Style: {
            fontFamily: FontFamily.quicSandMedium,
            fontSize: 14
        }
    })
}