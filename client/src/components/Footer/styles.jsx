import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  position: relative;
  background: #191b2b;
  text-align: center;;
  width: 100%;
  overflow: hidden;
  padding: 3rem 0;
  padding-bottom: 1rem;
  text-align: center;
  -webkit-user-select: none;
  height: 100px;
`;

export const SocialMediaWrapper = styled.div`
  display: flex;
  justify-content: center;
  
  svg {
  position: relative;
  transition: 0.45s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 24px;
  height: 24px;
  margin: 1.5rem;
  fill: #ffffff;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    position: relative;
    transform: translateY(-1px);
    opacity: 1;
    width: 26px;
    height: 26px;
    margin: 1.5rem;
    }
  }
`;
