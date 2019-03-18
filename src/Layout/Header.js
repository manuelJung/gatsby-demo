import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import { FaUserAstronaut, FaRegHeart, FaShoppingCart, FaBars, FaSearch } from 'react-icons/Fa'
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

export default function Header () {
  const data = useStaticQuery(graphql`{
    navigation:contentfulNavigation(name: {eq:"root"}){
      childs {
        name
        slug
      }
    }
  }`)
  return (
    <Wrapper>
      <div className='mobile'>
        <div className='row-1'></div>
        <div className='row-2'>
          <div className='logo-wrapper'>
            <Logo/>
          </div>
          <div className='icons'>
            <div><FaUserAstronaut /><div>Anmelden</div></div>
            <div><FaRegHeart /><div>Wunschzettel</div></div>
            <div><FaShoppingCart /><div>Warenkorb</div></div>
          </div>
        </div>
        <div className='row-3'>
          <div className='menu'><FaBars/></div>
          <form>
            <input placeholder='Suche...'/>
            <button><FaSearch/></button>
          </form>
        </div>
      </div>

      <div className='desktop'>
        <ul className='row-4'>
          {data.navigation.childs.map(row => (
            <li key={row.slug}>
              <Link to={`${row.slug}`}>
                {row.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-family: Roboto;
  > .mobile {
    > .row-2 {
      padding: 15px;
      display: flex;
      > .logo-wrapper {
        width: 140px;
      }
      > .icons {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        > div {
          margin-left: 25px;
          font-size: 25px;
          text-align: center;
          cursor: pointer;
          &:hover { color: #2a4c85; }
          > div {
            font-size: 10px;
            line-height: 10px;
          }
        }
      }
    }
    > .row-3 {
      display: flex;
      align-items: center;
      background: #2a4c85;
      color: white;
      padding-right: 10px;
      > .menu {
        padding: 10px;
        font-size: 25px;
      }
      > form {
        border-bottom: 2px solid white;
        display: flex;
        flex: 1;
        margin: 0;
        border bottom: 1px solid white;
        > input {
          flex: 1;
          color: white;
          background: none;
          border: none;
          font-size: 20px;
          outline: none;
        }
        > button {
          color: white;
          font-size: 20px;
        }
      }
    }
    @media (min-width: 800px){
      display: none;
    }
  }

  > .desktop {
    display: none;
    @media (min-width: 800px){
      display: block;
    }
  }
`
