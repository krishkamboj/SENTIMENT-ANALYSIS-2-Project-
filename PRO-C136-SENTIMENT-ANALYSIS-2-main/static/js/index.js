$(document).ready(function () {
    console.log('Document is Ready')

    // Getting the date using Date() object and converting it to a string
    let date = new Date()
    let current_date = date.toDateString()

    // Display the date on the HTML page using jQuery and JS
    $('#date').text('Date: ' + current_date)  // Replace '#' with the appropriate ID selector

    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

    // Making a function for AJAX request
    function ajax_request(api_url, input_data) {
        $.ajax({
            type: 'POST',  // Specify the HTTP method
            url: api_url,
            data: JSON.stringify(input_data),
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                // Your success handling code
            },
            error: function (result) {
                // Your error handling code
            }
        })

        console.log('ajax request sent')
    }

    // Check if Submit button under 'smartphone' is clicked and get the review accordingly
    $('#m_button').click(function () {
        review = $('#m_textbox').val()
        input_data = { 'customer_review': review }
        ajax_request('/predict', input_data)
        product = 'Smartphone'
    })

    // Similar click functions for other products...

    // If SAVE button is clicked, hit a post request on the API
    $('#save_button').click(function () {
        console.log('save button is clicked')
        input_data = { 'date': date, 'product': product, 'review': review, 'sentiment': emotion }
        $.ajax({
            type: 'POST',  // Specify the HTTP method
            url: '/save',  // Specify the API endpoint
            data: JSON.stringify(input_data),
            dataType: 'json',
            contentType: 'application/json',
            success: function (result) {
                console.log(result)
            },
            error: function (result) {
                console.log(result)
            }
        })
        // Clearing textboxes
        $('#m_textbox').val('')
        // Clear textboxes for other products...
    })
})
