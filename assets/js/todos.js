// Check of todos by clicking
$("ul").on("click", "li", function(){
	console.log("clicked li");
	$(this).toggleClass("completed");

	if ($("li").hasClass("completed")){
		$(this).appendTo('ul');
		} 
});

// Click on X to delete Todo
$("ul").on("click", "span", function(event){
	console.log("clicked on span");
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

// Add new item to list
$("input[type='text']").keypress(function(event){
	if (event.which === 13){
	//grab new todo text from input
		var todoText = ($(this).val());
	// creat enew li and add to ul
		$("ul").prepend("<li><span><i class='far fa-trash-alt'></i></span>" + todoText + "</li>")
		$(this).val("");
	}
});

$(".fa-plus-square").click(function(){
	$("input").fadeToggle();
})