import AddIcon from "@mui/icons-material/Add";
import SimpleCard from "./SimpleCard";

function AddButtonBig({ className, ...props }) {
  return (
    <SimpleCard
      className={`text-8xl w-80 h-48 text-neutral-500 flex justify-center items-center cursor-pointer hover:bg-slate-50 ${className}`}
      {...props}
    >
      <AddIcon fontSize={"inherit"} />
    </SimpleCard>
  );
}

export default AddButtonBig;
