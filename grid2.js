class Grid{
  #json = {};
  #url ='';
  
constructor(url){
  this.#url = url;
  this.#json = this.#json(this.url);
 }
#json(url){
  $.getJSON(url)
    .done(function(data){   
      return data.responseJSON;
    })
    .fail(function(err){
      console.log(err.status + ' ' + err.statusText);
    });
}

  
  setjsonGrid(){

     
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
        //--
        //<small id="helpId" class="text-muted">coduri postale</small>
        let smlHlp = document.createElement('small');
        smlHlp.className = 'text-muted';
        smlHlp.id = 'helpId';
        smlHlp.innerText = 'coduri postale';
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
        this.json.forEach(element => {
          // row
          let row = document.createElement('tr');
          row.id = `row${i}`;
          row.style.cursor = 'pointer';
          row.setAttribute('onclick',`row_click(${i})`);
          if(i === 0){
            row.className='table-primary';
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
            row.appendChild(cell);
            //--
          });
          //--
       corpTabel.appendChild(row);
       i++;
     });
        tabela.appendChild(corpTabel);
        detailDiv.appendChild(tabela);

        console.log(this.divP);
        divP.appendChild(inputDiv);

        scrollDiv.appendChild(detailDiv);
        divP.appendChild(scrollDiv);

        console.log(divP.outerHTML);
        //console.log(json);
        return divP;
   
  }
  getjsonGrid(){
    return this.setjsonGrid();
  }
  
  

  filtrare () {
    console.log(txtScr.value);
    let paramSearch = txtScr.innerText.split(',');

    if($('#searchInputBox').val() != ''){
      jsonFiltered = json.filter(
        element =>  
        element.titular.match(paramSearch[0].trim())
      );
    }else{
      jsonFiltered = json;
    }
  }
  
}
