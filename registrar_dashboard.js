$('.mail-choice').change(function() {
    if ($(this).is(":checked")) {
        $(this).parent().addClass('selected-bg');
    } else {
        $(this).parent().removeClass('selected-bg');
    }
});

const colorInput = document.getElementById("colorpicker");

colorInput.addEventListener("input", (e) => {
    document.body.style.setProperty("--button-color", e.target.value);
});

$('.inbox-calendar').click(function() {
    $('.calendar-container').toggleClass('calendar-show');
    $('.inbox-container').toggleClass('hide');
    $('.mail-detail').toggleClass('hide');
});

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}