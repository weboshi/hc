import React from 'react';
import { WelcomeMessage } from '../../Components/WelcomeMessage/welcomemessage'
import { CryptoData } from '../../Components/Main/main'
import './home-view.scss';

export default props =>

<div className='home'>
  <div className='home-body'>
    <CryptoData/>
  </div>
</div>
