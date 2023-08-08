import {Text,Center,Image,Card,CardBody,Badge,Box,Container,Stack, StackDivider} from '@chakra-ui/react'

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
    </>
)
}