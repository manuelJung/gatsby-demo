// @flow
import * as React from 'react'
import styled from 'styled-components'
import useLazyImageSrc from 'hooks/useLazyImageSrc'
import {colors, positions} from './const'
import useWidth from './useWidth'
import {Link} from 'gatsby'


type Props = {
  src: string,
  alt: string,
  link: string,
  title: string,
  subtitle: string,
  overlayColor: string,
  overlayPosition: string,
  ratio: string,
  ratioSubtitle: string,
  context: {
    base64: string
  }
}

export default function Banner (props:Props) {
  const [ref, image] = useLazyImageSrc(props.src, props.context.base64)
  const [widthRef, width] = useWidth()

  const labelProps = {
    background: colors[props.overlayColor],
    overlayPosition: positions[props.overlayPosition],
    titleRows: props.context.titleRows,
    subtitleRows: props.context.subtitleRows,
    subtitle: props.subtitle,
    titleSize: width / props.ratio,
    subtitleSize: width / props.ratioSubtitle
  }

  return (
    <Wrapper ref={widthRef} className='Banner' to={props.link}>
      <img ref={ref} src={image} alt={props.alt} />

      <Label {...labelProps}>
        <div className='title' dangerouslySetInnerHTML={{__html: props.title}}/>
        <div className='subtitle' dangerouslySetInnerHTML={{__html: props.subtitle}}/>
      </Label>
    </Wrapper>
  )
}

const Wrapper = styled(Link)`
  position: relative;
  cursor: pointer;
  > img {width:100%;}

  p {
    margin: 1em 0px;
    opacity: .9;
    line-height: normal;
  }
`

const Label = styled.div`
  position: absolute;
  background: ${props => props.background};
  bottom: 0;

  text-align: center;
  color: white;

  /*SQUARE*/
  ${props => props.overlayPosition === 'bottom' && `
      right: 5.5%;
      height: 30%;
      bottom: 5.5%;
      left: 5.5%;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 5px;
  `}

  /*REACTANGLE OVERLAY*/
  ${props => props.overlayPosition === 'left' && `
      width: 48.42%;
      left: 2.6%;
      bottom: 5.5%;
      top: 5.5%;
  `}

  ${props => props.overlayPosition === 'right' && `
      width: 48.42%;
      right: 2.6%;
      top: 5.5%;
      bottom: 5.5%;
  `}

  /*REACTANGLE LINES POSITIONS*/
  ${props => (props.overlayPosition === 'left' || props.overlayPosition === 'right') && `
      display: flex;
      justify-content: center;
      flex-direction:column; 

  `}

  ${props => (props.overlayPosition === 'left' || props.overlayPosition === 'right') && props.titleRows === 2 && !props.subtitle &&`
      .title p:first-child {
          margin: 0;
      }
      .title p:last-child {
          margin-top:0;
      }
      `
  }

  ${props => (props.overlayPosition === 'left' || props.overlayPosition === 'right') && props.titleRows === 1 && props.subtitleRows === 2 &&`
      .title p {
          margin-bottom: 0;
      }
      
      .subtitle p:first-child {
          margin-top: 0;
          margin-bottom: 0;
      }
      .subtitle p:last-child {
          margin-top:0;
      }
      `
  }

  ${props => (props.overlayPosition === 'left' || props.overlayPosition === 'right') && props.titleRows === 1 && props.subtitleRows === 2 &&`
      .title p {
          margin-bottom: 0;
      }
      
      .subtitle p:first-child {
          margin-top: 0;
          margin-bottom: 0;
      }
      .subtitle p:last-child {
          margin-top:0;
      }
      `
  } 

  ${props => (props.overlayPosition === 'left' || props.overlayPosition === 'right') && props.titleRows === 2 && props.subtitleRows === 1 &&`          
      .title p:first-child {
          margin-bottom: 0;
      }
      .title p:last-child {
          margin-top:0;
          margin-bottom: 0;
      }
      .subtitle {
          padding-bottom: 30px;
      }
      .subtitle p {
          margin-top: 0;
      }
      `
  } 

  ${props => (props.overlayPosition === 'left' || props.overlayPosition === 'right') && props.titleRows === 2 && props.subtitleRows === 2 &&`
      .title p:first-child {
          margin-bottom: 0;
      }
      .title p:last-child {
          margin-top: 0;
          margin-bottom: 0;
      }
      .subtitle p:first-child {
          margin-top: 0;
          margin-bottom: 0;
      }
      .subtitle p:last-child {
          margin-top:0;
      }
      `
  } 

  > .title {
    font-weight: bolder;
    font-size: ${props => props.titleSize}px;
  }

  > .subtitle {
    font-size: ${props => props.subtitleSize}px;
    font-weight:100;
    line-height: normal;
    margin-top: ${props => props.subtitleSize / 2}px;
  }
`
