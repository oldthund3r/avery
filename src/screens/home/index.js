import React from 'react'
import { Button, ClickableText } from '../../common'

const Home = () => (
  <div>
    <Button clickHandler={() => alert('hey')} text={'hey'} disabled={false} />
    <ClickableText clickHandler={() => alert('why')} text={'why'} />
  </div>
)

export default Home
