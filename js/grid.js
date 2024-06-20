class Grid{
  #json; #search; #grid;
  constructor(searchParam, jsonParam){
    this.#search = searchParam;
    this.#json = jsonParam.filter(element => element.titular.match(searchParam));

    this.#grid = document.createElement('div');
    this.#grid.className = 'container-fluid';
    this.#grid.id = 'Grid';

    let searchDiv = document.createElement('div');
    searchDiv.className = 'form-control form-group-sm mb-1'
    let lbl1 = document.createElement('label');
    lbl1.setAttribute('for', 'searchInputBox');
    lbl1.className = 'form-label';
    lbl1.innerText = 'Caută';
    let inputSearch = document.createElement('input');
    inputSearch.setAttribute('type', 'text');
    inputSearch.className = 'form-control form-control-sm';
    inputSearch.id = 'inputSearch';
    inputSearch.setAttribute('aria-describedby', 'helpId');
    //-- keyup --
    inputSearch.onkeyup = function(tasta){
        var rowsContent = new Rows(jsonParam.filter( element => 
            element.cod_localitate.match(this.value) ||
            element.tip.match(this.value) ||
            element.volum.match(this.value) ||
            element.pozitie.match(this.value) ||
            element.titular.match(this.value)
          )
        );
        document.getElementById('detailTable').setAttribute('selectedrow','row0')
        document.getElementById('detailTable').replaceChildren(rowsContent.Rows);
    };
    //-- -- -- --
    let smlHlp = document.createElement('small');
    smlHlp.className = 'text-muted';
    smlHlp.id = 'helpId';
    smlHlp.innerText = 'nume titular';
    searchDiv.appendChild(lbl1);
    searchDiv.appendChild(inputSearch);
    searchDiv.appendChild(smlHlp);

    let scrollDiv = document.createElement('div');
    scrollDiv.className = 'container-fluid bs-secondary-color vw-75';
    scrollDiv.style.maxHeight='81vh';
    scrollDiv.style.minHeight='50vh';
    scrollDiv.style.overflowY='auto';
    scrollDiv.id = 'scrollDiv';

    let detailDiv = document.createElement('div');
    detailDiv.className = 'container-fluid';
    detailDiv.id = 'detailDiv';

    let tabela = document.createElement('table');
    tabela.id = 'detailTable';
    tabela.className = 'table table-striped table-hover';
    var atrb = document.createAttribute('selectedrow');
    atrb.value = 'row0';
    tabela.setAttributeNode(atrb);
    var rowsContent = new Rows(jsonParam.filter(element => 
      element.cod_localitate.match(inputSearch.value) ||
      element.tip.match(inputSearch.value) ||
      element.volum.match(inputSearch.value) ||
      element.pozitie.match(inputSearch.value) ||
      element.titular.match(inputSearch.value) 
      )
    );
    tabela.appendChild(rowsContent.Rows);
    detailDiv.appendChild(tabela);

    this.#grid.appendChild(searchDiv);

    scrollDiv.appendChild(detailDiv);
    this.#grid.appendChild(scrollDiv);
  }
  get SearchText(){ return this.#search; }
  get JsonData(){ return this.#json; }
  get Grid(){ return this.#grid; }
}
class Rows{
  #tbody; #json; #row=[]; #selectedRow;
  constructor(pJson){
    this.#json = pJson;
        
    this.#tbody = document.createElement('tbody');
    this.#tbody.id = 'gridBody';
    this.#tbody.style.cursor = 'pointer';
    
    var i = 0;
    pJson.forEach(element => {      
      this.#row.push(new Row(i, element));
      this.#tbody.appendChild(this.#row[i].Row);
      i++;
    });
    // -- tbody click --
    this.#tbody.onclick = function(Event){
      var tbl = document.getElementById('detailTable');
      var oldRow = document.getElementById(tbl.getAttribute('selectedrow'));
      oldRow.className='';

      var curRow = Event.target.parentNode;
      tbl.setAttribute('selectedrow', curRow.id)
      console.log(tbl.getAttribute('selectedrow'));
      curRow.className = 'table-primary';
    }
    //-- -- -- -- -- --
  }
  get gridJson(){ return this.#json; }
  get Rows(){ return this.#tbody; }
  get selectedRow(){ return this.#selectedRow; }
}
class Row{
  #row; #cell;
  constructor(index, pRow){
    this.index = index;
    this.#row = document.createElement('tr');
    this.#row.id = `row${index}`;
    if(index == 0){
      this.#row.className='table-primary';
    }
    Object.keys(pRow).forEach(element => {
      this.#cell = document.createElement('td');
      if(element.substring(0,2) == 'id'){
        this.#cell.style.display ='none';
      }
      this.#cell.id= element;
      this.#cell.innerText = pRow[element];
      
      this.#row.appendChild(this.#cell);
    });
    var atrb = document.createAttribute('indexrow');
    atrb.value = index;
    this.#row.setAttributeNode(atrb);
  }
  get Row(){ return this.#row; }
}