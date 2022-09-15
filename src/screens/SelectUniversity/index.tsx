import {SearchInput} from '@/components/Search'
import {University} from '@/models'
import {useUniversities} from '@/stores'
import {Colors} from '@/styles'
import {Box, Button, Center, Divider, Image, Text, VStack} from 'native-base'
import React, {useEffect} from 'react'
import {ms} from 'react-native-size-matters'
import {UniversityListItem} from './university-list-item'

export default function SelectUniversity() {
  const {universities, fetchUniversities} = useUniversities(state => state)
  useEffect(() => {
    fetchUniversities()
  }, [])

  return (
    <Box bgColor={Colors.white} flex={1} p={2} safeArea>
      <Box flex={1} px={5}>
        <Center>
          <Image
            mt={ms(44)}
            source={require('@/assets/images/Bondo-text.png')}
            alt="bondo-text-logo"
          />
        </Center>
        <Box mt={ms(44)}>
          <SearchInput />
          {universities?.map(uni => (
            <UniversityListItem university={uni} />
          ))}
        </Box>
      </Box>

      <Box>
        <VStack space={5} padding={10}>
          <Center>
            <Divider bgColor={Colors.App.secondary} w={ms(150)} />
          </Center>
          <Center>
            <Text color={Colors.App.primary} bold fontSize="lg">
              or
            </Text>
          </Center>
          <Button
            bgColor={Colors.App.primary}
            _pressed={{
              bgColor: Colors.App.secondary
            }}
            h={ms(45)}
            rounded="full"
            _text={{
              bold: true,
              fontSize: 'md'
            }}
            // disabled={isLoadingUniversities}
          >
            Join your organization
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}
