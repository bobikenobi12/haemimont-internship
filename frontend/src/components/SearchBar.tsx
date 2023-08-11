import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Box
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = () =>{
    return(
        <>
        <Box ml='180px' w='700px'>
        <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input type="text" placeholder="Search..." border="1px solid #949494" />
        <InputRightAddon
          p={0}
          border="none"
        >
          <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494"  colorScheme="blue">
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
      </Box>
        </>
    )
};