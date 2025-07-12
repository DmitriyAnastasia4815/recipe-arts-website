import React from 'react';
import styles from './UpdatePassword.module.scss';


interface UpdatePasswordProps {
    onClick: () => void;
  }


export const UpdatePasswordThird: React.FC<UpdatePasswordProps> = (onClick) =>{
    return (
        <div>hello from update</div>
    )
}
