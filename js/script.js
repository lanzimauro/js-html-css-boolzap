$(document).ready(function() {
  $(document).on('click', function() {
    if (!displayHidden()) {
      $('.box_wifi').removeClass('d_flex');
      $('.box_wifi').addClass('hidden');
      $('.banner_left').addClass('hidden');
      $('.right_column').removeClass('hidden');
      $('.right_column').addClass('d_flex');
      $(userTime());
      $(messageTime());
    }
  });

  // Icona text_bar
  $('.text_bar').on('keyup', function() {
       if (this.value.length > 0) {
         $('.microphone_icon').hide();
         $('.send_icon').show();
       } else {
         $('.microphone_icon').show();
         $('.send_icon').hide();
       }
  });

  // Invio messaggio
  $(document).on('click', '.send_icon', function() {
    sendMessage();
    lastMessage();
    $(".text_bar").focus();
  });

  $(".text_bar").keyup(function(event) {
    if (event.keyCode === 13 && $(this).val().length > 0){
        sendMessage();
        lastMessage();
    }
  });

  // Ricerca users
  $(".set").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".users").filter(function() {
      $(this).toggle($(this).find('h3').text().toLowerCase().indexOf(value) > -1)
    });
  });
  // Nasconde e rivela icona della ricerca
  $(".set").focus(function () {
    $('.img_input img:first-child').hide();
    $('.img_input img:last-child').show().removeClass('hidden');
    $(".search_bar").css( "background", "white" );
  }).blur(function () {
    $('.img_input img:first-child').show();
    $('.img_input img:last-child').hide();
    $(".search_bar").css( "background", "#F7F7F7" );
  });

  //dropdown_options
  $(document).on('click', '.img_arrow_down', function() {
      //Toggleclass sull'elemento dropdown cliccato
      $(this).siblings('.dropdown_options').toggleClass('hidden');
      //Nasconde la dropdown_options
      $(this).parents('.cloud').siblings('.cloud').find('.dropdown_options').addClass('hidden');
      // Posiziona il cloud nella box_chat
      if ($(this).parents('.cloud').hasClass('received')) {
        $(this).siblings('.dropdown_options').addClass('left_box');
      } else {
        $(this).siblings('.dropdown_options').addClass('right_box');
      }
    });

  // Cancella il messaggio selezionata
  $(document).on('click', '.delete', function() {
    $(this).parent().parent().parent('.cloud').remove();
  });

  // Click colonna sinistra
  $(document).on('click', '.users', function() {
    $('.users').removeClass('active');
    $(this).addClass('active');

    var userAtt = $(this).attr('data-contact');
    // Rimuove la classe nella chat selezionata
    $('.box_chat').removeClass('d_flex');
    // Visualizza la chat selezionata
    $('.box_chat').each(function() {
        if ($(this).attr('data-contact') == userAtt) {
          $(this).addClass('d_flex')
        }
    });
    // Cambia head_row_right
    var contenuto = $(this).find('h3').text();
    $('.text_user_icon').find('h3').text(contenuto);
    var img = $(this).find('img').attr('src');
    $('.user_icon').find('img').attr('src', img);
  });

});


////////////////////////////
// FUNZIONI
///////////////////////////

// Trova la classe
function displayHidden() {
  if ($('').hasClass('') == false){
      return false;
    } else if ($('').hasClass('') == false) {
      return true;
    }
}

// Aggiunge zero
function addZero(num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// Genera un numero random
function randomNum(num) {
  var random = Math.floor(Math.random() * (num));
  return random;
}

// Scroll
function scrollMessage() {
    var height = $('.box_chat.d_flex').height();
    $('.box_chat').scrollTop(height);
}

// Posiziona l'ultimo messaggio sotto l'utente corrispondente
function lastMessage () {
  var messageLast = $('.box_chat.d_flex').find('.cloud:last-child .message').text();
  var messageLast = messageLast.substr(0, 25) + '.';
  $('.users.active').find('p').text(messageLast);
  $('.users.active').prependTo('.users_contact');
}

//User Online
function userOnline(){
  var data = new Date();
  var hours = addZero(data.getHours());
  var minutes = addZero(data.getMinutes());
  var time = hours + ':' + minutes;

  var timeUser = $('.hour').text('Online');
}

//Ultimo accesso utente
function userTime(){
  var data = new Date();
  var hours = addZero(data.getHours());
  var minutes = addZero(data.getMinutes());
  var time = hours + ':' + minutes;

  var timeUser = $('.hour').text('Ultimo accesso oggi alle: ' + time);
  var timeUser = $('.users_contact_time').text(time);
}

//Orario ultimi messaggi
function messageTime(){
  var data = new Date();
  var hours = addZero(data.getHours());
  var minutes = addZero(data.getMinutes());
  var time = hours + ':' + Math.ceil(minutes / 3);

  var timeUser = $('.time').text(time);
}

// Funzione per invio messaggio
function sendMessage() {
  var randomPhrases = [
    'A dopo.',
    'A che ora ci vediamo?',
    'Oggi non ci sono!',
    'Ti ricordi l\'appuntamento?',
    'Tutto annullato.',
    'Non posso rispondere ora, ti chiamo dopo!'
  ];
  var messageTemplate = $('.box_chat + .cloud').clone();
  var typedMessage = $('.text_bar').val();

  var data = new Date();
  var hours = addZero(data.getHours());
  var minutes = addZero(data.getMinutes());
  var time = hours + ':' + minutes;

  messageTemplate.children('p').text(typedMessage);
  messageTemplate.children('time').text(time);

  $('.box_chat.d_flex').append(messageTemplate);
  messageTemplate.removeClass('hidden').addClass('send');

  $('.text_bar').val('');
  $('.text_bar').focus();

  $('.microphone_icon').show();
  $('.send_icon').hide();

  scrollMessage();

  // Messaggio bot in un secondo
  setTimeout(function(){
    var mexReceivedTemplate = $('.box_chat + .cloud.hidden').clone();
    mexReceivedTemplate.children('p').text(randomPhrases[randomNum(randomPhrases.length)]);
    mexReceivedTemplate.children('time').text(time);
    $('.box_chat.d_flex').append(mexReceivedTemplate);
    mexReceivedTemplate.removeClass('hidden').addClass('received');
    scrollMessage();
    lastMessage();
    userOnline();
  }, 1000);
}
