import React from 'react';
//import { Link } from 'react-router-dom'
/*import './home.scss';*/
import Slider from '../../Components/Slider/Slider';
//import MostSearched from '../../Components/Thumbnails/MostSearched'
//import LatestUpdated from '../../Components/Thumbnails/LatestUpdated'
import LatestAdditions from '../../Components/Thumbnails/LatestAdditions'
//import MostPopular from '../../Components/Thumbnails/MostPopular'

export default function Home() {
  return (
    <>
      <main id="home" className="main">
        {/*<NavBar active="home" />*/}
        <div className="contentWrapper">
          <Slider/>
         {/* <MostSearched/>*/}
         {/* <LatestUpdated/>*/}
          <LatestAdditions/>
          {/*<MostPopular/>*/}
          {/*MostSell
          {/*MostCollect*/}
          {/*MostSell*/}
        </div>
      </main>
    </>
  );
};