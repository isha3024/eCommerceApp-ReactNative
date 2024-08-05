import React, { useEffect, useRef, useState } from 'react' 
import { View, StatusBar, FlatList, TouchableOpacity, Platform, UIManager, LayoutAnimation, ScrollView, Alert, LogBox, ToastAndroid } from 'react-native'
import { BottomSheetContainer, Button, Header, ProductCardMain, Screen, SortBy, Text } from '../../components'
import { IcBackArrow, IcFilter, IcGrid, IcList, IcSearch, IcSortIcon, color, size } from '../../theme'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite, loadProducts, productAddToFavorite } from '../../redux'
import * as styles from './styles'

if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const womenTopCategory = [
  {
    id: 1,
    name: 'T-shirts',
  },
  {
    id: 2,
    name: 'Crop tops',
  },
  {
    id: 3,
    name: 'Sleevless',
  },
  {
    id: 4,
    name: 'Shirts',
  },
  {
    id: 5,
    name: 'Blouses',
  },
  {
    id: 6,
    name: 'Oversized',
  },
]

//sort product array to sort the product using populariy, reviews, etc..
const sortProductType = [
  {
    id: 1,
    name: 'Popular'
  },
  {
    id: 2,
    name: 'Newest'
  },
  {
    id: 3,
    name: 'Customer review'
  },
  {
    id: 4,
    name: 'Price: lowest to high'
  },
  {
    id: 5,
    name: 'Price: highest to low'
  }
]

//product sizes available
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export const CatalogeScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const products = useSelector(state => state.user.products);
  const wishlist = useSelector(state => state.user);

  const [showProductList, setShowProductList] = useState(products);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(sortProductType[3]);
  const [isSortOptionSelected, setIsSortOptionSelected] = useState(sortProductType[3])
  const [showGrid, setShowGrid] = useState(true);
  const [title, showTitle] = useState(false);
  const [isSizeSheetVisible, setSizeSheetVisible] = useState(false);
  const [userSizeOption, setUserSizeOption] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null)
  
  LogBox.ignoreLogs([
    'Tried to modify key `reduceMotion` of an object which has been already passed to a worklet'
  ]);

  const toggleLayout = () => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'linear', property: 'opacity'},
      delete: {type: 'linear', property: 'opacity'},
    });
    setShowGrid(!showGrid);
    showTitle(!title);
  } 

  /**sorting the product based on selection */
  const sortProducts = (sortOption) => {
    let sortedList = [...products];
    // console.log('list: ', sortedList);
    switch (sortOption.id) {
      case 3: 
        sortedList.sort((a, b) => b.ratings - a.ratings);
        break;
      case 4:
        sortedList.sort((a, b) => a.originalPrice - b.originalPrice);
        break;
      case 5:
        sortedList.sort((a, b) => b.originalPrice - a.originalPrice);
        break;
      default:
        break;
    }
    setShowProductList(sortedList);
  };

  //handling the sort option selected but not working as expected
  const handleSortOptionChange = (sortOption) => {
    setIsSelected(sortOption);
    setIsSortOptionSelected(sortOption);
    sortProducts(sortOption);
    setTimeout(() => {
      setSheetVisible(false);
    }, 300)
  }

  //selecting the user selected size option and when the user selected the size then only navigate to mainProductScreen
  const selectSizeHandler = (size) => {
    setUserSizeOption(size);
  };

  const handleNavigation = () => {
    if(!userSizeOption){
      Alert.alert(
        '',
        'Please select the size',
        [
          {
            text: 'OK',
            onPress: () => null,
          },
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel'
          }
        ]
      )
      setSizeSheetVisible(true);
    }else {
      navigation.navigate('mainProductScreen', { selectedSize: userSizeOption, productId: selectedProductId })
      setUserSizeOption(false)
      setSizeSheetVisible(false);
    }
  }

  //handling the sort option bottom sheet visibility
  const handleOpenPress = () => {
    setSheetVisible(true);
  }
  const handleClosePress = () => {
    setSheetVisible(false);
  }

  //handling the size bottom sheet visibility
  const handleClosePressSizeSheet = () => {
    setSizeSheetVisible(false);
  }

  const handleAddToFavorite = async (item) => {
    // console.log(item)
    dispatch(addToFavorite(item))
  };
  
  const renderProducts = ({item}) => {
    const isWishlisted = false
    return (
        <ProductCardMain 
          onProductPress={() => {
            setSelectedProductId(item.id);
            setSizeSheetVisible(true);
          }}
          productHorizontal={showGrid ? true : false}
          productTitle={item?.name}
          brandName={item?.brand}
          showRatings={true}
          ratings={item?.ratings}
          ratingsCounts={item?.rating_count}
          showDiscount={showGrid ? false : true}
          originalPrice={item?.originalPrice}
          sellingPrice={item?.sellingPrice}
          newProduct={showGrid ? false : item?.isProductNew}
          productImage={item?.images}
          topRightIcon={false}
          addToFavoriteIcon={true}
          onAddToFavorite={() => handleAddToFavorite(item)}
          isFavorite={isWishlisted}
          flotingBtnStyle={!showGrid ? styles.flotingButton() : styles.flotingButtonList()}
          customProductStyle={showGrid ? styles.productCardListItem() : styles.productCardGridItem()}
        />
      )
  }

  useEffect(() => {
    dispatch(loadProducts())
  },[dispatch])

  return (
      <Screen bgColor={color.white} translucent={true}>
        <Header
          title={title ? true : false}
          headerTitle={"Women's top"}
          headerStyle={styles.header(title)}
          leftIconPress={() => navigation.goBack()}
          headerLeftIcon
          leftIcon={() => {
            return (<IcBackArrow />)
          }} 
          headerRightIcon
          rightIcon={() => {
            return <IcSearch />
          }}
        />
        <View style={styles.topContainer()}>
          <View style={styles.mainView()}>
            {title ? null : (<Text style={styles.title()}>Women's tops</Text>)}
          </View>
          <View style={styles.horizontalScroll(title)}>
            <View style={styles.flatList()}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{paddingBottom: size.moderateScale(4)}}>
              {
                womenTopCategory.map((item, index) => {
                  return (
                    <View style={styles.listItem()} key={index}>
                      <Text style={styles.listText()}>{item.name}</Text>
                    </View>
                  )
                })
              }
            </ScrollView>
            </View>
            <View style={styles.filterContainer()}>
              <TouchableOpacity onPress={() => navigation.navigate('filterScreen')} style={styles.filterItem()}>
                <IcFilter />
                <Text style={styles.filterItemText()}>Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpenPress} style={styles.filterItem()}>
                <IcSortIcon />
                <Text style={styles.filterItemText()}>{isSelected ? isSelected.name : 'Sort'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleLayout} style={styles.filterIcon()}>
                {
                  showGrid ? ( <IcGrid /> ) : ( <IcList /> )
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer(showGrid)}>
          {
            showGrid ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={showProductList}
                renderItem={renderProducts}
                key={'_'}
                keyExtractor={item => '_'+item.name}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={showProductList}
                renderItem={renderProducts}
                key={'#'}
                keyExtractor={(item) => item.id.toString()}
              />
            )
          } 
        </View>
        <BottomSheetContainer
          isVisible={isSheetVisible}
          onClose={handleClosePress}
          customHeight={'42%'}>
          <Text style={styles.titleBottomSheet()}>Sort by</Text>
          <View style={styles.mainSortOptionView()}>
          {
            sortProductType.map((sort) => {
              const isSelected = sort === isSortOptionSelected;
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleSortOptionChange(sort)} style={styles.sortOptionView(isSelected)} key={sort.id}>
                  <Text style={styles.sortOptionText(isSelected)}>{sort.name}</Text>
                </TouchableOpacity>
              )
            })
          }
          </View>    
        </BottomSheetContainer>
        <BottomSheetContainer
          isVisible={isSizeSheetVisible}
          onClose={handleClosePressSizeSheet}
          customHeight={'47%'}>
          <Text style={styles.titleBottomSheet()}>Select Size</Text>
          <View style={styles.sizeContainer()}>
          {
            sizes.map((size, index) => {
              const isSelected = size === userSizeOption;
              return (
                <TouchableOpacity onPress={() => selectSizeHandler(size)} activeOpacity={0.5} style={styles.sizeItem(isSelected)} key={index}>
                  <Text style={styles.sizeText(isSelected)}>{size}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
          <TouchableOpacity style={styles.sizeInfo()}>
            <Text style={styles.sizeInfoText()}>Size info</Text>
            <IcBackArrow style={styles.forwardArrow()} width={size.moderateScale(10)} height={size.moderateScale(10)} />
          </TouchableOpacity>
          <Button title='ADD TO CART' btnStyle={styles.button()} onPress={handleNavigation}/>
        </BottomSheetContainer>
      </Screen>
  )
}
