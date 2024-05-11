import { toast } from "react-toastify"

class AlertService {
  showSuccessAlert = (msg) => {
    toast.success(msg);
  }
  
  showErrorAlert = (errMsg) => {
    toast.error(errMsg)
  }
  
  showWarningAlert = (warnMsg) => {
    toast.warn(warnMsg);
  }
}

const alertService = new AlertService();

export default alertService;
