import styled from "styled-components";

const Arrow = styled.button`
  position: absolute;
  bottom: 45%;
  border-radius: 50%;
  padding-top: 3px;
  width: 35px;
  height: 35px;
  display: inline-block;
  background: rgb(24, 24, 24);
  border: none;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const RightArrow = styled(Arrow)`
  right: 10px;
  padding-right: 7px;
`;

const LeftArrow = styled(Arrow)`
  left: 10px;
  padding-left: 6px;
`;

const Span = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  background-color: transparent;
`;

const RightSpan = styled(Span)`
  transform: rotate(45deg);
`;

const LeftSpan = styled(Span)`
  transform: rotate(-135deg);
`;

const Arrows = (props) => {
  return (
    <>
      <RightArrow onClick={props.showRightImg}>
        <RightSpan />
      </RightArrow>
      <LeftArrow onClick={props.showLeftImg}>
        <LeftSpan />
      </LeftArrow>
    </>
  );
};

export default Arrows;