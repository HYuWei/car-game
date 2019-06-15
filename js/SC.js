var oBj=document.getElementById("beijing")
var oBei=document.getElementById("kaishi")
var oI=document.getElementById("car");
var oKai=document.getElementById("KSyouxi")
var oSpan=document.getElementById("span")
var oCx=document.getElementById("Cxing")
var oJshu=document.getElementById("Jshu")
var oSpan1=document.getElementById("span1");
var oA=document.getElementById("a");
var oTc=document.getElementById("TC");
var oimg=oTc.getElementsByTagName("img");
var oqbtn=document.getElementById("qbtn")
var oxbtn=document.getElementById("xbtn");
var oLb=document.getElementById("LB")
var oJilv=document.getElementById("jilv")
var oJilv1=document.getElementById("jilv1")
var oZG=document.getElementById("span2")
//赛车运动
var b=0;//左右的距离
var onoff2=0;//左键方向键的定时器开关
var onoff4=0; //右键方向键的定时器开关
var onoff=0;//上方向键的定时器开关
var carTemp=2;//汽车走的距离（控制速度）
var score=0;//得分
var onoff3=0;//背景移动开关
var onoff5=0;//背景移动加速开关
var c=0;//旗子的得分
var a=0;//背景移动的速度
var onoff8=0;//旗子的开关
var timeq=0;//弹起键盘速度的开关
var tr=600//速度
var arr=['30px', '155px', '270px' ,'390px'] //随机汽车的left
var arrimg=['img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png','img/7.png']//随机汽车形状
//弹出选择赛车框
oA.onclick=function()
        {
            oTc.style.display="block"
            return false;
        }
//选择赛车
for(var vm=0;vm<oimg.length;vm++)
{
   oimg[vm].index=vm;
   oimg[vm].onclick=function()
   {
       for(var i=0;i<oimg.length;i++)
       {
           oimg[i].style.border="none"
       }
       oI.src=this.src;
       oimg[this.index].style.border="1px solid blue";
       oLb.src=this.src;
   }
}
//确定赛车
oqbtn.onclick=function()
{
    oTc.style.display="none";
}
//取消选择
oxbtn.onclick=function()
{
    oTc.style.display="none";
    oI.src="img/1.png"
}

//点击开始游戏
oKai.onclick=function()
{
    clearInterval(onoff2)
    clearInterval(onoff4)
    clearInterval(onoff)

    //背景移动  
    onoff3=setInterval(function()
    {
        oBj.style.backgroundPositionY=++a+"px";
    },5)
   

    //键盘按下
     oBei.style.display="none";    
        document.onkeydown=function(ev)
        {
            if(ev.keyCode==37)
            {
                clearInterval(onoff2);
                onoff2=setInterval(function()
                {
                   b=parseInt(getComputedStyle(oI).left);
                   if(b<10)
                   {
                       b=10;
                       clearInterval(onoff2)
                   }
                   oI.style.left=b-1+"px";                   
                },1)
            }  
            
            if(ev.keyCode==39)
            {
                clearInterval(onoff4);
                onoff4=setInterval(function()
                {
                b=parseInt(getComputedStyle(oI).left);
                   if(b>420)
                   {
                       b=420;
                       clearInterval(onoff4)
                   }
                   oI.style.left=++b+"px";                   
                },1)
            }  
            if(ev.keyCode==38)
            {
                carTemp=3;              
                clearInterval(onoff)
                clearInterval(onoff5)
                clearInterval(timeq)
                 onoff=setInterval(
                    function()
                    {       
                       qiche(7);    
                    }               
                    ,300);  
                onoff5=setInterval(
                    function()
                    {
                        a+=2
                        oBj.style.backgroundPositionY=a+"px";
                    }
                    ,1)             
            }          
        }
        //键盘弹起
        document.onkeyup=function(ev)
        {
           
            if(ev.keyCode==37)
            {
                clearInterval(onoff2);
            }
            if(ev.keyCode==39)
            {
                clearInterval(onoff4);
            }
            if(ev.keyCode==38)
            {
                clearInterval(onoff)
                clearInterval(onoff5)
                clearInterval(timeq)
                carTemp=2;          
                timeq=setInterval(
                    function()
                    {  
                        qiche(7); 
                    }
                    ,600);
                    }     
        }      

        //用定时器循环调用敌方汽车
         timeq=setInterval(
            function()
            {  
                 qiche(7); 
            }
             ,600);
         
    //点击结束重新加载页面
    oCx.onclick = function()
    {
        location.reload();      
    }    
}

        //制造敌方的随机汽车
        function qiche(sc) 
        {            
            var onoff9=0;  
            var cars=document.createElement('div');
            cars.className='cars';
            var gg=(Math.floor(Math.random()*7));
            cars.innerHTML='<img src="'+arrimg[gg]+'">'; 
            var ff=(Math.floor(Math.random()*4));
            cars.style.left=arr[ff];
            cars.style.top="-200px";
            oBj.appendChild(cars);     
            cars.index=gg;
            //赛车移动           
            var speed=parseInt(cars.style.top)
            onoff9=setInterval(function()
             {
                speed+=carTemp;
                cars.style.top=speed+'px';
                if(cars.offsetTop>800) 
                {           
                    clearInterval(onoff9);            
                    oBj.removeChild(cars);
                    score+=1;
        //加分的旗子
        if(score==11)
          {
            var Yidong=document.createElement('p');
            Yidong.className="yidong";
            Yidong.innerHTML='<img src="img/14.png">';
            oBj.appendChild(Yidong);                     
            Yidong.style.top="-20px";
            Yidong.style.left=arr[ff];
            var qtop=parseInt(Yidong.style.top)
            onoff8=setInterval(function()
            {
                Yidong.style.top=++qtop+"px";
                if(((Yidong.offsetLeft+Yidong.offsetWidth-6-oI.offsetLeft)>0&&(oI.offsetLeft+Yidong.offsetWidth-9>Yidong.offsetLeft))&&(((Yidong.offsetTop+Yidong.offsetHeight-20-oI.offsetTop)>0)&&(oI.offsetTop>Yidong.offsetTop)))
                    {
                        c=1000;
                        clearInterval(onoff8);     
                        Yidong.innerHTML="<span>+1000</span>"
                        setTimeout(function()
                        {
                            oBj.removeChild(Yidong);
                        },1000)                          
                    }
            },5)
          } 
                      //弹出记录 
                      if((cars.index==2))
                      {
                         setTimeout(function()
                          {
                            oJilv.style.display="block";
                            setTimeout(function()
                            {
                                oJilv.style.display="none";
                            },2000)
                          },10)
                      }  

                      if(score==25)
                      {              
                        setTimeout(function()
                          {
                            oJilv1.style.display="block";
                            setTimeout(function()
                            {
                                oJilv1.style.display="none";
                            },2000)
                          },10)
                      }  
   
                    oSpan.innerHTML=score+c;
                   
                }     
                
                //判断游戏结束的情况
                if(((cars.offsetLeft+cars.offsetWidth-6-oI.offsetLeft)>0&&oI.offsetLeft+oI.offsetWidth-10>cars.offsetLeft)&&((cars.offsetTop+cars.offsetHeight-13-oI.offsetTop)>0))
                 {                   
                    oJshu.style.display="block";
                    oSpan1.innerHTML=score+c; 
                    //暴力清除定时器
                     for(var i=0;i<100;i++)
                      {
                        clearInterval(i);
                      }   
                    //历史记录
                      var LiShi=localStorage.getItem('span2');
                      if(LiShi==null||LiShi<parseInt(oSpan.innerHTML)) 
                       {
                        localStorage.setItem('span2',parseInt(oSpan.innerHTML));
                        LiShi=parseInt(oSpan.innerHTML);
                       }
                          span2.innerHTML=LiShi;                
                }                           
            },sc)
        }

          
     
