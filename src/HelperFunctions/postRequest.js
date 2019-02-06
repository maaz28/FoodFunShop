    // Function to call the API
var post_request = async (url, user_data) => {
    console.log(user_data)
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_data)
        });
        const content = await rawResponse.json();
        console.log(content);
        return content;
    };
    export default post_request;
