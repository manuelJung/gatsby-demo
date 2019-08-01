// @flow
import * as React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components'
import { FaRegStar, FaUser, FaShoppingCart, FaSearch, FaHome, FaRegHeart } from 'react-icons/fa'
import logo from './logo'
import Navigation from './Navigation'
import Drawer from './Drawer'

export default function Header () {
  const gq = useStaticQuery(graphql`
    query HeaderQuery {
      navItems: allNavigation {
        nodes {
          label
          link
          dropdown {
            label
            link
            displayInMenu
            children {
              label
              link
              displayInMenu
              children {
                label
                link
                displayInMenu
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Wrapper className='header'>
      <div className='uspItems'>
        <div><FaHome/> Marktplatz für große Größen</div>
        <div><FaRegHeart/> Beliebte Shops & Marken</div>
        <div><FaShoppingCart/> Riesige Auswahl</div>
        <div><FaRegStar/> Beratung & Inspiration</div>
      </div>
      <Link className='logo' to='/'>
        <img src={logo} alt='Wundercurves Logo'/>
      </Link>
      <Drawer />
      <div className='search-form'>
        <input type='text'/>
        <div className='icon search-icon'><FaSearch/></div>
      </div>
      <div className='icon user-icon'><FaUser/></div>
      <div className='icon cart-icon'><FaShoppingCart/></div>
      <Navigation items={gq.navItems.nodes}/>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  background: #eeeced;
  padding-bottom:10px;

  > .cart-icon {grid-area: CartIcon;}
  > .user-icon {grid-area: UserIcon;}
  > .Drawer    {grid-area: Drawer;}
  > .logo      {grid-area: Logo;}

  display: grid;
  align-items: center;
  justify-items: center;
  > * {width: 100%;}

  grid: " Logo       Logo       Logo     Logo "
        " Drawer SearchForm UserIcon CartIcon " 
        / 50px       1fr        50px     50px;
  grid-column-gap: 0px;

  > .uspItems {
    grid-area: UspItems;
    display: none;
    background: #993452;
    color: #e9bfcd;
    font-weight: bold;
    font-size: 13px;
    padding: 4px;
    > div {
      flex:1; 
      display: flex; 
      align-items: center;
      justify-content: center;
      > svg {margin-right: 4px;}
    }
  }

  > .logo {
    > img {width: 300px; margin: 5px;}
  }

  > .icon {
    height: 25px;
    color: #993452;
    font-size: 25px;
    padding:10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > .search-form {
    grid-area: SearchForm;
    border: 3px;
    background: white;
    padding: 4px;
    display: flex;
    align-items: center;
    align-self: center;
    height: 40px;
    > input {
      flex: 1;
      border: none;
      outline: none;
    }
    > .icon {
      display: flex;
      color: #993452;
    }
  }

  > .Navigation {
    display: none;
    grid-area: Navigation;
  }

  @media (min-width: 800px) {
    padding-bottom:0px;
    margin-bottom:10px;
    grid: " UspItems   UspItems   UspItems   UspItems   UspItems   UspItems   UspItems   "
          "      .     Logo           .      SearchForm UserIcon   CartIcon       .      " 100px
          " Navigation Navigation Navigation Navigation Navigation Navigation Navigation "
          /   30px        200px      1fr       300px      30px       30px      2fr;
    grid-column-gap: 30px;

    > .uspItems { display: flex; }
    > .Drawer { display: none; }
    > .Navigation { display: flex; }
  }
`