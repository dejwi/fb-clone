import React from 'react'

interface prop {
  classes?: string
}

const ImgIcon: React.FC<prop> = ({classes}) => {
  return (<i data-visualcompletion="css-img" className={`${classes} imgIcon`}></i>);
};

export default ImgIcon;
