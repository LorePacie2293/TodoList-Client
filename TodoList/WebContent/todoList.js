//Gestisce la todo list
function todoList(){
	
    let input;          //elemento input per inserire todo
    let todoList;       //elemento ul che contiene la lista dei todo
	
   	//Array che contiene gli oggetti todo
    let arrayTodo = [];
    console.log('ArrayTodo ', arrayTodo);
    
	//funzione che gestisce la chiamata ajax e restituisce una promise
	 async function  ajaxRequest(url, array){
		
	let promise = await fetch(url).then(result => {
			
			//Se la risposta e di tipo Json
			if(result.headers.get('content-type').includes('application/json')){
			
				return result.json();
			}
			
			throw new Error("Json non ricevuto");
			
		}).then(json => {
	
			return json;
		}).catch(err => {
			alert(err);
		})
		
		for(let j in promise){
			array.push(promise[j]);
		}
	}

    //Funzione di supporto che crea dinamicamente gli elementi li di un todo presente nell'array lista
    const createLi =  ({id, complete, text}) => {
        const liElement = document.createElement('li');
        liElement.id = id;

        //checkbox
        const spanComplete = document.createElement('span');
        spanComplete.classList.add(complete ? "complete" : "uncomplete");

        //gesctisce l'evento del click sulla checkbox
        spanComplete.addEventListener('click', event => {
            toggleTodo(id, event.target);
        })

        //delete
        const spanDelete = document.createElement('span');
        spanDelete.classList.add('delete');

        //definizione di una funzione arrow che verra richiamata in qualsiasi momentoquando si clicca sul delete
        //Il vantaggio di questa operazione e che la funzione arrow mantiene lo scope della funzione esterna
        spanDelete.addEventListener('click', event => {
            deleteTodo(id);
        })
        const textNode = document.createTextNode(text);
        

        //Aggiunta degli elementi figli del tag li
        liElement.appendChild(spanComplete);
        liElement.appendChild(spanDelete);
        liElement.appendChild(textNode);
        return liElement;
    }

    //Aggiunge un nuovo li ad ul, ma esegue operiazioni di filtraggio in base alla selezione desiderata
    //Ma prima vengono eliminati i todo precedenti(li)
    const addTodo = (todoFilter) => {

        //pulizia todo precedenti
        //Otteniamo tutti gli elementi li esistenti
        const precTodo = todoList.querySelectorAll('li');
        
        //rimozione dei nodi li dal nodo ul
        if(precTodo){
            precTodo.forEach(li => todoList.removeChild(li));
        }
		
        //estrae i todo filtrati
        const selectTodo = arrayTodo.filter(todo => {
            
            //se il filtro e all ritorna tutto
            if(todoFilter == 'all'){
                return todo;
            }

            //se il filtro e complete filtra i todo sono false
            //se il filtro e uncomplete filtra i todo quando sono true
            
            return (todoFilter == 'complete') ? todo.complete : !todo.complete;
            
        })
		
        //Aggiungi gli elementi filtrati al tag ul
        selectTodo.map(todo => createLi(todo)).forEach(li => todoList.appendChild(li));
    }

    //Funzione di supporto che aggiunge gli elementi todo(li) nel tag ul
    const createUl = () => {

        //Ottieni la lista dei todo
        todoList = document.querySelector("#todoList");

        //Se la lista non esiste, crearla
        if(!todoList){
            todoList = document.createElement('ul');
            todoList.id = 'todoList';
            document.body.appendChild(todoList);
        }

        //per ogni todo, aggiungi gli elementi li nel tag ul
        addTodo('all');
        
    }

    //ottiene l'elemento input todo e ne gestisce l'evento
    const createInput = () => {

        //Ottieni input todo
        input = document.querySelector('#todoInput');

        //Se l'elemento input non esiste, crearlo
        if(!input){
            input = document.createElement('input');
            input.id = 'todoList';
            input.placeholder = 'inserisci todo';
            input.name = 'todoInput';
            todoList.parentNode.insertBefore(input, todoList);
        }

        //se viene premuto il tasto enter
        input.addEventListener('keyup', (event) => {
           
            if(event.keyCode == 13 && event.target.value.length >= 3){
                
                //crea nuovo todo
                const newTodo = {
                    id:'t' + arrayTodo.length,
                    text:event.target.value,
                    complete:false
                }

                //Aggiunta nuovo todo
                createNewTodo(newTodo);

                //pulizia text input
                input.value = '';
                input.placeholder = 'inserisci todo';
            }
        })


    }

    //Gestisce gli eventi scatenati dai bottoni(filtraggio)
    const createButton = () => {
        
        //ricaviamo i nodi dei bottoni per essere riutilizzati
        let btnAll = document.querySelector('#btnAll');
        let btnComplete = document.querySelector('#btnComplete');
        let btnunComplete = document.querySelector('#btnunComplete');

        //Aggiunta listener ai bottoni
        btnAll.addEventListener('click', event => {
            event.target.classList.toggle('active');
            event.target.setAttribute('disabled', true);
            btnComplete.classList.remove('active');
            btnComplete.removeAttribute('disabled');
            btnunComplete.classList.remove('active');
            btnunComplete.removeAttribute('disabled');
            addTodo('all');
        });
        btnComplete.addEventListener('click', event => {
            event.target.classList.toggle('active');
            event.target.setAttribute('disabled', true);
            btnAll.classList.remove('active');
            btnAll.removeAttribute('disabled');
            btnunComplete.classList.remove('active');
            btnunComplete.removeAttribute('disabled');
            addTodo('complete');
        });
        btnunComplete.addEventListener('click', event => {
            event.target.classList.toggle('active');
            event.target.setAttribute('disabled', true);
            btnComplete.classList.remove('active');
            btnComplete.removeAttribute('disabled');
            btnAll.classList.remove('active');
            btnAll.removeAttribute('disabled');
            addTodo('uncomplete');
        });
    }

    //Crea un nuovo todo, quindi l'elemento li
    const createNewTodo = (todo) => {
       
        arrayTodo.push(todo);
        const newLi = createLi(todo);
        
        //ricerca primo elemento della lista per poter inserire il nuovo todo sopra
        const firstLi = todoList.firstChild;
        if(!firstLi){
            todoList.appendChild(newLi);
        }
        else{
            todoList.insertBefore(newLi, firstLi);
        }
    }

    //Elimina un todo passando il suo id
    const deleteTodo = (id) => {

        //filtraggio degli elementi dell'array dei todo
        arrayTodo = arrayTodo.filter(todo => todo.id != id);

        //Rimozione dell'elemento li con id interessato
        todoList.removeChild(document.querySelector('#' + id));
    }

    //effettua lo switch tra complete e uncomplete
    const toggleTodo = (id, elem) => {

        //per ogni oggetto contenuto nell array, se corrisponde all'id, cambia il complete
            arrayTodo = arrayTodo.map(elem => {
            if(elem.id == id){
                
                elem.complete = !elem.complete;
            }
          
            return elem;
        })

        //stabilisce il valore della classe complete attuale
        const oldClass = elem.classList.contains('complete') ? 'complete' : 'uncomplete';

        //ora assegna il valore opposto alla classe complete, uso dello strict equality
        const newClass = oldClass === 'complete' ? 'uncomplete' : 'complete';
        
        //modifica della classe elemento li
        elem.classList.replace(oldClass, newClass);
    } 

    //restituisce un'oggetto che rappresenta l'interfaccia per gestire la lista dei todo
    return{

        //Restituisce la lista dei todo
        getTodoList : function(){
            return arrayTodo;
        },
        init : function(){
			ajaxRequest('http://localhost:8080/TodoList/home', arrayTodo);
            createUl();
            createInput();
            createButton();
        },
        update : function(){
			addTodo('all');
		}
      
    }
}

const myTodoCall = todoList();
myTodoCall.init();
myTodoCall.update();
