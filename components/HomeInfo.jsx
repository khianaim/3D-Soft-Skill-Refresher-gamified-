import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <div className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        <h1 className="font-bold">Welcome to Soft Skills Islands 🌴</h1>
        <h2>Where emotional intelligence meets adventure</h2>
      </div>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
        Learn to reflect, listen actively, and communicate with purpose.
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
        Visit Empathy Bay 
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
        Cultivate resolution by identifying tensions, managing emotions, and growing collaboration from the root.
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
        Enter Conflict Cove
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
      Learn to reflect, listen actively, and communicate with purpose.
      </p>

      <Link to='/contact' className='neo-brutalism-white neo-btn'>
      Climb Clarity Cliffs
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
    );
  }

  return null;
};

export default HomeInfo;
