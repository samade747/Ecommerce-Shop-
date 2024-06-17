import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Badge } from '@mui/material';

import { mobile } from '../responsive.jsx';


const Container = styled.div`
  height: 80px;
  background-color: #fcf5f5;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  ${mobile({ display : 'none' })}
  margin-bottom: 30px;

  
  
`;


const Wrapper = styled.div`
  
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ Padding: '10px 0px' })}
`;

const Left = styled.div`

  flex: 1;
  display: flex;
  align-items: center;

  ${mobile({ display: 'none' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;

  ${mobile({ flex: 2 })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;

  ${mobile({ marginLeft: '10px' })}
`;

const SearchInput = styled.input`
  border: none;

  ${mobile({ width: '50px' })}

`;

const Logo = styled.h1`
  font-weight: bold;

  ${mobile({ fontSize: '24px' })}
`;

const MenuItem = styled.div`
  font-size: 13px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ fontSize: '12px', marginLeft: '10px' })}

`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>Shopping</Logo>
        </Left>
        <Center>
          <MenuItem>HOME</MenuItem>
          <MenuItem>PRODUCTS</MenuItem>
          <MenuItem>ABOUT</MenuItem>
          <MenuItem>CONTACT</MenuItem>
        </Center>
        <Right>
          <SearchContainer>
            <SearchIcon />
            <SearchInput placeholder="Search" />
          </SearchContainer>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartCheckoutIcon />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
    );
};

export default Navbar;
