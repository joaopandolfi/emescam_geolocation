var _reload = function () {location.reload();};

function do_post_ajax(func, url, post_str) {
	var xmlhttp;

	if (window.XMLHttpRequest) {xmlhttp = new XMLHttpRequest();} else {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}

	xmlhttp.onreadystatechange =

		function(){
			if (xmlhttp.readyState == 4){
				if (xmlhttp.status == 200){
					if (func != null) { func.call(this, xmlhttp.responseText); }
					console.log (xmlhttp.responseText);
				}
			}
		};

	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(post_str);
}

_html_date_church =
	'<div class="w100p">' +
		'<div>' +
			'<select name="day[]" class="form-style w115">' +
				'<option value="0">Domingo</option>' +
				'<option value="1">Segunda</option>' +
				'<option value="2">Terça</option>' +
				'<option value="3">Quarta</option>' +
				'<option value="4">Quinta</option>' +
				'<option value="5">Sexta</option>' +
				'<option value="6">Sábado</option>' +
			'</select>' +
		'</div>' +
		'<div>' +
			'<input name="time[]" placeholder="Hora" type="text" class="form-style w34">' +
		'</div>' +
		'<div class="w502">' +
			'<input name="time_desc[]" placeholder="Descrição" type="text" class="form-style w100p">' +
		'</div>' +
		'<div>' +
			'<button class="bt bt-red" onclick="rm_input(this)">Remover</button>' +
		'</div>' +
	'</div>';

_html_date_event =
	'<div class="w100p">' +
		'<div>' +
			'<input name="day[]" placeholder="Hora" type="date" class="form-style w115">' +
		'</div>' +
		'<div>' +
			'<input name="time_start[]" placeholder="Hora" type="text" class="form-style w34">' +
		'</div>' +
		'<div>' +
			'<input name="time_end[]" placeholder="Hora" type="text" class="form-style w34">' +
		'</div>' +
		'<div>' +
			'<button class="bt bt-red" onclick="rm_input(this)">Remover</button>' +
		'</div>' +
	'</div>';

function new_input(btn, type, name, placeholder, chose) {
	if (chose == null) { chose = 'church'; }
	var dad = btn.parentNode.parentNode;

	if (type)
		switch (chose) {
			case 'event': $(dad.children[0]).append(_html_date_event); break;
			case 'church': $(dad.children[0]).append(_html_date_church); break;
		}

	else {
		var _html =

			'<div>' +
				'<div class="w380">' +
					'<input name="'+ name +'[]" type="text" class="form-style w283" placeholder="'+ placeholder +'">' +
					'<button class="bt bt-red" onclick="rm_input(this)">Remover</button>' +
				'</div>' +
			'</div>';

		$(dad.children[0]).append(_html);
	}
}

function rm_input(btn) {
	var _me = btn.parentNode.parentNode;
	var dad = _me.parentNode;
	dad.removeChild(_me);
}