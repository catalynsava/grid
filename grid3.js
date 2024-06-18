class Grid {
  constructor () {
    

  }
  get myDiv() {
    return this.myDiv();
  }
  myDiv(){
    
    var btn = document.createElement('button');
    btn.id = 'button1';
    btn.innerText = 'button1';

    var div = document.createElement('div');
    div.appendChild(btn);
    return div;
  }
}
