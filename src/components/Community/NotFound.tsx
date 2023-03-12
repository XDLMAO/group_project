import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

const CommunityNotFound: React.FC = () => {
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            <Text mb={2}>This group does not exist.</Text>
            <Link href="/">
                <Button mt={4}>Back to Homepage</Button>
            </Link>
        </Flex>
    );
};
export default CommunityNotFound;