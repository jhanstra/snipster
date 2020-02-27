background: url('${1:image}') center center no-repeat;
background-size: cover;
&:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: radial-gradient(
    closest-corner,
    rgba(0,0,0,0) 30%,
    rgba(0,0,0,0)),
  linear-gradient(68deg,${2:color 1},${3:color 2} 0%);
  opacity: ${4:opacity};
}