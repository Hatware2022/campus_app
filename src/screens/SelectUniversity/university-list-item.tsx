import {University} from '@/models'
import {Colors} from '@/styles'
import {Box, Button, HStack, Text} from 'native-base'
import React from 'react'
import {ms} from 'react-native-size-matters'

type Props = {
  university: University
}

export const UniversityListItem = ({university}: Props) => {
  return (
    <HStack alignItems="center" justifyContent="space-between" my={5}>
      <Box>
        <Text bold fontSize="md">
          {university.name}
        </Text>
      </Box>
      <Button
        variant="outline"
        borderColor={Colors.App.primary}
        borderWidth={ms(2)}
        py={1}
        px={2}
        _text={{
          bold: true,
          color: Colors.App.primary
        }}
        _pressed={{
          _text: {
            color: Colors.white
          },
          bgColor: Colors.App.secondary,
          borderColor: Colors.App.secondary
        }}
      >
        Select
      </Button>
    </HStack>
  )
}
