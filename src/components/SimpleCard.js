import Card from "@mui/material/Card";

function SimpleCard({ className, children, ...props }) {
  return (
    <Card variant="outlined" className={`m-2 ${className}`} {...props}>
      {children}
    </Card>
  );
}

export default SimpleCard;
