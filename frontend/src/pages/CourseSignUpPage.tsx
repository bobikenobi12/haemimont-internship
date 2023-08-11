import { Card,CardBody, Image,Text,Heading, Button, Center } from "@chakra-ui/react";

export default function CourseSignUpPage(){
    return(
        <>
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        mt='40px'
        ml='40px'
        mr='40px'
        >

<Image objectFit='cover' ml='15px' mt='15px'  h='150px' w='220px' border='solid black' pb='10px' pt='10px' src='https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg'/>        
    <CardBody h='180px'>
        <Heading fontSize='3xl' pl='40%'> Java Fundamentals</Heading>
        <Text mt='50px' fontSize='xl' pl='8%'>12.05.2023 - 15.07.2023</Text>
        <Text mt='-30px'fontSize='xl' pl='40%'>Instructor: Emilia Ivanova</Text>
        <Text mt='-30px' fontSize='xl'pl='78%'>Credits: 80</Text>
    </CardBody>
</Card>
<Card ml='40px' mr='40px' key={"filled"} variant={"filled"}>
    <CardBody>
        <Text fontSize='lg' pl='80px' pr='80px'>
        <p>Donde miles temor ma cosen id finas yo. Volvio tu vencer dramas da no su. Madrugar mal don benditos cominero mar esencias uso.</p>
        <p>En intimas tambien no oh va renglon. Posible los van merecia suo eso resulto. Asi naufragos resonaban moribundo pre.</p>
        <p>Foro hubo emma va se. Andaba asi que juntos los que formas. Aptitudes simpatias me mostrarse indefenso el explicaba.</p>
        <p>Arruinado consiguio restaurar no pluguiera tu le. Cantante cantidad esa contesto presento del inferior eso entonces.</p>
        <p>Atreveria traspunte religiosa revolvian yo he. Les atraer jugado las propio don bultos ano ruines.</p>
        </Text>
        <Center>
        <Button colorScheme="purple" mt='6'>
            Join the course
        </Button>
        </Center>
    </CardBody>
</Card>
        </>
    )
}
/* 
        <Text fontSize='xl' ml='400px' mt='-40px'>12.05.2023 - 15.07.2023</Text>
        <Text fontSize='xl' ml='700px' mt='-30px' pl='75px'>Instructor: Emilia Ivanova</Text>
        <Text fontSize='xl' ml='1000px' mt='-30px' pl='140px'>Credits: 80</Text>         
            */