import Swal from "sweetalert2";

export const ConfirmationSwal = ({
  title,
  text,
  confirmButtonText = "",
  confirmFn = x => x,
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
      confirmFn();
    }
  });
};

export const LoadingSwal = (language) => {
  Swal.fire({
    title: language?.message.loading,
    icon: "Loading",
    showCancelButton: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const SuccessSwal = (language, text) => {
  Swal.fire({
    title: language?.message.success,
    text: text, 
    showCancelButton: false,
    showConfirmButton: false,
    icon: "success",
    timer: 2000,
  });
};

export const ErrorSwal = (language, text) => {
  Swal.fire({
    title: language?.message.error,
    text: text,
    showCancelButton: false,
    showConfirmButton: false,
    icon: "error",
    timer: 2000,
  });
};
