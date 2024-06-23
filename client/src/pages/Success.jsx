import React from 'react'
import { useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation();

    const data = location.state.stripeData;
    const cart = location.state.cart;
  return (
    <div>Successful </div>
  )
}

export default Success