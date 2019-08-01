// @flow
import styled from 'styled-components'

export default styled.div`
  margin: 0 auto;

  @media (max-width: 525px) {
    padding: 0 10px;
  }
  @media (min-width: 525px) {
    padding: 0 20px;
  }
  @media (min-width: 768px) {
    padding: 0px;
    width: 690px;
  }
  @media (min-width: 990px) {
    width: 910px;
  }
  @media (min-width: 1200px) {
    width: 1110px;
  }
`