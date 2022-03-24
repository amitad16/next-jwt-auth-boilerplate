import Container from "@mui/material/Container";
import AddButtonBig from "../AddButtonBig";

import services from "../../utils/services";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Welcome() {
  const apiClient = useAxiosPrivate();

  const handleDummyReq = async () => {
    try {
      const response = await services(apiClient).dummy();

      console.log("dummy res=", response.data);
    } catch (err) {
      console.error("dummy err =", err);
    }
  };

  return (
    <Container className="flex flex-wrap justify-initial">
      <AddButtonBig className="h-32" onClick={handleDummyReq} />
    </Container>
  );
}

export default Welcome;
