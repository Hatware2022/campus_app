import React, {useState, useEffect} from 'react'
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import {View, Button, Tag} from '../../../common'
import Gap from '../../../common/Gap'
import Text from '../../../common/TextV2'
import * as Colors from '../../../config/colors'
import PlusIcon from '../../../assets/icons/icon-plus-circle.svg'

const GroupsModalFilter = ({
  onCloseModal,
  isVisible,
  sortBy,
  sortValues,
  tags,
  tagValues,
  onYes
}) => {
  const [filterSortValue, setFilterSortValue] = useState(sortBy)
  const [filterTags, setFilterTags] = useState(tagValues)

  useEffect(() => {
    setFilterTags(tagValues)
    setFilterSortValue(sortBy)
  }, [isVisible])

  const _clearFilter = () => {
    setFilterSortValue('')
    setFilterTags([])
  }

  const handleSubmit = (clear = false) => {
    onYes({
      sortBy: filterSortValue,
      tags: filterTags
    })
    onCloseModal()
  }

  const getButtonStatus = () => {
    return tagValues.length === filterTags.length && 
    JSON.stringify({sortBy, tagValues}) === JSON.stringify({sortBy: filterSortValue, tagValues: filterTags})
  }

  return (
    <Modal
      style={styles.modalContainerStyle}
      isVisible={isVisible}
      useNativeDriver
      onBackdropPress={() => {
        _clearFilter()
        onCloseModal()
      }}
      onBackButtonPress={() => {
        _clearFilter()
        onCloseModal()
      }}
      hideModalContentWhileAnimating
    >
      <View style={styles.parentDefaultContentContainerStyle}>
        <View style={styles.topLine} />
        <Gap height={16} />
        <ScrollView style={styles.scroll}>
          <View horizontal justifyContent={'space-between'}>
            <Text size="big" family="semi">
              Filter
            </Text>
            <View style={styles.clearFilter}>
            <TouchableOpacity
              onPress={() => {
                _clearFilter()
              }}
            >
              <Text size="Medium" family="semi" color="#A70032">
                Clear Filter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCloseModal}>
              <PlusIcon style={styles.plusIcon} />
            </TouchableOpacity>
            </View>
          </View>
          <Gap height={16} />
          <Text family="semi">Tags</Text>
          <View horizontal marginTop={12} style={{flexWrap: 'wrap'}}>
            {tags.map(item => {
              return (
                <Tag
                  key={item}
                  text={item}
                  selected={filterTags.includes(item)}
                  onPress={() => {
                    setFilterTags(
                      filterTags.includes(item)
                        ? filterTags.filter(filter => filter !== item)
                        : [...filterTags, item]
                    )
                  }}
                  style={styles.tag}
                />
              )
            })}
          </View>
          <Gap height={16} />
          <Text family="semi">Sort by</Text>
          <View horizontal>
            {sortValues.map(sortValue => (
              <Tag
                key={sortValue}
                text={sortValue}
                selected={filterSortValue === sortValue}
                onPress={() => {
                  setFilterSortValue(sortValue)
                }}
                style={styles.tag}
              />
            ))}
          </View>

          <Gap height={15} />

          <View horizontal>
            <Button
              title="Submit"
              onPress={handleSubmit}
              containerStyle={styles.submit}
              disabled={getButtonStatus()}
            />
          </View>
          <Gap height={16} />

          <Gap height={24} />
        </ScrollView>
      </View>
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
  title: {
    marginBottom: 8,
    alignSelf: 'center'
  },
  scroll: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: -5,
  },
  plusIcon: {
    transform: [{rotate: '45deg'}],
    marginHorizontal: 10
  },
  clearFilter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  submit: {
    flex: 1
  }
})

export default GroupsModalFilter
