import { useState, useEffect, useContext } from 'react'
import { BookContext } from './App.jsx'

const Contact = () => {
  return (
    <div>
      <p>
        <li>
          <a href="https://github.com/migamic" target='_blank'>Jaume Ros</a>
        </li>
        <li>
          <a href="https://github.com/uteuliyeva" target='_blank'>Malika Uteuliyeva</a>
        </li>
        <li>
          <a href="https://github.com/lucasaguino" target='_blank'>Lucas Aguiño</a>
        </li>
        <li>
          <a href="https://github.com/adilnaut" target='_blank'>Adilet Tuleuov</a>
        </li>
      </p>
    </div>

  );
};

export default Contact
