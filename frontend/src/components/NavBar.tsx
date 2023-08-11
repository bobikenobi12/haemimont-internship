// import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
import { 
        Avatar,
        Box,
        Button,
        Stack,
        Menu,
        MenuButton,
        MenuList,
        MenuItem, 
       } from "@chakra-ui/react";

import { SearchBar } from "./SearchBar";
import { ChevronDownIcon, } from "@chakra-ui/icons";

export default function NavBar(){
    return(
        <Stack spacing={4} direction='row' align='center' m='1rem'>
                    <Button colorScheme="blue" size='sm' w='120px'ml='25px'>Courses</Button>
                    <Button colorScheme="blue" size='sm' ml='100px' w='140px'>Instructor</Button>
                    <SearchBar ></SearchBar>
                    <Box pl='520px'>
                        <Menu>
                    {/* <Button size='lg' w='20px'> */}
                    <MenuButton w='100px'as={Button} rightIcon={<ChevronDownIcon/>} mr='20px'>
                    <Avatar pl='0px'/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Credits: 142</MenuItem>
                        <MenuItem>Edit profile</MenuItem>
                        <MenuItem>Log out</MenuItem>
                    </MenuList>
                        </Menu>
                    </Box>
        </Stack>
    )
}