// @flow
import * as React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import Container from 'theme/atoms/Container'
import {FaAngleDown,FaTimes} from 'react-icons/fa'

type Props = {
  items: {
    link: string,
    label: string,
    dropdown?: {
      label: string,
      link: string,
      displayInMenu: boolean,
      children: {
        label: string,
        link: string,
        displayInMenu: boolean
      }
    }[]
  }[]
}

export default function Navigation (props:Props) {
  const [activeItem, setActiveItem] = React.useState(null)
  const ref = React.useRef(null)
  const listener = React.useRef()

  const handleClick = item => e => {
    if(!item.dropdown) return
    e.preventDefault()
    setActiveItem(item)

    const elIsInDropdown = ({parentElement: el}:*) => {
      return el ? el === ref.current || elIsInDropdown(el) : false
    }
    listener.current = e => {
      if(!elIsInDropdown(e.target)){
        window.removeEventListener('click', listener.current)
        setActiveItem(null)
      }
    }
    window.addEventListener('click', listener.current)
  }

  // clear listener after location change
  React.useEffect(() => {
    return () => listener.current && window.removeEventListener('click', listener.current)
  }, [])

  return (
    <Wrapper ref={ref} className='Navigation'>
      <Container as='nav'>
        {props.items.map(node => (
          <Link key={node.link} to={node.link} onClick={handleClick(node)}>
            {node.label} {node.dropdown && <FaAngleDown/>}
          </Link>
        ))}
        {activeItem && (
          <Dropdown>
            <div className='close' onClick={() => setActiveItem(null)}><FaTimes/></div>
            <ul className='submenu-list'>
              {activeItem.dropdown.filter(node => node.displayInMenu).map(node => 
                <li key={node.link} className='submenu-item'>
                  <h3><Link to={node.link}>{node.label}</Link></h3>
                  <div className='sub-sub-items'>
                    {node.children.filter(node => node.displayInMenu).map(node => 
                      <h6 key={node.link}><Link to={node.link}>{node.label}</Link></h6>
                    )}
                  </div>
                </li>
              )}
            </ul>
            <div className='submenu-footer'>
              <h2>{activeItem.label}</h2>
            </div>
          </Dropdown>
        )}
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  background: white;
  border-bottom: 1px solid lightgrey;

  > nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    > a {
      flex: 1;
      font-size: 11px;
      padding: 10px;
      color: #777;
      text-align: center;
      margin-bottom: -1px;
      border-bottom: 1px solid lightgrey;
      white-space: nowrap;
  
      @media (min-width: 1200px) {
        font-size: 14px;
      }
  
      &:hover {
        color: #993452;
        border-bottom: 1px solid #993452;
        &:after {border-top: 4px solid #993452;}
      }
    }
  }
  
`

const Dropdown = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  background: white;
  border-top: 1px solid lightgrey;
  border-left: 1px solid rgba(0,0,0,.15);
  border-right: 1px solid rgba(0,0,0,.15);
  z-index: 2000;
  width: 100%;
  box-shadow: 0px 17px 45px -2px rgba(153,147,153,0.82);

  > .close {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 5px;
    cursor: pointer;
    > * {cursor: pointer;}
  }

  > .submenu-footer {
    height: 60px;
    display: flex;
    background: #993452;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    flex-basis: 100%;
    color: white;
  }

  > .submenu-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    > .submenu-item {
      flex-basis: 25%;
      box-sizing: border-box;
      padding: 10px;
      > h3 {
        border-bottom: 1px dotted rgb(85, 85, 85);
        padding-bottom: 5px;
        font-weight: 400;
        color: black;

        > a {color: black;}
      }

      > .sub-sub-items > h6 {
        margin: 0px;
        padding: 5px 0;
        border-bottom: 1px solid rgb(238, 238, 238);

        > a {color: rgb(153, 153, 153);}
        &:hover > a {color: rgb(153, 52, 82);}
      }
    }
  }
`