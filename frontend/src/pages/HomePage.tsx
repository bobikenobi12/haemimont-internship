import { Card, CardBody, Text ,Image, Heading,Flex, Button, Center, Box } from '@chakra-ui/react'
//import NavBar from '../components/NavBar'

/* <Text>
                    <p>Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of.</p> 
                    <p>No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.</p>
                    <p>He families believed if no elegance interest surprise an. It abode wrong miles an so delay plate. She relation own put outlived may disposed.</p>
                    <p>He moonlight difficult engrossed an it sportsmen. Interested has all devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to. Place voice no arise along</p>
                    </Text>
                    
*/
// function CourseCard(){
  
// }

// const Scroll={
   
// }

// const CourseComponent = () =>{
//     return(
// <div style={Scroll}>

// </div>

//     )
// }

export default function HomePage(){
    return(
        <>
        <Box w='100%' h='630px' mt='1%'  overflowX= 'hidden' overflowY= 'scroll' >
        <Text ml='3%' mb='1%' fontSize='lg'>Our most popular courses</Text>
          <Card   direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        mr='3%'
        ml='3%'
        mb='2%'>
            <Image 
                    pt='3%'
                    pb='3%'
                    objectFit="cover"
					src="https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg"
					alt="Course Logo"
					w={{ base: "100%", sm: "20%" }}/>
                <CardBody>
                    <Heading fontSize='2xl'>Course name
                    </Heading>
                    <Flex
							justifyContent="space-between"
							direction={{
								base: "column",
								md: "column",
								lg: "row",
							}}
						>
                             <Text pt='2%'>
                    <p>Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of.</p> 
                    <p>No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.</p>
                    <p>He families believed if no elegance interest surprise an. It abode wrong miles an so delay plate. She relation own put outlived may disposed.</p>
                    </Text>
                    </Flex>
                    <Center>
                    <Button colorScheme='purple'mt='2%'>
                        View the course
                    </Button>
                    </Center>
                </CardBody>
                </Card>
                <Card direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        mr='3%' ml='3%' mt='2%' mb='2%'>
                <Image
                pt='3%'
                pb='3%'
                    objectFit="cover"
					src="https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg"
					alt="Course Logo"
					w={{ base: "100%", sm: "20%" }}/>
                <CardBody>
                    <Heading fontSize='2xl'>Course name
                    </Heading>
                    <Flex
							justifyContent="space-between"
							direction={{
								base: "column",
								md: "column",
								lg: "row",
							}}
						>
                             <Text pt='2%'>
                    <p>Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of.</p> 
                    <p>No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.</p>
                    <p>He families believed if no elegance interest surprise an. It abode wrong miles an so delay plate. She relation own put outlived may disposed.</p>
                    </Text>
                    </Flex>
                    <Center>
                    <Button colorScheme='purple'mt='2%'>
                        View the course
                    </Button>
                    </Center>
                </CardBody>
                </Card>
                <Card direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        mr='3%' ml='3%' mt='2%' mb='2%'>
                <Image
                pt='3%'
                pb='3%'
                    objectFit="cover"
					src="https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg"
					alt="Course Logo"
					w={{ base: "100%", sm: "20%" }}/>
                <CardBody>
                    <Heading fontSize='2xl'>Course name
                    </Heading>
                    <Flex
							justifyContent="space-between"
							direction={{
								base: "column",
								md: "column",
								lg: "row",
							}}
						>
                             <Text pt='2%'>
                    <p>Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of.</p> 
                    <p>No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.</p>
                    <p>He families believed if no elegance interest surprise an. It abode wrong miles an so delay plate. She relation own put outlived may disposed.</p>
                    </Text>
                    </Flex>
                    <Center>
                    <Button colorScheme='purple' mt='2%'>
                        View the course
                    </Button>
                    </Center>
                </CardBody>
                </Card>
                </Box>
        </>
    )
}