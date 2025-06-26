const AnimatedBackground = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    pointerEvents: 'none',
    background: 'transparent',
  }}>
    <svg width="100vw" height="100vh" style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh'}}>
      <circle cx="50%" cy="50%" r="70" fill="#4fc3f7">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 400 300" to="360 400 300" dur="8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50%" cy="50%" r="70" fill="#ffb347" opacity="0.5">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="360 400 300" to="0 400 300" dur="12s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50%" cy="50%" r="70" fill="#ba68c8" opacity="0.25">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 400 300" to="-360 400 300" dur="18s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50%" cy="50%" r="70" fill="#aed581" opacity="0.7">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 400 300" to="360 400 300" dur="6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50%" cy="50%" r="70" fill="#81d4fa" opacity="0.3">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="360 400 300" to="0 400 300" dur="15s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>
);

export default AnimatedBackground; 