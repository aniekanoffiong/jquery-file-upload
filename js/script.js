$(document).on({
    ajaxStart: function() { $('body').addClass('loading'); },
    ajaxStop: function() { $('body').removeClass('loading'); }
});

$('button.btn-submit').click(function(evt) {
    evt.preventDefault();
    let name = $('input.name').val();
    let email = $('input.email').val();
    let gender = $('select.gender').val();
    let photo = $('input.photo')[0].files;
    let alert = $('span.alert.alert-danger');
    if (alert.hasClass('d-block')) {
        alert.removeClass('d-block')
        .addClass('d-none');
    }
    if (name == '') {
        alert_display(alert, 'Name Not Given');
        return;
    } else if (email == '') {
        alert_display(alert, 'Email Not Given');
        return;
    } else if (gender == 'default') {
        alert_display(alert, 'Gender Not Selected');
        return;
    } else if (photo.length == 0) {
        alert_display(alert, 'Photo Not Selected');
        return;
    }
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('photo', photo[0]);
    $.ajax({
        url: 'form-handle.php',
        type: 'POST', 
        data: formData, // $('form.profile-form').serialize();
        contentType: false,
        processData: false,
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });
});

function alert_display(alert, message) {
    alert.html(`<b>${message}</b>`).removeClass('d-none')
    .addClass('d-block');
}