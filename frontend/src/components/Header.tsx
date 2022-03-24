import React from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import Balance from "./Balance";

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header: React.FC<{}> = (props) => {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1.5rem'
      bg='teal.500'
      color='white'
      {...props}
    >
      <Flex align='center' mr={5}>
        <Link to='/'>
          <Heading
            as='h1'
            size='lg'
            letterSpacing={"-.1rem"}
            onClick={() => {}}
          >
            Store
          </Heading>
        </Link>
      </Flex>

      {!authed && (
        <Box mt={{ base: 4, md: 0 }}>
          <Button bg='transparent' border='1px' onClick={navigateLogin}>
            Login
          </Button>
        </Box>
      )}

      {authed && (
        <Flex>
          <Balance />
          <Button bg='transparent' border='1px' onClick={logout}>
            Logout
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
