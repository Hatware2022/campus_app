import React from 'react'
import {Box, Input, FormControl, Icon} from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import {Colors} from '@/styles'
import {ms} from 'react-native-size-matters'

interface Props {
  onSearch: (searchQuery: string) => void
}

export function SearchInput({}) {
  return (
    <FormControl>
      <Input
        InputLeftElement={
          <Icon
            as={<Feather name="search" />}
            size="6"
            marginLeft={ms(5)}
            marginRight={ms(10)}
          />
        }
        placeholder="Search universities here"
        fontSize="md"
        bgColor={Colors.App.disabled}
        borderWidth={0}
        h={ms(50)}
      />
    </FormControl>
  )
}
