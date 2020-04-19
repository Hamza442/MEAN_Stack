//this key is used for the encryption of the credit card number
Stripe.setPublishableKey('pk_test_m6ZWLYyvkUAqJzr1fvr1uRj2');
//here we are grabing the form values
//in parameter we have form id 
var $form = $('#checkout-form');
//submit method will make sure that this is execued when ever the form is submitted
$form.submit(function (event) {
    // here adding hidden class to remove errors we we had any
    $('#charge-error').addClass('hidden');
    //finding the button in form
    //so that user cannot submit form when ever validation is going on 
    $form.find('button').prop('disabled', true);
    //code from the stripe website
    //calling this function again in end after fetching the values 
    Stripe.card.createToken({
        //paramters are all the ids used in the form
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        //here we are fetching name
        name: $('#card-name').val()
    }, stripeResponseHandler);//here after validatng data rhe response handler will work
    //returning false so that the form submition stops and does not continue
    return false;
});

//in the documents in the website we come to now that this function will have status and a response
function stripeResponseHandler(status, response) {
    if (response.error) { // Problem!

        // Show the errors on the form
        // charge error is the div id in our view 
        $('#charge-error').text(response.error.message);
        //there is error remove the hidden class to show the error 
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        // the token  validates
        //the token is generated through the stripe 
        var token = response.id;

        // Insert the token into the form so it gets submitted to the server:
        // we are adding the token which has the encrypted credit card information to the form 
        // so that it actually is send to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}