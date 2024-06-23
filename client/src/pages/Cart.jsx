import React from 'react';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { mobile } from '../responsive';
import StripeCheckout from "react-stripe-checkout";
import { SliderItems, popularProducts, categories, products } from '../data.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../requestMethods';

const KEY = process.env.REACT_APP_STRIPE


const Container = styled.div`

${mobile({ flexDirection: 'column' })}
`;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;

  ${mobile({ fontSize: '24px' })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  ${mobile({ padding: '10px' })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) => props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === "filled" && "white"};

  ${mobile({ fontSize: '12px', padding: '5px' })}
`;

const TopTexts = styled.div`

  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;

  ${mobile({ fontSize: '12px', marginLeft: '5px' })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;

  ${mobile({ padding: '10px' })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;

  ${mobile({ flexDirection: 'column' })}
`;

const Image = styled.img`
  width: 200px;

  ${mobile({ marginBottom: '10px' })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${mobile({ padding: '10px' })}

`;

const ProductName = styled.span`

${mobile({ fontSize: '16px' })}
`;


const ProductId = styled.span`

${mobile({ fontSize: '16px' })}
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  ${mobile({ width: '15px', height: '15px' })}

`;

const ProductSize = styled.span`


${mobile({ fontSize: '16px' })}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mobile({ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' })}

`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  ${mobile({ marginBottom: '10px' })}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ marginBottom: '20px' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  
  ${mobile({ marginBottom: '20px' })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;

  ${mobile({ marginBottom: '20px' })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;

  ${mobile({ fontSize: '24px' })}
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => (props.type === 'total' ? '500' : '400')};
  font-size: ${(props) => (props.type === 'total' ? '24px' : '18px')};

  ${mobile({ flexDirection: 'column' })}
`;

const SummaryItemText = styled.span`
  ${mobile({ marginBottom: '15px' })}
`;

const SummaryItemPrice = styled.span`
  ${mobile({ marginBottom: '15px' })}
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 400;

  ${mobile({ marginBottom: '15px' })}
`;

const Quantity = styled.div`
  font-size: 24px;
  font-weight: 400;

  ${mobile({ marginBottom: '15px' })}
`;

const Remove = styled.div`
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
  color: red;

  ${mobile({ marginBottom: '15px' })}
`;

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const products = cart.products;
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
 
  const onToken = (token) => {
    setStripeToken(token);
  };


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
          
        });
        history.push(history.push("/success", {data: res.data }));
        console.log(res.data);
      } catch {}
    };
    stripeToken && makeRequest()
    }, [stripeToken, cart.total, history]);
  return (   
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({products.length})</TopText>
            <TopText>Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.map((product) => (
              <Product key={product.id}>
                <ProductDetail>
                  <Image src={product.image} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.name}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>{product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
                </PriceDetail>
                <Remove>X</Remove>
              </Product>
            ))}


            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {subtotal.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText> Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Free</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {subtotal.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
              <StripeCheckout>
                name = {user.name}
                image = {user.img}
                billingAddress = {user.address}
                ShippingAddress = {user.address}
                description = {`Your total is $${subtotal.toFixed(2)}`}
                email = {user.email}
                products = {products}
                token = {stripeToken.id}
                total = {subtotal.toFixed(2)}
                stripeKey = {process.env.STRIPE_KEY}     
              </StripeCheckout>




            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;

