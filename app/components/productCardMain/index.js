import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { IcClose, IcFilledHeart, IcHeart, color, size } from '../../theme'
import { Text } from '../text'
import StarRatings from '../starRatings'


const ProductCardMain = ({
  productHorizontal,
  brandName,
  productTitle,
  productImage,
  onProductPress,
  activeOpacity,
  regularPrice,
  oldPrice,
  newPrice,
  ratings,
  ratingsCounts,
  saleProduct,
  newProduct,
  flotingBtnStyle,
  topRightIcon
  // onAddToFavorite
}) => {
  const [filledHeart, setFilledHeart] = useState(false);

  const onAddToFavorite = () => {
    if (filledHeart) {
      setFilledHeart(false)
    } else {
      setFilledHeart(true)
    }
  }

  if (!productHorizontal) {
    return(
<TouchableOpacity style={styles.mainProductCard()} onPress={onProductPress} activeOpacity={activeOpacity ?? 0.7}>
      <View style={styles.imageView()}>
        <Image source={productImage} style={styles.image()} />
        <TouchableOpacity style={[styles.addToFavoriteBtn(), flotingBtnStyle]} onPress={onAddToFavorite}>
          {
            filledHeart ?
              (<IcFilledHeart fill={color.secondary} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
              : (<IcHeart fill={color.darkGray} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
          }
        </TouchableOpacity>
        <View style={styles.badge(saleProduct, newProduct)}>
          {
            saleProduct ? (
              <Text style={styles.badgeText()}>-{saleProduct}%</Text>
            )
              : newProduct ? (
                <Text style={styles.badgeText()}>New</Text>
              ) : null
          }
        </View>
        {
          topRightIcon && (
            <TouchableOpacity style={styles.closeIcon()}>
              <IcClose width={size.moderateScale(12)} height={size.moderateScale(12)} fill={color.darkGray}  />
            </TouchableOpacity>
          )
        }
      </View>
      <View style={styles.productInfo()}>
        <View style={styles.ratingsContainer()}>
          <StarRatings ratings={ratings} ratingsCounts={ratingsCounts} />
        </View>
        <Text style={styles.brandName()}>{brandName}</Text>
        <Text style={styles.productTitle()}>{productTitle}</Text>
        {
            oldPrice && newPrice ? (
              <View style={styles.priceContainer()}>
                <Text style={styles.oldPrice()}>${oldPrice}</Text>
                <Text style={styles.newPrice()}>${newPrice}</Text>
              </View>
            ) : (<Text style={styles.regularPrice()}>{regularPrice}$</Text>)
          }
      </View>
    </TouchableOpacity>
    );  
  }
  else {
    return (
      <TouchableOpacity style={styles.mainProductCardHorizontal()} activeOpacity={activeOpacity ?? 0.7}>
        <View style={styles.imageViewHorizontal()}>
          <Image source={productImage} style={styles.imageHorizontal()} />
          <View style={styles.badgeHorizontal(saleProduct, newProduct)}>
          {
            saleProduct ? (
              <Text style={styles.badgeText()}>-{saleProduct}%</Text>
            )
            : newProduct ? (
              <Text style={styles.badgeText()}>NEW</Text>
            ) : (<Text></Text>)
          }
        </View>
        </View>
        <View style={styles.productInfoHorizontal()}>
          <Text style={styles.productTitle()}>{productTitle}</Text>
          <Text style={styles.brandName()}>{brandName}</Text>
          <StarRatings customStarRatings={styles.starRatings()} ratings={ratings} ratingsCounts={ratingsCounts} />
          {
            oldPrice && newPrice ? (
              <View style={styles.priceContainer()}>
                <Text style={styles.oldPrice()}>${oldPrice}</Text>
                <Text style={styles.newPrice()}>${newPrice}</Text>
              </View>
            ) : (<Text style={styles.regularPrice()}>{regularPrice}$</Text>)
          }
          
          <TouchableOpacity style={[styles.addToFavoriteBtnHorizontal(),flotingBtnStyle]} onPress={onAddToFavorite}>
            {
              filledHeart ?
                (<IcFilledHeart fill={color.secondary} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
                : (<IcHeart fill={color.darkGray} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeIcon()}>
            <IcClose width={size.moderateScale(12)} height={size.moderateScale(12)} fill={color.darkGray}  />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductCardMain