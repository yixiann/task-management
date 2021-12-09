import Swal from "sweetalert2";

export const ConfirmationSwal = ({
  title,
  text,
  confirmButtonText = "",
  confirmFn = console.log,
  afterFn = console.log,
  afterTitle = "",
  afterText = "",
  failTitle = "",
  failText = "",
}) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        confirmFn();
        Swal.fire({
          title: afterTitle,
          text: afterText,
          timer: 1500,
          icon: "success",
          showConfirmButton: false,
        });
        afterFn();
      } catch {
        console.log("WHY");
        Swal.fire({
          title: failTitle,
          text: failText,
          timer: 1500,
          icon: "error",
          showConfirmButton: false,
        });
      }
    }
  });
};

export const LoadingSwal = (language) => {
  Swal.fire({
    title: language.message.loading,
    icon: "Loading",
    showCancelButton: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
    }
  });
};

export const SuccessSwal = (language) => {
  Swal.fire({
    title: language.message.success,
    showCancelButton: false,
    showConfirmButton: false,
    icon: "success",
    timer: 1500
  });
};

export const ErrorSwal = (language) => {
  Swal.fire({
    title: language.message.error,
    showCancelButton: false,
    showConfirmButton: false,
    icon: "error",
    timer: 1500
  });
};
