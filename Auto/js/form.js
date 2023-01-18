$('select').formSelect();

$("#tank").focusout(function(e){
    e.preventDefault();
    let input = $(this).val();
    input = Math.round(input * 10) / 10
    if (input < 0)
        input = 0;

    $(this).val(input);
    M.updateTextFields();
})

$("#date").datepicker({
    defaultDate: new Date(),
    setDefaultDate: true,
    format: "dd.mm.yyyy",
    i18n: {
      labelMonthNext: "Nexter Monat",
      labelMonthPrev: "Vorheriger Monat",
      labelMonthSelect: "Monat wählen",
      labelYearSelect: "Jahr wählen",
      months: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
      ],
      monthsLong: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],
      weekdays: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
      ],
      weekdaysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      weekdaysAbbrev: ["S", "M", "D", "M", "D", "F", "S"],
      today: "Heute",
      close: "Schliessen",
      cancel: "Abbrechen",
      clear: "Löschen",
      done: "Wählen",
    },
  });