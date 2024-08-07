import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import * as styles from './styles'
import { color, IcCartActive, IcClose, IcFilledHeart, IcHeart, IcMinus, IcPlus, IcShowMore, size } from '../../theme'
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
  showDiscount,
  originalPrice,
  sellingPrice,
  ratings,
  ratingsCounts,
  newProduct,
  flotingBtnStyle,
  closeIconStyle,
  topRightIcon,
  productSize,
  productColor,
  addToFavoriteIcon,
  addToCartBtnStyle,
  addToCartIcon,
  showRatings,
  showRatingHorizontal,
  isProductSold,
  removeFromListIconPress,
  productUnits,
  productQuantitySelection,
  selectQuantity,
  increaseQuantity,
  deccreaseQuantity,
  cartOptions,
  cartOptionPress,
  isProductFavorite,
  onAddToFavorite
}) => {
  const discount = Math.floor(((originalPrice - sellingPrice)/originalPrice) * 100);

  if (productHorizontal) {
    return (
      <View style={styles.mainViewHorizontal(isProductSold)}>
        <TouchableOpacity style={[styles.mainProductCardHorizontal(),customProductStyle]} onPress={onProductPress} activeOpacity={activeOpacity ?? 0.7}>
          <View style={styles.imageViewHorizontal()}>
            <Image source={productImage} style={styles.imageHorizontal()} resizeMode='cover' />
            <View style={[styles.badge(newProduct), sellingPrice && showDiscount && styles.discountBadge()]}>
              {
                sellingPrice && showDiscount ? 
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
            {
              productTitle && (<Text style={styles.productTitle()}>{productTitle}</Text>)
            }
            {
              brandName && (<Text style={styles.brandName()}>{brandName}</Text>)
            }
            <View style={styles.colorAndSizeWrapper(productColor, productSize)}>
              {
                productColor && (
                  <View style={styles.colorAndSize()}>
                    <Text style={styles.lightText()}>Color: </Text>
                    <Text style={styles.darkText()}>{productColor}</Text>
                  </View>
                )
              }
              {
                productSize && (
                  <View style={styles.colorAndSize()}>
                    <Text style={styles.lightText()}>Size: </Text>
                    <Text style={styles.darkText()}>{productSize}</Text>
                  </View>
                )
              }
            </View>
            {
              showRatings && !showRatingHorizontal && (
                <StarRatings customStarRatings={styles.starRatings()} ratings={ratings} ratingsCounts={ratingsCounts} />
              )
            }
            <View style={styles.ratingsAndPriceWrapper(addToCartIcon, addToFavoriteIcon)}>
              {
                productUnits && (
                  <View style={styles.productUnits()}>
                    <Text style={styles.lightText()}>Units: </Text>
                    <Text style={styles.darkText()}>1</Text>
                  </View>
                )
              }
              {
                productQuantitySelection && (
                  <View style={styles.selectQuantity()}>
                    <TouchableOpacity onPress={deccreaseQuantity} activeOpacity={0.8} style={styles.circle()}>
                      <IcMinus />
                    </TouchableOpacity>
                    <Text style={styles.quantityText()}>{selectQuantity}</Text>
                    <TouchableOpacity onPress={increaseQuantity} activeOpacity={0.8} style={styles.circle()}>
                      <IcPlus fill={color.darkGray}/>
                    </TouchableOpacity>
                  </View>
                )
              }
              {
                originalPrice && sellingPrice ? (
                  <View style={styles.priceContainer()}>
                    <Text style={styles.oldPrice()}>${originalPrice}</Text>
                    <Text style={styles.newPrice()}>${sellingPrice}</Text>
                  </View>
                ) : (<Text style={styles.regularPrice()}>{originalPrice}$</Text>)
              }
              {
                showRatings && showRatingHorizontal && (
                  <StarRatings customStarRatings={styles.starRatings()} ratings={ratings} ratingsCounts={ratingsCounts} />
                )
              }
            </View>
          </View>
        </TouchableOpacity>
        {
          addToFavoriteIcon && (
            <TouchableOpacity activeOpacity={0.9} style={[styles.addToFavoriteBtnHorizontal(), flotingBtnStyle]} onPress={onAddToFavorite}>
              {
                isProductFavorite 
                ? (<IcFilledHeart fill={color.secondary} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
                : (<IcHeart fill={color.darkGray} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
              }
            </TouchableOpacity>
          )
        }
        {
          addToCartIcon && !isProductSold && (
            <TouchableOpacity activeOpacity={0.8} style={[styles.addToCartBtnHorizontal(), addToCartBtnStyle]} onPress={cartOptionPress}>
              <IcCartActive fill={color.white} width={size.moderateScale(12)} height={size.moderateScale(12)}/>
            </TouchableOpacity>
          )
        }   
        {
          topRightIcon && (
            <TouchableOpacity onPress={removeFromListIconPress} style={[styles.closeIconHorizontal(), closeIconStyle]}>
              <IcClose width={size.moderateScale(15)} height={size.moderateScale(15)} fill={color.mostlyBlack} />
            </TouchableOpacity>
          )
        }
        {
          isProductSold && (
            <Text style={styles.productSoldText()}>Sorry, this item is currently sold out</Text>
          )
        }
        {
          cartOptions && (
            <TouchableOpacity onPress={cartOptionPress} style={styles.cartOptions()}>
              <IcShowMore />
            </TouchableOpacity>
          )
        }
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity style={[styles.mainProductCard(isProductSold),customProductStyle]} onPress={onProductPress} activeOpacity={activeOpacity ?? 0.7}>
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
              isProductSold && (
                <Text style={styles.productSoldTextVertical()}>Sorry, this item is currently sold out</Text>
              )
            }
          </View>
          <View style={styles.productInfo()}>
            <View style={styles.ratingsContainer()}>
              <StarRatings ratings={ratings} ratingsCounts={ratingsCounts} />
            </View>
            <Text style={styles.brandName()}>{brandName}</Text>
            <Text style={styles.productTitle()}>{productTitle}</Text>
            <View style={styles.colorAndSizeWrapperVertical()}>
              {
                productColor && (
                  <View style={styles.colorAndSize()}>
                    <Text style={styles.lightText()}>Color: </Text>
                    <Text style={styles.darkText()}>{productColor}</Text>
                  </View>
                )
              }
              {
                productSize && (
                  <View style={styles.colorAndSize()}>
                    <Text style={styles.lightText()}>Size: </Text>
                    <Text style={styles.darkText()}>{productSize}</Text>
                  </View>
                )   
              }
            </View>
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
        {
          topRightIcon && (
            <TouchableOpacity onPress={removeFromListIconPress} style={[styles.closeIcon(), closeIconStyle]}>
              <IcClose width={size.moderateScale(15)} height={size.moderateScale(15)} fill={color.mostlyBlack} />
            </TouchableOpacity>
          )
        }
        {
          addToFavoriteIcon && (
            <TouchableOpacity activeOpacity={0.6} style={[styles.addToFavoriteBtn(), flotingBtnStyle]} onPress={onAddToFavorite}>
              {
                isProductFavorite ?
                  (<IcFilledHeart fill={color.secondary} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
                  : (<IcHeart fill={color.darkGray} width={size.moderateScale(18)} height={size.moderateScale(16)} />)
              }
            </TouchableOpacity>
          )
        }
        {
          addToCartIcon && !isProductSold && (
            <TouchableOpacity activeOpacity={0.8} style={[styles.addToCartBtn(), addToCartBtnStyle]} onPress={cartOptionPress}>
              <IcCartActive fill={color.white} width={size.moderateScale(12)} height={size.moderateScale(12)}/>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}
