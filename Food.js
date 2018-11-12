(function (window) {
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
  }

  //3.把局部的Food函数,给暴露在外面.
  //给window对象,添加一个Food方法,这个方法体是当前这个局部函数Food.
  window.Food = Food;

}(window));
