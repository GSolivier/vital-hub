import React, { useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { AppColors } from '../../../settings/AppColors';
import styled from 'styled-components/native';
import { FontFamily } from '../../../settings/AppFonts';
import t from '../../../locale';
import AppLocalizations from '../../../settings/AppLocalizations';

const CalendarBox = styled.View`
    width: 100%;
`

LocaleConfig.locales['locale'] = {
    monthNames: [
        t(AppLocalizations.january),
        t(AppLocalizations.february),
        t(AppLocalizations.march),
        t(AppLocalizations.april),
        t(AppLocalizations.mayFull),
        t(AppLocalizations.june),
        t(AppLocalizations.july),
        t(AppLocalizations.august),
        t(AppLocalizations.september),
        t(AppLocalizations.october),
        t(AppLocalizations.november),
        t(AppLocalizations.december),
    ],

    monthNamesShort: [
        t(AppLocalizations.jan),
        t(AppLocalizations.feb),
        t(AppLocalizations.mar),
        t(AppLocalizations.apr),
        t(AppLocalizations.may),
        t(AppLocalizations.jun),
        t(AppLocalizations.jul),
        t(AppLocalizations.aug),
        t(AppLocalizations.sep),
        t(AppLocalizations.oct),
        t(AppLocalizations.nov),
        t(AppLocalizations.dec),],

    dayNames: [
        t(AppLocalizations.sunday),
        t(AppLocalizations.monday),
        t(AppLocalizations.tuesday),
        t(AppLocalizations.wednesday),
        t(AppLocalizations.thursday),
        t(AppLocalizations.friday),
        t(AppLocalizations.saturday),],

    dayNamesShort: [
        t(AppLocalizations.sun),
        t(AppLocalizations.mon),
        t(AppLocalizations.tue),
        t(AppLocalizations.wed),
        t(AppLocalizations.thu),
        t(AppLocalizations.fri),
        t(AppLocalizations.sat),],

    today: "Hoje"
};

LocaleConfig.defaultLocale = 'locale';

export default function SelectDateCalendar() {

    const [day, setDay] = useState();

    return (
        <CalendarBox>
            <Calendar
                markedDates={{
                    [day]: { selected: true, }
                }}
                onDayPress={day => {
                    setDay(day.dateString)
                }}
                theme={{
                    textSectionTitleColor: AppColors.grayV3,
                    dayTextColor: AppColors.grayV3,
                    todayTextColor: AppColors.primary,
                    selectedDayBackgroundColor: AppColors.primaryV2,
                    selectedDayTextColor: AppColors.white,
                    textDayFontFamily: FontFamily.quicSandMedium,
                    textMonthFontFamily: FontFamily.montSerratBold,
                    textDayHeaderFontFamily: FontFamily.quicSandMedium,
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 12
                }}
                hideArrows={true}
                hideExtraDays={false}
                enableSwipeMonths={true}
                showSixWeeks={true}
            />
        </CalendarBox>
    )
}