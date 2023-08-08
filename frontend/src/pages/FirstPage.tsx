import { Badge, Button, Center } from '@chakra-ui/react';
import { Text,Link } from '@chakra-ui/react';
import { Container,Box } from '@chakra-ui/react'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { Image,Heading,Stack } from '@chakra-ui/react'

import { Link as RouterLink } from "react-router-dom";

const CourseComponent=()=>{
	return(
		<Card ml='40px' mr='15px' mt='20px'
  		direction={{ base: 'column', sm: 'row' }}
  		overflow='hidden'
  		variant='outline'
		height='200px'
		boxShadow='md'
		>
		  <Image
    objectFit='cover'
	width='200px'
	pb='10px'
	
    src='https://th.bing.com/th/id/R.c2656bd56d27b85fccfceb307298f28e?rik=vfgjAHxsh7UiSA&riu=http%3a%2f%2fimage.digitalinsightresearch.in%2fuploads%2fimagelibrary%2fcbr%2fjava.jpg&ehk=vn97rntDxEtOc3Cbaz4ljrRGWJJhTekLa6AxVl8q%2bDU%3d&risl=&pid=ImgRaw&r=0'
    alt='Java course'
  />
    <Stack>
    <CardBody pt='10px' pb='10px' pl='20px' pr='10px'>
	<Text>
      <Heading size='md'>Fit mouche fosses plonge fut oui.</Heading>
	  
		<Badge colorScheme='blue' fontSize='sm' mt='-50px' ml='450px'>40 credits</Badge>
	  </Text>
      <Text py='4'>
	  <p>Ah pourquoi loquaces je galopade habitent fanfares.
	  Amour peine la arret qu. Retreci cheveux non ils nos prenons horizon ton entiere legende.</p>
	  <p>Quitta mes reelle moment patrie moi son cahots des ordure.</p>
      </Text>
    </CardBody>

    <CardFooter pr='10px' pl='20px' pt='4px' pb='20px'>
      <Button variant='outline' colorScheme='purple'mt='-20px' ml='28cm'>
        See more
      </Button>
    </CardFooter>
  </Stack>
  </Card>
	);
	
}
const MyComponent=()=>{

	return(
		<>
		<Box w='1500px' h='500px' overflowX='hidden' overflowY='scroll'>
			<ul>
				<li>
					
				<CourseComponent/>
				<CourseComponent/>
				<CourseComponent/>
				</li>
			</ul>
		</Box>
		</>
	);
};


export default function FirstPage(){
    return(
        <>
        <Container pt='15px' mr='1.5' maxW="fit-content">
        <Link as={RouterLink} to="/sign-in">
			<Button as={Button} size='md'variant='solid' colorScheme="purple">
				Sign In
			</Button>
            </Link>
            
		</Container>
		<Center>
			<Text fontSize='4xl' pt='20px'>Our project</Text>
		</Center>

		
  <MyComponent/>
        </>
    );
}
