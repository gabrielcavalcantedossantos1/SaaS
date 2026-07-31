import { toast } from "react-toastify";

//esta pagina tem como objetivo simplificar o uso do toastfy com o dismiss

export const notify = {
    success(message: string) {
        toast.dismiss();
        toast.success(message);
    },

    error(message: string) {
        toast.dismiss();
        toast.error(message);
    },

    warning(message: string) {
        toast.dismiss();
        toast.warning(message);
    },

    info(message: string) {
        toast.dismiss();
        toast.info(message);
    }
};