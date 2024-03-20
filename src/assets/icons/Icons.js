import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';

export const IconFamily = {
    antDesign: AntDesign,
    entypo: Entypo,
    evilIcons: EvilIcons,
    feather: Feather,
    fontAwesome: FontAwesome,
    fontAwesome5: FontAwesome5,
    fontAwesome6: FontAwesome6,
    fontisto: Fontisto,
    foundation: Foundation,
    ionIcons: Ionicons,
    materialCommunityIcons: MaterialCommunityIcons,
    materialIcons: MaterialIcons,
    octicons: Octicons,
    simpleLineIcons: SimpleLineIcons,
    zocial: Zocial
};

export const Icon = {
    google: {
        name: 'google',
        family: IconFamily.antDesign
    },
    arrowLeft: {
        name: 'arrowleft',
        family: IconFamily.antDesign
    },
    close: {
        name: 'close',
        family: IconFamily.antDesign
    },
    notifications: {
        name: 'notifications',
        family: IconFamily.ionIcons
    },
    clock: {
        name: 'clock',
        family: IconFamily.materialCommunityIcons
    },
    calendarCheck: {
        name: 'calendar-check',
        family: IconFamily.fontAwesome6
    },
    hospital: {
        name: 'hospital',
        family: IconFamily.fontAwesome6
    },
    circleUser: {
        name: 'circle-user',
        family: IconFamily.fontAwesome6
    },
    stethoscope: {
        name: 'stethoscope',
        family: IconFamily.fontAwesome5
    },
    star: {
        name: 'star',
        family: IconFamily.antDesign
    },
    calendar: {
        name: 'calendar',
        family: IconFamily.materialCommunityIcons
    },
    arrowDropDown: {
        name: 'caret-down',
        family: IconFamily.fontAwesome6
    },
    arrowDropUp: {
        name: 'caret-up',
        family: IconFamily.fontAwesome6
    },
    cameraPlus: {
        name: 'camera-plus-outline',
        family: IconFamily.materialCommunityIcons
    },
    fileAlert: {
        name: 'file-alert-outline',
        family: IconFamily.materialCommunityIcons
    },
    dotCircle: {
        name: 'dot-circle',
        family: IconFamily.fontAwesome5
    },
    check: {
        name: 'check',
        family: IconFamily.feather
    },
    wrong: {
        name: 'x',
        family: IconFamily.feather
    },
    zoomOut: {
        name: 'image-filter-center-focus-weak',
        family: IconFamily.materialCommunityIcons
    },
    camera: {
        name: 'camera',
        family: IconFamily.fontAwesome
    },
    addPhoto: {
        name: 'add-photo-alternate',
        family: IconFamily.materialIcons
    }
};



export default function SvgIcon({ name, size = 24, color = "black" }) {

    const iconName = name.name;
    const IconComponent = name.family;

    return <IconComponent name={iconName} size={size} color={color} />;

}