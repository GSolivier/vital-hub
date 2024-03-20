// import lib moment
import moment from "moment";
import { StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import styled from "styled-components/native";
import t from "../../locale";
import AppLocalizations from "../../settings/AppLocalizations";


export const StyledCalendarStrip = styled(CalendarStrip)`
  flex: 0.20;
  width: 100%;

`
moment.updateLocale("pt-br", {
    // Meses
    months: `${t(AppLocalizations.january)}_${t(AppLocalizations.february)}_${t(AppLocalizations.march)}_${t(AppLocalizations.april)}_${t(AppLocalizations.mayFull)}_${t(AppLocalizations.june)}_${t(AppLocalizations.july)}_${t(AppLocalizations.august)}_${t(AppLocalizations.september)}_${t(AppLocalizations.october)}_${t(AppLocalizations.november)}_${t(AppLocalizations.december)}`.split("_"),
    // Abreviação de meses
    monthsShort: `${t(AppLocalizations.jan)}_${t(AppLocalizations.feb)}_${t(AppLocalizations.mar)}_${t(AppLocalizations.apr)}_${t(AppLocalizations.may)}_${t(AppLocalizations.jun)}_${t(AppLocalizations.jul)}_${t(AppLocalizations.aug)}_${t(AppLocalizations.sep)}_${t(AppLocalizations.oct)}_${t(AppLocalizations.nov)}_${t(AppLocalizations.dec)}`.split("_"),
    // Dias da semana
    weekdays: `${t(AppLocalizations.sunday)}_${t(AppLocalizations.monday)}_${t(AppLocalizations.tuesday)}_${t(AppLocalizations.wednesday)}_${t(AppLocalizations.thursday)}_${t(AppLocalizations.friday)}_${t(AppLocalizations.saturday)}`.split("_"),
    // Abreviação dias da semana
    weekdaysShort: `${t(AppLocalizations.sun)}_${t(AppLocalizations.mon)}_${t(AppLocalizations.tue)}_${t(AppLocalizations.wed)}_${t(AppLocalizations.thu)}_${t(AppLocalizations.fri)}_${t(AppLocalizations.sat)}`.split("_"),
    // Abreviação dias da semana 
    weekdaysMin: `${t(AppLocalizations.sun)}_2ª_3ª_4ª_5ª_6ª_${t(AppLocalizations.sat)}`.split("_")
});


//instância da data atual
const currentDate = new Date();

//define a data inicial como sendo o primeiro dia do mês
const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

//define a data final como sendo o último dia do mês
const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

const styles = StyleSheet.create({
    iconsStyle: {
        display: 'none'
    },
    calendarHeaderStyle: {
        fontSize: 22,
        textAlign: "center",
        alignSelf: 'flex-start',
        color: '#4E4B59',
        fontFamily: "MontserratAlternates_600SemiBold",
        paddingHorizontal: 16
    },
    nameDateStyle: {
        color: "#ACABB7",
        fontSize: 12,
        textTransform: 'capitalize'
    },
    numberDateStyle: {
        color: "#5F5C6B",
        fontSize: 16
    },
    selectedDateNameStyle: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textTransform: 'capitalize'
    },
    selectedDateNumberStyle: {
        color: "white",
        fontSize: 14
    },
    selectedContainerStyle: {
        backgroundColor: `#60BFC5`
    },
    selectedAnimationStyle: {
        type: "border",
        duration: 200,
        borderWidth: 2,
        borderHighlightColor: "#49B3BA"
    }
})

export default function HomeCalendar() {
    return (
        <StyledCalendarStrip
            // animação e seleção de cada data
            calendarAnimation={{ type: "sequence", duration: 30 }}
            daySelectionAnimation={styles.selectedAnimationStyle}

            // seta esquerda e direita para avançar e voltar(aqui como display none)
            iconLeftStyle={styles.iconsStyle}
            iconRightStyle={styles.iconsStyle}

            // deixa uma marcação default - data atual
            selectedDate={currentDate}
            // dia que começamos a visualizar a barra
            startingDate={moment()}

            //data min e max - início do mês e final do mês
            minDate={startingDate}
            maxDate={endingDate}

            //estilização dos itens que não estão selecionados
            calendarHeaderStyle={styles.calendarHeaderStyle}
            dateNumberStyle={styles.numberDateStyle}
            dateNameStyle={styles.nameDateStyle}

            // estilização do item que está selecionado - efeito do item marcado
            highlightDateNameStyle={styles.selectedDateNameStyle}
            highlightDateNumberStyle={styles.selectedDateNumberStyle}
            highlightDateContainerStyle={styles.selectedContainerStyle}

            //scroll da barra
            scrollable={true}
        />
    )
}