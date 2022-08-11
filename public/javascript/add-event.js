async function newFormHandler(event) {
    event.preventDefault();

    const eventName = document.querySelector('input[name="event-name"]').value;
    const description = document.querySelector('input[name="event-description"').value;

    const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
            eventName,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
};

document.querySelector('#new-event-form').addEventListener('submit', newFormHandler);