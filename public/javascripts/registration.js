$(document).ready(function() {
	$('#calculator').tooltip({
		animation: true,
	    title : 'Доступно тільки для зареєстрованих користувачів',
	    placement: 'bottom',
	    trigger: 'hover click focus',
	    delay: { show: 500, hide: 100 }
  	});
});