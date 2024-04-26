import t from "../locale";
import AppLocalizations from "./AppLocalizations";

export const HomeCardActionType = {
    canceled: 'canceled',
    scheduled: 'scheduled',
    carriedOut: 'carriedOut'
}

export const BottomNavigationRoute = {
    schedule: 'schedule',
    clinic: 'clinic',
    profile: 'profile'
}

export const Flex = {
    auto: 'auto',
    flexStart: 'flex-start',
    flexEnd: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
}

export const TextDecoration = {
    none: 'none',
    underline: 'underline',
    overline: 'overline',
    lineThrough: 'line-through',
    blink: 'blink',
};

export const TextAlign = {
    left: 'left',
    right: 'right',
    center: 'center',
    justify: 'justify',
    initial: 'initial',
    inherit: 'inherit',
};

export const AppointmentLevelsList = {
    routine: 1,
    exam: 2,
    urgency: 3
}

export const AppointmentLevelsButtons = [
    {
        text: t(AppLocalizations.routine),
        type: AppointmentLevelsList.routine
    },
    {
        text: t(AppLocalizations.exam),
        type: AppointmentLevelsList.exam
    },
    {
        text: t(AppLocalizations.urgency),
        type: AppointmentLevelsList.urgency
    }
]

export const AppointmentFilterList = [
    {
        text: t(AppLocalizations.scheduled),
        type: "agendada"
    },
    {
        text: t(AppLocalizations.carriedOut),
        type: "realizada"
    },
    {
        text: t(AppLocalizations.canceled),
        type: "cancelada"
    }
]