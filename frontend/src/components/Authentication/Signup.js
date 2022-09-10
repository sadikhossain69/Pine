import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pic, setPic] = useState('')
    const [show, setShow] = useState(false)
    const imageStorageKey = '7da2b2086b902054d13e6c94a30f0b6a'
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const postDetails = pics => {
        setLoading(true)

        if (pics === "undefined") {
            toast({
                title: "Please Select An Image",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return
        }

        const image = pics
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            const formData = new FormData()
            formData.append('image', image)
            const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
            fetch(url, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    setPic(data.data.display_url)
                    setLoading(false)
                })
        }
    }

    const submitHandler = () => {

    }

    return (
        <VStack spacing={"5px"}>
            <FormControl id='first-name' isRequired>
                <FormLabel>
                    Name
                </FormLabel>
                <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input placeholder='Enter Your Password' type={show ? 'text' : "password"} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width={'4.5rem'}>
                        <Button onClick={() => setShow(!show)} h={'1.75rem'} size="sm">
                            {
                                show ? "Hide" : "Show"
                            }
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='confirm-password' isRequired>
                <FormLabel>
                    Confirm Password
                </FormLabel>
                <InputGroup>
                    <Input placeholder='Enter Your Confirm Password' type={show ? 'text' : "password"} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <InputRightElement width={'4.5rem'}>
                        <Button onClick={() => setShow(!show)} h={'1.75rem'} size="sm">
                            {
                                show ? "Hide" : "Show"
                            }
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic' isRequired>
                <FormLabel>
                    Upload Your Picture
                </FormLabel>
                <Input type={'file'} p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
            </FormControl>
            <Button
                colorScheme={"blue"}
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;