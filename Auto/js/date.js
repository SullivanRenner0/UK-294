$("#datum").datepicker({
    defaultDate: new Date(),
    setDefaultDate: true,
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
    format: "dd.mm.yyyy"
  }
);

$("#dateSave").click(async function(e){
    e.preventDefault();
    let id = $("#dateID").val();
    let response = await GetById(id);
    let car = response.data[0];
    car.date = $("#datum").val()
    await UpdateById(id, car);
    updateTable();

    $("#dateInhalt").html("")
    $("#dateTitel").html("");
    $("#modal5").modal("close");
    M.toast({html: "Datum wurde erfolgreich angepasst", classes: 'green rounded darken-4 black-text'});
})