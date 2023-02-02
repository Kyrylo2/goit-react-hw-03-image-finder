import styled from '@emotion/styled';

export const OverlayDiv = styled.div`
  overflow-y: scroll;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
  transition: opacity 250ms var(--timing-function),
    visibility 250ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1200;
`;

export const ModalImg = styled.img`
  width: 100%;
  max-width: 700px;
  height: auto;
  margin: auto;
  display: block;
  z-index: 1300;
`;
