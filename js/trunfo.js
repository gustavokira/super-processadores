"use strict";

	$.getJSON("data/atributos.json",carregarTemplate).fail(error);


	function carregarTemplate(atributos){
		
		var anticache = Math.floor(Date.now() / 1000);
		$.get('carta.html?v='+anticache,carregarJsonCartas.bind({atributos:atributos}));
	}

	function carregarJsonCartas(template){
		console.log(template);
		if(typeof template === 'object'){
			template = new XMLSerializer().serializeToString(template.documentElement);
		}
		$.getJSON("data/cartas.json",tratarJson.bind(
			{
				template:template,
				atributos:this.atributos
			})
		).fail(error);
	}


	function tratarJson(data){
		$.each(data,renderizarCarta.bind({
			template:this.template,
			atributos:this.atributos
		}))
	}

	function renderizarCarta(i, obj){
		 var rendered = Mustache.render(
				this.template, 
				{
					nome: obj['nome'],
					grupo: obj['grupo'],
					label1: this.atributos['atributo1'],
					label2: this.atributos['atributo2'],
					label3: this.atributos['atributo3'],
					label4: this.atributos['atributo4'],
					label5: this.atributos['atributo5'],
					atributo1: obj[this.atributos['atributo1']],
					atributo2: obj[this.atributos['atributo2']],
					atributo3: obj[this.atributos['atributo3']],
					atributo4: obj[this.atributos['atributo4']],
					atributo5: obj[this.atributos['atributo5']],
					linkimg:obj['linkimg']
				}
		 );
		 $('#cartas').append(rendered);
	}


	function error(data, status, error){
		console.error(data,status,error);
	}