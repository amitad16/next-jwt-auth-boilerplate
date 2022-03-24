import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function AlertModal({ title, children, open, onClose }) {
  return (
    <Modal open={open} onClose={() => onClose()}>
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
          <Typography variant="h6" sx={{ margin: "auto" }}>
            {title}
          </Typography>
        </Box>
        {children}
      </Stack>
    </Modal>
  );
}
