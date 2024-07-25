/* 
This JavaScript Document
will enable the slide n hide 
vector menu. 

- it will detect if the user clicks on the button class="btn-menu"
- each click will toggle ON and OFF the class="show", between these two states:
   <nav class="show">
    OR
   <nav>
- css style will take care of what to do with class="show"

More on JavaScript in a future lesson
*/


(function(d){
	
	const $nav = d.querySelector('nav');
	const $btn = d.querySelector('.button');	
	$btn.addEventListener('click', function(){		
		$nav.classList.toggle('show');		
	});	
	
})(document);