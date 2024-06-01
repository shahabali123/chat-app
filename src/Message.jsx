import React from 'react'
import { HStack, Avatar, Text } from '@chakra-ui/react'

function Message({text, uri, user = "me"}) {
  return (
    <HStack 
    bg={"gray.100"} 
    padding={3} 
    borderRadius={16}
    alignSelf={user=== "me" ? 'flex-end' : 'flex-start'}>
        {
            user === "other" && <Avatar src={uri} />
        }
        <Text>{text}</Text>
        {
            user === "me" && <Avatar src={uri}/>
        }
    </HStack>
  )
}

export default Message