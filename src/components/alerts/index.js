import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  function showMessage(type, title, message){
      toastr[type](message, title)
  }

  export const showMessageSuccess = (title, message) => {
    showMessage('success', title, message)
  }

  export const showMessageError = (title, message) => {
    showMessage('error', title, message)
  }