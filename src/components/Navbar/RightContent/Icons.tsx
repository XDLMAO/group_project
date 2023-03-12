import React from 'react';
import {BsArrowUpRightCircle, BsChatDots} from "react-icons/bs";
import {GrAdd} from "react-icons/gr";
import {IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline} from "react-icons/io5";
import {Flex, Icon} from "@chakra-ui/react";

type IconsProps = {}
const Icons: React.FC = () => {
    return (
        <Flex>
            <>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor='pointer'
                    borderRadius={4}
                    _hover={{bg: 'gray.200'}}
                >
                    <Icon as={BsChatDots} fontSize={20}/>
                </Flex>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor='pointer'
                    borderRadius={4}
                    _hover={{bg: 'gray.200'}}
                >
                    <Icon as={IoNotificationsOutline} fontSize={20}/>
                </Flex>
            </>
        </Flex>
    )
}

export default Icons;