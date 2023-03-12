import React from 'react';
import {Flex, Link, Text} from "@chakra-ui/react";
import SearchInput from "@/components/Navbar/SearchInput";
import RightContent from "@/components/Navbar/RightContent/RightContent";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import Directory from "@/components/Navbar/Directory/Directory";
import useDirectory from "@/hooks/useDirectory";
import {defaultMenuItem} from "@/atoms/directoryMenuAtom";

const Navbar:React.FC = () => {
    const [user, loading, error] = useAuthState(auth)
    const {onSelectMenuItem} = useDirectory();

    return(
        <Flex
            bg="white"
            height='70px'
            padding="6px 12px"
            justify={{md: 'space-between'}}
        >
            <Flex
                justifyContent='center'
                alignItems='center'
                width={{base:'40px', md:'auto'}}
                cursor='pointer'
                onClick={() => onSelectMenuItem(defaultMenuItem)}
            >
                <Text
                    display={{base:'none', md:'block'}}
                    fontSize='25px'
                    className='logoName'
                >
                    Logo
                </Text>
            </Flex>
            {user && <Directory/>}
            <SearchInput user={user}/>
            <RightContent user={user}/>
        </Flex>
    )
}

export default Navbar;