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
                beforeSend: function(xhr) {
                    xhr.setRequestHeader( 'X-WP-Nonce', api_vars.wpapi_nonce );
                    }
            }).done ( function(data){
              
              // update the quote content and name of person
               var newContent = data[0].content.rendered
               var newTitle = data[0].title.rendered
               
                $('.entry-content p').empty();
                $('.entry-content p').append(newContent);
                $('.entry-title').empty();
                $('.entry-title').append(newTitle);
               
               
                // if quotesource, update/display
                
                var quote = data[0]._qod_quote_source
                var quoteUrl = data[0]._qod_quote_source_url
                
                $('.source').remove();
                if( quote && quoteUrl ){
                    $('.entry-meta').append('<span class="source"><a href="'  + quoteUrl + '">' +
                     quote + '</a></span>');
                }else if( quote ){
                    $('.entry-meta').append('<span class="source">' + quote + '</span>');
                }

                //console.log(data[0].slug);
                var slug = data[0].slug
               
                
                
            //     var fetchAndInsert = function(slug){
            //         $.ajax({
            //             url: 'http://localhost/qod_project/' + slug,
            //             method: 'GET',
            //             cache: false
            //         })
            //     }


            //    $(window).on('popstate', function(){
            //        fetchAndInsert(location.pathname);
            //   })
                
              // update the URL hint: history api

                history.pushState(null, null, slug)
        
            });
        });    
    });
 
    // Ajax-based front-end post submission
    
 
     $('#submit-quote').on('click', function(event){
         event.preventDefault();
         //all code for post submission goes here(post)
         //watch for submit event
         //set some values according to inputs
        //make ajax call
         var newQuoteAuthor = $('#quote-author').val();
         var newQuoteContent = $('#quote-content').val();
         var newQuoteSource = $('#quote-source').val();
         var newQuoteSourceUrl = $("#quote-source-url").val();
         $.ajax ({
           method: 'post',
             url: api_vars.rest_url + 'wp/v2/posts',
             data: {
                 "title": newQuoteAuthor,
                "content": newQuoteContent,
               "_qod_quote_source": newQuoteSource, 
                 "_qod_quote_source_url": newQuoteSourceUrl,
                 "status": 'publish'
             },
             //check notes, under new ajax way
            beforeSend: function(xhr) {
                        xhr.setRequestHeader( 'X-WP-Nonce', api_vars.wpapi_nonce );
                        }
         }).done( function(data){
             console.log(data);
             //show a success message
               alert('Success!');
    ///clear the inputs in form and make form disappear
             $("#quote-submission-form").css("display", "none");
            
         }).fail( function(){
            
            //show fail message
             alert('Something went wrong, your post was not submitted'); 
        });
     });
})(jQuery);