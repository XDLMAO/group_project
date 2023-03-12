import React from 'react';
import {Box, Button, Flex, Input, Stack, Textarea} from "@chakra-ui/react";
import {useRouter} from "next/router";
import Link from "next/link";

type TextInputsProps = {
    textInputs: {
        title: string,
        body: string,
    }
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleCreatePost: ()=> void,
    loading: boolean
}

const TextInputs:React.FC<TextInputsProps> = ({textInputs, onChange, handleCreatePost, loading}) => {
    const router = useRouter()

    return(
        <Stack spacing={3} width='100%'>
            <Input
                name='title'
                value={textInputs.title}
                onChange={onChange}
                fontSize='10pt'
                borderRadius={4}
                placeholder='Title'
                _placeholder={{color:'gray.500'}}
                _focus={{bg:'white'}}
            />
            <Textarea
                name='body'
                value={textInputs.body}
                onChange={onChange}
                fontSize='10pt'
                height='100px'
                borderRadius={4}
                placeholder='Content (optional)'
                _placeholder={{color:'gray.500'}}
                _focus={{bg:'white'}}
            />
            <Flex justify='flex-end'>
                <Button
                    height='34px'
                    padding='0 30px'
                    isDisabled={!textInputs.title}
                    isLoading={loading}
                    onClick={handleCreatePost}
                >
                    Post
                </Button>
                <Box ml={2}>
                    <Link href={`/s/${router.query.communityId}`}>
                        <Button height='34px'>Cancel</Button>
                    </Link>
                </Box>
            </Flex>
        </Stack>
    )
}

export default TextInputs;