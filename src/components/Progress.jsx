import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Progress() {
  return (
    <Backdrop sx={{ zIndex: 5 }} open={true}>
      <CircularProgress color="error" size={50} />
    </Backdrop>
  );
}
