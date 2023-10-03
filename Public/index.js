document.addEventListener('DOMContentLoaded', function() {
    const dataList = document.getElementById('list');

    // Function to fetch and append email addresses from the server
    async function fetchdata() {
        try {
            const response = await fetch('/book/getdata'); 
            const data = await response.json();

            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = ` ${item.Email}----${item.Name}---${item.Phone}`;
                //creating deletebutton
                const deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.textContent = 'Delete';
                deleteButton.className='del'

                deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`/book/delete/${item.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    
                    listItem.remove();
                } else {
                    console.error('Error deleting data:');
                }
            } catch (error) {
                console.log(error)
            }
        });


                listItem.appendChild(deleteButton);

              dataList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    
    fetchdata();
});