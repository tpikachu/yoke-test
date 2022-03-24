import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { formatCurrency } from "../utils/methods";
import { Endpoints } from "../utils/constants";

export type ProductProps = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
};

export const ProductCard: React.FC<ProductProps> = ({
  productId,
  productName,
  price,
  quantity,
}) => {
  const {
    authed,
    user: { id: userId },
  } = useAuth();
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const close = () => {
    onClose();
    navigate("/profile");
  };

  const buyProduct = () => {
    axios
      .post(Endpoints.purchase, { userId, productId })
      .then((response) => {
        setMessage("Purchased successfully");
        onOpen();
      })
      .catch((e: Error) => {
        setMessage(`Error: ${e.message}`);
        onOpen();
      });
  };

  return (
    <Box maxH={"sm"} borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>{message}</ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={close}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex p='6' bgColor={"gray.600"}>
        <Flex flex={1} direction={"column"}>
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
            color={"white"}
          >
            {productName}
          </Box>
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
            color={"white"}
          >
            {formatCurrency(price)}
          </Box>
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
            color={"white"}
          >
            {`Stock: ${quantity}`}
          </Box>
        </Flex>
        <Box color='white' fontSize='sm' display={"flex"} mt={4}>
          {authed && (
            <Button
              className='buy-button snipcart-add-item'
              bgColor={"green.400"}
              disabled={quantity === 0}
              onClick={buyProduct}
            >
              Buy
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
