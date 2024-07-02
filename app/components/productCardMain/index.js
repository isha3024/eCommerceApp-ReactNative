import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import * as styles from './styles'
import { IcClose, IcFilledHeart, IcHeart, color, size } from '../../theme'
import { Text } from '../text'
import { StarRatings } from '../starRatings'


export const ProductCardMain = ({
  customProductStyle,
  productHorizontal,
  brandName,
  productTitle,
  productImage,
  customProductImageStyle,
  onProductPress,
  activeOpacity,
  originalPrice,
  sellingPrice,
  ratings,
  ratingsCounts,
  saleProduct,
  newProduct,
  flotingBtnStyle,
  showTopRightIcon,
  topRightIcon
  // onAddToFavorite
}) => {
  const [filledHeart, setFilledHeart] = useState(false);
  const discount = Math.floor((sellingPrice/originalPrice) * 100);

  const onAddToFavorite = () => {
    if (filledHeart) {
      setFilledHeart(false)
    } else {
      setFilledHeart(true)
    }
  }

  if (productHorizontal) {
    return (
      <View>
      <TouchableOpacity style={[styles.mainProductCardHorizontal(),customProductStyle]} activeOpacity={activeOpacity ?? 0.7}>
        <View style={styles.imageViewHorizontal()}>
          <Image source={productImage} style={styles.imageHorizontal()} />
          <View style={[styles.badgeHorizontal(newProduct), sellingPrice && styles.discountBadge()]}>
            {
              sellingPrice ? 
              (
                <Text style={styles.badgeText()}>-{discount}%</Text>
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
            originalPrice && sellingPrice ? (
              <View style={styles.priceContainer()}>
                <Text style={styles.oldPrice()}>${originalPrice}</Text>
                <Text style={styles.newPrice()}>${sellingPrice}</Text>
              </View>
            ) : (<Text style={styles.regularPrice()}>{originalPrice}$</Text>)
          }
          {
            showTopRightIcon ? (
              <TouchableOpacity style={styles.closeIcon()}>
                <IcClose width={size.moderateScale(12)} height={size.moderateScale(12)} fill={color.darkGray} />
              </TouchableOpacity>
            ) : null
          }
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.addToFavoriteBtnHorizontal(), flotingBtnStyle]} onPress={onAddToFavorite}>
      {
        filledHeart ?
          (<IcFilledHeart fill={color.secondary} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
          : (<IcHeart fill={color.darkGray} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
      }
      </TouchableOpacity>
      </View>
    );
  }
  else {
    return (
      <View>
      <TouchableOpacity style={[styles.mainProductCard(),customProductStyle]} onPress={onProductPress} activeOpacity={activeOpacity ?? 0.7}>
        <View style={styles.imageView()}>
          <Image source={productImage} style={[styles.image(), customProductImageStyle]} />
          <View style={[styles.badge(newProduct),  sellingPrice && styles.discountBadge()]}>
            {
              sellingPrice ? (
                <Text style={styles.badgeText()}>-{discount}%</Text>
              )
                : newProduct ? (
                  <Text style={styles.badgeText()}>NEW</Text>
                ) : null
            }
          </View>
          {
            topRightIcon ? (
              <TouchableOpacity style={styles.closeIcon()}>
                <IcClose width={size.moderateScale(12)} height={size.moderateScale(12)} fill={color.darkGray} />
              </TouchableOpacity>
            ) : null
          }
        </View>
        <View style={styles.productInfo()}>
          <View style={styles.ratingsContainer()}>
            <StarRatings ratings={ratings} ratingsCounts={ratingsCounts} />
          </View>
          <Text style={styles.brandName()}>{brandName}</Text>
          <Text style={styles.productTitle()}>{productTitle}</Text>
          {
            originalPrice && sellingPrice ? (
              <View style={styles.priceContainer()}>
                <Text style={styles.oldPrice()}>${originalPrice}</Text>
                <Text style={styles.newPrice()}>${sellingPrice}</Text>
              </View>
            ) : (<Text style={styles.regularPrice()}>{originalPrice}$</Text>)
          }
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.addToFavoriteBtn(), flotingBtnStyle]} onPress={onAddToFavorite}>
        {
          filledHeart ?
            (<IcFilledHeart fill={color.secondary} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
            : (<IcHeart fill={color.darkGray} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
        }
      </TouchableOpacity>
      </View>
    );
  }
}
