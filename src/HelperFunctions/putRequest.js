    // Function to UPDATE
  var updateData = async (url, data) => {
      const rawResponse = await fetch(url, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)
      });
      const content = await rawResponse.json();
      console.log(content);
      return content;
  };
  export default updateData;