window.onload=function(){
  (function(){
    var length=5*5*5,
      oUl=document.getElementById('list').children[0],
      aLi=oUl.children;
    for(var i=0;i<length;i++){
      
      var oLi=document.createElement('li'); 
        oLi.innerHTML=i;
        oLi.x=i%5;//每一个i所取的值
        oLi.y=Math.floor(i%25/5);
        oLi.z=Math.floor(i/25);
      //打乱每一个li的位置
      //tranlate3d(x,y.z)
      var tX=Math.random()*6000-2000;
      var tY=Math.random()*6000-2000;
      var tZ=Math.random()*6000-2000;
      oLi.style.transform=`translate3D(${tX}px,${tY}px,${tZ}px)`
        oUl.appendChild(oLi);   
    };
    setTimeout(Grid,200);
    (function(){//拖拽及缩放
      //标志ul差值
      var trz=-1800;
      var roX=0;
      var roY=0;
       document.onabort=function(){
        return false;
      }
      document.onselectstart=function(){
        return false;
      }
      document.onmousedown=function(e){
        var sX=e.clientX;
        var sY=e.clientY;
        var rX=roX;//标记上一次值
        var rY=roY;
        document.onmousemove=function(e){
          var X_=e.clientX-sX;
          var Y_=e.clientY-sY;
          // console.log(e.clientX,e.clientY)
          rX=roX-Y_*0.2;
          rY=roY+X_*0.2;
          oUl.style.transform=`translateZ(${trz}px) rotateX(${rX}deg) rotateY(${rY}deg)`
        }
        document.onmouseup=function(e){
          roX=rX;
          roY=rY;
          document.onmousemove=null;
        }
      };

      //滚轮事件
      (function(fn){
        document.onmousewheel=function(e){
          var d=e.wheelDelta/120;
          fn.call(this,d)
        }
      })(function(d){
        trz+=d*100;
        oUl.style.transform=`translateZ(${trz}px) rotateX(${roX}deg) rotateY(${roY}deg)`
      })

    })();

    //点击事件处理各个图形
    (function(){
      var aBtn=document.getElementById('btn').getElementsByTagName('li');
      var arr=[Table,Sphere,Helie,Grid];
      for(var i=0;i<aBtn.length;i++){
        (function(i){
           aBtn[i].onclick=arr[i];
        })(i)
      }
    })()

    // Grid()//方阵
    function Grid(){
      var disX=300;
      var disY=300;
      var disZ=800;
      for(var i=0;i<length;i++){
        var oLi=aLi[i];//需要把每一个子元素进行遍历
        var x=(oLi.x-2)*disX;
        var y=(oLi.y-2)*disY;
        var z=(oLi.z-2)*disZ;
        oLi.style.transform=`translate3d(${x}px,${y}px,${z}px)`
      }
     

    }
    function Helie(){
      var h=4;
      var num=length/h;
      var deg=360/num;
      var tY=7;
      var mid=length/2;
      for(var i=0;i<length;i++){
         aLi[i].style.transform=`rotateY(${i*deg}deg) translateY(${(i-mid)*tY}px) translateZ(800px)`
    }
      }
     
    function Sphere(){
      var arr=[1,3,7,9,11,14,21,16,12,10.9,7,4,1];
      for(var i=0;i<length;i++){
        var numC=0; numG=0;arrSun=0;
        for(var j=0;j<arr.length;j++){
          arrSun+=arr[j];
          if(arrSun>i){
            numC=j;
            numG=arr[j]-(arrSun-i);
            break;
          }
        }
        var ydeg=360/arr[numC];
        var xdeg=180/(arr.length-1);
        // aLi[i].innerHTML=numC+'层'+numG+'个';
        aLi[i].style.transform=`rotateY(${(numG-1.3)*ydeg}deg) rotateX(${90-numC*xdeg}deg) translateZ(800px)`
      }

    }
    function Table(){
      var arr=[
        {x:0,y:0},
        {x:17,y:0},
        {x:0,y:1},
        {x:1,y:1},
        {x:12,y:1},
        {x:13,y:1},
        {x:14,y:1},
        {x:15,y:1},
        {x:16,y:1},
        {x:17,y:1},
        {x:0,y:2},
        {x:1,y:2},
        {x:12,y:2},
        {x:13,y:2},
        {x:14,y:2},
        {x:15,y:2},
        {x:16,y:2},
        {x:17,y:2}
      ]
      var disX=180;
      var disY=210;
      var midX=18/2;
      var midY=Math.ceil((length/18))/2;
      for(var i=0;i<length;i++){
        var x,y;
        if(i<18){
          x=arr[i].x;
          y=arr[i].y;
        }else{
          x=i%18;
          y=Math.floor(i/18)+2;
        }
        aLi[i].style.transform=`translate3d(${(x-midX)*disX}px,${(y-midY)*disY}px,0px)`;
      }
    }



  })()
  
}
