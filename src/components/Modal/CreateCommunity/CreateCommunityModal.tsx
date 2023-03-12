import React, {useState} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Box, Divider, Text, Input, Stack, Checkbox, Flex
} from '@chakra-ui/react';
import {BsFillEyeFill, BsFillPersonFill} from "react-icons/bs";
import {HiLockClosed} from "react-icons/hi";
import {Icon} from "@chakra-ui/icons";
import {doc, getDoc, serverTimestamp, setDoc} from "@firebase/firestore";
import {auth, firestore} from "@/firebase/clientApp";
import {useAuthState} from "react-firebase-hooks/auth";
import {runTransaction} from "@firebase/firestore";
import {useRouter} from "next/router";
import useDirectory from "@/hooks/useDirectory";

type CreateCommunityModalProps = {
    open: boolean,
    handleClose: () => void,
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({open, handleClose}) => {
    const [user] = useAuthState(auth);
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState('public');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {toggleMenuOpen} = useDirectory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 30) return;
        setCommunityName(event.target.value);
        setCharsRemaining(30 - event.target.value.length);
    }

    const onCommunityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name);
    }

    const handleCreateCommunity = async () => {
        if (error) setError('');
        //Check name
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (format.test(communityName) || communityName.length < 3) {
            setError('Wrong name format');
            return;
        }
        setLoading(true);

        try {
            const communityDocRef = doc(firestore, 'communities', communityName);

            await runTransaction(firestore, async (transaction) => {
                const communityDoc = await transaction.get(communityDocRef);
                if (communityDoc.exists()) {
                    throw new Error(`${communityName} has been used.`);
                }

                //Create community
                transaction.set(communityDocRef, {
                    creatorId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType
                })

                //Create community snippet on user
                transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName,
                    isModerator: true
                });
            });
            handleClose();
            toggleMenuOpen();
            router.push(`s/${communityName}`);
        } catch (error: any) {
            console.log('handleCreateCommunity error', error);
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <>
            <Modal isOpen={open} onClose={handleClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                        display='flex'
                        flexDirection='column'
                        fontSize={15}
                        padding={3}
                    >
                        Create Group
                    </ModalHeader>
                    <Box px={3}>
                        <Divider/>
                        <ModalCloseButton/>
                        <ModalBody display='flex' flexDirection='column'>
                            <Text fontSize={15} fontWeight={600}>Group Name</Text>
                            <Text
                                position='relative'
                                top='26.5px'
                                left='10px'
                                width='20px'
                                color='gray.400'
                                fontSize='11pt'
                            >
                                s/
                            </Text>
                            <Input
                                position='relative'
                                value={communityName}
                                size='sm'
                                pl='22px'
                                onChange={handleChange}
                            />
                            <Text
                                color={charsRemaining === 0 ? 'red' : 'gray.500'}
                                fontSize='9pt'
                            >
                                {charsRemaining} characters remaining
                            </Text>
                            <Text fontSize='9pt' color='red' pt={1}>{error}</Text>
                        </ModalBody>
                    </Box>

                    <ModalFooter bg='gray.100' borderRadius='0 0 10px 10px'>
                        <Button
                            variant='outline'
                            height='30px'
                            mr={3}
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            height='30px'
                            onClick={handleCreateCommunity}
                            isLoading={loading}
                        >
                            Create Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateCommunityModal;