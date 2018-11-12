;(function (window) {
  //所有关于食物的代码都写在这个作用域中.
  //声明一个数组list用来保存食物.
  var list = [];
  //1.创建食物的构造函数
  function Food(width,height,bgColor,x,y){
    this.width = width || 20;
    this.height = height || 20;
    this.bgColor = bgColor || "green";
    this.x = x || 0;
    this.y = y || 0;
  }
  //2.食物显示在地图上的方法.
  Food.prototype.render = function (map) {
    //生成新食物之前删除老食物
    removeFood(map);

    //2.1 随机生成一个随机的坐标.
    this.x = Math.floor(Math.random()*map.offsetWidth/this.width) *this.width;
    this.y = Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
    //2.2 创建一个div,让这div拥有这个食物对象的所有的显示信息
    var div1 = document.createElement('div');
    div1.style.position = "absolute";
    div1.style.left = this.x + "px";
    div1.style.top = this.y + "px";
    div1.style.width = this.width + "px";
    div1.style.height = this.height +"px";
    div1.style.backgroundColor = this.bgColor;
    //2.3 然后把这个div添加到map地图中去.
    map.appendChild(div1);

    //保存这个div
    list.push(div1);
  }


  //4.删除老食物.
  function removeFood(map){
    for(var i = 0 ; i < list.length; i++){
      map.removeChild(list[i]);
    }
    //清空list
    list.length = 0;
  }


  //3.把局部的Food函数,给暴露在外面.
  //给window对象,添加一个Food方法,这个方法体是当前这个局部函数Food.
  window.Food = Food;

}(window));

//----------------------------------------------------------------------------------------------------
;(function (window) {
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
  Snake.prototype.move = function (food,map) {
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
      //生成一个新的食物,就是调用食物对象的render方法产生一个新的坐标,这样给人的感觉就是产生了一个新的食物.
      food.render(map);
    }


  }



  //3.把Snake构造函数给暴露出去.
  window.Snake = Snake;

}(window));


//--------------------------------------------------------------------------------

//所有关于游戏逻辑的代码都写在这里.
;(function (window) {
  //声明一个变量that,用来保存游戏控制器对象.
  var that = null;

  //1.游戏逻辑控制器对象.
  function Game(map){
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    //给that赋值
    that = this;
  }

  //2.游戏控制器开始游戏的方法.
  Game.prototype.startGame = function () {
    //2.1 显示食物
    this.food.render(this.map);
    //2.1 显示蛇
    this.snake.render(this.map);

    // //让蛇动一下:调用蛇的move方法.
    // this.snake.move();
    // //蛇已经有了新的坐标,但是要根据新的坐标重新渲染蛇.
    // this.snake.render(this.map);
    //2.3 让蛇动起来
    snakeAutoMove();

    //2.4 让蛇根据键盘按键方向来移动.
    bindKey();
  }


  //4.声明一个函数,就是根据键盘按键来改变蛇的方向
  function bindKey(){
    //获取你按的是那个键盘按键. 给页面设置一个键盘按下事件.
    document.onkeydown = function (e) {
      e = e || window.event;
      //console.log(e.keyCode); //左37  上38  右39   下40
      switch(e.keyCode){
        case 37:
          if(this.snake.direction != "right"){
            this.snake.direction = "left";
          }
          break;
        case 38:
          if(this.snake.direction != "bottom"){
            this.snake.direction = "top";
          }
          break;
        case 39:
          if(this.snake.direction != "left"){
            this.snake.direction = "right";
          }
          break;
        case 40:
          if(this.snake.direction != "top"){
            this.snake.direction = "bottom";
          }
          break;
      }
    }.bind(that);
  }



  //3.写一个函数,这个函数就是让蛇不停的动起来.
  function snakeAutoMove(){
    //思路:设置一个计时器,让计时器不停的调用蛇对象的move方法和render方法.
    var timerID = setInterval(function () {
      //为什么这里的this是window?
      // console.log(this); //window
      // console.log(this.snake); //undefiend

      //想办法把这个this由window变成游戏控制器对象.
      //让蛇动一下:调用蛇的move方法.
      this.snake.move(this.food,this.map);
      //蛇已经有了新的坐标,但是要根据新的坐标重新渲染蛇.
      this.snake.render(this.map);

      //判断蛇有没有出界.
      var snakeHeadX = this.snake.body[0].x * this.snake.width; //蛇头的x坐标.
      var snakeHeadY = this.snake.body[0].y * this.snake.height; //蛇头的y坐标.
      if(snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight ){
        //出界了游戏结束.停止计时器.
        alert('Game Over!');
        clearInterval(timerID);
      }

    }.bind(that),300);
  }



  //3.把Game构造函数给暴露出去
  window.Game = Game;

}(window));
