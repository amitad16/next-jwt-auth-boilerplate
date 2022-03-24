import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function SimpleModal({ children, open, title, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        spacing={2}
        sx={{
          overflow: "scroll",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "325px",
          bgcolor: "background.paper",
          boxShadow: 24,
          textAlign: "center",
          p: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ margin: "auto", fontWeight: "600" }}>
            {title}
          </Typography>
        </Box>
        {children}
      </Stack>
    </Modal>
  );
}

export default SimpleModal;
