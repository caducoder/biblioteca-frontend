import { DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

interface IProps {
    title: string,
    message: JSX.Element,
    open: boolean,
    handleClose: () => void,
    onConfirm: () => void
}

function ConfirmacaoPagamentoPopup({title, message, open, handleClose, onConfirm}: IProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog"
      >
        <DialogTitle id="alert-dialog">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>Confirmar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmacaoPagamentoPopup;