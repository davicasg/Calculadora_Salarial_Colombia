var separador=document.getElementById("salario");
separador.addEventListener("keyup", event=>{
    var entrada=event.target.value;
        console.log(entrada);
},false);

function calcular(){
    var anticipo=parseInt(document.getElementById("anticipo").value);//Se obtiene el porcentaje del anticipo
    anticipo=anticipo/100;
    var AuxTransporte=102854;
    var salario=parseInt(document.getElementById("salario").value);//Se obtiene el sueldo basico
    var valorHora=salario/30/8;//se calcula el valor de la hora
    
    var Bono=parseInt(document.getElementById("Bono").value);//Se obtiene el valor del Bono

    //FORMATO MONEDA PESOS COLOMBIANOS
    const options2 = { style: 'currency', currency: 'COP', minimumFractionDigits:0};
    const numberFormat2 = new Intl.NumberFormat('es-CO', options2);

    //Obteniendo Recargos y Horas Extras
    var RNocturno=parseInt(document.getElementById("RNocturno").value);//Se obtiene cantidad de recargos nocturnos
    var RFDiurno=parseInt(document.getElementById("RFDiurno").value);//Se obtiene cantidad de recargos Festivos
    var RFNocturno=parseInt(document.getElementById("RFNocturno").value);//Se obtiene cantidad de recargos festivos nocturnos

    var EDiurna=parseInt(document.getElementById("EDiurna").value);//Se obtiene cantidad de horas extras 
    var ENocturna=parseInt(document.getElementById("ENocturna").value);//Se obtiene cantidad de horas extras nocturnas
    var EDFestiva=parseInt(document.getElementById("EDFestiva").value);//Se obtiene cantidad de horas extras festivas
    var ENFestiva=parseInt(document.getElementById("ENFestiva").value);//Se obtiene cantidad de horas extras festivas nocturnas
   


    //VALIDACIONES
    var totalRecargos=RNocturno+RFDiurno+RFNocturno;
    var totalExtras=EDiurna+ENocturna+EDFestiva+ENFestiva;

    if(salario>877803){
        if(RNocturno>=0 && RFNocturno>=0 && RFDiurno>=0 && EDiurna>=0 && ENocturna>=0 && EDFestiva>=0 && ENFestiva>=0){
            if(totalRecargos<=240 ){
                if(totalExtras<=60){
                        document.getElementById("valorHora").value=numberFormat2.format(valorHora);//Se Muestra el valor de la hora

                        //Validación Auxilio de trasnporte
                        if(salario<=1754460){
                            document.getElementById("ValorAuxTrans").value=numberFormat2.format(AuxTransporte);//En caso de ser menor de 2 SMLV
                        }else{
                            document.getElementById("ValorAuxTrans").value="$ 0";//En caso de superar los 2 SMLV
                        }
                        document.getElementById("valorSalario").value=numberFormat2.format(salario);
                        document.getElementById("porAnticipo").value=(anticipo*100).toString();
                        //Calculo de los recargos
                        var ValorRNocturno=valorHora*0.35;
                        var ValorRFDiurno=valorHora*1.75;
                        var ValorRFNocturno=ValorRNocturno+ValorRFDiurno;

                        var NumRNocturno=ValorRNocturno*RNocturno;
                        var NumRFDiurno=ValorRFDiurno*RFDiurno;
                        var NumRFNocturno=ValorRFNocturno*RFNocturno;
                        var ValorRecargos=NumRNocturno+NumRFDiurno+NumRFNocturno;

                        //Calculo Horas Extras
                        var ValorEDiurna=valorHora*1.25;
                        var ValorENocturna=valorHora*1.75;
                        var ValorEDFestiva=valorHora*2;
                        var ValorENFestiva=valorHora*2.5;

                        var NumEDiurna=ValorEDiurna*EDiurna;
                        var NumENocturna=ValorENocturna*ENocturna;
                        var NumEDFestiva=ValorEDFestiva*EDFestiva;
                        var NumENFestiva=ValorENFestiva*ENFestiva;
                        var ValorExtras=NumEDiurna+NumENocturna+NumEDFestiva+NumENFestiva;

                        
                        //Calculo Parafiscales
                        var pension=(salario+ValorRecargos+ValorExtras)*0.04;
                        
                        var salud=(salario+(ValorRNocturno*RNocturno)+(ValorRFDiurno*RFDiurno)+(ValorRFNocturno*RFNocturno)+(ValorEDiurna*EDiurna)+(ValorENocturna*ENocturna)
                        +(ValorEDFestiva*EDFestiva)+(ValorENFestiva*ENFestiva))*0.04;

                        var parafiscales=salud+pension;

                        var valorAnticipo=(salario+Bono)*anticipo;

                        var sueldo=salario+AuxTransporte+Bono+(ValorRNocturno*RNocturno)+(ValorRFDiurno*RFDiurno)+(ValorRFNocturno*RFNocturno)+(ValorEDiurna*EDiurna)+(ValorENocturna*ENocturna)
                        +(ValorEDFestiva*EDFestiva)+(ValorENFestiva*ENFestiva);

                        document.getElementById("CantiRNocturno").value=numberFormat2.format(NumRNocturno);
                        document.getElementById("CantiRFDiurno").value=numberFormat2.format(NumRFDiurno);
                        document.getElementById("CantiRFNocturno").value=numberFormat2.format(NumRFNocturno);
                        document.getElementById("ValorRecargos").value=numberFormat2.format(ValorRecargos);

                        document.getElementById("CantiEDiurnas").value=numberFormat2.format(NumEDiurna);
                        document.getElementById("CantiENocturnas").value=numberFormat2.format(NumENocturna);
                        document.getElementById("CantiEFestivas").value=numberFormat2.format(NumEDFestiva);
                        document.getElementById("CantiEFNocturnas").value=numberFormat2.format(NumENFestiva);
                        document.getElementById("ValorExtras").value=numberFormat2.format(ValorExtras);

                        document.getElementById("salud").value=numberFormat2.format(salud);
                        document.getElementById("pension").value=numberFormat2.format(pension);
                        document.getElementById("valorAnticipo").value=numberFormat2.format(valorAnticipo);
                        document.getElementById("ValorBono").value=numberFormat2.format(Bono);

                        document.getElementById("totalDevengado").value=numberFormat2.format(sueldo);
                        document.getElementById("totalDeducciones").value=numberFormat2.format(parafiscales+valorAnticipo);
                        document.getElementById("netoPagar").value=numberFormat2.format(sueldo-valorAnticipo-parafiscales);
                }else{
                    alert("Por favor verifique que la suma de las horas extras sea menor a 60");
                }
            }else{
                alert("Por favor verifique que la suma de todos los recargos sea menor a 240")
            }
        }else{
            alert("[ERROR] La cantidad de recargos u horas exras no pueden ser negativas")
        }   
    }
    else{
        alert("[ERROR] Ingrese un salario mayor o igual a un SMMLV")
    }
   


    
    
}