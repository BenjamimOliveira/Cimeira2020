import React from 'react';
import '../theme.css';

interface ITeste {
    lbl: string;
    num?: number;
  }

const Hero: React.FC<ITeste> = (props) => {

return (
    <div>
        {props.lbl}
        {props.num}
    </div>
);
  
}

export default Hero;