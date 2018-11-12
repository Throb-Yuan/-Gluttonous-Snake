//所有关于游戏逻辑的代码都写在这里.
(function (window) {
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
      this.snake.move(this.food);
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

    }.bind(that),500);
  }



  //3.把Game构造函数给暴露出去
  window.Game = Game;

}(window));
