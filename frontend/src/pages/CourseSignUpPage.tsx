import { Card,CardBody,Stack, Image,Text,Heading } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

export default function CourseSignUpPage(){
    return(
        <>
        <NavBar></NavBar>
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        mt='50px'
        ml='20px'
        >

<Image objectFit='cover'w='250px' h='180px' border='solid black' pb='10px' pt='10px' src='https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg'/>        
<Stack>
    <CardBody>
        <Heading fontSize='3xl'> Java Fundamentals</Heading>
        <Text mt='70px' fontSize='xl'>12.05.2023 - 15.07.2023</Text>
        <Text mt='-40px'fontSize='xl' pl='275px'>Instructor: Emilia Ivanova</Text>
        <Text mt='-30px' fontSize='xl' pl='640px'>Credits: 80</Text>
    </CardBody>
</Stack>
</Card>
        </>
    )
}
/* 
        <Text fontSize='xl' ml='400px' mt='-40px'>12.05.2023 - 15.07.2023</Text>
        <Text fontSize='xl' ml='700px' mt='-30px' pl='75px'>Instructor: Emilia Ivanova</Text>
        <Text fontSize='xl' ml='1000px' mt='-30px' pl='140px'>Credits: 80</Text>         
            */