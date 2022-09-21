import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const BaseDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.desc}</DialogContentText>
      </DialogContent>
      { !props.hideActions &&
        <DialogActions>
          <Button onClick={props.closeDialog} autoFocus>Close</Button>
        </DialogActions>
      }
    </Dialog>
  );
};

export default BaseDialog;
