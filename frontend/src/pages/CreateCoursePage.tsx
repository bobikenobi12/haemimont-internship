import{
    Box,
    FormLabel,
    InputGroup,
    FormControl,
    Input,
    Button,
    Text,
    Textarea
    // Alert,
    // AlertIcon,
    // AlertTitle,
    // AlertDescription,
    // AlertDialogOverlay,
}from "@chakra-ui/react";
import NavBar from "../components/NavBar";
//import React from "react";

//bgColor='#FFF9FE' 
//function AlDialog(){
//     return(
//         <>
//             <Button colorScheme="purple" size="md" ml='38%' mt='40px' mb='20px'>
//                 Create course
//             </Button>
//             <AlertDialogOverlay>
//             <Alert
//                 status='success'
//                 variant='subtle'
//                 flexDirection='column'
//                 alignItems='center'
//                 justifyContent='center'
//                 textAlign='center'
//                 height='200px'
//             >
//             <AlertIcon boxSize='40px' mr={0} />
//                 <AlertTitle mt={4} mb={1} fontSize='lg'>
//                     Application submitted!
//                 </AlertTitle>
//             <AlertDescription maxWidth='sm'>
//                 Thanks for submitting your application. Our team will get back to you soon.
//             </AlertDescription>
// </Alert>
//             </AlertDialogOverlay>
//         </>
//     )
// }

// function Example() {
//     let [value, setValue] = React.useState('')
  
//     let handleInputChange = (e: { target: { value: any; }; }) => {
//       let inputValue = e.target.value
//       setValue(inputValue)
//     }
//     return (
//       <>
//         <Text mb='8px'>Value: {value}</Text>
//         <Textarea
//           value={value}
//           onChange={handleInputChange}
//           placeholder='Here is a sample placeholder'
//           size='sm'
//         />
//       </>
//     )
//   }

export default function CreateCoursePage(){
 return(
    <>
    <NavBar/>
    <Box ml='28%' mt='3%' p='20px' boxShadow="lg" maxWidth="650px" borderWidth={1} borderRadius={8}>
        <Text textAlign="center" fontSize='3xl' pb='35px'>
            Let's create course
        </Text>
    <FormControl>
        <FormLabel ml='10%' pb='15px'>Name of the course</FormLabel>
        <InputGroup>
		<Input
            ml='10%'
            mr='20%'
            mb='5px'
            w='350px'
			id="course-name"
			placeholder="Enter course name"
	    />
        </InputGroup>
    </FormControl>
    <FormControl>
        <FormLabel ml='10%' pb='15px'>Description</FormLabel>
        <InputGroup ml='10%'>
        {/* <Input
            id='description'
            /> */}
            <Textarea placeholder="Enter some interesting description" w='500px' mb='5px' maxH='450px'></Textarea>
        </InputGroup>
    </FormControl>
    <FormControl pt='40px'>
        <FormLabel ml='10%' pb='15px'>Duration (in hours)</FormLabel>
        <InputGroup>
            <Input
                ml='10%'
                mr='10%'
                mb='5px'
                w='200px'
                id="duration"
                placeholder="How many hours?"
            />
        </InputGroup>
    {/* </FormControl>
    <FormControl pt='40px'> */}
        <FormLabel pb='15px' ml='50%' mt='-15%' pl='10%'>Credits</FormLabel>
        <InputGroup ml='50%' pl='10%'>
            <Input
                id="credit" w='200px'
            />
        </InputGroup>
    </FormControl>
    <Button colorScheme="purple" size="md" ml='38%' mt='40px' mb='20px'>
        Create course
    </Button>
    {/* <AlDialog/> */}
    </Box>
    </>
 )
}