import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import { FaUserAstronaut, FaRegHeart, FaShoppingCart } from 'react-icons/Fa'
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
        <div className='burger-menu'></div>
        <div className='search'></div>
      </div>
      <ul className='row-3'>
        {data.navigation.childs.map(row => (
          <li key={row.slug}>
            <Link to={`${row.slug}`}>
              {row.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className='row-4'></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-family: Roboto;
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
`
