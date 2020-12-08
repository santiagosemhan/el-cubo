import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
`;

export const Logo = styled.div`
  opacity: 0.1;
  transition: opacity 0.8s ease;

  &:hover {
    opacity: 1;
  }
`;

export const Main = styled.div`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
