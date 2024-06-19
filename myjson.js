var selectedItem = 'row0';
class Grid{
  #gridJson;
  #filtruJson;
  
  constructor(pJson){
    this.#gridJson = pJson;
    console.log(pJson);
  }
  get Grid(){
    return this.#makeGrid();
  }
  
  #makeGrid(){
    //grid container
    let divP = document.createElement('div');
    divP.className = 'container-fluid';
    divP.id = 'divP';
    //--
    //<div class="mb-1">
    let inputDiv = document.createElement('div');
    inputDiv.className = 'mb-1';
    //--
    //<label for="searchInputBox" class="form-label">Caută</label>
    let lbl1 = document.createElement('label');
    lbl1.setAttribute('for', 'searchInputBox');
    lbl1.className = 'form-label';
    lbl1.innerText = 'Caută';
    //--
    //<input type="text" name="" id="searchInputBox" class="form-control" placeholder="" aria-describedby="helpId">
    let txtScr = document.createElement('input');
    txtScr.setAttribute('type', 'text');
    txtScr.className = 'form-control';
    txtScr.id = 'searchInputBox';
    txtScr.setAttribute('aria-describedby', 'helpId');
    txtScr.onkeyup = function(key){
      if(key.code == 'Enter'){
        //let paramSearch = txtScr.value.split(',');
        //console.log(paramSearch[0]);
        this.#filtruJson = json.filter(
          element =>  
          element.titular.match(txtScr.value)
        );
        console.log(this.#filtruJson);
      }
    };
    //--
    //<small id="helpId" class="text-muted">coduri postale</small>
    let smlHlp = document.createElement('small');
    smlHlp.className = 'text-muted';
    smlHlp.id = 'helpId';
    smlHlp.innerText = 'nume titular';
    //--
    // add to search container
    inputDiv.appendChild(lbl1);
    inputDiv.appendChild(txtScr);
    inputDiv.appendChild(smlHlp);
    //--

    //<div class="container-fluid vw-75 vh-91 overflow-y-auto" id="scrollDiv">
    let scrollDiv = document.createElement('div');
    scrollDiv.className = 'container-fluid vw-75';
    scrollDiv.style.maxHeight='81vh';
    scrollDiv.style.overflowY='auto';
    scrollDiv.id = 'scrollDiv';
    //--
    //<div class="container-fluid" id="detailDiv">
    let detailDiv = document.createElement('div');
    detailDiv.className = 'container-fluid';
    detailDiv.id = 'detailDiv';
    //--
    // tabela 
    let tabela = document.createElement('table');
    tabela.id = 'detailTable';
    tabela.className = 'table table-striped table-hover';
    //--
    // tbody
    let corpTabel = document.createElement('tbody');
    //--
    //parcurg json
    let i=0;
    let rows = [];
    this.#gridJson.forEach(element => {
      // row

      rows.push(document.createElement('tr'));
      rows[i].id=`row${i}`;
      rows[i].style.cursor = 'pointer';
      var valRet;
      rows[i].addEventListener("click", function(PnterEvnt){
        //console.log(selectedItem);
        rows.forEach(element => {
          element.className = '';
        });
        PnterEvnt.target.parentNode.className = 'table-primary';
        selectedItem = PnterEvnt.target.parentNode.id;
      });
            
      if(i === 0){
        rows[i].className='table-primary';
      }
      //--

      //parcurg keys
      let keys = Object.keys(element);
      keys.forEach(key => {
        //creez td-uri
        let cell = document.createElement('td');
        cell.innerText  = element[key];
        if(key.substring(0,2)=='id'){
          cell.style.display ='none';
        }
        rows[rows.length-1].appendChild(cell);
        //--
      });
      //--
   corpTabel.appendChild(rows[rows.length-1]);
   i++;
 });
    tabela.appendChild(corpTabel);
    detailDiv.appendChild(tabela);

    divP.appendChild(inputDiv);

    scrollDiv.appendChild(detailDiv);
    divP.appendChild(scrollDiv);

    console.log(divP.outerHTML);
    //console.log(json);
    return divP;
  }
  
  
}

