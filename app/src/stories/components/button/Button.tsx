import React from 'react';
import { ReactNode } from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  background: brown;
`;

export type ButtonProps = {
  children?: ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
