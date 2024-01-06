import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import amplifyConfig from "../../amplifyconfig.json";
import { API, Amplify } from "aws-amplify";
import * as React from "react";

export interface SubmitDeleteAlertProps {
  deleteUrl: string;
}

const API_GW_NAME = "ag-manage-restaurant-project";
Amplify.configure(amplifyConfig);

export default function SubmitDeleteAlert({
  deleteUrl,
}: SubmitDeleteAlertProps) {
  const [open, setOpen] = React.useState(false);
  // const [successDel, setSuccessDel] = React.useState(false);
  const agreeAction = async () => {
    try {
      const delRes = await API.del(API_GW_NAME, deleteUrl, {});
      console.log(delRes);

      if (delRes) {
        alert("Delete Product Success");
      }
    } catch (err) {
      console.error("Failed to delete Product:::", err);
    }

    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        title="Xóa sản phẩm"
        variant="contained"
        color="error"
        fullWidth
        onClick={handleClickOpen}
      >
        <DeleteOutlined></DeleteOutlined>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận xóa sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi kho hàng chứ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={agreeAction}
            autoFocus
          >
            Đồng ý
          </Button>
          <Button variant="text" color="error" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
