class CalcController{

    /* ---> Método Construtor <--- */
    constructor(){
        this._operation = [];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate = new Date().toLocaleDateString();
        this.initializer();
        this.initButtonsEvents();
    }

    initializer(){

        this.setDisplayDateTime();
        
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

    }

    addEventListenerAll(element, events, fnc){
        events.split(' ').forEach((event) => {
            element.addEventListener(event, fnc, false);
        });
    }

    clearAll(){

        this._operation = [];

    }

    clearEntry(){

        this._operation.pop();

    }

    setError(){
        this.displayCalc = "Error";
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){
        if(['+','-','*','/','%'].indexOf(value) > -1){
            return true;
        }else{
            return false;
        }

        // Ou return(['+','-','*','/','%'].indexOf(value) > -1);
    }

    addOperation(value){
        if(isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                //Trocar Operador
                this.setLastOperation(value);
            }else if(isNaN(value)){
                //Outra Coisa
                // console.log(value);
            }else{
                this._operation.push(value);
            }
        }else{
            //Number
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        }
        // this._operation.push(value);
        console.log(this._operation); 
    }

    execBtn(value){
        switch (value){
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearAll();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':
                this.clearAll();
            break;

            case 'ponto':
                this.addOperation('.');
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }
    }


    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn) => {
            this.addEventListenerAll(btn, 'click drag', (event) => {
                // replace("trocar", "por");
                let txtBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(txtBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', () => {
                btn.style.cursor = "pointer";
            })

        });
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }




    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }




    get displayCalc(){
        return this._displayCalcEl;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }




    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }


}