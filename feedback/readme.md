# Feedback Management System

This project is a simple feedback management system that allows users to submit, edit, delete, and view feedback. It consists of an HTML file (`index.html`) providing the frontend structure, and a JavaScript file (`app.js`) handling API interactions and application logic. The project uses the CrudCrud API to store and retrieve feedback, while Axios is used to manage API requests.

## File Structure

- **index.html**: This file contains the structure and elements for user interaction, including a feedback form, a feedback display section, and an overall ratings display.
- **app.js**: This file contains the logic for handling CRUD (Create, Read, Update, Delete) operations by interacting with the backend API (CrudCrud) and dynamically updating the feedback display and ratings.

## Frontend Overview

### Overall Ratings Section

The page displays the total number of feedbacks for each rating (1 to 5 stars). This is presented in a div with the ID `overall-ratings`:

```html
<div id="overall-ratings">
  * 0<br>** 0<br>*** 0<br>**** 0<br>***** 0
</div>
```

### Feedback Form

Users can submit feedback using a form that includes a field for the user's name and a dropdown for selecting a rating. The form is submitted by triggering the `submitFeedback()` function.

```html
<form onsubmit="submitFeedback(event)">
  <input type="hidden" id="feedbackId" value="">
  <div class="input-group">
    <label for="name">Enter Your Name:</label>
    <input type="text" id="name" required>
  </div>
  <label for="rating">Choose your rating:</label>
  <select id="rating">
    <!-- Rating options -->
  </select>
  <button type="submit">Submit</button>
</form>
```

### Feedback Display

All feedback submitted by users is shown in the `feedback-list` div. Each feedback entry has "Edit" and "Delete" buttons, allowing the user to update or remove feedback.

```html
<div id="feedback-list"></div>
```

## API Interaction and Feedback Management

The application uses the CrudCrud API for storing and retrieving feedback data. The base URL for API interactions is defined as:

```javascript
const apiBaseUrl = 'https://crudcrud.com/api/YOUR_UNIQUE_ENDPOINT/feedbacks';
```

### Loading Feedback on Page Load

When the page is loaded, the functions `displayFeedbacks()` and `displayOverallRatings()` are automatically called to load existing feedback and display the overall ratings.

```javascript
window.onload = function () {
  displayFeedbacks();
  displayOverallRatings();
};
```

### Submitting Feedback

The `submitFeedback()` function handles both creating and updating feedback. If no feedback ID is provided, a new feedback entry is created via an HTTP POST request:

```javascript
await axios.post(apiBaseUrl, { name: name, rating: rating });
```

If a feedback ID is present, the existing feedback is updated using an HTTP PUT request:

```javascript
await axios.put(`${apiBaseUrl}/${feedbackId}`, { name: name, rating: rating });
```

After submission, the feedback list and overall ratings are refreshed.

### Displaying Feedback

The `displayFeedbacks()` function retrieves all feedback from the API and dynamically displays it in the `feedback-list` div. Feedback entries include options for editing or deleting.

```javascript
const response = await axios.get(apiBaseUrl);
```

### Deleting Feedback

The `deleteFeedback()` function deletes a feedback entry using the HTTP DELETE request:

```javascript
await axios.delete(`${apiBaseUrl}/${id}`);
```

After deletion, the feedback list and overall ratings are updated.

### Editing Feedback

The `editFeedback()` function retrieves a specific feedback entry by its ID using a GET request and loads the data into the form for editing:

```javascript
const response = await axios.get(`${apiBaseUrl}/${id}`);
```

### Displaying Overall Ratings

The `displayOverallRatings()` function fetches all feedback from the API, counts the number of feedbacks per rating, and displays the counts in the `overall-ratings` div.

```javascript
const response = await axios.get(apiBaseUrl);
```

Rating counts are stored in an object like so:

```javascript
const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
```

### Form Reset

After feedback submission or update, the form fields are cleared, and the rating is reset to its default value.

```javascript
document.getElementById('feedbackId').value = '';
```

## API Call Summary

- **POST (Create Feedback)**: Adds new feedback using the `axios.post` method.
- **PUT (Update Feedback)**: Updates existing feedback using `axios.put`.
- **GET (Retrieve All Feedback)**: Fetches all feedback using `axios.get`.
- **DELETE (Delete Feedback)**: Deletes a feedback entry using `axios.delete`.
- **GET (Retrieve Single Feedback for Editing)**: Retrieves a single feedback entry using `axios.get`.
- **GET (Retrieve Feedback for Overall Ratings)**: Fetches all feedback to calculate the overall ratings.

---

This project is a simple yet functional feedback management system that demonstrates how to use a RESTful API to handle basic CRUD operations with the help of JavaScript and Axios.
