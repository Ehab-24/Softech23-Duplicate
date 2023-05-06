import React from 'react';

function Icon({text, click}) {
  return (
    <>
   {text &&  <div id='icon' onClick={click} className='bg-pink-500 text-white cursor-pointer' style={{borderRadius: '50%', display: 'inline-block', width: '40px', height: '40px', textAlign: 'center', lineHeight: '40px', fontWeight: 'bold'}}>
   {text.charAt(0).toUpperCase()}
 </div>}
    </>
  );
}

export default Icon;