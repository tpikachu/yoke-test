import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../utils/constants";
import useFetch from "../hooks/useFetch";
import { User } from "../models";
import useAuth from "../hooks/useAuth";
import { formatCurrency } from "../utils/methods";

const Balance: React.FC<{}> = (props) => {
  const {
    user: { id: userId },
  } = useAuth();
  const navigate = useNavigate();

  const { data } = useFetch<User>(`${Endpoints.getUser}?userId=${userId}`);

  const navigateBalance = () => {
    navigate("/profile");
  };

  return (
    <Button bg='transparent' border='1px' mr={2} onClick={navigateBalance}>
      {`Balance: ${formatCurrency(data?.balance || 0)}`}
    </Button>
  );
};

export default Balance;
