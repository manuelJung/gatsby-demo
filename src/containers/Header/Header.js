// @flow
import * as React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components'
import { IoMdMenu } from 'react-icons/io'
import { FaRegStar, FaUser, FaShoppingCart, FaSearch, FaHome, FaRegHeart } from 'react-icons/fa'
import logo from './logo'

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
      <div className='usps'>
        <div><FaHome/> Marktplatz für große Größen</div>
        <div><FaRegHeart/> Beliebte Shops & Marken</div>
        <div><FaShoppingCart/> Riesige Auswahl</div>
        <div><FaRegStar/> Beratung & Inspiration</div>
      </div>
      <div className='logo'>
        <img src={logo} alt='Wundercurves Logo'/>
      </div>
      <div className='icon burger-menu'><IoMdMenu/></div>
      <div className='search-form'>
        <input type='text'/>
        <div className='icon search-icon'><FaSearch/></div>
      </div>
      <div className='icon user-icon'><FaUser/></div>
      <div className='icon cart-icon'><FaShoppingCart/></div>
      <nav>
        {gq.navItems.nodes.map(node => (
          <Link key={node.link} to={node.link}>
            {node.label}
          </Link>
        ))}
      </nav>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  background: #eeeced;
  padding: 5px;
  padding-bottom:10px;

  display: grid;
  grid: " Logo       Logo       Logo     Logo "
        " BurgerMenu SearchForm UserIcon CartIcon " 
        / 50px       1fr        50px     50px;
  grid-gap: 5px;

  > .usps { grid-area: Usps; display: none; }

  > .usps {
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
    grid-area: Logo;
    display: flex;
    justify-content: center;

    > * {
      max-width: 300px;
    }
  }

  > .icon {
    height: 25px;
    color: #993452;
    font-size: 25px;
    padding:10px;
    cursor: pointer;
  }

  > .search-form {
    grid-area: SearchForm;
    border: 3px;
    background: white;
    padding: 4px;
    display: flex;
    align-items: center;
    > input {
      flex: 1;
      border: none;
      outline: none;
    }
    > .icon {
      color: #993452;
    }
  }

  > nav {
    display: none;
    grid-area: Navigation;
    background: white;
    > a {
      padding: 5px;
      flex: 1; 
      text-align: center;
    }
  }

  > .cart-icon {grid-area: CartIcon;}
  > .user-icon {grid-area: UserIcon;}
  > .burger-menu {grid-area: BurgerMenu;}

  @media (min-width: 800px) {
    grid: "Usps Usps Usps Usps"
          "Logo SearchForm UserIcon CartIcon" 70px
          "Navigation Navigation Navigation Navigation"
          / 500px 1fr  100px  100px ;
    grid-gap: 5px;

    > .usps { display: flex; }
    > .burger-menu { display: none; }
    > nav { display: flex; }
  }
`