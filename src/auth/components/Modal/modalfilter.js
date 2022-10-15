import React, {useState} from 'react'
import {
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import {View, Button, Tag, Touchable, Content} from '../../../common'
import Gap from '../../../common/Gap'
import Text from '../../../common/TextV2'
import * as Colors from '../../../config/colors'
import ArrowRightIcon from '../../../assets/icons/icon-arrow.svg'
import SearchIcon from '../../../assets/icons/icon-search.svg'
import LocationIcon from '../../../assets/icons/icon-location-gray.svg'
import {useNavigation} from '@react-navigation/native'
import Fonts from '../../../config/fonts'
import PlusIcon from '../../../assets/icons/icon-plus-circle.svg'

const ModalFilter = ({onYes, onCloseModal, isVisible, setSortBy, sortBy, postFilter, setFilters, filterFlag}) => {
  const navigation = useNavigation()
  // const [sortBy, setSortBy] = useState('Recent')
  const [location, setLocation] = useState('')
  const [gradYear, setGradYear] = useState('')
  const [gender, setGender] = useState('')
  // for major filter
  const [majorScreen, setMajorScreen] = useState(false)
  const [searchMajor, setSearchMajor] = useState('')
  const [valuemajor, setValuemajor] = useState('')
  const [majordata, setMajordata] = useState([
    'Business admin',
    'Film / Video production',
    'Psychology',
    'Corporate communications',
    'Speech communication',
    'Business',
    'Health services admin',
    'Political science',
    'Public relations',
    'Accounting',
    'Economics',
    'Education',
    'Biology',
    'Playwriting',
    'Sociology',
    'Broadcast journalism',
    'Dance',
    'Computer science',
    'Creative writing',
    'Drama theatre arts',
    'Physiology',
    'Graphic design',
    'English and literature',
    'Animation',
    'Philosophy',
    'Biochemistry'
  ])
  // for downfor filter
  const [downforScreen, setDownforScreen] = useState(false)
  const [searchDownfor, setSearchDownfor] = useState('')
  const [valuedownfor, setValuedownfor] = useState([])
  const [downfordata, setDownfordata] = useState([
    'Road trips',
    'Skiing',
    'Snowboarding',
    'Festivals',
    'Sports',
    'Nights out',
    'Business',
    'Yoga',
    'Gym',
    'Surfing',
    'Content Creation',
    'Socializing',
    'Camping',
    'Exploring',
    'Art',
    'Gaming',
    'Startups',
    'Golf',
    'Entertainment'
  ])
  // for interest filter
  const [interestScreen, setInterestScreen] = useState(false)
  const [searchInterest, setSearchInterest] = useState('')
  const [valueinterest, setValueinterest] = useState([])
  const [interestdata, setInterestdata] = useState([
    'Mindfulness',
    'Fitness',
    'Health',
    'Activism',
    'LGBTQ+ Rights',
    'Photography',
    'Music',
    'Sports',
    'Business',
    'Podcasts',
    'Movies / TV',
    'Travel',
    'Reading',
    'Outdoors',
    'Art',
    'Writing',
    'Gaming',
    'Startups',
    'Technology',
    'Religion',
    'Spirituality',
    'Disney'
  ])

  const _onSubmitMajor = () => {
    setMajorScreen(false)
  }

  const _onSubmitDownFor = () => {
    setDownforScreen(false)
  }

  const _onSubmitInterest = () => {
    setInterestScreen(false)
  }

  const _clearFilter = () => {
    setSortBy(postFilter ? 'Newest' : 'Recent')
    setSearchMajor('')
    setSearchDownfor('')
    setSearchInterest('')
    setLocation('')
    setGradYear('')
    setGender('')
    if(filterFlag){
    setFilters({downfor: [],
      from: "",
      gradeYear: "",
      gender: "",
      major: ""
      })
    }
  }

  const updateFilter = () => {
    setFilters({downfor: valuedownfor,
    from: location,
    gradeYear: gradYear,
    gender: gender,
    major: valuemajor
    })
    onYes({downfor: valuedownfor,
      from: location,
      gradeYear: gradYear,
      gender: gender,
      major: valuemajor
      })
  }

  const renderMajor = () => {
    return (
      <View style={styles.defaultContentContainerStyle}>
        <View style={styles.topLine} />
        <Gap height={16} />
        <Text size="big" family="semi">
          Choose Major
        </Text>
        <Gap height={16} />
        <View style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholderTextColor={Colors.black400}
            style={styles.input}
            placeholder="Search for which major"
            value={searchMajor}
            onChangeText={value => {
              setSearchMajor(value)
            }}
          />
        </View>
        <Gap height={12} />
        <Content>
          <View style={styles.containerTagMajor}>
            {majordata.map(item => (
              <Tag
                key={item}
                text={item}
                selected={valuemajor === item}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  marginRight: 10,
                  marginBottom: 12
                }}
                onPress={() => setValuemajor(item)}
              />
            ))}
          </View>
        </Content>

        <Gap height={4} />
        <View horizontal>
          <Button
            title="Confirm"
            onPress={_onSubmitMajor}
            containerStyle={{flex: 1}}
          />
        </View>
        <Gap height={12} />
        <View horizontal>
          <Button
            title="Cancel"
            onPress={() => setMajorScreen(false)}
            type="alert"
            textStyle={{
              color: Colors.black500,
              fontFamily: Fonts.fontFamily.rubikBold
            }}
          />
        </View>
        <Gap height={30} />
      </View>
    )
  }

  const renderDownFor = () => {
    return (
      <View style={styles.defaultContentContainerStyle}>
        <View style={styles.topLine} />
        <Gap height={16} />
        <Text size="big" family="semi">
          Choose Down For
        </Text>
        <Gap height={16} />
        <View style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholderTextColor={Colors.black400}
            style={styles.input}
            placeholder="Search for which down for"
            value={searchDownfor}
            onChangeText={value => {
              setSearchDownfor(value)
            }}
          />
        </View>
        <Gap height={12} />
        <Content>
          <View style={styles.containerTagMajor}>
            {downfordata.map(item => {
              return (
                <Tag
                  key={item}
                  text={item}
                  selected={valuedownfor?.includes(item)}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    marginRight: 10,
                    marginBottom: 12
                  }}
                  onPress={() => {
                    if (valuedownfor?.includes(item)) {
                      const myIndex = valuedownfor.indexOf(item)
                      if (myIndex !== -1) {
                        valuedownfor.splice(myIndex, 1)
                        setValuedownfor([...valuedownfor])
                      }
                    } else {
                      if (valuedownfor.length === 4) {
                        return alert('maximum 4')
                      } else {
                        let selectedUpdate = [item, ...valuedownfor]
                        setValuedownfor(selectedUpdate)
                      }
                    }
                  }}
                />
              )
            })}
          </View>
        </Content>
        <Gap height={4} />
        <View horizontal>
          <Button
            title="Confirm"
            onPress={_onSubmitDownFor}
            containerStyle={{flex: 1}}
          />
        </View>
        <Gap height={12} />
        <View horizontal>
          <Button
            title="Cancel"
            onPress={() => setDownforScreen(false)}
            type="alert"
            textStyle={{
              color: Colors.black500,
              fontFamily: Fonts.fontFamily.rubikBold
            }}
          />
        </View>
        <Gap height={30} />
      </View>
    )
  }

  const renderInterest = () => {
    return (
      <View style={styles.defaultContentContainerStyle}>
        <View style={styles.topLine} />
        <Gap height={16} />
        <Text size="big" family="semi">
          Choose Interest
        </Text>
        <Gap height={16} />
        <View style={styles.containerSearch}>
          <SearchIcon />
          <TextInput
            placeholderTextColor={Colors.black400}
            style={styles.input}
            placeholder="Search for interest"
            value={searchInterest}
            onChangeText={value => {
              setSearchInterest(value)
            }}
          />
        </View>
        <Gap height={12} />
        <Content>
          <View style={styles.containerTagMajor}>
            {interestdata.map(item => {
              return (
                <Tag
                  key={item}
                  text={item}
                  selected={valueinterest?.includes(item)}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    marginRight: 10,
                    marginBottom: 12
                  }}
                  onPress={() => {
                    if (valueinterest?.includes(item)) {
                      const myIndex = valueinterest.indexOf(item)
                      if (myIndex !== -1) {
                        valueinterest.splice(myIndex, 1)
                        setValueinterest([...valueinterest])
                      }
                    } else {
                      if (valueinterest.length === 4) {
                        return alert('maximum 4')
                      } else {
                        let selectedUpdate = [item, ...valueinterest]
                        setValueinterest(selectedUpdate)
                      }
                    }
                  }}
                />
              )
            })}
          </View>
        </Content>
        <Gap height={4} />
        <View horizontal>
          <Button
            title="Confirm"
            onPress={_onSubmitInterest}
            containerStyle={{flex: 1}}
          />
        </View>
        <Gap height={12} />
        <View horizontal>
          <Button
            title="Cancel"
            onPress={() => setInterestScreen(false)}
            type="alert"
            textStyle={{
              color: Colors.black500,
              fontFamily: Fonts.fontFamily.rubikBold
            }}
          />
        </View>
        <Gap height={30} />
      </View>
    )
  }
  return (
    <Modal
      style={styles.modalContainerStyle}
      isVisible={isVisible}
      useNativeDriver
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      hideModalContentWhileAnimating
    >
      <>
        {majorScreen && renderMajor()}
        {downforScreen && renderDownFor()}
        {interestScreen && renderInterest()}
        {!majorScreen && !downforScreen && !interestScreen && (
          <View style={styles.parentDefaultContentContainerStyle}>
            <View style={styles.topLine} />
            <Gap height={16} />
            <ScrollView style={styles.scroll}>
              <View horizontal justifyContent={'space-between'}>
                <Text size="big" family="semi">
                  Filter
                </Text>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    _clearFilter() || onCloseModal()
                  }}
                  // onPress={()=>()}
                >
                  <Text size="Medium" family="semi" color="#A70032">
                    Clear Filter
                  </Text>
                  <PlusIcon
                    style={{
                      transform: [{rotate: '45deg'}],
                      marginHorizontal: 10
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Gap height={16} />
              <Text family="semi">Sort by</Text>
              <Gap height={12} />
              {postFilter?
              <View horizontal>
                <Tag
                  text={'Newest'}
                  selected={sortBy === 'Newest'}
                  onPress={e => setSortBy(e)}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
                <Tag
                  text={'Most Popular'}
                  selected={sortBy === 'Most Popular'}
                  onPress={e => setSortBy(e)}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
              </View>
              :
              <View horizontal>
                <Tag
                  text="Recent"
                  selected={sortBy === 'Recent'}
                  onPress={e => setSortBy(e)}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
                <Tag
                  text="A-Z"
                  selected={sortBy === 'A-Z'}
                  onPress={e => setSortBy(e)}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
                <Tag
                  text="Z-A"
                  selected={sortBy === 'Z-A'}
                  onPress={e => setSortBy(e)}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
              </View>}

              <Gap height={15} />

              {!postFilter?
              <>
              <Text family="semi">Major</Text>
              <Gap height={8} />
              <Touchable
                style={styles.containerChooseBox}
                onPress={() => setMajorScreen(true)}
              >
                <Text
                  color={!valuemajor && Colors.black500}
                  customStyle={{flex: 1}}
                >
                  {valuemajor ? valuemajor : 'Choose the major here'}
                </Text>

                <ArrowRightIcon />
              </Touchable>
              </>:null}


              <Text family="semi">up for</Text>
              <Gap height={8} />
              <Touchable
                style={styles.containerChooseBox}
                onPress={() => setDownforScreen(true)}
              >
                <Text
                  color={valuedownfor.length === 0 && Colors.black500}
                  customStyle={{flex: 1}}
                >
                  {valuedownfor.length > 0
                    ? `${valuedownfor[0]} ${
                        valuedownfor.length > 1
                          ? `+${valuedownfor.length - 1} others`
                          : ''
                      }`
                    : 'Choose what to down for here'}
                </Text>
                <ArrowRightIcon />
              </Touchable>

              {!postFilter?
              <>
              <Text family="semi">Interest</Text>
              <Gap height={8} />
              <Touchable
                style={styles.containerChooseBox}
                onPress={() => setInterestScreen(true)}
              >
                <Text
                  color={valueinterest.length === 0 && Colors.black500}
                  customStyle={{flex: 1}}
                >
                  {valueinterest.length > 0
                    ? `${valueinterest[0]} ${
                        valueinterest.length > 1
                          ? `+${valueinterest.length - 1} others`
                          : ''
                      }`
                    : 'Choose the interest here'}
                </Text>
                <ArrowRightIcon />
              </Touchable>
              </>:null}

              {!postFilter?
              <>
              <Text family="semi">From</Text>
              <Gap height={8} />

              <Touchable style={styles.containerLocation}>
                <TextInput
                  style={{
                    flex: 1,
                    marginRight: 10
                  }}
                  placeholder="Write where from here"
                  value={location}
                  onChangeText={value => {
                    setLocation(value)
                  }}
                />
                <LocationIcon />
              </Touchable>
              </>:null}

              {!postFilter?
              <>
              <Text family="semi">Grad Year</Text>
              <Gap height={8} />
              <View horizontal>
                <Tag
                  text="2022"
                  selected={gradYear === '2022'}
                  onPress={setGradYear}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
                <Tag
                  text="2023"
                  selected={gradYear === '2023'}
                  onPress={setGradYear}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
                <Tag
                  text="2024"
                  selected={gradYear === '2024'}
                  onPress={setGradYear}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
                <Tag
                  text="2025"
                  selected={gradYear === '2025'}
                  onPress={setGradYear}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
              </View>
              </>:null}

              {!postFilter?
              <>
              <Gap height={16} />

              <Text family="semi">Gender</Text>
              <Gap height={8} />
              <View horizontal>
                <Tag
                  text="Male"
                  selected={gender === 'Male'}
                  onPress={setGender}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
                <Tag
                  text="Female"
                  selected={gender === 'Female'}
                  onPress={setGender}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
                <Tag
                  text="Non-binary"
                  selected={gender === 'Non-binary'}
                  onPress={setGender}
                  style={{paddingHorizontal: 10, paddingVertical: 6}}
                />
              </View>
              </>:null}

              <Gap height={16} />
              <View horizontal>
                <Button
                  title="Submit"
                  onPress={filterFlag ? () => updateFilter() : onYes}
                  containerStyle={{flex: 1}}
                />
              </View>
              <Gap height={16} />

              <Gap height={24} />
            </ScrollView>
          </View>
        )}
      </>
    </Modal>
  )
}

const styles = StyleSheet.create({
  topLine: {
    height: 4,
    borderRadius: 100,
    width: 40,
    backgroundColor: Colors.black400,
    marginTop: 10,
    alignSelf: 'center'
  },
  modalContainerStyle: {
    justifyContent: 'flex-end',
    margin: 0
  },
  parentDefaultContentContainerStyle: {
    backgroundColor: Colors.white100,
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '95%'
  },
  defaultContentContainerStyle: {
    backgroundColor: Colors.white100,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '95%'
  },
  defaultIcon: {
    paddingTop: 50,
    paddingBottom: 38,
    alignSelf: 'center'
  },
  title: {
    marginBottom: 8,
    alignSelf: 'center'
  },
  description: {
    marginBottom: 28,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 12
  },
  containerButton: {
    flexDirection: 'row',
    marginBottom: 16
  },
  image: {
    height: 80,
    width: 80
  },
  containerChooseBox: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.white200,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 12
  },
  containerLocation: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.white200,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    // paddingVertical: 12,
    alignItems: 'center'
  },
  containerSearch: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.white200,
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  input: {
    marginHorizontal: 8,
    fontFamily: Fonts.fontFamily.rubikRegular,
    color: Colors.black600,
    flex: 1
  },
  containerTagMajor: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  scroll: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16
  }
})

export default ModalFilter
