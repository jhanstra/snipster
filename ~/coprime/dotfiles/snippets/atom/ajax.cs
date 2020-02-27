$.ajax({
  type: 'POST',
  url: '${1:url}',
  data: $2,
  success: function(data){
    $3
  },
  error: function(xhr, type, exception) { 
    $4
  }
});