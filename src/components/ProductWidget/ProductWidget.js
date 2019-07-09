// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'

type Props = {
  product: any,
  base64?: string
}

export default function ProductWidget ({product, base64}:Props) {

  const shippingPrice = toPriceString(product.shippingAndHandling)
  const shippingInfo = `Versand ${shippingPrice.includes('NaN') ? product.shippingAndHandling : shippingPrice} durch ${product.merchantName}`
  const src = getImageUrlWithTransformation(product)

  const [ref, image] = useLazyImageSrc(src, base64)


  return (
    <Wrapper className='ProductWidget'>
      <div className='image-wrapper'>
        <img ref={ref} src={image} alt={product.productName} />
      </div>
      <div className='attributes'>
        <div className='brand'>{product.productManufacturerBrand}</div>
        <div className='title'>
          <span>{product.productName}</span>
        </div>
        <div className='shipping-info'>
          {shippingInfo}
        </div>
        <div className='price'>
          {toPriceString(product.productPrice)}
          {product.isOnSale && product.productPriceOld && (
            <span className='strice-price'>{toPriceString(product.productPriceOld)}</span>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const toPriceString = (number, currency) => 
  parseFloat(number).toFixed(2).toString().replace('.', ',') +
  (currency ? currency : '€')

function getImageUrlWithTransformation (product) {

  const noCloudinaryImageFetchMerchants = ['Ulla Popken']

  // default: build Cloudinary image fetch url
  let imageUrl = `https://res-3.cloudinary.com/wucu/image/fetch/w_255,h_255,f_auto,fl_lossy,q_auto,c_limit/${encodeURIComponent(product.imageMediumURL)}`

  // backlisted merchant, use merchant image url, assure (force!) httpS/ SSL
  if (noCloudinaryImageFetchMerchants.indexOf(product.merchantName) !== -1) {
    imageUrl = product.imageMediumURL.replace('http://', 'https://')
  }
  return imageUrl
}

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  background: white;
  position: relative;
  max-width: 280px;
  cursor: pointer;

  > .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 240px;
    > img {
      max-width: 100%;
      max-height: 100%;
    }
    > .sale-ribbon {
      position: absolute;
      left: 0;
      top: 0;
      background: #a7a9ac;
      border-radius: 0 0 50px;
      width: 50px;
      height: 50px;
      color: white;
      padding: 12px 0 0 4px;
    }
  }

  > .attributes {
    > .directbuy-button {
      background: #993452;
      color: white;
      height: 38px;
      font-size: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2px;
      margin-bottom: 2px;
      > .Icon {
        font-size: 11px;
        margin-right: 3px;
        display: none;
        @media (min-width: 1200px) {
          display: inline;
        }
      }
    }
    > .brand {
      font-size: .7em;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > .title {
      position: relative;
      margin-bottom: 8px;
      background: rgb(167, 169, 172);
      white-space: normal;
      font-weight: 500;
      font-size: .9em;
      line-height: 1.5;
      color: white;
      text-align: left;
      height: 3.3em;
      overflow: hidden;
      > span {
        padding: 3px 8px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
    }
    > .shipping-info {
      padding: 3px 8px;
      text-align: left;
      font-size: .7em;
      color: rgb(167, 169, 172);
      height: 3em;
    }
    > .price {
      text-align: right;
      color: rgb(109, 110, 113);
      padding: 8px;
      font-size: 1em;

      > .strice-price {
        text-decoration: line-through;
        margin-left: 8px;
        color: rgb(167, 169, 172);
      }
    }
  }
`