import {
        Text,
        Center,
        Image,
        Card,
        CardBody,
        Badge,
        Box,
        Container,
        Stack,
        StackDivider,
        Accordion,  
        AccordionItem,
        AccordionButton,
        AccordionPanel,
        AccordionIcon,
        Button,
        } from '@chakra-ui/react';
        

export default function UserProfilePage(){
return(
    <>
    <Center>
        <Text fontSize="4xl" pt="20px">
            Our project
        </Text>
    </Center>
    <Image
  borderRadius='full'
  border='2px'
  borderColor='#93a4ff'
  boxSize='230px'
  boxShadow='md'
  src='https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?5315ffb'
  mt='90px'
  ml='240px'
/>
<Container ml='145px' mt='30px' w='300px' color='#93a4ff'>
<Card w='400px' boxShadow='md'>
    <CardBody>
        <Stack divider={<StackDivider />}>
        <Box>
        <Center>
            <Text fontSize='xl' w='300px'>
                <p>Name: Cvetelina Petkova</p>
            </Text>
            <Badge colorScheme='red' ml='17px'> Instructor </Badge>
            </Center>
            </Box>
            <Box>
            <Center>
            <Text fontSize='xl' w='300px'>
                <Center>
                <p>Email: gnr.gnfr@gmail.com</p>
                </Center>
            </Text>
            </Center>
            </Box>
            <Box>
                <Center>
                    <Text fontSize='xl' w='300px'>
                        <Center>
                        <p>Credits: 142</p>
                        </Center>
                    </Text>
                </Center>
            </Box>
            </Stack>
    </CardBody>
</Card>
</Container>

<Container  ml='835px' mt='-400px'>
<Text fontSize='3xl' mb='10px' color='#6065EA'>Course List: </Text>
<Box overflowX="hidden" overflowY="scroll" h='330px' w='550px'>
    <Card mr="15px" mt="20px">
    <Stack>
    <CardBody pt="10px" pb="10px" pl="20px" pr="10px">
<Accordion defaultIndex={[0]} allowMultiple>
    <AccordionItem>
        <h2>
            <AccordionButton>
                <Box as='span' flex='1' textAlign='left' fontSize='xl'>
                Deep Learning-12.08.2023-15.10.2023
                </Box>
                <AccordionIcon />
            </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
        <p>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
        <p>veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
        commodo consequat.
        <Button colorScheme='purple' size='sm' ml='300px' mb='10px'>
            View course page
        </Button>
        </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
        <h2>
            <AccordionButton>
                <Box as='span' flex='1' textAlign='left' fontSize='xl' w='550px'>
                Java Script-10.03.2023-12.06.2023
                </Box>
                <AccordionIcon />
            </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <Text>
        <p>Lire uso aca pago por dijo reia toco. Callar atenta mimada mil dio.</p> 
        <p>Doy una dia clavo salir local gacha grima guapa. Eh va pegado oh famosa alcoba ch bebida. </p>
        <p>Las egoismo tan redondo ovalado rio fin.</p>
        <p>Propiedad caprichos en tendencia al prometido. Hembra grande yo no acabar.</p>
        </Text>
        <Button colorScheme='purple' size='sm' ml='300px' mb='10px'>
            View course page
        </Button>
        </AccordionPanel>
    </AccordionItem>
</Accordion>
</CardBody>
</Stack>
</Card>
</Box>
</Container>

    </>
)
}
