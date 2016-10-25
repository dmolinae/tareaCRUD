var basePath = "http://146.83.216.162:8080/";

$(document).ready(function (){
    $('.modal-trigger').leanModal();
    $.ajax({
        url: basePath + "users/",
        type: "GET",
        dataType: "JSON",
        success: function(data) {
            $.each(data.data, function(index, item){
                addCard(item._id,item.first_name,item.last_name,item.comment,item.img);
                $('.modal-trigger').leanModal();
            });
        },
        error: function(){
            
        }
    });
    
    $("#form_agregar").submit(function(event){
        var data = {
            'first_name' : $("#firstname").val(),
            'last_name' : $("#lastname").val(),
            'comment' : $("#comment").val(),
            'img' : $("#image").val()
        };
        
        $.ajax({
            type: "POST",
            url: basePath + "users/",
            data: data,
            dataType: "json",
            encode: true,
            success: function(){
                location.reload();
            }
        }).done(function(data){
            console.log(data);
        });
        event.preventDefault();
    });
   
});

function eliminar(id){
    $.ajax({
        type: "DELETE",
        url: basePath + "users/" + id,
        success: function(){
            location.reload();
        }
    }).done(function(data){
        console.log(data);
    });
}

function editar(id,image,firstname,lastname,comment){
    
}

function abrirModalEditar(){
    $("#modal_editar").openModal();
    var modal =
            '<div class="modal-content">' +
                '<form class="col s12" method="POST">' +
                    '<div class="row">' +
                        '<div class="input-field col s12">' +
                            '<input disabled id="id" type="text" value="'+id+'" class="validate">' +
                            '<label class="active" for="id">id</label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="input-field col s6">' +
                            '<input id="firstname" type="text" value="'+firstname+'" class="validate">' +
                            '<label class="active" for="firstname">Nombre</label>' +
                        '</div>' +
                        '<div class="input-field col s6">' +
                            '<input id="lastname" type="text" value="'+lastname+'" class="validate">' +
                            '<label class="active" for="lastname">Apellido</label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="input-field col s12">' +
                            '<textarea id="comment" class="materialize-textarea" type="text" class="validate">'+comment+'</textarea>' +
                            '<label class="active" for="comment">Comentario</label>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="input-field col s12">' +
                            '<input id="image" type="text" value="'+image+'" class="validate">' +
                            '<label class="active" for="image">Link de la imagen</label>' +
                        '</div>' +
                    '</div>' +
                 '</form>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button id="'+id+'" img="'+image+'" firstname="'+firstname+'" lastname="'+lastname+'" comment="'+comment+'" class="modal-action modal-close waves-effect waves-green btn-flat" onclick="editar()">Guardar</button>' +
            '</div>';
    $("#modal_editar").append(modal);
}

var addCard = function(id, firstname, lastname, comment, image){
    var card = 
        '<div class="col s4">' +
            '<div id="'+id+'" class="card medium">' +
                '<div class="card-image waves-effect waves-block waves-light">' +
                    '<img class="activator" src="' + image + '">' +
                '</div>' +
                '<div class="card-content">' +
                    '<span class="card-title activator grey-text text-darken-4">' + firstname + 
                    '<i class="material-icons right">more_vert</i></span>' +
                '</div>' +
                '<div class="card-reveal">' +
                    '<span class="card-title grey-text text-darken-4">' + firstname + ' ' + lastname +
                    '<i class="material-icons right">close</i></span>' +
                    '<p>' + comment + '</p>' + 
                '</div>' +
                '<div class="card-action">' +
                    '<a class="waves-effect waves-light btn modal-trigger" onclick="abrirModalEditar()">Editar</a>' +
                    '<a id="'+id+'" class="waves-effect waves-light btn modal-trigger" onclick="eliminar(id)">Borrar</a>' +
                '</div>'
            '</div>' +
        '</div>';
    $("#cards").append(card);
}