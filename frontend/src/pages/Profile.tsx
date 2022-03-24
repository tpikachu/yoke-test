import React from "react";
import {
  Center,
  Heading,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import { Receipt } from "../models";
import { Endpoints } from "../utils/constants";

const Profile = () => {
  const {
    user: { id: userId, name, email },
  } = useAuth();
  const { data } = useFetch<Receipt[]>(
    `${Endpoints.getReceipts}?userId=${userId}`
  );

  return (
    <div>
      <Header />
      <Center>
        <VStack>
          <Heading>{name}</Heading>
          <Text color='gray'>{email}</Text>
        </VStack>
      </Center>
      <Table variant='simple'>
        <TableCaption>Receipts</TableCaption>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((receipt) => (
            <Tr key={receipt._id}>
              <Td>{new Date(receipt.orderDate).toLocaleDateString()}</Td>
              <Td>{receipt.productName}</Td>
              <Td isNumeric>{receipt.totalPrice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Profile;
