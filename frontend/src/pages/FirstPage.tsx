import { Button, Center } from '@chakra-ui/react';
import { Text,Link } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { Image,Heading,Stack } from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom";



export default function FirstPage(){
    return(
        <>
        <Container pt='15px' mr='1.5' maxW="fit-content">
        <Link as={RouterLink} to="/sign-in">
			<Button as={Button} size='md'variant='ghost' colorScheme="purple">
				Sign In
			</Button>
            </Link>
            <Link as={RouterLink} to="/sign-up">
			<Button as={Button} variant='outline'colorScheme="purple">
				Sign Up
			</Button>
            </Link>
		</Container>
		<Center>
			<Text fontSize='4xl' pt='20px'>Our project</Text>
		</Center>
		<Card ml='40px' mr='40px' mt='20px'
  		direction={{ base: 'column', sm: 'row' }}
  		overflow='hidden'
  		variant='outline'
		height='200px'
		>
		  <Image
    objectFit='cover'
	width='200px'
	
    src='https://th.bing.com/th/id/R.c2656bd56d27b85fccfceb307298f28e?rik=vfgjAHxsh7UiSA&riu=http%3a%2f%2fimage.digitalinsightresearch.in%2fuploads%2fimagelibrary%2fcbr%2fjava.jpg&ehk=vn97rntDxEtOc3Cbaz4ljrRGWJJhTekLa6AxVl8q%2bDU%3d&risl=&pid=ImgRaw&r=0'
    alt='Java course'
  />
    <Stack>
    <CardBody pt='10px' pb='10px' pl='20px' pr='20px'>
      <Heading size='md'>Fit mouche fosses plonge fut oui.</Heading>

      <Text py='2'>
	  <p>Ah pourquoi loquaces je galopade habitent fanfares.</p>
	  <p>Amour peine la arret qu. Retreci cheveux non ils nos prenons horizon ton entiere legende.</p>
	  <p>Quitta mes reelle moment patrie moi son cahots des ordure.</p>
      </Text>
    </CardBody>

    <CardFooter pr='10px' pl='20px' pt='4px' pb='20px'>
      <Button variant='solid' colorScheme='purple'>
        See more
      </Button>
    </CardFooter>
  </Stack>
  </Card>
  <Container></Container>
  <Card ml='40px' mr='40px' mt='20px'
  		direction={{ base: 'column', sm: 'row' }}
  		overflow='hidden'
  		variant='outline'
		height='200px'
		>
		  <Image
    objectFit='cover'
	width='200px'
	
    src='https://th.bing.com/th/id/R.c2656bd56d27b85fccfceb307298f28e?rik=vfgjAHxsh7UiSA&riu=http%3a%2f%2fimage.digitalinsightresearch.in%2fuploads%2fimagelibrary%2fcbr%2fjava.jpg&ehk=vn97rntDxEtOc3Cbaz4ljrRGWJJhTekLa6AxVl8q%2bDU%3d&risl=&pid=ImgRaw&r=0'
    alt='Java course'
  />
    <Stack>
    <CardBody pt='10px' pb='10px' pl='20px' pr='20px'>
      <Heading size='md'>Fit mouche fosses plonge fut oui.</Heading>

      <Text py='2'>
	  <p>Ah pourquoi loquaces je galopade habitent fanfares.</p>
	  <p>Amour peine la arret qu. Retreci cheveux non ils nos prenons horizon ton entiere legende.</p>
	  <p>Quitta mes reelle moment patrie moi son cahots des ordure.</p>
      </Text>
    </CardBody>

    <CardFooter pr='10px' pl='20px' pt='4px' pb='20px'>
      <Button variant='solid' colorScheme='purple'>
        See more
      </Button>
    </CardFooter>
  </Stack>
  </Card>
        </>
    );
}
