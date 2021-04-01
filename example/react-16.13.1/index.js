const useState = React.useState;
const useEffect = React.useEffect;

//TODO:拖拽示例
function Example() {
  const [count, setCount] = useState(0);
  let elTarget = null;
  let doc = document.body;
  let [startX, startY, offsetX, offsetY] = [0, 0, 0, 0];
  let isStart = false;
  let {clientWidth,clientHeight}=document.documentElement;

  useEffect(() => {
    // setTimeout(() => setCount('time'), 5000);
    console.log('effect');
    return () => {
      // setCount('back')
    };
  });

  useEffect(() => {
    if(!elTarget)return;
    elTarget.addEventListener('touchstart', onStart,false);
    elTarget.addEventListener('touchmove',onMove,false);
    elTarget.addEventListener('touchend', onEnd,false);
    elTarget.addEventListener('touchcancel', onEnd,false);
    return ()=>{
        try {
            if(!elTarget)return;
            elTarget.removeEventListener('touchstart', onStart,false);
            elTarget.removeEventListener('touchmove',onMove,false);
            elTarget.removeEventListener('touchend', onEnd,false);
            elTarget.removeEventListener('touchcancel', onEnd,false);
        } catch (error) {
        }
        
    }
  });

  function onStart(e){
    let me = this;
    isStart = true;
    let touches = e.targetTouches;
    let rect = me.getBoundingClientRect();
    startX = touches[0].pageX;
    startY = touches[0].pageY;
    offsetX = rect.left;
    offsetY = rect.top;
    console.log(e,this)
  }
  function onMove(e){
    e.preventDefault();
    let me=this;
      
    if (!isStart || !me) return;
    let touches = e.targetTouches;
    let curX = touches[0].pageX;
    let curY = touches[0].pageY;
    let mx = curX - startX + offsetX;
    let my = curY - startY + offsetY;

    mx < 0 && (mx=0);
    mx > (clientWidth-me.offsetWidth) && (mx=clientWidth-me.offsetWidth);
    my < 0 && (my=0);
    my > (clientHeight-me.offsetHeight) && (my=clientHeight-me.offsetHeight);
    me.style.transform = `translate(${mx}px,${my}px)`;
  }
  function onEnd(e){
    isStart = false;
  }

  return (
    <div ref={(evt) => (elTarget = evt)} className='content'>
      Hello, React Source Code!==>this is counter : {count}{' '}
      <button
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('onClick',e.nativeEvent)
          setCount(count + 1);
        }}
      >
        Add 1
      </button>
      <p>
        <a href='' className='link'>
          LINK
        </a>
      </p>
    </div>
  );
}
function App() {
  return (
    <div className='wrap'>
      <Example></Example>
    </div>
  );
}
debugger;
ReactDOM.render(<App />, document.querySelector('#app'));
