(function (window) {
  //所有写蛇的代码都可以放在这里.
  //随机产生一个十六进制的颜色的函数.
  function getColorForRandom(){
    var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //下标0-15
    var str = "#";
    //循环产生 6个 0-15的数.
    for(var i = 0 ; i < 6; i++){
      var num = Math.floor(Math.random()*16);
      //根据这个随机数,在arr数组中去取值.
      str += arr[num];
    }
    return str;   //"#985700"
  }




  //声明一个数组list保存显示蛇的每一节身体的div..
  var list = [];
  //1.蛇也有宽高/背景色,定位xy,所以蛇应该也是一个对象.既然有对象就应该有生成对象的构造函数.
  function Snake(width,height,bgColor,direction,x,y){
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || "right";
    //声明一个数组,用来描述蛇的每一节身体.(背景色/x/y);
    this.body = [
      {x:3,y:1,bgColor:'red'},
      {x:2,y:1,bgColor:'green'},
      {x:1,y:1,bgColor:'hotpink'}
    ];
  }

  //2.把蛇显示在地图上.封装的方法写在原型中.
  Snake.prototype.render = function (map) {
    //渲染新蛇之前删除老蛇
    removeSnake(map);

    //思路:遍历出蛇的每一节身体,让每一节身体都显示在地图上,那整条蛇不就显示出来了吗?
    for(var i = 0 ; i < this.body.length; i++){
      var snakeUnit = this.body[i]; //蛇的每一节身体.
      //创建div,让div拥有这一节蛇身体的所有显示信息.
      var div1 = document.createElement('div');
      div1.style.position = "absolute";
      div1.style.left = snakeUnit.x * this.width + "px";
      div1.style.top = snakeUnit.y * this.height + "px";
      div1.style.width = this.width + "px";
      div1.style.height = this.height + "px";
      div1.style.backgroundColor = snakeUnit.bgColor;
      //把这个div添加到地图上.
      map.appendChild(div1);
      //把这个div给存起来.
      list.push(div1);
    }
  }


  //4.声明一个函数,删除老蛇.
  function removeSnake(map){
    //老蛇div都在list里面,所以遍历list数组.
    for(var i = 0 ; i < list.length; i++){
    	map.removeChild(list[i]);
    }
    //清空list
    list.length = 0;
  }



  //3.蛇移动代码封装成函数写在原型中.
  Snake.prototype.move = function (food) {
    //3.1 除了蛇头之前的蛇身体移动:移动之后的坐标等于他的上一节身体移动之前的坐标.
    for(var i = this.body.length-1; i > 0 ; i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }

    //3.2 蛇头移动:根据方向来移动.
    switch(this.direction){
      case 'right':
        this.body[0].x++;
        break;
      case 'left':
        this.body[0].x--;
        break;
      case 'top':
        this.body[0].y--;
        break;
      case 'bottom':
        this.body[0].y++;
        break;
    }

    //3.3 蛇每次移动,都有可能吃到一个食物.
    //吃没吃到食物怎么判断? 蛇头的坐标和食物的坐标重合了就表示吃到了食物.
    var snakeHeadX = this.body[0].x * this.width; //蛇头的x坐标
    var snakeHeadY = this.body[0].y * this.height; //蛇头的y坐标
    var foodX = food.x; //食物的x坐标
    var foodY = food.y; //食物的y坐标

    //先获取到蛇尾巴,因为要拿这个蛇尾巴的xy值.
    var lastSnakeUnit = this.body[this.body.length-1];

    //判断
    if(snakeHeadX == foodX && snakeHeadY == foodY){
      //吃到了食物.长一节身体
      this.body.push({
        x:lastSnakeUnit.x,
        y:lastSnakeUnit.y,
        bgColor:getColorForRandom()
      });
      //生成一个新的食物
    }


  }



  //3.把Snake构造函数给暴露出去.
  window.Snake = Snake;

}(window));
