(function($) {
 'use strict';

    
    // Ajax-based random post fetching
    $( function(){
       
        $('#new-quote-button').on('click', function(event) {
            event.preventDefault();
        
        
            //all code for random post fetching goes here(get)

            // watch for button event to get new post

            // start a ajax call
            $.ajax({
                method: 'GET',
                url: api_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
                cache: false
            }).done ( function(data){
                // get first and only post array, hint: .shift()
              
              // update the quote content and name of person
               var newContent = data[0].content.rendered
               var newTitle = data[0].title.rendered
               
                $('.entry-content p').empty();
                $('.entry-content p').append(newContent);
                $('.entry-title').empty();
                $('.entry-title').append(newTitle);
               
               
                // if quotesource, update/display
                var newSource = data[0]._qod_quote_source_url
                $('.source').empty();
                $('.source').append(newSource);
                

                
                console.log(data[0]._qod_quote_source);
                
                
                // if quotesource, update/display

                // update the URL hint: history api
        
            });
        });    
    });

    // Ajax-based front-end post submission
    //$(function(){
        //all code for post submission goes here(post)
        //watch for submit event
        //set some values according to inputs
        //make ajax call
       // $.ajax ({
//method: 'post',
           // url:
           // data:
            //check notes, under new ajax way
       // }).done ( function(){
            //clear the inputs in form and make form disappear
            //show a success message
        //}).fail( function(){
            //show fail message
      //  });
  //  });
})(jQuery);