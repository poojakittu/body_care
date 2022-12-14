import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext/CartContextProvider";
import { addToCart } from "../Context/CartContext/action";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";


const getData = (params = {}) => {
  return axios.get(`http://localhost:3000/candle`,{
    params: {
        _page: params.page,
        _limit: params.limit,
        _sort: params.sort,
        _order: params.order
      }
  });
};

const itemAlreadyExists = (id, cartItems) => {
  if (cartItems.find((item) => item.id === id)) {
    return true;
  }
  return false;
};

const Candle = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  console.log('data:', data)
  const [error, setError] = useState(false);

  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    getData({ page, limit: 6, sort: "name", order: "asc" })
      .then((res) => {
        setData(res.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return (
      <Stack my={20}>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    );
  }
  if (error) {
    return (
      <Container
        width={{
          base: "full",
          sm: "full",
          md: "container.xl",
          lg: "container.lg",
        }}
        centerContent={true}
      >
        <Alert
          status="error"
          py={{ base: 4, sm: 4, md: 4, lg: 6 }}
          my={{ base: 24, sm: 24, md: 28, lg: 40 }}
          px={{ base: 1, sm: 1, md: 4, lg: 6 }}
        >
          <AlertIcon />
          <AlertDescription>
            Somthing went wrong. Please refresh.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }
  return (
    <Container
      maxW={{ base: "full", md: "container.xl" }}
      p={{ base: 2, lg: 0 }}
    >
      <Grid
        w="full"
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,2fr)",
          lg: "repeat(3,3fr)",
        }}
        gap={4}
      >
        {data.map((product) => (
          <GridItem key={product.id}>
            <Box
              bg="grey.50"
              columns={{ sm: 2, md: 4 }}
              spacing="8"
              p={2}
              rounded="lg"
              color="grey.600"
              boxShadow="lg"
            >
              <Grid templateRows="repeat(24,1fr)" h="xl">
                <GridItem rowSpan={16}>
                  <Flex align="center" justify="center">
                    <Image
                      boxSize="xs"
                      src={product.img}
                      alt="prod-img"
                      w="full"
                      h="sm"
                    />
                  </Flex>
                </GridItem>
                <GridItem rowSpan={3}>
                  <Flex align="center" justify="center">
                    <Box>
                      <Text textAlign="center">Name: {product.title}</Text>
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem rowSpan={3}>
                  <Flex align="center" justify="center">
                    <Box>
                      <Text>INR: ${product.price}</Text>
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem rowSpan={16}>
                  <Flex align="center" justify="center">
                    <Button
                      colorScheme="grey"
                      variant="outline"
                      disabled={itemAlreadyExists(product.id, state)}
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add To Cart
                    </Button>
                  </Flex>
                  
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        ))}
      </Grid>
      <br/><br/><br/><br/>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        {"<<"}
      </Button>
      <Button>{page}</Button>
      <Button onClick={() => setPage(page + 1)}>{">>"}</Button>
    </Container>
  );
};

export default Candle;